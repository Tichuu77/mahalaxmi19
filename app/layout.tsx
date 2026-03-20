import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
})

const BASE_URL = "https://www.mm.mahalaxmiinfra.com"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mahalaxmi Infra – NMRDA & RERA Approved Plots in Nagpur | Starting ₹22L",
    template: "%s | Mahalaxmi Infra Nagpur",
  },
  description:
    "Buy NMRDA sanctioned, RERA approved residential plots in Nagpur. Mahalaxmi Infra offers 70+ completed projects, 17,000+ happy families. Plots near MIHAN, Wardha Road, Hingna. Starting ₹22 Lakh. Bank loan available.",
  generator: "Next.js",
  applicationName: "Mahalaxmi Infra",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Mahalaxmi Infra", url: BASE_URL }],
  creator: "Mahalaxmi Infra",
  publisher: "Mahalaxmi Infra",
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: "/Mahalaxmi Infra new Logo.png",
    apple: "/Mahalaxmi Infra new Logo.png",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Mahalaxmi Infra",
    title: "Mahalaxmi Infra – NMRDA & RERA Approved Plots in Nagpur",
    description:
      "70+ completed projects, 17,000+ happy families. Buy NMRDA sanctioned plots near MIHAN, Wardha Road & Hingna starting ₹22 Lakh. 100% RERA Approved.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mahalaxmi Infra – Premium Residential Plots in Nagpur",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahalaxmi Infra – RERA Approved Plots in Nagpur",
    description:
      "Buy premium NMRDA sanctioned plots in Nagpur. 70+ projects, starting ₹22L. Bank loan available.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "Mahalaxmi Infra",
    "Mahalaxmi Infra Nagpur",
    "Mahalaxmi Infra plots",
    "Mahalaxmi Nagar Nagpur",
    "Mahalaxmi Nagar 45",
    "Mahalaxmi Nagar 49 Nagpur",
    "Mahalaxmi Nagar near AIIMS Nagpur",
    "plots for sale in MIHAN Nagpur",
    "MIHAN Nagpur plots for sale",
    "residential plots near AIIMS Nagpur",
    "plots in Wardha Road Nagpur",
    "Property in Hingna Nagpur",
    "Mahalaxmi Infra Sumthana",
    "Nagpur property",
    "Nagpur real estate",
    "Nagpur plots for sale",
    "Plot for sale in Nagpur",
    "Buy plot in Nagpur",
    "Residential plots in Nagpur",
    "NMRDA RL approved plots Nagpur",
    "RERA approved plots Nagpur",
    "Government sanctioned layout Nagpur",
    "Clear title plots in Nagpur",
    "Bank loan available plots Nagpur",
    "Affordable plots in Nagpur",
    "Best plots in Nagpur",
    "Ready to register plots Nagpur",
    "Nagpur flats for sale",
    "2 BHK flats in Nagpur",
    "Affordable flats in Nagpur",
    "House for sale in Nagpur",
    "House for sale in Manish Nagar Nagpur",
    "Commercial property in Nagpur",
    "Plots in Kamptee Nagpur",
    "Kamptee Road property",
    "Investment property in Nagpur",
    "Budget homes Nagpur",
  ],
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${BASE_URL}/#organization`,
      name: "Mahalaxmi Infra",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/Mahalaxmi Infra new Logo.png`,
      },
      description:
        "NMRDA sanctioned and RERA approved residential plots in Nagpur with 70+ completed projects and 17,000+ happy families.",
      telephone: "+919970501128",
      email: "manoj.mungale@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nagpur",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      areaServed: {
        "@type": "City",
        name: "Nagpur",
      },
      sameAs: [],
      numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
      foundingDate: "2012",
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Mahalaxmi Infra",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "Mahalaxmi Infra – NMRDA & RERA Approved Plots in Nagpur",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      description:
        "Buy NMRDA sanctioned, RERA approved residential plots in Nagpur starting ₹22 Lakh.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE_URL }],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What types of properties does Mahalaxmi Infra offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mahalaxmi Infra offers NMRDA sanctioned and RERA approved residential and commercial plots in prime locations across Nagpur, including Besa, Beltarodi, Shankarpur, Wardha Road, and more.",
          },
        },
        {
          "@type": "Question",
          name: "What is the starting price for plots?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Plots start from ₹22 Lakh onwards, depending on location and size. Flexible payment plans and bank loan facilities are available.",
          },
        },
        {
          "@type": "Question",
          name: "Are Mahalaxmi Infra projects RERA approved?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all projects are 100% RERA approved (MAHA RERA NO. A50500044725) and NMRDA sanctioned with complete legal compliance.",
          },
        },
        {
          "@type": "Question",
          name: "Is bank loan available for Mahalaxmi Infra plots?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, bank loans up to 90% financing are available. Our team helps you choose the best financing option.",
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TCG77MQD');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Nagpur" />
        <meta name="geo.position" content="21.1458;79.0882" />
        <meta name="ICBM" content="21.1458, 79.0882" />
      </head>
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TCG77MQD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  )
}