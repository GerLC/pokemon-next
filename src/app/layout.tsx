import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ClientShell } from "@/components/ClientShell";
import "./globals.scss";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pokédex — Gotta Catch 'Em All!",
    template: "%s | Pokédex",
  },
  description:
    "Explore every Pokémon, learn their types, and discover your next favorite buddy!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <body className="font-sans min-h-screen">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
