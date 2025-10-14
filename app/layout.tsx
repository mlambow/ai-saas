import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";

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
    <html lang="en">
      <body
        className={`${poppinsSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
