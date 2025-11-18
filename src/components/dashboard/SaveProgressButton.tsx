"use client";

import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { supabase } from "@/utils/supabase/client";

interface SaveProgressButtonProps {
  bookTitle: string;
  currentPage: number;
  totalPages: number;
}

export default function SaveProgressButton({
  bookTitle,
  currentPage,
  totalPages,
}: SaveProgressButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");

    try {
      // Get the current user
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData.user) {
        setMessage("Please log in to save progress");
        setIsSaving(false);
        return;
      }

      // Save or update progress
      const { error } = await supabase.from("reading_progress").upsert(
        {
          user_id: userData.user.id,
          book_title: bookTitle,
          current_page: currentPage,
          total_pages: totalPages,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,book_title",
        }
      );

      if (error) {
        console.error("Error saving progress:", error);
        setMessage("❌ Failed to save");
      } else {
        setMessage("✓ Saved!");
        setTimeout(() => setMessage(""), 2000);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 font-semibold"
      >
        <Bookmark className="w-5 h-5" />
        {isSaving ? "Saving..." : "Save My Place"}
      </button>
      {message && (
        <span
          className={`text-sm font-medium ${
            message.includes("✓") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </span>
      )}
    </div>
  );
}
