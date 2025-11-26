import { AppSidebar } from "@/components/app-sidebar";
import BillingCards from "@/components/dashboard/BillingCards";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing – FluencyWave",
  description:
    "Manage your FluencyWave subscription, payment methods, invoices, and billing preferences.",
  keywords: [
    "FluencyWave billing",
    "subscription management",
    "payment settings",
    "invoice history",
    "upgrade plan",
  ],
  openGraph: {
    title: "Billing – FluencyWave",
    description:
      "View and manage your billing details, subscription plan, and payment methods on FluencyWave.",
    url: "https://fluencywave.com/billing",
    type: "website",
    siteName: "Fluencywave",
  },
  twitter: {
    card: "summary_large_image",
    title: "Billing – Fluencywave",
    description:
      "Manage your subscription and view billing details on FluencyWave.",
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
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <BillingCards />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
