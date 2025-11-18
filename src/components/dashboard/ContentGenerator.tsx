/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Sparkles,
  Loader2,
  Clock,
  Copy,
  X,
  Languages,
  Coins,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

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
  onClose,
  targetLanguageLabel,
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

  const targetLabel = getLanguageName(targetLanguageLabel);
  const fluentLabel = getLanguageName(fluentLanguage);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Popup - Always centered */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-scaleIn">
        <div className="bg-linear-to-br from-white to-amber-50/30 rounded-2xl shadow-2xl border border-amber-200/50 w-[420px] max-w-[90vw] backdrop-blur-xl overflow-hidden">
          {/* Decorative linear bar */}
          <div className="h-1.5 bg-linear-to-r from-amber-400 via-orange-400 to-amber-500" />

          {/* Header */}
          <div className="flex items-center justify-between p-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-linear-to-br from-amber-100 to-orange-100 rounded-xl">
                <Languages className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800">Translation</h3>
                <p className="text-xs text-gray-500">
                  {targetLabel} → {fluentLabel}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:rotate-90 group"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="px-5 pb-5 space-y-4">
            {/* Original text card */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {targetLabel}
                </p>
              </div>
              <p className="text-gray-900 text-base leading-relaxed wrap-break-words">
                {word}
              </p>
            </div>

            {/* Arrow indicator */}
            <div className="flex justify-center">
              <div className="p-2 bg-linear-to-r from-amber-100 to-orange-100 rounded-full">
                <ArrowRight className="w-4 h-4 text-amber-600" />
              </div>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200/50">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                  <span className="text-sm font-medium text-amber-700">
                    Translating your text...
                  </span>
                </div>
              </div>
            )}

            {/* Translation result */}
            {!loading && translation && (
              <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl p-4 shadow-sm border border-amber-200/50 animate-slideUp">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                    {fluentLabel}
                  </p>
                </div>
                <p className="text-amber-900 text-lg font-semibold leading-relaxed wrap-break-words">
                  {translation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
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
  const router = useRouter();
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

  // ✅ NEW: Credits state
  const [credits, setCredits] = useState<number>(0);

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
    "Social Issues",
    "artificial intelligence",
    "Social media",
    "Human Rights",
  ];

  const handleGenerate = async () => {
    // ✅ CHECK CREDITS BEFORE GENERATING
    if (credits <= 0) {
      alert(
        "You have no credits left. Please purchase more credits to continue."
      );
      router.push("/billing");
      return;
    }

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

        // ✅ DECREASE CREDITS AFTER SUCCESSFUL GENERATION
        if (user) {
          const { data: updatedProfile, error } = await supabase
            .from("users") // or "profiles"
            .update({ credits: credits - 1 })
            .eq("id", user.id)
            .select("credits")
            .single();

          if (error) {
            console.error("Error updating credits:", error);
          } else {
            setCredits(updatedProfile?.credits || 0);
          }
        }
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
            context_sentence: null,
          },
          {
            onConflict: "user_id,word,source_language,target_language",
            ignoreDuplicates: true,
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
        {/* ✅ NO CREDITS WARNING */}
        {credits === 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <Coins className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 text-sm mb-1">
                No Credits Remaining
              </h3>
              <p className="text-sm text-red-700 mb-3">
                You&#39;ve used all your credits. Purchase more to continue
                generating content.
              </p>
              <button
                onClick={() => router.push("/billing")}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Get More Credits
              </button>
            </div>
          </div>
        )}

        {/* LinguaBot Welcome Message */}
        {!generatedContent && !loading && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                Welcome to FluentsBot
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                What topic would you like to explore and learn from today?
                I&lsquo;ll create personalized reading content tailored to your
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
              disabled={credits === 0}
            />
            <p className="text-xs text-gray-400 mt-1.5">
              {topic.length} characters (min 10)
            </p>

            {/* Popular Topics */}
            <div className="mt-3 flex flex-wrap gap-2">
              {popularTopics.map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  disabled={credits === 0}
                  className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Content Length & Difficulty */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Content Length
              </label>
              <select
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                disabled={credits === 0}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value={1000}>1,000 words (~5 min)</option>
                <option value={2000}>2,000 words (~10 min)</option>
                <option value={3000}>3,000 words (~15 min)</option>
                <option value={4000}>4,000 words (~20 min)</option>
                <option value={5000}>5,000 words (~25 min)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Language Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                disabled={credits === 0}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={loading || topic.length < 10 || credits === 0}
            className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-medium text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : credits === 0 ? (
              <>
                <Coins className="w-4 h-4" />
                No Credits Available
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Content (1 credit)
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
              This may take a minute. We&#39;re creating something special for
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
      </div>
    </div>
  );
}
