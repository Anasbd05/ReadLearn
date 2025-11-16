import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { topic, wordCount, difficulty, targetLanguage } =
      await request.json();

    // Validate inputs
    if (!topic || !wordCount || !difficulty || !targetLanguage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Define difficulty levels
    const difficultyPrompts = {
      beginner:
        "Use simple sentences, basic vocabulary (A1-A2 level). Explain concepts clearly with short paragraphs.",
      intermediate:
        "Use moderate complexity, everyday vocabulary (B1-B2 level). Include some idiomatic expressions.",
      advanced:
        "Use complex sentence structures, sophisticated vocabulary (C1-C2 level). Include nuanced expressions and advanced grammar.",
    };

    const languageNames: Record<string, string> = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
      ar: "Arabic",
      zh: "Chinese",
    };

    const languageName = languageNames[targetLanguage] || targetLanguage;

    // Create the prompt
    const prompt = `Write an educational article in ${languageName} about "${topic}".

Requirements:
- Length: Approximately ${wordCount} words
- Difficulty: ${difficultyPrompts[difficulty as keyof typeof difficultyPrompts]}
- Target language: ${languageName}
- Include a compelling title
- Structure with clear paragraphs
- Make it engaging and educational
- Suitable for language learners

Format:
Title: [Engaging title in ${languageName}]

[Content in ${languageName}]

Write the entire article in ${languageName} only.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // or 'gpt-3.5-turbo' for cheaper option
      messages: [
        {
          role: "system",
          content: `You are a language learning content creator. You write educational articles in various languages for language learners at different proficiency levels.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: Math.ceil(wordCount * 1.5), // Approximate tokens needed
    });

    const generatedContent = completion.choices[0]?.message?.content || "";

    // Extract title and content
    const lines = generatedContent.split("\n");
    let title = topic; // Default title
    let content = generatedContent;

    // Try to extract title if it exists
    if (lines[0].toLowerCase().startsWith("title:")) {
      title = lines[0].replace(/^title:\s*/i, "").trim();
      content = lines.slice(2).join("\n").trim(); // Skip title and empty line
    }

    return NextResponse.json({
      success: true,
      title,
      content,
      wordCount: content.split(/\s+/).length,
      difficulty,
      topic,
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to generate content",
      },
      { status: 500 }
    );
  }
}
