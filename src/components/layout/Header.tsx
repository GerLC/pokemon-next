"use client";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-surface/80 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/pokeball.webp"
            alt="Pokédex"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-xs font-bold tracking-widest uppercase text-on-surface-muted group-hover:text-primary transition-colors">
            Pokédex
          </span>
        </Link>

        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-overlay transition-colors cursor-pointer"
          type="button"
          aria-label="Toggle theme"
        >
          <Sun className="hidden dark:block w-4 h-4 text-accent" />
          <Moon className="block dark:hidden w-4 h-4 text-primary" />
        </button>
      </div>
    </header>
  );
}
