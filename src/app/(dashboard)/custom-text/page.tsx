import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Addtext from "@/constants/Addtext";
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";

export default async function Page() {
  const { data, error } = await supabase.from("importedText").select("*");

  if (error) {
    console.error("Error fetching importedText:", error.message);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            {/* Language Selection */}
            <div className=" hidden lg:flex items-center  gap-3 ml-2">
              {/* Fluent Language */}
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Fluent language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Separator
                orientation="vertical"
                className="data-[orientation=vertical]:h-4"
              />

              {/* Target Language */}
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Target language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Addtext />
        </header>

        {/* Page Content */}
        <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="w-full min-h-screen bg-muted/50 rounded-xl p-6">
            <h1 className="text-2xl font-semibold">My Imported Texts</h1>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
              {data && data.length > 0 ? (
                data.map((text) => (
                  <Link
                    href={`/custom-text/${text.textTitle.replaceAll(" ", "")}`}
                    className="flex gap-3 p-5 cursor-pointer group items-start border rounded-lg bg-background shadow-sm hover:shadow-md transition"
                    key={text.id}
                  >
                    <div className="flex flex-col gap-2">
                      <h2 className="font-medium text-lg group-hover:text-blue-600">
                        {text.textTitle}
                      </h2>
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {text.textContent}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-red-500 ">
                  No texts imported yet. Add one to get started!
                </p>
              )}
            </main>
          </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
