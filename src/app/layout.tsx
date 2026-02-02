import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/providers/shared";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: " Exam App",
  description: "Smart Exam platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${inter.className} ${geistMono.variable} ${geistMono.className} antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <Provider>{children} <Toaster /></Provider>
      </body>
    </html>
  );
}