import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IA5 - Kates Next HUB Portal",
  description: "Portal unificat per als tres exercicis de la pràctica IA5 de Next.js i Express REST API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca">
      <body className="antialiased min-h-screen bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  );
}
