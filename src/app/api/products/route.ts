import { dodopayments } from "@/lib/dodopayments";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Starting products fetch...");
    console.log("Environment:", process.env.NODE_ENV);

    const products = await dodopayments.products.list();

    if (!products || !products.items) {
      return NextResponse.json(
        { error: "No products returned from Dodopayments" },
        { status: 404 }
      );
    }

    return NextResponse.json(products.items);
  } catch (error) {
    console.error("Detailed error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      error: error,
    });

    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
