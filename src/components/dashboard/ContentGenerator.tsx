/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
"use client";

import { useState } from "react";
import {
  Sparkles,
  Loader2,
  Clock,
  Copy,
  Save,
  X,
  Languages,
} from "lucide-react";
import { supabase } from "@/utils/supabase/client";

interface TranslationPopupProps {
  word: string;
  translation: string | null;
  loading: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  targetLanguageLabel: string;
  fluentLanguage: string;
}
const TranslationPopup = ({
  word,
  translation,
  loading,
  position,
  onClose,
  fluentLanguage,
}: TranslationPopupProps) => {
  const languageMap: Record<string, string> = {
    ar: "Arabic",
    en: "English",
    fr: "French",
    zh: "Chinese",
    es: "Spanish",
    de: "German",
  };

  const getLanguageName = (code: string) => {
    return languageMap[code?.toLowerCase()] || code;
  };

  const fluentLabel = getLanguageName(fluentLanguage);

  const popupWidth = 300;
  const popupHeight = 150;
  const viewportWidth =
    typeof window !== "undefined" ? window.innerWidth : 1000;

  let adjustedX = position.x;
  let adjustedY = position.y;
  let transformX = "-50%";
  let transformY = "-120%";

  if (position.x + popupWidth / 2 > viewportWidth) {
    adjustedX = viewportWidth - popupWidth / 2 - 20;
    transformX = "-50%";
  }

  if (position.x - popupWidth / 2 < 0) {
    adjustedX = popupWidth / 2 + 20;
    transformX = "-50%";
  }

  if (position.y - popupHeight < 0) {
    transformY = "10px";
  }

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-2xl border-2 border-amber-200 p-4 min-w-[200px] max-w-[300px]"
      style={{
        left: `${adjustedX}px`,
        top: `${adjustedY}px`,
        transform: `translate(${transformX}, ${transformY})`,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-semibold text-amber-700 uppercase">
            Translation
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-xs text-gray-500 mb-1">Original:</p>
          <p className="font-semibold text-gray-900">{word}</p>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-amber-600 py-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Translating...</span>
          </div>
        ) : translation ? (
          <div>
            <p className="text-xs text-gray-500 mb-1">{fluentLabel}:</p>
            <p className="font-semibold text-amber-700 text-lg">
              {translation}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

function handleTextClick(
  e: React.MouseEvent<HTMLDivElement>,
  onWordClick: (word: string, x: number, y: number) => void
) {
  const selection = window.getSelection();
  const selectedText = selection?.toString().trim();

  if (selectedText && selectedText.length > 0) {
    const rect = selection?.getRangeAt(0).getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const topY = rect.top;
      onWordClick(selectedText, centerX, topY);
    }
    return;
  }

  const range = document.caretRangeFromPoint(e.clientX, e.clientY);
  if (!range || range.startContainer.nodeType !== Node.TEXT_NODE) return;

  const textNode = range.startContainer;
  const offset = range.startOffset;
  const textContent = textNode.textContent || "";

  let start = offset,
    end = offset;
  while (start > 0 && /[a-zA-Z']/i.test(textContent[start - 1])) start--;
  while (end < textContent.length && /[a-zA-Z']/i.test(textContent[end])) end++;

  const word = textContent.slice(start, end).trim();
  if (word.length > 0) onWordClick(word, e.clientX, e.clientY);
}

export default function ContentGenerator() {
  const [topic, setTopic] = useState("");
  const [wordCount, setWordCount] = useState(2000);
  const [difficulty, setDifficulty] = useState<
    "beginner" | "intermediate" | "advanced"
  >("intermediate");
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{
    title: string;
    content: string;
    wordCount: number;
  } | null>(null);

  // Translation states
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const [translationLoading, setTranslationLoading] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState("");
  const [fluent, setFluent] = useState("");

  const popularTopics = [
    "Travel & Culture",
    "Technology",
    "Food & Cooking",
    "Business",
    "History",
    "Science",
  ];

  const handleGenerate = async () => {
    if (!topic.trim() || topic.length < 10) {
      alert("Please enter a topic (at least 10 characters)");
      return;
    }

    setLoading(true);
    setGeneratedContent(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let targetLanguage = "en";
      if (user) {
        const { data: userData } = await supabase
          .from("users")
          .select("target_language")
          .eq("id", user.id)
          .single();

        targetLanguage = userData?.target_language || "en";
      }

      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          wordCount,
          difficulty,
          targetLanguage,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedContent({
          title: data.title,
          content: data.content,
          wordCount: data.wordCount,
        });
      } else {
        alert("Failed to generate content: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedContent) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("Please sign in to save content");
      return;
    }
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent.content);
      alert("Content copied to clipboard!");
    }
  };

  const handleWordClick = async (word: string, x: number, y: number) => {
    const cleanWord = word.replace(/[.,!?;:'"]/g, "").toLowerCase();
    if (!cleanWord) return;

    setSelectedWord(cleanWord);
    setPosition({ x, y });
    setTranslationLoading(true);
    setTranslation(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: userData } = await supabase
        .from("users")
        .select("fluent_language, target_language")
        .eq("id", user.id)
        .single();

      setFluent(userData?.fluent_language);
      setTarget(userData?.target_language);

      // Get translation
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: cleanWord,
          from: userData?.target_language,
          to: userData?.fluent_language,
        }),
      });

      const result = await response.json();
      const translatedText = result.translation || "Translation unavailable";
      setTranslation(translatedText);

      // ✅ AUTO-SAVE TO VOCABULARY TABLE
      if (result.translation) {
        const { error } = await supabase.from("vocabulary").upsert(
          {
            user_id: user.id,
            word: cleanWord,
            translation: translatedText,
            source_language: userData?.fluent_language || "en",
            target_language: userData?.target_language || "ar",
            context_sentence: null, // You can add context later
          },
          {
            onConflict: "user_id,word,source_language,target_language",
            ignoreDuplicates: true, // Don't save if already exists
          }
        );

        if (error) {
          console.error("Error saving to vocabulary:", error);
        }
      }
    }

    setTranslationLoading(false);
  };

  const handleCloseTranslation = () => {
    setSelectedWord(null);
    setTranslation(null);
    setTranslationLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* LinguaBot Welcome Message - Small at top */}
        {!generatedContent && !loading && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                Welcome to LinguaBot
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                What topic would you like to explore and learn from today?
                I&#39;ll create personalized reading content tailored to your
                language level and interests.
              </p>
            </div>
          </div>
        )}

        {/* Content Settings Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Content Settings
          </h2>

          {/* Topic Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Choose Your Topic
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Travel in Paris, Italian cooking, AI and technology..."
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
              rows={3}
            />
            <p className="text-xs text-gray-400 mt-1.5">
              {topic.length} characters (min 10)
            </p>

            {/* Popular Topics - Below input */}
            <div className="mt-3 flex flex-wrap gap-2">
              {popularTopics.map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700 transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Content Length & Difficulty - Side by side */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Content Length Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Content Length
              </label>
              <select
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white"
              >
                <option value={1000}>1,000 words (~5 min)</option>
                <option value={2000}>2,000 words (~10 min)</option>
                <option value={3000}>3,000 words (~15 min)</option>
                <option value={4000}>4,000 words (~20 min)</option>
                <option value={5000}>5,000 words (~25 min)</option>
              </select>
            </div>

            {/* Difficulty Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Language Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white"
              >
                <option value="beginner">Beginner (A1-A2)</option>
                <option value="intermediate">Intermediate (B1-B2)</option>
                <option value="advanced">Advanced (C1-C2)</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || topic.length < 10}
            className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-medium text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Content
              </>
            )}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Crafting your personalized content...
            </h3>
            <p className="text-sm text-gray-600">
              This may take a minute. We&apos;re creating something special for
              you!
            </p>
          </div>
        )}

        {/* Generated Content */}
        {generatedContent && (
          <div>
            {/* Content Header */}
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {generatedContent.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium">
                  {generatedContent.wordCount} words
                </span>
                <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium capitalize">
                  {difficulty}
                </span>
                <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {Math.ceil(generatedContent.wordCount / 200)} min read
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div
              className="bg-white rounded-xl border border-gray-200 p-8 mb-4 cursor-text"
              onClick={(e) => handleTextClick(e, handleWordClick)}
            >
              <div className="prose prose-base max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
                {generatedContent.content}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save to Library
              </button>
              <button
                onClick={handleCopy}
                className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy Text
              </button>
              <button
                onClick={() => setGeneratedContent(null)}
                className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Generate Another
              </button>
            </div>
          </div>
        )}

        {/* Translation Popup */}
        {selectedWord && (
          <TranslationPopup
            word={selectedWord}
            translation={translation}
            loading={translationLoading}
            position={position}
            onClose={handleCloseTranslation}
            targetLanguageLabel={target}
            fluentLanguage={fluent}
          />
        )}

        {/* Backdrop to close popup */}
        {selectedWord && (
          <div
            className="fixed inset-0 z-40"
            onClick={handleCloseTranslation}
            style={{ background: "transparent" }}
          />
        )}
      </div>
    </div>
  );
}
