import './globals.css';
import React from 'react';
import Script from 'next/script';
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from '@/components/common/Navigation';
import { Footer } from '@/components/common/Footer';

const GA_MEASUREMENT_ID = 'G-2FX7BTVKDE';
const SITE_URL = 'https://seoksanghwan-portfolio.vercel.app';

export const metadata: Metadata = {
  title: "석상환 | 프론트엔드 개발자 포트폴리오",
  description: "프론트엔드 개발자 석상환의 포트폴리오입니다.",
  openGraph: {
    title: "석상환 | 프론트엔드 개발자 포트폴리오",
    description: "프론트엔드 개발자 석상환의 포트폴리오입니다.",
    type: "website",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/images/realme.png`, width: 1200, height: 630, alt: "석상환 포트폴리오" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Navigation />
        <main className="min-h-[calc(100dvh-131px)] max-h-full">{children}</main>
        <Analytics/>
        <Footer />
      </body>
    </html>
  );
}
