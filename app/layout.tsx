import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'تروپیسم | یک قدم نزدیک‌تر به خودت',
  description: 'فضایی امن برای شناختن خودت؛ مسیرهای مشاوره، راهنمای شروع و یادداشت‌هایی برای حال بهتر در تروپیسم.',
  applicationName: 'Tropism',
  keywords: ['تروپیسم', 'روان‌درمانی', 'رزرو تراپی', 'مشاوره آنلاین', 'سلامت روان'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'تروپیسم | یک قدم نزدیک‌تر به خودت',
    description: 'فضایی امن برای رشد، خودشناسی و همراهی حرفه‌ای.',
    siteName: 'تروپیسم',
    locale: 'fa_IR',
    type: 'website',
  },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f8f7f2',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
