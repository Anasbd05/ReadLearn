import { dodopayments } from "@/lib/dodopayments";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ valid: false });
  }

  try {
    const result = await dodopayments.discountCodes.validate({
      discount_code: code,
    });

    return NextResponse.json({ valid: result.valid });
  } catch (err) {
    return NextResponse.json({ valid: false });
  }
}
