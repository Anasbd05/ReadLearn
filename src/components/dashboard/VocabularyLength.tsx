"use client";

import { supabase } from "@/utils/supabase/client";
import { BookmarkCheck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  source_language: string;
  target_language: string;
  context_sentence: string | null;
  created_at: string;
}

const VocabularyLength = () => {
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

  return (
    <div className="py-1.5 px-4 mx-4 bg-gray-50 border  hover:opacity-80 flex items-center font-medium gap-2 text-black rounded-md">
      <span className=" flex items-center justify-center ">
        {loading ? <Loader2 className=" animate-spin " /> : vocabulary.length}{" "}
        Expressions
      </span>
      <BookmarkCheck className="h-4 w-4 text-secondary font-bold" />
    </div>
  );
};

export default VocabularyLength;
