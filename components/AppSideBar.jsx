"use client";

import { useState } from "react";
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
import Image from "next/image";

export default function AppSideBar() {
  const [openIndex, setOpenIndex] = useState([]);
  const { state } = useSidebar();

  const toggleOpen = (index) => {
    setOpenIndex((prev) =>
      prev?.includes(index)
        ? prev.filter((item) => item !== index)
        : prev.push(index)
    );
  };

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

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => {
                const isOpen = openIndex.includes(index);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => toggleOpen(index)}
                      className="w-full justify-between text-sm font-medium p-2 rounded-md hover:bg-accent transition"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          {item.icon}

                          {state === "expanded" && <span>{item.title}</span>}
                        </div>

                        {item.subItems && state === "expanded" && (
                          <div
                            className={`transition-transform duration-300 ${
                              isOpen ? "rotate-90" : "rotate-0"
                            }`}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </SidebarMenuButton>

                    {state === "expanded" && (
                      <div
                        className={`overflow-hidden transition-[max-height] duration-300 ${
                          isOpen ? "max-h-40" : "max-h-0"
                        }`}
                      >
                        {isOpen && item.subItems && (
                          <div className="mt-1 flex flex-col gap-1">
                            {item.subItems.map((sub) => (
                              <Link
                                href={sub.to}
                                key={sub.title}
                                className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-accent transition"
                              >
                                {sub.icon}
                                <span>{sub.title}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </SidebarMenuItem>
                );
              })}
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
