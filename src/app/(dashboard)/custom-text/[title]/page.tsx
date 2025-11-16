/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { ArrowBigLeft, Trash2, X, Loader2, Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";

interface PageData {
  id: string;
  title: string;
  content: string;
}

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
          <p className="text-xs text-gray-500 mb-1">{targetLabel}:</p>
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

  // If user selected text, use the center of the selection
  if (selectedText && selectedText.length > 0) {
    const rect = selection?.getRangeAt(0).getBoundingClientRect();
    if (rect) {
      // Use center of selection horizontally, top of selection vertically
      const centerX = rect.left + rect.width / 2;
      const topY = rect.top;
      onWordClick(selectedText, centerX, topY);
    }
    return;
  }

  // If clicking on a single word
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

const Page = ({ params }: { params: Promise<{ title: string }> }) => {
  const { title } = React.use(params);
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const route = useRouter();

  // Translation states
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const [translationLoading, setTranslationLoading] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState("ar");
  const [fluentLanguage, setFluentLanguage] = useState("en");

  React.useEffect(() => {
    const fetchText = async () => {
      try {
        setLoading(true);

        const { data: result, error: fetchError } = await supabase
          .from("importedText")
          .select("*");

        if (fetchError) throw fetchError;

        const matchedText = result?.find(
          (item) => item.title.replaceAll(" ", "") === title
        );

        setData(matchedText || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchText();
  }, [title]);

  const handleWordClick = async (word: string, x: number, y: number) => {
    const cleanWord = word.replace(/[.,!?;:'"]/g, "").toLowerCase();
    if (!cleanWord) return;

    if (/^[A-Z][a-z]+$/.test(word)) {
      setSelectedWord(cleanWord);
      setPosition({ x, y });
      setTranslation("Proper noun — no translation");
      return;
    }

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

      setTarget(userData?.target_language);
      setFluentLanguage(userData?.fluent_language);

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
      setTranslation(result.translation || "Translation unavailable");
    }

    setTranslationLoading(false);
  };

  const handleCloseTranslation = () => {
    setSelectedWord(null);
    setTranslation(null);
    setTranslationLoading(false);
  };

  const handleDelete = async (textId: string) => {
    try {
      const { error } = await supabase
        .from("importedText")
        .delete()
        .eq("id", textId);

      if (error) {
        console.error("Error deleting text:", error);
        return { success: false, error: error.message };
      }

      route.push("/custom-text");
      return { success: true, error: null };
    } catch (error) {
      console.error("Error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <>
        <section className="w-full min-h-screen bg-muted/50 rounded-xl p-6">
          <div className="max-w-4xl mx-auto p-6">
            <main className="flex items-center justify-between w-full">
              <Button
                onClick={route.back}
                className="px-8 cursor-pointer"
                variant={"outline"}
              >
                <ArrowBigLeft /> Back
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="h-8 cursor-pointer w-8 flex items-center justify-center rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors shrink-0">
                    <Trash2 className="w-6 h-6" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this text?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. It will permanently remove
                      your imported text from the app.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-muted/50 cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <Button
                      className="cursor-pointer"
                      variant={"destructive"}
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </main>

            <h1 className="text-3xl font-bold my-6">{data.title}</h1>

            {/* Updated content with clickable translation */}
            <div
              className="prose prose-lg max-w-none leading-relaxed lg:leading-7 text-gray-800 whitespace-pre-wrap cursor-text select-text"
              onClick={(e) => handleTextClick(e, handleWordClick)}
            >
              {data.content}
            </div>
          </div>
        </section>

        {/* Translation Popup */}
        {selectedWord && (
          <TranslationPopup
            word={selectedWord}
            translation={translation}
            loading={translationLoading}
            position={position}
            onClose={handleCloseTranslation}
            targetLanguageLabel={target}
            fluentLanguage={fluentLanguage}
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
      </>
    );
  }
};

export default Page;
