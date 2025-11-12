import { dodopayments } from "@/lib/dodopayments";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");
    const name = searchParams.get("name") || "Customer";

    if (!productId || !userId || !email) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const response = await dodopayments.subscriptions.create({
      billing: {
        city: "Unknown",
        country: "US",
        state: "Unknown",
        street: "N/A",
        zipcode: "00000",
      },
      customer: {
        email,
        name,
      },
      payment_link: true,
      product_id: productId,
      quantity: 1,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/books`,
      metadata: {
        user_id: userId,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
