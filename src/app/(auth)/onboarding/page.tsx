/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { BookOpen, Globe, Target } from "lucide-react";

const fluentLanguages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "it", name: "Italian" },
  { code: "nl", name: "Dutch" },
  { code: "pl", name: "Polish" },
  { code: "tr", name: "Turkish" },
  { code: "hi", name: "Hindi" },
];

const targetLanguages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
];

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OnboardingPage() {
  const router = useRouter();
  const [fluentLanguage, setFluentLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fluentLanguage || !targetLanguage) {
      setError("Please select both languages");
      return;
    }

    if (fluentLanguage === targetLanguage) {
      setError("Native and target languages must be different");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("No user found");
      }

      // Insert or update user data
      const { error: upsertError } = await supabase.from("users").upsert({
        id: user.id,
        email: user.email,
        fluent_language: fluentLanguage,
        target_language: targetLanguage,
        onboarding_completed: true,
      });
      if (upsertError) throw upsertError;

      router.push("/billing");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Your Reading Journey
          </h1>
          <p className="text-lg text-gray-600">
            Let&lsquo;s personalize your learning experience
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Fluent Language */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 text-amber-600" />
              Native Language
            </label>
            <Select
              value={fluentLanguage}
              onValueChange={(value) => setFluentLanguage(value)}
              required
            >
              <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Native Language</SelectLabel>
                  {fluentLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Target Language */}
          <div className=" my-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4 text-amber-600" />
              Learning Language
            </label>
            <Select
              value={targetLanguage}
              onValueChange={(value) => setTargetLanguage(value)}
              required
            >
              <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Learning Language</SelectLabel>
                  {targetLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Setting up..." : "Start Reading"}
          </button>
        </form>
      </div>
    </div>
  );
}
