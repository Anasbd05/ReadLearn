import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Addtext from "@/constants/Addtext";
import { createClient } from "@/utils/supabase/server";
import { FileText } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not logged in");
    redirect("/login");
  }
  const { data, error } = await supabase
    .from("importedText")
    .select("*")
    .eq("user_id", user?.id);

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
          </div>

          <Addtext />
        </header>

        {/* Page Content */}
        <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="w-full min-h-screen bg-muted/50 rounded-xl p-6">
            <h1 className="text-2xl font-semibold">My Personal Library</h1>

            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
              {data && data.length > 0 ? (
                data.map((text) => (
                  <Link
                    key={text.id}
                    href={`/personal-library/${text.title.replaceAll(" ", "")}`}
                    className="flex gap-3 p-5 cursor-pointer group items-start border rounded-lg bg-background shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex flex-col gap-2">
                      <h2 className="font-medium text-lg group-hover:text-blue-600">
                        {text.title}
                      </h2>
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {text.content}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground/40 mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Your Personal Library is Empty
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Start building your collection by importing texts, stories,
                    or articles to practice with
                  </p>
                </div>
              )}
            </main>
          </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
