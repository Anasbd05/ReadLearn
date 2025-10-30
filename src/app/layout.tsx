import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "FluentsRead-Learn languages naturally by reading books with instant translations",
  description:
    "Learn languages naturally by reading books with instant translations, Click any word or sentence to see instant translations. Stay in your flow, build your vocabulary naturally, and enjoy reading in your target language.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true"
        className={`${bricolage.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
