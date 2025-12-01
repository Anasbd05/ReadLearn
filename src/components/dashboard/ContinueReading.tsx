"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import { supabase } from "@/utils/supabase/client";

interface SavedProgress {
  book_title: string;
  current_page: number;
  total_pages: number;
  updated_at: string;
}

export default function ContinueReading() {
  const [progress, setProgress] = useState<SavedProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) {
          setLoading(false);
          return;
        }
        const { data, error } = await supabase
          .from("reading_progress")
          .select("*")
          .eq("user_id", userData.user.id)
          .order("updated_at", { ascending: false })
          .limit(3);

        if (!error && data) {
          setProgress(data);
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, []);

  if (loading || progress.length === 0) return null;

  return (
    <div className="mb-4 bg-white rounded-xl shadow-lg p-6 border border-amber-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-amber-600" />
        Continue Reading
      </h2>
      <div className="space-y-3">
        {progress.map((item) => {
          const progressPercent = Math.round(
            (item.current_page / item.total_pages) * 100
          );

          return (
            <Link
              key={item.book_title}
              href={`/books/read/${encodeURIComponent(item.book_title)}?page=${
                item.current_page
              }`}
              className="block p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {item.book_title}
                    </div>
                    <div className="text-sm text-gray-600">
                      Page {item.current_page} of {item.total_pages} •{" "}
                      {progressPercent}%
                    </div>
                  </div>
                </div>
                <div className="text-amber-600 font-medium">Continue →</div>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
