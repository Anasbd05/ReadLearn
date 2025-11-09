/* eslint-disable @typescript-eslint/no-unused-vars */
// ✅ Updated: `chapter` -> `page` everywhere
import React, { JSX } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import BookContentWithTranslation from "@/components/BookContentWithTranslation";

interface PageProps {
  params: { title: string } | Promise<{ title: string }>;
  searchParams: { page?: string } | Promise<{ page?: string }>;
}

// Helper: split book into equal-length sections by lines
function splitIntoChapters(
  content: string,
  chaptersPerBook: number = 60
): string[] {
  const lines = content.split("\n");
  const totalLines = lines.length;
  const linesPerChapter = Math.ceil(totalLines / chaptersPerBook);
  const chapters: string[] = [];

  for (let i = 0; i < totalLines; i += linesPerChapter) {
    chapters.push(lines.slice(i, i + linesPerChapter).join("\n"));
  }

  return chapters;
}

// Render chapter content with headings
function renderChapterContent(chapterContent: string) {
  return chapterContent.split("\n\n").flatMap((paragraph, idx) => {
    const chapterRegex = /\bCHAPTER\s+\d+\.?\b/gi;
    const matches = paragraph.match(chapterRegex);

    if (!matches) {
      return (
        <p
          key={`${idx}-p`}
          className="mb-6 leading-relaxed lg:leading-7 text-gray-800 text-justify"
        >
          {paragraph.trim()}
        </p>
      );
    }

    const elements: JSX.Element[] = [];
    matches.forEach((match, i) => {
      const parts = paragraph.split(chapterRegex);

      elements.push(
        <h2
          key={`${idx}-chapter-${i}`}
          className="text-2xl font-bold text-amber-700 mb-6 text-center tracking-wide"
        >
          {match.trim()}
        </h2>
      );

      const remainingText = parts[i + 1]?.trim();
      if (remainingText) {
        elements.push(
          <p
            key={`${idx}-p-${i}`}
            className="mb-6 leading-relaxed lg:leading-9 text-gray-800 text-justify"
          >
            {remainingText}
          </p>
        );
      }
    });

    return elements;
  });
}

const Page = async ({ params, searchParams }: PageProps) => {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const { title } = resolvedParams;
  const pageParam = resolvedSearchParams.page;

  if (!title) notFound();

  const decodedTitle = decodeURIComponent(title);
  const currentChapter = pageParam ? parseInt(pageParam) : 1;

  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("title", decodedTitle)
    .single();

  if (error || !book) notFound();

  const chapters = splitIntoChapters(book.content);
  const totalChapters = chapters.length;
  if (currentChapter < 1 || currentChapter > totalChapters) notFound();

  const chapterContent = chapters[currentChapter - 1];
  const hasPrevious = currentChapter > 1;
  const hasNext = currentChapter < totalChapters;

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-orange-50">
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

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-block bg-amber-100 text-amber-800 px-6 py-2 rounded-full text-sm font-semibold mb-4">
            {currentChapter} of {totalChapters} Pages
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-linear-to-r from-amber-500 to-orange-500 h-full"
              style={{ width: `${(currentChapter / totalChapters) * 100}%` }}
            />
          </div>
        </div>

        <BookContentWithTranslation content={chapterContent} />

        <div className="flex items-center justify-between gap-6">
          {hasPrevious ? (
            <Link
              href={`/books/read/${encodeURIComponent(decodedTitle)}?page=${
                currentChapter - 1
              }`}
              className="group flex items-center gap-3 bg-white hover:bg-amber-50 text-gray-700 px-8 py-4 rounded-xl shadow-lg border border-amber-100"
            >
              <div className="bg-amber-100 p-2 rounded-lg group-hover:bg-amber-200">
                <ChevronLeft className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase">
                  Previous Page
                </div>
                <div className="font-semibold">{currentChapter - 1}</div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          <div className="text-center px-6 py-3 bg-white rounded-xl shadow-md border border-amber-100">
            <div className="text-2xl font-bold text-amber-700">
              {currentChapter} <span className="text-gray-400">/</span>{" "}
              {totalChapters}
            </div>
          </div>

          {hasNext ? (
            <Link
              href={`/books/read/${encodeURIComponent(decodedTitle)}?page=${
                currentChapter + 1
              }`}
              className="group flex items-center gap-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl shadow-lg"
            >
              <div className="text-right">
                <div className="text-xs text-amber-100 uppercase">
                  Next Page
                </div>
                <div className="font-semibold">{currentChapter + 1}</div>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <ChevronRight className="w-6 h-6" />
              </div>
            </Link>
          ) : (
            <Link
              href="/books"
              className="group flex items-center gap-3 bg-linear-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl shadow-lg"
            >
              <div className="text-right">
                <div className="text-xs text-green-100 uppercase">Finished</div>
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
