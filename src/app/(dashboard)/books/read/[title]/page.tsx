import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import BookContentWithTranslation from "@/components/dashboard/BookContentWithTranslation";
import SaveProgressButton from "@/components/dashboard/SaveProgressButton";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ title: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const { title } = resolvedParams;
  const decodedTitle = decodeURIComponent(title);

  // Fetch book data to get author info if needed
  const { data: bookData } = await supabase
    .from("books")
    .select("title, author")
    .eq("title", decodedTitle)
    .single();

  const bookTitle = bookData?.title || decodedTitle;
  const author = bookData?.author;

  return {
    title: `${bookTitle} | Learn Languages by Reading`,
    description: author
      ? `Read "${bookTitle}" by ${author}. Learn English, Spanish, French, German, or Chinese through immersive reading with instant word translations.`
      : `Read "${bookTitle}". Learn languages through immersive reading with instant word translations and vocabulary building.`,
    keywords:
      "learn languages through reading, language learning books, learn English through books, learn Spanish through books, learn French through books, learn German through books, learn Chinese through books, read books in foreign languages, language vocabulary, immersive reading, vocabulary building, bilingual books, language reading practice",
    openGraph: {
      title: `${bookTitle} | FluencyWave`,
      description: `Read and learn languages with "${bookTitle}". Interactive reading with instant translations.`,
      type: "website",
    },
  };
}
// Page configuration based on book length
const PAGES_CONFIG = {
  short: 20,
  medium: 40,
  long: 60,
} as const;

// Helper: split book into equal-length sections by lines
function splitIntoPages(content: string, pagesPerBook: number): string[] {
  const lines = content.split("\n");
  const totalLines = lines.length;
  const linesPerPage = Math.ceil(totalLines / pagesPerBook);
  const pages: string[] = [];

  for (let i = 0; i < totalLines; i += linesPerPage) {
    pages.push(lines.slice(i, i + linesPerPage).join("\n"));
  }

  return pages;
}

const Page = async ({ params, searchParams }: PageProps) => {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const { title } = resolvedParams;
  const pageParam = resolvedSearchParams.page;

  if (!title) notFound();

  const decodedTitle = decodeURIComponent(title);
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  // Fetch book with book_length column
  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("title", decodedTitle)
    .single();

  if (error || !book) notFound();

  // Get pages per book based on book_length
  const bookLength = book.book_length as keyof typeof PAGES_CONFIG;
  const pagesPerBook = PAGES_CONFIG[bookLength] || PAGES_CONFIG.medium;

  // Split content into equal pages
  const pages = splitIntoPages(book.content, pagesPerBook);
  const totalPages = pages.length;

  if (currentPage < 1 || currentPage > totalPages) notFound();

  const pageContent = pages[currentPage - 1];
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

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

      <main className=" lg:max-w-5xl mx-auto px-2 lg:px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-amber-100 text-amber-800 px-6 py-3 rounded-full text-sm font-semibold">
              {currentPage} of {totalPages} Pages
            </div>
            <SaveProgressButton
              bookTitle={book.title}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-linear-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
        </div>

        <BookContentWithTranslation content={pageContent} />

        {/* Navigation */}
        <div className="mt-12">
          <div className="flex items-center justify-between gap-6">
            {hasPrevious ? (
              <Link
                href={`/books/read/${encodeURIComponent(decodedTitle)}?page=${
                  currentPage - 1
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
                  <div className="font-semibold">{currentPage - 1}</div>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            <div className="text-center px-6 py-3 bg-white rounded-xl shadow-md border border-amber-100">
              <div className="text-2xl font-bold text-amber-700">
                {currentPage} <span className="text-gray-400">/</span>{" "}
                {totalPages}
              </div>
            </div>

            {hasNext ? (
              <Link
                href={`/books/read/${encodeURIComponent(decodedTitle)}?page=${
                  currentPage + 1
                }`}
                className="group flex items-center gap-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl shadow-lg"
              >
                <div className="text-right">
                  <div className="text-xs text-amber-100 uppercase">
                    Next Page
                  </div>
                  <div className="font-semibold">{currentPage + 1}</div>
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
                  <div className="text-xs text-green-100 uppercase">
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
        </div>
      </main>
    </div>
  );
};

export default Page;
