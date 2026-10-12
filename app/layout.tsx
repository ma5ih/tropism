import type { Metadata, Viewport } from "next";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "تروپیسم | مسیری آرام‌تر به سمت حال بهتر",
  description: "در تروپیسم، برای پیدا کردن درمانگر مناسب و شروع مسیر سلامت روان، قدم‌به‌قدم همراه شما هستیم.",
  applicationName: "Tropism",
  keywords: ["تروپیسم", "روان‌درمانی", "مشاوره فردی", "زوج‌درمانی", "سلامت روان"],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "تروپیسم | مسیری آرام‌تر به سمت حال بهتر",
    description: "برای شروع گفت‌وگویی که می‌تواند مسیر را تغییر دهد.",
    locale: "fa_IR",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f7f2"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}