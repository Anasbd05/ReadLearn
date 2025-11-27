/* eslint-disable @typescript-eslint/no-explicit-any */
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
        city: searchParams.get("city") || "", // Get from request
        country: (searchParams.get("country") || "US") as any,
        state: searchParams.get("state") || "",
        street: searchParams.get("street") || "",
        zipcode: searchParams.get("zipcode") || "",
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
      discount_code: "BLACKFRIDAY",
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
