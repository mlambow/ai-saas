import React from "react";
import Navbar from "@/components/Navbar";
import {Toaster} from "sonner";

export default function HomeLayout({children}: Readonly<{children: React.ReactNode; }>) {
    return (
      <main>
          <Navbar />
          {children}
          <Toaster />
      </main>
    )
};