// api/subscription/status/route.ts
import { dodopayments } from "@/lib/dodopayments";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // List all subscriptions and find the active one for this user
    const subscriptions = await dodopayments.subscriptions.list();

    const userSubscription = subscriptions.items.find(
      (sub) => sub.metadata?.user_id === userId && sub.status === "active"
    );

    if (!userSubscription) {
      return NextResponse.json({
        hasSubscription: false,
        isScheduledForCancellation: false,
      });
    }

    // Check if subscription is scheduled for cancellation
    const isScheduledForCancellation =
      userSubscription.cancel_at_next_billing_date === true;

    return NextResponse.json({
      hasSubscription: true,
      isScheduledForCancellation,
      nextBillingDate: userSubscription.next_billing_date,
      subscription: userSubscription,
    });
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return NextResponse.json(
      { error: "Failed to check subscription status" },
      { status: 500 }
    );
  }
}
