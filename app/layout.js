import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppSideBar from "@/components/AppSideBar";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RenderMounted } from "@/components/RenderMounted";
import ClientWrapper from "@/components/ClientWrapper";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Watheta Ecommerce",
  description: "Watheta Ecommerce",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <RenderMounted>
          <ClientWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider
                style={{
                  "--sidebar-width": "12rem",
                  "--sidebar-width-mobile": "20rem",
                }}
              >
                <AppSideBar />

                <main className="w-full bg-[#F5F7FA] dark:bg-black">
                  <NavBar />
                  <div className="px-4 py-2">{children}</div>
                </main>
              </SidebarProvider>
            </ThemeProvider>
          </ClientWrapper>
        </RenderMounted>

        <Toaster />
      </body>
    </html>
  );
}
