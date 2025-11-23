import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const {
      topic,
      wordCount,
      difficulty,
      targetLanguage,
      contentType = "article",
    } = await request.json();

    // Validate inputs
    if (!topic || !wordCount || !difficulty || !targetLanguage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate content type
    if (!["article", "story"].includes(contentType)) {
      return NextResponse.json(
        { error: "Content type must be 'article' or 'story'" },
        { status: 400 }
      );
    }

    // Define difficulty levels
    const difficultyPrompts = {
      beginner:
        "Use simple sentences, basic vocabulary (A1-A2 level). Keep sentence structures straightforward.",
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
      it: "Italian",
      pt: "Portuguese",
      ja: "Japanese",
      ko: "Korean",
    };

    const languageName = languageNames[targetLanguage] || targetLanguage;

    // Create different prompts based on content type
    let prompt = "";

    if (contentType === "story") {
      prompt = `Write an engaging story in ${languageName} about "${topic}".

Requirements:
- Length: Approximately ${wordCount} words
- Difficulty: ${difficultyPrompts[difficulty as keyof typeof difficultyPrompts]}
- Target language: ${languageName}
- Include a creative title
- Create interesting characters and a clear plot
- Use dialogue to make it engaging
- Include a beginning, middle, and end
- Make it appropriate and interesting for language learners
- Use descriptive language to help learners visualize the scene

Story Structure:
- Title: [Creative story title in ${languageName}]
- Opening: Set the scene and introduce characters
- Development: Build the plot with conflict or challenge
- Resolution: Conclude the story satisfyingly

Write the entire story in ${languageName} only.`;
    } else {
      prompt = `Write an educational article in ${languageName} about "${topic}".

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
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a language learning content creator. You write ${
            contentType === "story"
              ? "engaging stories"
              : "educational articles"
          } in various languages for language learners at different proficiency levels. Your content should be culturally appropriate and pedagogically sound.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: contentType === "story" ? 0.8 : 0.7, // Higher creativity for stories
      max_tokens: Math.ceil(wordCount * 1.5),
    });

    const generatedContent = completion.choices[0]?.message?.content || "";

    // Extract title and content
    const lines = generatedContent.split("\n");
    let title = topic;
    let content = generatedContent;

    // Try to extract title if it exists
    if (lines[0].toLowerCase().startsWith("title:")) {
      title = lines[0].replace(/^title:\s*/i, "").trim();
      content = lines.slice(2).join("\n").trim();
    }

    return NextResponse.json({
      success: true,
      title,
      content,
      contentType,
      wordCount: content.split(/\s+/).length,
      difficulty,
      topic,
      language: languageName,
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
