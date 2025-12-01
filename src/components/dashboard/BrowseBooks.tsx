/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Search, BookOpen, Loader2 } from "lucide-react";
import {
  ChineseBooks,
  EnglishBooks,
  FrenchBooks,
  GermanBooks,
  SpanishBooks,
} from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";

const BrowseBooks = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [targetLanguage, setTargetLanguage] = useState("");

  useEffect(() => {
    const fetchUserLanguageAndBooks = async () => {
      try {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          console.error("User not logged in");
          setLoading(false);
          return;
        }

        // Fetch user's target language from profiles table
        const { data: userData, error: userError } = await supabase
          .from("users") // Change to "users" if that's your table name
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

        // Set books based on target language
        let selectedBooks: any[] = [];

        switch (language?.toLowerCase()) {
          case "en":
          case "english":
            selectedBooks = EnglishBooks;
            break;
          case "fr":
          case "french":
            selectedBooks = FrenchBooks;
            break;
          case "es":
          case "spanish":
            selectedBooks = SpanishBooks;
            break;
          case "de":
          case "german":
            selectedBooks = GermanBooks;
            break;
          case "zh":
          case "chinese":
            selectedBooks = ChineseBooks;
            break;
          default:
            selectedBooks = EnglishBooks; // Default to English
            break;
        }

        setBooks(selectedBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetchUserLanguageAndBooks:", error);
        setLoading(false);
      }
    };

    fetchUserLanguageAndBooks();
  }, []);

  const difficulties = [
    "All",
    "Very Easy",
    "Easy",
    "Medium",
    "Hard",
    "Very Hard",
  ];

  const filteredBooks = books.filter((book) => {
    const matchesDifficulty =
      selectedDifficulty === "All" || book.difficulty === selectedDifficulty;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Very Easy":
        return "bg-green-100 text-green-700 border-green-200";
      case "Easy":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Hard":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Very Hard":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-muted/50 rounded-xl p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading your books...</p>
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
            <BookOpen className="w-7 h-7 text-primary" />
            Book Library
          </h1>
          <p className="text-gray-600">
            Choose a book to start learning{" "}
            {targetLanguage && (
              <span className="font-medium text-primary">
                ({targetLanguage.toUpperCase()})
              </span>
            )}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search books or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedDifficulty === difficulty
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-blue-400"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredBooks.map((book, index) => (
              <Link
                key={index}
                href={`/books/${encodeURIComponent(book.title)}`}
                className="cursor-pointer group"
              >
                {/* Book Cover */}
                <div className="relative lg:h-[330px] hover:border-primary hover:border-2 overflow-hidden rounded-lg">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Difficulty Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border opacity-80 ${getDifficultyColor(
                        book.difficulty
                      )}`}
                    >
                      {book.difficulty}
                    </span>
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-4">
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No books found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseBooks;
