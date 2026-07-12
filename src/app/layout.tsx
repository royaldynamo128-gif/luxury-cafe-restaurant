import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "L'Étoile Dorée — Luxury French-Italian Bistro & Cafe",
    template: "%s | L'Étoile Dorée"
  },
  description: "Experience gastronomy elevated and atmosphere perfected at L'Étoile Dorée. Indulge in classic French-Italian fusion culinary art and specialty coffee in Paris.",
  metadataBase: new URL("https://test.jgcjgjg.shop"),
  openGraph: {
    title: "L'Étoile Dorée | Luxury French-Italian Bistro & Cafe",
    description: "Experience gastronomy elevated and atmosphere perfected at L'Étoile Dorée.",
    url: "https://test.jgcjgjg.shop",
    siteName: "L'Étoile Dorée",
    locale: "en_US",
    type: "website"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} antialiased`}
    >
      <body className="bg-background text-foreground font-sans grain">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
