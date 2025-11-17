"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import {
  ArrowBigLeft,
  Trash2,
  X,
  Loader2,
  Languages,
  ArrowRight,
} from "lucide-react";
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
      </>
    );
  }
};

export default Page;
