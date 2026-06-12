import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Mind Core — Software studio building the future",
  description:
    "Mind Core designs and engineers digital products, AI systems, web applications, and automation — with the craft of the companies you wish had built your software.",
  openGraph: {
    title: "Mind Core — Software studio building the future",
    description:
      "Digital products, AI systems, and automation, built five years early.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="grain bg-void font-body text-frost">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-frost focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-void"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
