import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Metadata } from "next";
import BrowseStories from "@/components/dashboard/BrowseStories";

export const metadata: Metadata = {
  title: "Daily Life Stories for Learning - FluencyWave",
  description:
    "Read daily life stories to improve your knowledge and language skills. Explore stories in multiple languages and expand your vocabulary effortlessly.",
  keywords:
    "daily life stories, life story in English language, life story in Spanish language, life story in French language, life story in German language, life story in Chinese language, improve vocabulary through stories, language reading practice, daily reading content",
  openGraph: {
    title: "Daily Life Stories | FluencyWave",
    description:
      "Enhance your language skills with daily life stories. Interactive reading experience with instant translations and vocabulary building.",
    url: "https://fluencywave.com/daily-stories",
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
          <BrowseStories />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
