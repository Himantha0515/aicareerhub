import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundFX from "@/components/BackgroundFX";
import PageTransition from "@/components/PageTransition";
import BackButton from "@/components/BackButton";
import SiteAnalytics from "@/components/SiteAnalytics";
import { AuthProvider } from "@/contexts/AuthContext";
import { SITE } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  alternates: {
    canonical: SITE.url,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/icon", type: "image/png" }],
  },
  openGraph: {
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
    url: SITE.url,
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
};

/* Light-only product — clear any old dark preference before paint. */
const lightOnlyScript = `
try {
  localStorage.removeItem('theme');
  document.documentElement.dataset.theme = 'light';
  document.documentElement.style.colorScheme = 'light';
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" data-theme="light" style={{ colorScheme: "light" }}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: lightOnlyScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <AuthProvider>
          <PageTransition />
          <BackgroundFX />
          <Header />
          <BackButton />
          <main className="w-full min-w-0 max-w-full flex-1 overflow-x-clip">
            {children}
          </main>
          <Footer />
          <SiteAnalytics />
        </AuthProvider>
      </body>
    </html>
  );
}
