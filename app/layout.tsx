import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import {Providers} from "@/components/Providers";

const poppinsSans = Poppins({
    variable: "--font-poppins-sans",
    subsets: ["latin"],
    weight: "100"
})

export const metadata: Metadata = {
  title: "AI Job Ready",
  description: "Be ready for your big day with our AI interviewers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppinsSans.variable} antialiased`}
      >
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  );
}
