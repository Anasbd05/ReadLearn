/* eslint-disable @typescript-eslint/no-explicit-any */
import DodoPayments from "dodopayments";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");

    // Validate required parameters
    if (!productId || !userId || !email) {
      return NextResponse.json(
        {
          error: "Missing required parameters",
          details: {
            productId: !productId ? "required" : "provided",
            userId: !userId ? "required" : "provided",
            email: !email ? "required" : "provided",
          },
        },
        { status: 400 }
      );
    }

    // Validate API key
    if (!process.env.DODO_PAYMENTS_API_KEY) {
      console.error("DODO_PAYMENTS_API_KEY is not set");
      return NextResponse.json(
        { error: "Payment configuration error" },
        { status: 500 }
      );
    }

    console.log("Creating checkout session:", {
      productId,
      userId,
      email,
    });

    // Initialize DodoPayments client
    const client = new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    });

    // Create checkout session
    const session = await client.checkoutSessions.create({
      product_cart: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      customer: {
        email: email,
        name: "",
      },
      metadata: {
        user_id: userId,
      },
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/books`,
      customization: {
        show_order_details: true,
        show_on_demand_tag: false,
      },
      feature_flags: {
        allow_discount_code: true,
      },
    });

    console.log("Session created successfully:", {
      sessionId: session.session_id,
      hasCheckoutUrl: !!session.checkout_url,
      checkoutUrl: session.checkout_url,
    });

    // Validate session response
    if (!session.checkout_url) {
      console.error("No checkout URL in session response:", session);
      return NextResponse.json(
        {
          error: "Invalid checkout session response - no checkout URL provided",
        },
        { status: 500 }
      );
    }

    // Return success response with the correct property names
    return NextResponse.json({
      success: true,
      url: session.checkout_url, // DodoPayments uses checkout_url
      session_id: session.session_id,
    });
  } catch (error: any) {
    console.error("Checkout session creation failed:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });

    // Return detailed error for debugging
    return NextResponse.json(
      {
        error: "Failed to create checkout session",
        message: error.message,
        details:
          process.env.NODE_ENV === "development"
            ? {
                response: error.response?.data,
                status: error.response?.status,
              }
            : undefined,
      },
      { status: 500 }
    );
  }
}
