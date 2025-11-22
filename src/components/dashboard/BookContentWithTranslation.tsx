// ✅ Updated BookContentWithTranslation with modern centered popup
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, JSX } from "react";
import { X, Loader2, Languages, ArrowRight } from "lucide-react";
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
              <p className="text-gray-900 text-base leading-relaxed wrap-break-word">
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
                <p className="text-amber-900 text-lg font-semibold leading-relaxed wrap-break-word">
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

interface BookContentWithTranslationProps {
  content: string;
}

function renderChapterContent(
  chapterContent: string,
  onWordClick: (word: string, x: number, y: number) => void
) {
  return chapterContent.split("\n\n").flatMap((paragraph, idx) => {
    const chapterRegex = /\bCHAPTER\s+\d+\.?\b/gi;
    const matches = paragraph.match(chapterRegex);

    if (!matches) {
      return (
        <p
          key={`${idx}-p`}
          className="mb-6 leading-relaxed lg:leading-7 text-gray-800 text-justify cursor-text"
          onClick={(e) => handleTextClick(e, onWordClick)}
        >
          {paragraph.trim()}
        </p>
      );
    }

    const elements: JSX.Element[] = [];
    matches.forEach((match, i) => {
      const parts = paragraph.split(chapterRegex);

      elements.push(
        <h2
          key={`${idx}-chapter-${i}`}
          className="text-2xl font-bold text-amber-700 mb-6 text-center tracking-wide"
        >
          {match.trim()}
        </h2>
      );

      const remainingText = parts[i + 1]?.trim();
      if (remainingText) {
        elements.push(
          <p
            key={`${idx}-p-${i}`}
            className="mb-6 leading-relaxed lg:leading-9 text-gray-800 text-justify cursor-text"
            onClick={(e) => handleTextClick(e, onWordClick)}
          >
            {remainingText}
          </p>
        );
      }
    });

    return elements;
  });
}

function handleTextClick(
  e: React.MouseEvent<HTMLParagraphElement>,
  onWordClick: (word: string, x: number, y: number) => void
) {
  const target = e.target as HTMLElement;
  const selection = window.getSelection();
  const selectedText = selection?.toString().trim();

  if (selectedText && selectedText.length > 0) {
    const rect = selection?.getRangeAt(0).getBoundingClientRect();
    if (rect) onWordClick(selectedText, rect.left + rect.width / 2, rect.top);
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

export default function BookContentWithTranslation({
  content,
}: BookContentWithTranslationProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [fluent, setFluent] = useState("en");
  const [target, setTarget] = useState("ar");

  const handleWordClick = async (word: string, x: number, y: number) => {
    const cleanWord = word.replace(/[.,!?;:'"]/g, "").toLowerCase();
    if (!cleanWord) return;

    console.log("🔍 Word clicked:", cleanWord);

    setSelectedWord(cleanWord);
    setPosition({ x, y });
    setLoading(true);
    setTranslation(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("👤 User:", user?.id);

    if (user) {
      const { data: userData } = await supabase
        .from("users")
        .select("fluent_language, target_language")
        .eq("id", user.id)
        .single();

      console.log("🌐 User languages:", userData);

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
      console.log("📖 Translation result:", result);

      const translatedText = result.translation || "Translation unavailable";
      setTranslation(translatedText);

      // ✅ AUTO-SAVE TO VOCABULARY TABLE
      if (result.translation) {
        console.log("💾 Attempting to save vocabulary...");

        const vocabEntry = {
          user_id: user.id,
          word: cleanWord,
          translation: translatedText,
          target_language: userData?.target_language || "ar",
          native_language: userData?.fluent_language || "en",
        };

        console.log("📝 Vocab entry to save:", vocabEntry);

        // First check if word already exists
        const { data: existing } = await supabase
          .from("vocabulary")
          .select("id")
          .eq("user_id", user.id)
          .eq("word", cleanWord)
          .single();

        if (existing) {
          console.log("ℹ️ Word already exists in vocabulary, skipping...");
        } else {
          // Insert new word
          const { data: vocabData, error: vocabError } = await supabase
            .from("vocabulary")
            .insert(vocabEntry);

          if (vocabError) {
            console.error("❌ Error saving to vocabulary:", vocabError);
            console.error(
              "Full error details:",
              JSON.stringify(vocabError, null, 2)
            );
          } else {
            console.log("✅ Successfully saved to vocabulary!");
            console.log("Saved data:", vocabData);
          }
        }
      } else {
        console.warn("⚠️ No translation available, skipping save");
      }
    } else {
      console.error("❌ No user found");
    }

    setLoading(false);
  };

  const handleClose = () => {
    setSelectedWord(null);
    setTranslation(null);
    setLoading(false);
  };

  return (
    <>
      <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-amber-100">
        <div className="prose prose-lg prose-amber max-w-none">
          {renderChapterContent(content, handleWordClick)}
        </div>
      </article>

      {selectedWord && (
        <TranslationPopup
          word={selectedWord}
          translation={translation}
          loading={loading}
          position={position}
          onClose={handleClose}
          targetLanguageLabel={target}
          fluentLanguage={fluent}
        />
      )}
    </>
  );
}
