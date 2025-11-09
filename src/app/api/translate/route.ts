// app/api/translate/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { word, from, to } = await request.json();

    const response = await fetch(
      "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
      {
        method: "POST",
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
          "x-rapidapi-host": "google-translate113.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: from,
          to: to,
          text: word,
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json({
      success: true,
      translation: data.trans,
      original: word,
      sourceLang: from,
      targetLang: to,
    });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { success: false, error: "Translation failed" },
      { status: 500 }
    );
  }
}
