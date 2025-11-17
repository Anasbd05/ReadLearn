import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const bricolage = Bricolage_Grotesque({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "fluencywave - Learn Languages Naturally by Reading Books, AI-Generated Content & Your Own Stories with Instant Translations | English, French, Spanish, German & Chinese",
  description:
    "Master English, French, Spanish, German, and Chinese naturally with fluencywave. Read books, generate AI-powered content, or import your own stories with instant translations. Click any word for context-based learning. Build vocabulary through immersive reading tailored to your interests. The most natural way to achieve language fluency online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.className} antialiased`}>
      <body cz-shortcut-listen="true">
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-TWH5Y8TEGH"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TWH5Y8TEGH');
            `,
          }}
        />

        {children}
        <Toaster />
      </body>
    </html>
  );
}
