import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Mahalaxmi Infra",
  description: "Mahalaxmi  Infra - NMRDA & RL Residential Plotted Project",
  generator: "v0.app",
  icons: "/Mahalaxmi Infra new Logo.png",
  keywords: [
    // Brand Keywords
    "Mahalaxmi Infra",
    "Mahalaxmi Infra Nagpur",
    "Mahalaxmi Infra projects",
    "Mahalaxmi Infra projects Nagpur",
    "Mahalaxmi Infra property",
    "Mahalaxmi Infra plots",
    "Mahalaxmi Infra plots for sale",
    "Mahalaxmi Infra residential plots",
    "Mahalaxmi Infra commercial property",
    "Mahalaxmi Infra investment project",
    "Mahalaxmi Infra new project",
    "Mahalaxmi Infra price list",
    "Mahalaxmi Infra booking",
    "Mahalaxmi Infra contact number",
    "Mahalaxmi Infra reviews",

    // Mahalaxmi Nagar
    "Mahalaxmi Nagar Nagpur",
    "Mahalaxmi Nagar plots Nagpur",
    "Mahalaxmi Nagar plots for sale",
    "Mahalaxmi Nagar residential plots",
    "Mahalaxmi Nagar 45",
    "Mahalaxmi Nagar 49",
    "Mahalaxmi Nagar 49 Nagpur",
    "Mahalaxmi Nagar near AIIMS Nagpur",

    // MIHAN / Wardha Road / Hingna
    "plots for sale in MIHAN Nagpur",
    "MIHAN Nagpur plots for sale",
    "Plot for sale in MIHAN Nagpur",
    "Mahalaxmi Infra MIHAN Nagpur",
    "Mahalaxmi plots near MIHAN",
    "residential plots near AIIMS Nagpur",
    "Mahalaxmi Infra near AIIMS Nagpur",
    "plots in Wardha Road Nagpur",
    "Wardha Road Nagpur property",
    "Flat for sale in Wardha Road Nagpur",
    "Mahalaxmi Infra Wardha Road",
    "Property in Hingna Nagpur",
    "Hingna Nagpur plots",
    "Property for sale in Hingna Nagpur",
    "Mahalaxmi Infra Hingna Road",
    "Mahalaxmi Infra Sumthana",
    "Sumthana MIHAN plot",

    // Nagpur General Property
    "Nagpur property",
    "Nagpur real estate",
    "Nagpur property for sale",
    "Property for sale in Nagpur",
    "Buy property in Nagpur",
    "Sell property in Nagpur",
    "Nagpur property listings",
    "Nagpur property agents",
    "Nagpur real estate agents",
    "Nagpur property for sale by owner",

    // Plots Keywords
    "Nagpur plots for sale",
    "Plot for sale in Nagpur",
    "Buy plot in Nagpur",
    "Sell plot in Nagpur",
    "Residential plots in Nagpur",
    "Commercial plots in Nagpur",
    "Investment plots in Nagpur",
    "Affordable plots in Nagpur",
    "Best plots in Nagpur",
    "Ready to register plots Nagpur",
    "NMRDA RL approved plots Nagpur",
    "Government sanctioned layout Nagpur",
    "Clear title plots in Nagpur",
    "Clear title plot in Nagpur",
    "Bank loan available plots Nagpur",

    // Flats & Apartments
    "Nagpur flats for sale",
    "Flats for sale in Nagpur",
    "Nagpur apartments",
    "2 BHK flats in Nagpur",
    "Affordable flats in Nagpur",
    "Luxury flats in Nagpur",
    "Budget flats in Nagpur",
    "Ready to move flats Nagpur",
    "Manish Nagar flats",
    "House for sale in Nagpur",
    "House for sale in Manish Nagar Nagpur",

    // Commercial
    "Commercial property in Nagpur",
    "Commercial property for sale in Nagpur",

    // Other Locations
    "Plots in Kamptee Nagpur",
    "Kamptee Road property",
    "Best property deals in Nagpur",
    "Investment property in Nagpur",
    "Cheap property in Nagpur",
    "Budget homes Nagpur"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TCG77MQD');` }} />
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
