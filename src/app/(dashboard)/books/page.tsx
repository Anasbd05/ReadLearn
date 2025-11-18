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

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not logged in");
    redirect("/login");
  }

  // Check user's plan
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("plan")
    .eq("id", user.id)
    .single();

  const isFreeUser = profile?.plan === "free" || !profile;

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
          {isFreeUser ? (
            <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
              <div className="max-w-2xl w-full mx-auto">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-linear-to-br from-background via-background to-secondary/5 p-8 md:p-12 shadow-2xl">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-secondary/20 blur-xl rounded-full" />
                      <div className="relative bg-secondary/10 p-4 rounded-2xl border border-secondary/20">
                        <Lock className="h-12 w-12 text-secondary" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                      Unlock Premium Features
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                      Upgrade to access your complete reading dashboard,
                      personalized recommendations, and advanced features.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background/50 border border-border/50">
                      <div className="bg-secondary/10 p-3 rounded-full mb-3">
                        <Sparkles className="h-5 w-5 text-secondary" />
                      </div>
                      <h3 className="font-semibold mb-1">
                        Full Library Access
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Browse and read unlimited books
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background/50 border border-border/50">
                      <div className="bg-secondary/10 p-3 rounded-full mb-3">
                        <Zap className="h-5 w-5 text-secondary" />
                      </div>
                      <h3 className="font-semibold mb-1">Smart Tracking</h3>
                      <p className="text-sm text-muted-foreground">
                        Continue reading from where you left off
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background/50 border border-border/50">
                      <div className="bg-secondary/10 p-3 rounded-full mb-3">
                        <Crown className="h-5 w-5 text-secondary" />
                      </div>
                      <h3 className="font-semibold mb-1">Premium Features</h3>
                      <p className="text-sm text-muted-foreground">
                        Get personalized recommendations
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <Link
                      href="/billing"
                      className="w-full sm:w-auto px-8 py-3 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                      <Crown className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span>Upgrade to Premium</span>
                    </Link>
                    <Link
                      href="/billing"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      View pricing details →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <ContinueReading />
              <BrowseBooks />
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
