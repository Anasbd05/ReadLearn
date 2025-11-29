/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Crown, Lock, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import BrowseBooks from "@/components/dashboard/BrowseBooks";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ContinueReading from "@/components/dashboard/ContinueReading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Languages Through Books - FluencyWave",
  description:
    "Learn English, Spanish, French, German, and Chinese by reading books. Access a library of books in multiple languages, Improve vocabulary through reading.",
  keywords:
    "learn languages through reading, language learning books, learn English through books, learn Spanish through books, learn French through books, learn German through books, learn Chinese through books, read books in foreign languages, language vocabulary, immersive reading, Improve vocabulary through reading ,bilingual books, language reading practice",
  openGraph: {
    title: "Learn Languages Through Books | FluencyWave",
    description:
      "Master any language by reading books. Interactive reading experience with instant translations and vocabulary building.",
    url: "https://fluencywave.com/books",
    siteName: "Fluencywave",
    type: "website",
  },
};

export default async function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <Link
            href={"/billing"}
            className="py-1.5 px-5 mx-4 bg-secondary hover:opacity-80 flex items-center font-medium gap-2 text-white rounded-md"
          >
            <Crown className="h-4 w-4 font-medium" />
            <span>Upgrade</span>
          </Link>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ContinueReading />
          <BrowseBooks />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
