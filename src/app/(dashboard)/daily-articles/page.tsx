import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Metadata } from "next";
import BrowseArticles from "@/components/dashboard/BrowseArticles";

export const metadata: Metadata = {
  title: "Daily Articles for Learning - FluencyWave",
  description:
    "Read daily articles to improve your knowledge and language skills. Explore articles in multiple languages and expand your vocabulary effortlessly.",
  keywords:
    "daily articles, article in English language, article in Spanish language, article in French language, article in German language, article in Chinese language, improve vocabulary through articles, language reading practice, daily reading content",
  openGraph: {
    title: "Daily Articles | FluencyWave",
    description:
      "Enhance your language skills with daily articles. Interactive reading experience with instant translations and vocabulary building.",
    url: "https://fluencywave.com/daily-articles",
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
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <BrowseArticles />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
