import Footer from "@/components/landingpage/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Learn Spanish Through Reading | Build Vocabulary Naturally - FluencyWave",
  description:
    "Master Spanish faster through reading. Click any word for instant translation, build vocabulary naturally, and read books, articles, and stories at your level. Start learning Spanish today!",
  keywords:
    "learn Spanish, Spanish vocabulary, learn Spanish through reading, improve Spanish reading, Spanish language learning, build Spanish vocabulary, Spanish fluency",
  openGraph: {
    title: "Learn Spanish Through Reading | FluencyWave",
    description:
      "The fastest way to Spanish fluency through natural reading and vocabulary building.",
    type: "website",
  },
};

export default function LearnSpanish() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Learn <span className="text-primary">Spanish</span> Through Reading
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            The fastest path to Spanish fluency isn&apos;t through grammar
            rules—it&apos;s through reading and building vocabulary naturally.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-[#007ff8] text-white px-8 py-4 rounded-lg font-semibold text-lg 
            hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Start Reading in Spanish
          </Link>
        </div>
      </section>

      {/* Why Reading Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8">
            Why Reading is the Fastest Way to Learn Spanish
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              You&apos;ve probably spent years studying Spanish grammar,
              memorizing verb conjugations, and doing exercises. But here&apos;s
              the truth:{" "}
              <strong className="text-primary">
                reading is how you actually become fluent
              </strong>
              .
            </p>
            <p className="text-lg leading-relaxed">
              When you read in Spanish, you&apos;re not just learning isolated
              words or abstract rules. You&apos;re seeing how native speakers
              actually use the language. You&apos;re absorbing sentence
              patterns, natural expressions, and the rhythm of Spanish—all
              without the boring drills and textbooks.
            </p>
            <p className="text-lg leading-relaxed">
              Think about how you learned your first language. You didn&apos;t
              start with grammar books. You heard words in context, over and
              over, until they became natural. Reading does the same thing for
              Spanish, but faster. Every sentence you read is a real example of
              how Spanish works in the wild.
            </p>
            <p className="text-lg leading-relaxed">
              The best part? Reading is enjoyable. When you&apos;re caught up in
              a good story or an interesting article, you&apos;re learning
              without feeling like you&apos;re studying. That&apos;s when real
              progress happens.
            </p>
          </div>
        </div>
      </section>

      {/* Vocabulary Over Grammar */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8">
            Vocabulary Matters More Than Perfect Grammar
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              Here&apos;s something most Spanish courses won&apos;t tell you:{" "}
              <strong className="text-secondary">
                vocabulary is more important than perfect grammar
              </strong>
              .
            </p>
            <p className="text-lg leading-relaxed">
              You can make grammar mistakes and still communicate effectively in
              Spanish. But if you don&apos;t know the words, you can&apos;t say
              anything at all. A strong vocabulary lets you express complex
              ideas, understand Spanish movies and books, and have real
              conversations—even if your grammar isn&apos;t perfect.
            </p>
            <p className="text-lg leading-relaxed">
              Native Spanish speakers understand &ldquo;Ayer yo ir a
              tienda&rdquo; even though the grammar is wrong. But perfect
              grammar means nothing if you don&apos;t know the word for what
              you&apos;re trying to say. Words are the building blocks. Grammar
              is just the blueprint.
            </p>
            <p className="text-lg leading-relaxed">
              Research shows that vocabulary size is the strongest predictor of
              reading comprehension and overall language proficiency. The more
              Spanish words you know, the better you understand, and the better
              you can express yourself.
            </p>
          </div>
        </div>
      </section>

      {/* How Reading Builds Vocabulary */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8">
            How Reading Expands Your Spanish Vocabulary
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              Reading is the ultimate vocabulary builder because you encounter
              Spanish words in their natural habitat. You don&apos;t just see a
              word and its definition—you see it being used in a real sentence,
              with real context and meaning.
            </p>
            <p className="text-lg leading-relaxed">
              When you read &ldquo;Ella se sentía <em>melancólica</em> viendo la
              puesta de sol,&rdquo; you understand melancólica means a sad,
              reflective feeling—not just &ldquo;tristeza&rdquo; from a
              dictionary. You learn the nuance, the emotion, the situations
              where Spanish speakers use that word. That&apos;s learning that
              sticks.
            </p>
            <p className="text-lg leading-relaxed">
              The more you read, the more times you see words repeated in
              different contexts. This natural repetition is how your brain
              locks vocabulary into long-term memory. After seeing
              &ldquo;ubicuo&rdquo; five times in different articles, you&apos;ll
              never forget it means &ldquo;everywhere.&rdquo;
            </p>
            <p className="text-lg leading-relaxed">
              Plus, reading exposes you to thousands of Spanish words—far more
              than any vocabulary list or flashcard deck ever could. A single
              Spanish novel contains 10,000+ unique words. That&apos;s more
              vocabulary than most textbooks teach in an entire year.
            </p>
          </div>
        </div>
      </section>

      {/* The FluencyWave Advantage */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8">
            Read Spanish Without the Struggle
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              The problem with reading in Spanish? You constantly run into words
              you don&apos;t know. You either skip them (and miss the meaning)
              or stop to look them up (and lose your flow). Both options are
              frustrating.
            </p>
            <p className="text-lg leading-relaxed">
              That&apos;s why we built FluencyWave. Click any Spanish word or
              phrase for an instant translation. No switching apps, no breaking
              your reading rhythm. Just smooth, natural reading where you
              understand everything.
            </p>
            <p className="text-lg leading-relaxed">
              Every word you look up gets saved automatically to your personal
              vocabulary list. Review them later with spaced repetition, or just
              keep reading—you&apos;ll see them again naturally in future texts,
              and each time they&apos;ll stick a little more.
            </p>
            <p className="text-lg leading-relaxed">
              Want to read about something specific? Our AI can generate Spanish
              stories on any topic at your level. Whether you&apos;re into
              science, sports, fantasy, or business, you&apos;ll always have
              engaging content that&apos;s just challenging enough to help you
              grow.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
            So... What about pricing?
          </h2>
          <p className="text-xl text-gray-700 mb-4">
            FluencyWave is only{" "}
            <span className="text-secondary font-bold">$5.2/month</span> or{" "}
            <span className="text-secondary font-bold">$52/year</span> Less than
            a cup of coffee per month
          </p>
          <p className="text-sm text-gray-600 mb-10">
            Cancel Anytime, No Questions
          </p>
          <Link
            href="/billing"
            className="inline-block bg-secondary text-white px-10 py-2.5 rounded-lg 
            font-bold text-lg hover:shadow-[4px_4px_#000] hover:-translate-1 transition-all"
          >
            Get Started
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
