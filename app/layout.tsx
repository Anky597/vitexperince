import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import CookieConsent from "./components/CookieConsent"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "VIT Interview Experiences",
  description: "Share and access interview experiences for VIT University students",
  // Removed the icons property that referenced favicon.ico
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen bg-background text-foreground`}>
        <Header />
        <main className="flex-grow pt-16 min-h-screen">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}

