import * as React from "react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export async function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error("Error fetching auth user:", authError.message);
  }

  let profile = null;

  if (user) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error retrieving user from Supabase!", error.message);
    } else {
      profile = data;
    }
  }

  const currentPlan = profile?.plan ?? "Free";

  const userr = {
    name: user?.user_metadata?.name ?? "",
    email: user?.email ?? "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Image
              src={"/logo.png"}
              alt="logo image"
              height={20}
              width={20}
              className="h-6 w-6"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">FluentsRead</span>
            <span className="truncate text-xs">{currentPlan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userr} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
