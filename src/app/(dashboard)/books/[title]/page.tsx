import { supabase } from "@/utils/supabase/client";
import { MoveLeft, MoveRight, UserRoundPen } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: Promise<{ title: string }>;
}

const page = async ({ params }: PageProps) => {
  const resolvedParams = await Promise.resolve(params);
  const { title } = resolvedParams;

  const decodedTitle = decodeURIComponent(title);

  // Fetch book data from Supabase where title matches
  const { data: bookData, error } = await supabase
    .from("books")
    .select("title, author, resume")
    .eq("title", decodedTitle)
    .single();

  if (error) {
    console.error("Error fetching book:", error.message);
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Book Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            Could not find a book with title: {decodedTitle}
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  if (!bookData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Results</h1>
          <p className="text-gray-600 mb-6">
            No book found with title: {decodedTitle}
          </p>
          <Link
            href="/books"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with book icon */}
        <div className="text-center mb-8">
          <div className="inline-block bg-secondary p-4 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Blue header section */}
          <div className="bg-linear-to-b from-primary to-accent px-8 py-10">
            <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
              {bookData.title}
            </h1>
            <div className="flex items-center gap-2 text-neutral-100">
              <UserRoundPen className=" w-5 h-5" />
              <span className="text-lg font-medium">{bookData.author}</span>
            </div>
          </div>

          {/* Content section */}
          <div className="px-8 py-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-8 bg-orange-500 mr-3 rounded"></span>
                About This Book
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                {bookData.resume}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Link
                href="/books"
                className="flex-1 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 text-center flex items-center justify-center gap-2 border-2 border-gray-200"
              >
                <MoveLeft />
                Back
              </Link>
              <Link
                href={`/books/read/${encodeURIComponent(bookData.title)}`}
                className="flex-1 bg-linear-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2 transform"
              >
                Start Reading
                <MoveRight />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Ready to dive into this book? Click &rdquo;Start Reading&rdquo; to
          begin your journey.
        </p>
      </div>
    </div>
  );
};

export default page;
