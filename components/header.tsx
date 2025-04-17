"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserDropdown } from "@/components/user-dropdown"
import { Search } from "@/components/search"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in by looking for the user cookie
    const hasUserCookie = document.cookie.split(";").some((item) => item.trim().startsWith("user="))
    setIsLoggedIn(hasUserCookie)
  }, [])

  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <div className="container mx-auto py-3 px-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          Checklist Builder
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isLoggedIn && <Search />}

          {isLoggedIn ? (
            <UserDropdown />
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
