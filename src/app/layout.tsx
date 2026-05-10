import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dev-dalia.com"),
  title: "Dev Dalia · AI Engineer",
  description:
    "AI engineer. I build things with LLMs and write about what I learn.",
  openGraph: {
    title: "Dev Dalia · AI Engineer",
    description:
      "AI engineer. I build things with LLMs and write about what I learn.",
    type: "website",
    url: "https://dev-dalia.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Dalia · AI Engineer",
    description:
      "AI engineer. I build things with LLMs and write about what I learn.",
    creator: "@devcodes9",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plexMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
