import React from "react";
import { allArticles } from "@/assets/articles/assets";
import ArticlePageClient from "@/components/dashboard/ArticlePageClient";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Check, CrownIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ title: string }>;
}

const ArticlePage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
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

  const article = allArticles.find(
    (a) => a.title?.toLowerCase() === decodedTitle.toLowerCase()
  );

  if (!article) {
    return <div className="p-8 text-center">Article not found</div>;
  }

  return (
    <>
      {isFreeUser ? (
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
                      <CrownIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                  Unlock Full Access
                </h2>
                <p className="text-gray-700 text-center text-lg mb-8 max-w-2xl mx-auto">
                  Subscribe to a premium plan to read this article and gain
                  unlimited access to our entire library of premium content.
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
                        Read all articles , stories and books without limits
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
      ) : (
        <ArticlePageClient article={JSON.parse(JSON.stringify(article))} />
      )}
    </>
  );
};

export default ArticlePage;
