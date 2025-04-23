import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "@/components/Providers/ConvexClerkProvider";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/Providers/theme-provider";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitAI - Seigha Rufus",
  description: "A modern fitness ai platform for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > 
            <SignedIn>
              <div className="min-h-screen">
                <Navbar/>
                <main className="px-4 sm:px-6 lg:px-8">
                  {children}  
                </main>
              </div>
            </SignedIn>
            
            <SignedOut>
              <RedirectToSignIn/>
            </SignedOut>
          </ThemeProvider>
          <Toaster/>  
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
