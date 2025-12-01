"use client";
import Link from "next/link";
import { Home, BookOpen, ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8 relative">
          <div className="text-[150px] md:text-[200px] font-bold text-gray-200 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full p-6 shadow-lg">
              <Search className="w-16 h-16 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you&#39;re looking for doesn&#39;t exist. It might have
          been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Browse Books
          </Link>
          <button
            onClick={router.back}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/personal-library"
              className="text-sm text-primary hover:underline"
            >
              Personal Library
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/daily-articles"
              className="text-sm text-primary hover:underline"
            >
              Daily articles
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/billing"
              className="text-sm text-primary hover:underline"
            >
              Billing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
