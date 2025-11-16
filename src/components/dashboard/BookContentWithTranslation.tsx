// ✅ Updated BookContentWithTranslation with multilingual popup
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, JSX } from "react";
import { X, Loader2, Languages } from "lucide-react";
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

  // Calculate if popup would go off-screen and adjust position
  const popupWidth = 300;
  const popupHeight = 150;
  const viewportWidth =
    typeof window !== "undefined" ? window.innerWidth : 1000;
  const viewportHeight =
    typeof window !== "undefined" ? window.innerHeight : 1000;

  let adjustedX = position.x;
  const adjustedY = position.y;
  let transformX = "-50%";
  let transformY = "-100%";

  // Check if popup goes off right edge
  if (position.x + popupWidth / 2 > viewportWidth) {
    adjustedX = viewportWidth - popupWidth / 2 - 20;
    transformX = "-50%";
  }

  // Check if popup goes off left edge
  if (position.x - popupWidth / 2 < 0) {
    adjustedX = popupWidth / 2 + 20;
    transformX = "-50%";
  }

  // Check if popup goes off top edge - show below selection instead
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

    setSelectedWord(cleanWord);
    setPosition({ x, y });
    setLoading(true);
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

      {selectedWord && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleClose}
          style={{ background: "transparent" }}
        />
      )}
    </>
  );
}
