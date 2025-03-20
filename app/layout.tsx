import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SonnerProvider } from "@/components/sonner-provider"
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Availi - Find the Perfect Meeting Time",
  description: "A modern meeting scheduler that helps you find the best time to meet with everyone.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light">
          {children}
          <SonnerProvider />
        </ThemeProvider>
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-XQRZ5FR5X7" />
    </html>
  )
}



import './globals.css'