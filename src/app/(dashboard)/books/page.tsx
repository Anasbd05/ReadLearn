import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Crown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import BrowseBooks from "@/components/dashboard/BrowseBooks";

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

            {/* Language Selection */}
            <div className="flex items-center gap-3 ml-2">
              {/* Known Language */}
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

          <Link
            href={"/billing"}
            className="py-1.5 px-5 mx-4 bg-secondary hover:opacity-80 flex items-center font-medium gap-2 text-white rounded-md"
          >
            <Crown className="h-4 w-4 font-medium" />
            <span>Upgrade</span>
          </Link>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <BrowseBooks />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
