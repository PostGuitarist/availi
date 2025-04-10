import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from "@vercel/analytics/react"
import { ToasterWithTheme } from "@/components/toast-with-theme"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Availi - Find the Perfect Meeting Time",
  description: "A modern meeting scheduler that helps you find the best time to meet with everyone.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID ? process.env.NEXT_PUBLIC_GA_ID : "G-XXXXXXXXXX"

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light">
          {children}
          <ToasterWithTheme />
        </ThemeProvider>
        <Analytics />
      </body>
      <GoogleAnalytics gaId={`${GA_ID}`} />
    </html>
  )
}
