import type { Metadata, Viewport } from "next";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";

const display = Cairo({
  subsets: ["arabic"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-body",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "مايند كور — استوديو برمجيات يبني المستقبل",
  description:
    "مايند كور يصمم ويهندس المنتجات الرقمية، وأنظمة الذكاء الاصطناعي، وتطبيقات الويب، والأتمتة — ببراعة الشركات التي تتمنى أنها بنت برمجياتك.",
  openGraph: {
    title: "مايند كور — استوديو برمجيات يبني المستقبل",
    description: "منتجات رقمية، وأنظمة ذكاء اصطناعي، وأتمتة، مبنية قبل خمس سنوات.",
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
    <html lang="ar" dir="rtl" className={`${display.variable} ${body.variable}`}>
      <body className="grain bg-void font-body text-frost">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-frost focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-void"
        >
          تخطي إلى المحتوى
        </a>
        {children}
      </body>
    </html>
  );
}
