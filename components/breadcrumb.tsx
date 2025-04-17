"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumb() {
  const pathname = usePathname()

  if (pathname === "/") return null

  const pathSegments = pathname.split("/").filter(Boolean)

  // Create breadcrumb items with proper labels
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`

    // Format the segment for display
    let label = segment.charAt(0).toUpperCase() + segment.slice(1)

    // Replace hyphens with spaces and format
    label = label.replace(/-/g, " ")

    // Special case for IDs
    if (segment.match(/^[0-9]+$/) || segment.startsWith("cloned-")) {
      label = "Checklist Details"
    }

    return { href, label }
  })

  return (
    <nav className="flex items-center text-sm text-muted-foreground py-2">
      <ol className="flex items-center space-x-1">
        <li>
          <Link href="/" className="flex items-center hover:text-foreground">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            {index === breadcrumbItems.length - 1 ? (
              <span className="font-medium text-foreground">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
