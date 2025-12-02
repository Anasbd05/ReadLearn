/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Newspaper } from "lucide-react";
import {
  englishArticles,
  spanishArticles,
  frenchArticles,
  germanArticles,
} from "@/assets/articles/assets";
import { supabase } from "@/utils/supabase/client";

const BrowseArticles = () => {
  const [targetLanguage, setTargetLanguage] = useState<string>("");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserLanguageAndArticles = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          console.error("User not logged in");
          setLoading(false);
          return;
        }

        // Fetch user's target language from "users" table
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("target_language")
          .eq("id", user.id)
          .single();

        if (userError) {
          console.error("Error fetching user data:", userError);
          setLoading(false);
          return;
        }

        const language = userData?.target_language;
        setTargetLanguage(language);

        let selectedArticles: any[] = [];

        switch (language?.toLowerCase()) {
          case "en":
          case "english":
            selectedArticles = englishArticles;
            break;
          case "fr":
          case "french":
            selectedArticles = frenchArticles;
            break;
          case "es":
          case "spanish":
            selectedArticles = spanishArticles;
            break;
          case "de":
          case "german":
            selectedArticles = germanArticles;
            break;
          default:
            selectedArticles = englishArticles;
            break;
        }

        setArticles(selectedArticles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchUserLanguageAndArticles();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-muted/50 rounded-xl p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading the articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-muted/50 rounded-xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-primary" />
            Articles
          </h1>
          <p className="text-gray-600">
            Daily{" "}
            <span className="text-primary font-semibold">{targetLanguage}</span>{" "}
            articles to read
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Link
              href={`/daily-articles/${encodeURIComponent(article.title)}`}
              key={index}
              className="border rounded-lg overflow-hidden bg-white hover:shadow-sm transition-shadow duration-200"
            >
              {/* Thumbnail */}
              {article.thumbnail ? (
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  width={400}
                  height={250}
                  className="w-full h-48 rounded-t-lg object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-lg">
                  No Image
                </div>
              )}

              {/* Title & Snippet */}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {article.sections && article.sections.length > 0
                    ? article.sections[0].body.slice(0, 120) + "..."
                    : "No content available."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseArticles;
