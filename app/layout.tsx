import type { Metadata } from "next";
import { Fraunces, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["300", "400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

const SITE_URL = "https://ninnescafe.com";
const SITE_NAME = "Ninnes Cafe & Restaurant";
const SITE_DESCRIPTION =
  "Ninnes Cafe & Restaurant — house-roasted coffee, all-day breakfast, and desserts baked fresh each morning. Dine in or scan to order at your table.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&h=630&auto=format&fit=crop";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Coffee, Breakfast & Desserts`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Ninnes Cafe",
    "Ninnes Restaurant",
    "cafe",
    "restaurant",
    "specialty coffee",
    "breakfast",
    "desserts",
    "pastries",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Coffee, Breakfast & Desserts`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `The dining room at ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Coffee, Breakfast & Desserts`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/** Schema.org Restaurant markup — mirrors the address, hours and contact
 *  details rendered in the Contact, Hours and Footer sections. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: OG_IMAGE,
  servesCuisine: ["Coffee", "Breakfast", "Desserts"],
  priceRange: "$$",
  telephone: "+358 9 3456 7890",
  email: "hello@ninnescafe.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tapiola",
    addressLocality: "Espoo",
    addressRegion: "Uusimaa",
    postalCode: "02100",
    addressCountry: "FI",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Thursday", "Friday"],
      opens: "07:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "08:00",
      closes: "16:00",
    },
  ],
  hasMenu: `${SITE_URL}/menu`,
  acceptsReservations: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable} ${plexMono.variable}`}>
      <head>
        <meta name="theme-color" content="#FFF8F2" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
