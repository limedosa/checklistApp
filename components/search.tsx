"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon, X } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Checklist } from "@/components/checklist-builder"
import { Card } from "@/components/ui/card"

// Mock data for demonstration
const mockChecklists: Checklist[] = [
  {
    id: "1",
    name: "Project Onboarding",
    categories: [
      {
        id: "cat-1",
        name: "Documentation",
        items: [
          { id: "item-1", name: "Project Brief", files: [] },
          { id: "item-2", name: "Technical Requirements", files: [] },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Client Approval Process",
    categories: [
      {
        id: "cat-3",
        name: "Design",
        items: [
          { id: "item-5", name: "Mockups", files: [] },
          { id: "item-6", name: "Style Guide", files: [] },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Weekly Team Checklist",
    categories: [
      {
        id: "cat-4",
        name: "Meetings",
        items: [
          { id: "item-7", name: "Sprint Planning", files: [] },
          { id: "item-8", name: "Retrospective", files: [] },
        ],
      },
    ],
  },
]

export function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Checklist[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Handle search query changes
  useEffect(() => {
    if (query.length > 0) {
      // Filter checklists based on query
      const filtered = mockChecklists.filter(
        (checklist) =>
          checklist.name.toLowerCase().includes(query.toLowerCase()) ||
          checklist.categories.some(
            (category) =>
              category.name.toLowerCase().includes(query.toLowerCase()) ||
              category.items.some((item) => item.name.toLowerCase().includes(query.toLowerCase())),
          ),
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  // Handle clicks outside of search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Focus input when search is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSearchClick = () => {
    setIsOpen(true)
  }

  const handleClearSearch = () => {
    setQuery("")
    inputRef.current?.focus()
  }

  const handleResultClick = (id: string) => {
    setIsOpen(false)
    setQuery("")
    router.push(`/checklist/${id}`)
  }

  return (
    <div className="relative" ref={searchRef}>
      <Button variant="outline" size="icon" className="h-9 w-9 md:h-8 md:w-8" onClick={handleSearchClick}>
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 z-50">
          <Card className="p-2">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  placeholder="Search checklists..."
                  className="pl-8 pr-8"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full w-8 p-0"
                    onClick={handleClearSearch}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear</span>
                  </Button>
                )}
              </div>
            </div>

            {query && (
              <div className="mt-2 max-h-80 overflow-auto">
                {results.length > 0 ? (
                  <ul className="space-y-1">
                    {results.map((checklist) => (
                      <li key={checklist.id}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left"
                          onClick={() => handleResultClick(checklist.id)}
                        >
                          {checklist.name}
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-2 text-center text-sm text-muted-foreground">No checklists found</p>
                )}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
