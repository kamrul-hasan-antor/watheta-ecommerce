"use client";

import { ListCollapse, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";

export default function NavBar() {
  const { setTheme } = useTheme();
  return (
    <nav className="flex justify-between px-4">
      <SidebarTrigger />
      <div className="flex gap-4">
        <Moon onClick={() => setTheme("dark")} />

        <Sun onClick={() => setTheme("light")} />
      </div>
    </nav>
  );
}
