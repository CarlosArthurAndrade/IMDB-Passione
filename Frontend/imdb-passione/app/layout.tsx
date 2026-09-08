import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "IMDB Passione",
  description: "Site de reviews de filmes da Passione Enterprises",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full dark" style={{colorScheme: "dark" }}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
