"use client";

import { ListCollapse, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";

export default function NavBar() {
  const { theme, setTheme } = useTheme();

  const navStyle = {
    backgroundColor: theme === "dark" ? "#171717" : "#fafafa",
    transition: "background-color 0.3s",
    borderBottom: "1px solid var(--border)",
  };
  return (
    <nav
      className="flex items-center justify-between px-4 h-[49px]"
      style={navStyle}
    >
      <SidebarTrigger />
      <div className="flex gap-4">
        {theme === "dark" ? (
          <Sun onClick={() => setTheme("light")} />
        ) : (
          <Moon onClick={() => setTheme("dark")} />
        )}
      </div>
    </nav>
  );
}
