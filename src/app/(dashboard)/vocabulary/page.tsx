import { AppSidebar } from "@/components/app-sidebar";
import BrowseVocabulary from "@/components/dashboard/BrowseVocabulary";
import VocabularyLength from "@/components/dashboard/VocabularyLength";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Vocabulary | Track Learning Progress | FluencyWave",
  description:
    "Review and track all words you've learned while reading. Browse your personal vocabulary collection and monitor your language learning progress.",
  keywords:
    "vocabulary tracker, language learning vocabulary, track learned words, vocabulary progress, personal vocabulary list, language learning tracker, vocabulary review, word collection, vocabulary builder",
  openGraph: {
    title: "My Vocabulary | FluencyWave",
    description:
      "Track every word you've learned while reading. Review your personal vocabulary and monitor your progress.",
    url: "https://fluencywave.com/vocabulary",
    siteName: "Fluencywave",
    type: "website",
  },
};

export default function Page() {
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
          <VocabularyLength />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <BrowseVocabulary />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
