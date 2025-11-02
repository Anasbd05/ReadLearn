import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { supabase } from "@/utils/supabase/client";

interface PageProps {
  params: { title: string } | Promise<{ title: string }>;
  searchParams: { chapter?: string } | Promise<{ chapter?: string }>;
}

// Helper function to split content into chapters
function splitIntoChapters(
  content: string,
  chaptersPerBook: number = 60
): string[] {
  // Split by sentences or by word count
  const wordsPerChapter = Math.ceil(
    content.split(" ").length / chaptersPerBook
  );
  const words = content.split(" ");
  const chapters: string[] = [];

  for (let i = 0; i < words.length; i += wordsPerChapter) {
    chapters.push(words.slice(i, i + wordsPerChapter).join(" "));
  }

  return chapters;
}

const Page = async ({ params, searchParams }: PageProps) => {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const { title } = resolvedParams;
  const chapterParam = resolvedSearchParams.chapter;

  if (!title) {
    notFound();
  }

  const decodedTitle = decodeURIComponent(title);
  const currentChapter = chapterParam ? parseInt(chapterParam) : 1;

  // Fetch book from Supabase
  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("title", decodedTitle)
    .single();

  if (error || !book) {
    console.error("Error fetching book:", error);
    notFound();
  }

  // Split content into chapters
  const chapters = splitIntoChapters(book.content);
  const totalChapters = chapters.length;

  // Validate chapter number
  if (currentChapter < 1 || currentChapter > totalChapters) {
    notFound();
  }

  const chapterContent = chapters[currentChapter - 1];
  const hasPrevious = currentChapter > 1;
  const hasNext = currentChapter < totalChapters;

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 shadow-sm border-b border-amber-100">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link
            href="/books"
            className="inline-flex items-center text-amber-700 hover:text-amber-900 transition-colors mb-2 text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Library
          </Link>
          <div className="flex items-start gap-2">
            <BookOpen className="w-8 h-8 text-amber-600 mt-1" />
            <div>
              <h1 className="text-lg font-bold text-gray-900 mb-1">
                {book.title}
              </h1>
              <p className="text-sm text-gray-600">by {book.author}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Chapter Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-amber-100 text-amber-800 px-6 py-2 rounded-full text-sm font-semibold mb-4">
            Chapter {currentChapter} of {totalChapters}
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-linear-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
              style={{ width: `${(currentChapter / totalChapters) * 100}%` }}
            />
          </div>
        </div>

        {/* Book Content */}
        <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-amber-100">
          <div className="prose prose-lg prose-amber max-w-none">
            {chapterContent.split("\n\n").map((paragraph, idx) => (
              <p
                key={idx}
                className="mb-6 leading-relaxed lg:leading-7 text-gray-800 text-justify"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-between gap-6">
          {/* Previous Button */}
          {hasPrevious ? (
            <Link
              href={`/books/read/${encodeURIComponent(decodedTitle)}?chapter=${
                currentChapter - 1
              }`}
              className="group flex items-center gap-3 bg-white hover:bg-amber-50 text-gray-700 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-amber-100"
            >
              <div className="bg-amber-100 group-hover:bg-amber-200 p-2 rounded-lg transition-colors">
                <ChevronLeft className="w-6 h-6 text-amber-700" />
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Previous
                </div>
                <div className="font-semibold">
                  Chapter {currentChapter - 1}
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {/* Chapter Counter */}
          <div className="text-center px-6 py-3 bg-white rounded-xl shadow-md border border-amber-100">
            <div className="text-2xl font-bold text-amber-700">
              {currentChapter} <span className="text-gray-400">/</span>{" "}
              {totalChapters}
            </div>
          </div>

          {/* Next Button */}
          {hasNext ? (
            <Link
              href={`/books/read/${encodeURIComponent(decodedTitle)}?chapter=${
                currentChapter + 1
              }`}
              className="group flex items-center gap-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="text-right">
                <div className="text-xs text-amber-100 uppercase tracking-wide">
                  Next
                </div>
                <div className="font-semibold">
                  Chapter {currentChapter + 1}
                </div>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <ChevronRight className="w-6 h-6" />
              </div>
            </Link>
          ) : (
            <Link
              href="/books"
              className="group flex items-center gap-3 bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="text-right">
                <div className="text-xs text-green-100 uppercase tracking-wide">
                  Finished
                </div>
                <div className="font-semibold">Browse More Books</div>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <BookOpen className="w-6 h-6" />
              </div>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
