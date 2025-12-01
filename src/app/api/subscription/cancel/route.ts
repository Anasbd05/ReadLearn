// api/subscription/cancel/route.ts
import { dodopayments } from "@/lib/dodopayments";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { userId, planName } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Get user's subscription info from your database
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify the user is cancelling their current plan
    if (planName && userData.plan?.toLowerCase() !== planName.toLowerCase()) {
      return NextResponse.json(
        { error: "Plan mismatch. You can only cancel your current plan." },
        { status: 400 }
      );
    }

    // List all subscriptions and find the active one for this user
    const subscriptions = await dodopayments.subscriptions.list();

    const userSubscription = subscriptions.items.find(
      (sub) => sub.metadata?.user_id === userId && sub.status === "active"
    );

    if (!userSubscription) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 404 }
      );
    }

    // Cancel the subscription at the end of the billing period
    // This sets cancel_at_next_billing_date to true
    await dodopayments.subscriptions.update(userSubscription.subscription_id, {
      cancel_at_next_billing_date: true,
    });

    // ✅ DON'T update the user plan here - let them keep access until billing period ends
    // The webhook will handle updating to "free" when subscription.cancelled event fires

    return NextResponse.json({
      success: true,
      message:
        "Subscription will be cancelled at the end of your billing period",
      cancelledPlan: planName || userData.plan,
      nextBillingDate: userSubscription.next_billing_date,
    });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    return NextResponse.json(
      {
        error: "Failed to cancel subscription",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
