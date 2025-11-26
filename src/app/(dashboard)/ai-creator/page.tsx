import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ContentGenerator from "@/components/dashboard/ContentGenerator";
import Credits from "@/components/Credits";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Story & Article Generator | FluencyWave",
  description:
    "Generate custom stories and articles in any language at your level. AI-powered content creation for English, Spanish, French, German, and Chinese learners.",
  keywords:
    "AI story generator, AI article generator, language learning content, custom stories for language learning, AI content creator, generate stories in any language, personalized language learning content, AI writing for learners",
  openGraph: {
    title: "AI Story & Article Generator | FluencyWave",
    description:
      "Create personalized stories and articles at your level. AI-powered content for effective language learning.",
    url: "https://fluencywave.com/ai-creator",
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
          <Credits />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ContentGenerator />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
