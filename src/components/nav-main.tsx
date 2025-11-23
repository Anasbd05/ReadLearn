"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Bookmark, Sparkles, TextInitial } from "lucide-react";

export function NavMain() {
  const pathname = usePathname();

  const items = [
    {
      title: "Browse Books",
      url: "/books",
      icon: Book,
    },
    {
      title: "Personal Library",
      url: "/personal-library",
      icon: TextInitial,
    },
    {
      title: "Ai Creator",
      url: "/ai-creator",
      icon: Sparkles,
    },
    {
      title: "My Vocabulary",
      url: "/vocabulary",
      icon: Bookmark,
    },
  ];

  return (
    <SidebarGroup className="mt-5">
      <SidebarMenu className="flex flex-col gap-2">
        {" "}
        {items.map((item) => (
          <Link
            href={item.url}
            key={item.title}
            className={`rounded-none ${
              pathname === item.url
                ? "text-black bg-gray-200 font-medium"
                : "text-black"
            } `}
          >
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span className=" font-medium text-black ">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
