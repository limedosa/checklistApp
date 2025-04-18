import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Breadcrumb } from "@/components/breadcrumb"
import { AuthProvider } from "@/components/providers/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Custom Checklist Builder",
  description: "Create, organize, and share customizable checklists",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            <div className="container mx-auto px-4">
              <Breadcrumb />
            </div>
            <main className="min-h-[calc(100vh-57px)]">{children}</main>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'