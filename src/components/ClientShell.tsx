"use client";

import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import Providers from "./Providers";

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Providers>
        <Header />
        <main className="pt-[var(--spacing-header)]">{children}</main>
      </Providers>
    </ThemeProvider>
  );
}
