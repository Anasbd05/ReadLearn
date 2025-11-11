"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { Trash2, BookOpen, Loader2, BookmarkCheck } from "lucide-react";

interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  source_language: string;
  target_language: string;
  context_sentence: string | null;
  created_at: string;
}

export default function BrowseVocabulary() {
  const [vocabulary, setVocabulary] = useState<VocabularyWord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchVocabulary();
  }, []);
  const fetchVocabulary = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("vocabulary")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching vocabulary:", error);
      } else {
        setVocabulary(data || []);
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("vocabulary").delete().eq("id", id);

    if (error) {
      console.error("Error deleting word:", error);
    } else {
      // Remove from UI
      setVocabulary(vocabulary.filter((word) => word.id !== id));
    }
  };

  const languageMap: Record<string, string> = {
    ar: "Arabic",
    en: "English",
    fr: "French",
    zh: "Chinese",
    es: "Spanish",
    de: "German",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-muted/50 rounded-xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <BookmarkCheck className="w-8 h-8 text-blue-600" />
            My vocabulary
          </h1>
          <p className="text-gray-600 px-1">
            You have learned {vocabulary.length} word
            {vocabulary.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Vocabulary Grid */}
        {vocabulary.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No words yet
            </h2>
            <p className="text-gray-500">
              Start reading and click on words to build your vocabulary!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vocabulary.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-amber-100 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">
                      {languageMap[item.source_language] ||
                        item.source_language}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {item.word}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-gray-400 hover:bg-red-100 p-1 rounded-md hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">
                    {languageMap[item.target_language] || item.target_language}:
                  </p>
                  <p className="text-lg font-semibold text-amber-700">
                    {item.translation}
                  </p>
                </div>

                <div className="text-xs text-gray-400">
                  Added {new Date(item.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
