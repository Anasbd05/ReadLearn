import { createClient } from "@/utils/supabase/server";
import {
  MoveLeft,
  MoveRight,
  UserRoundPen,
  Crown,
  Check,
  ArrowRight,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ title: string }>;
}

// Generate dynamic metadata for each book page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const { title } = resolvedParams;
  const decodedTitle = decodeURIComponent(title);

  const supabase = await createClient();

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

const page = async ({ params }: PageProps) => {
  const resolvedParams = await Promise.resolve(params);
  const { title } = resolvedParams;

  const decodedTitle = decodeURIComponent(title);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not logged in");
    redirect("/login");
  }

  // Check user's plan
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("plan")
    .eq("id", user.id)
    .single();
  if (profileError) {
    console.log(profileError.message);
  }

  const isFreeUser = profile?.plan === "free" || !profile;

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

            {/* Subscription Gate for Free Users */}
            {isFreeUser && (
              <section className="min-h-screen bg-linear-to-br from-blue-50 via-white to-orange-50 py-16 px-4 sm:px-6 lg:px-8">
                <main className="max-w-4xl mx-auto">
                  <div className="space-y-8">
                    {/* Main Paywall Card */}
                    <div className="bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-200 rounded-3xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
                      {/* Icon */}
                      <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-linear-to-r from-orange-400 to-amber-400 rounded-full blur-lg opacity-50"></div>
                          <div className="relative bg-linear-to-r from-orange-500 to-amber-500 p-4 rounded-full">
                            <Crown className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                        Unlock Full Access
                      </h2>
                      <p className="text-gray-700 text-center text-lg mb-8 max-w-2xl mx-auto">
                        Subscribe to a premium plan to read this article and
                        gain unlimited access to our entire library of premium
                        content.
                      </p>

                      {/* Features */}
                      <div className="space-y-4 mb-8 bg-white bg-opacity-50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-start gap-4">
                          <Check className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-gray-900 font-semibold">
                              Unlimited Access
                            </p>
                            <p className="text-gray-600 text-sm">
                              Read all articles , stories and books without
                              limits
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <Check className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-gray-900 font-semibold">
                              Instant Translations
                            </p>
                            <p className="text-gray-600 text-sm">
                              Translate any word or line to your native language
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <Check className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-gray-900 font-semibold">
                              Reading Progress
                            </p>
                            <p className="text-gray-600 text-sm">
                              Track your reading book progress
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <Check className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-gray-900 font-semibold">
                              Build Vocabulary
                            </p>
                            <p className="text-gray-600 text-sm">
                              Create personalized word lists and flashcards
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href="/billing"
                        className="flex w-full bg-linear-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-2xl text-center transform hover:scale-105 items-center justify-center gap-2"
                      >
                        View Pricing Plans
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </main>
              </section>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Link
                href="/books"
                className="flex-1 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 text-center flex items-center justify-center gap-2 border-2 border-gray-200"
              >
                <MoveLeft />
                Back
              </Link>
              {isFreeUser ? (
                <Link
                  href="/billing"
                  className="flex-1 bg-linear-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2"
                >
                  <Crown className="w-5 h-5" />
                  Subscribe to Read
                </Link>
              ) : (
                <Link
                  href={`/books/read/${encodeURIComponent(bookData.title)}`}
                  className="flex-1 bg-linear-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2 transform"
                >
                  Start Reading
                  <MoveRight />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          {isFreeUser
            ? "Subscribe to unlock unlimited reading and language learning features."
            : 'Ready to dive into this book? Click "Start Reading" to begin your journey.'}
        </p>
      </div>
    </div>
  );
};

export default page;
