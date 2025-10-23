"use client";

import Link from "next/link";
import { PackageOpen, PlusCircle, List, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";

export default function AppSideBar() {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Image
                  src={"https://watheta.com/images/logo.png"}
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="mx-0" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Collapsible asChild className="group/collapsible">
                    <div>
                      {/* Collapsible trigger */}
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full justify-between text-sm font-medium p-2 rounded-md hover:bg-accent transition">
                          <div className="flex items-center gap-2">
                            {item.icon}
                            {state === "expanded" && <span>{item.title}</span>}
                          </div>
                          {state === "expanded" && (
                            <ChevronRight className="w-4 h-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      {/* Collapsible submenu */}
                      <CollapsibleContent
                        className={`ml-6 space-y-1 overflow-hidden transition-all duration-300 ${
                          state === "collapsed" ? "hidden" : ""
                        }`}
                      >
                        {item.subItems.map((sub) => (
                          <Link
                            href={sub.to}
                            key={sub.title}
                            className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-accent transition"
                          >
                            {sub.icon}
                            {state === "expanded" && <span>{sub.title}</span>}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const items = [
  {
    title: "Products",
    icon: <PackageOpen className="w-4 h-4 shrink-0" />,
    subItems: [
      {
        title: "Product List",
        to: "/dashboard/products",
        icon: <List className="w-4 h-4 shrink-0" />,
      },
      {
        title: "Add Product",
        to: "/dashboard/products/create",
        icon: <PlusCircle className="w-4 h-4 shrink-0" />,
      },
    ],
  },
  {
    title: "Orders",
    icon: <PackageOpen className="w-4 h-4 shrink-0" />,
    subItems: [
      {
        title: "Product List",
        to: "/dashboard/product",
        icon: <List className="w-4 h-4 shrink-0" />,
      },
      {
        title: "Add Product",
        to: "/dashboard/product/create",
        icon: <PlusCircle className="w-4 h-4 shrink-0" />,
      },
    ],
  },
];
