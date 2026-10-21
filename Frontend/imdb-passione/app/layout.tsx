import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import ThemeProvider from "@/components/utils/themeProvider";

export const metadata: Metadata = {
  title: "IMDB Passione",
  description: "Site de reviews de filmes da Passione Enterprises",
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
