"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { UserDropdown } from "@/components/user-dropdown"
import { Search } from "@/components/search"
import { useSession } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()
  const isLoggedIn = !!session
  const router = useRouter()

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
