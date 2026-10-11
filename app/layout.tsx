import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'تروپیسم | فضایی برای رشد و آرامش',
  description: 'رزرو جلسه روان‌درمانی و مشاوره با همراهی متخصصان سلامت روان در تروپیسم.',
  applicationName: 'Tropism',
  keywords: ['تروپیسم', 'روان‌درمانی', 'رزرو تراپی', 'مشاوره آنلاین', 'سلامت روان'],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f8f8f4',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
