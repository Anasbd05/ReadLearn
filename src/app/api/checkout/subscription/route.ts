/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/checkout/subscription/route.ts
import DodoPayments from "dodopayments";
import { NextResponse } from "next/server";

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const email = searchParams.get("email");
    const userId = searchParams.get("userId");

    if (!productId || !email || !userId) {
      return NextResponse.json(
        { error: "Missing required parameters: productId, email, or userId" },
        { status: 400 }
      );
    }

    const session = await client.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      customer: { email },
      metadata: { user_id: userId },
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/books`,
    });

    return NextResponse.json({
      session_id: session.session_id,
      checkout_url: session.checkout_url,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
