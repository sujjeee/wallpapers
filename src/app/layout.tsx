import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Disclaimer } from "@/components/disclaimer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Panels Wallpapers",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container max-w-screen-xl">{children}</main>
        <div className="fixed bottom-1 right-2 z-50 sm:bottom-2 sm:right-4">
          <Disclaimer />
        </div>
      </body>
    </html>
  )
}
