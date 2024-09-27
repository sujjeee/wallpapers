import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Inter } from "next/font/google"
import { Disclaimer } from "@/components/disclaimer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Free Wallpapers",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <div className="fixed bottom-1 right-2 z-50 sm:bottom-2 sm:right-4">
          <Disclaimer />
        </div>
      </body>
    </html>
  )
}
