"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FolderPlus, Clock, Share2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Checklist } from "@/components/checklist-builder"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

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
      {
        id: "cat-2",
        name: "Setup",
        items: [
          { id: "item-3", name: "Development Environment", files: [] },
          { id: "item-4", name: "Access Credentials", files: [] },
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

export default function Dashboard() {
  const [checklists, setChecklists] = useState<Checklist[]>([])
  const [filteredChecklists, setFilteredChecklists] = useState<Checklist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, this would be an API call to fetch user's checklists
    const fetchChecklists = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
        setChecklists(mockChecklists)
        setFilteredChecklists(mockChecklists)
      } catch (error) {
        console.error("Failed to fetch checklists:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChecklists()
  }, [])

  // Filter checklists based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredChecklists(checklists)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = checklists.filter(
        (checklist) =>
          checklist.name.toLowerCase().includes(query) ||
          checklist.categories.some(
            (category) =>
              category.name.toLowerCase().includes(query) ||
              category.items.some((item) => item.name.toLowerCase().includes(query)),
          ),
      )
      setFilteredChecklists(filtered)
    }
  }, [searchQuery, checklists])

  const handleCreateNew = () => {
    // In a real app, this would create a new checklist via API
    // For this demo, we'll just redirect to a new checklist page
    router.push("/checklist/new")
  }

  const handleShare = (checklistId: string) => {
    // In a real app, this would open a share dialog or generate a share link
    toast({
      title: "Share Link Generated",
      description: `Share link for checklist ${checklistId} copied to clipboard`,
    })

    // Mock copying to clipboard
    navigator.clipboard
      .writeText(`https://checklist-builder.app/shared/${checklistId}`)
      .then(() => {
        console.log("Share link copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy share link: ", err)
      })
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">My Checklists</h1>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search checklists..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleCreateNew} className="gap-2 whitespace-nowrap">
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-muted rounded"></div>
              </CardContent>
              <CardFooter>
                <div className="h-9 bg-muted rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {filteredChecklists.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                {searchQuery ? (
                  <>
                    <Search className="h-12 w-12 text-muted-foreground" />
                    <h3 className="text-xl font-medium">No matching checklists</h3>
                    <p className="text-muted-foreground">Try a different search term or create a new checklist</p>
                  </>
                ) : (
                  <>
                    <FolderPlus className="h-12 w-12 text-muted-foreground" />
                    <h3 className="text-xl font-medium">No checklists yet</h3>
                    <p className="text-muted-foreground">Create your first checklist to get started</p>
                  </>
                )}
                <Button onClick={handleCreateNew} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Checklist
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChecklists.map((checklist) => (
                <ChecklistCard key={checklist.id} checklist={checklist} onShare={handleShare} />
              ))}
              <CreateNewCard onClick={handleCreateNew} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

function ChecklistCard({ checklist, onShare }: { checklist: Checklist; onShare: (id: string) => void }) {
  const totalItems = checklist.categories.reduce((sum, category) => sum + category.items.length, 0)

  return (
    <Card className="overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="truncate">{checklist.name}</CardTitle>
        <CardDescription>
          {checklist.categories.length} categories • {totalItems} items
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          {checklist.categories.slice(0, 2).map((category) => (
            <div key={category.id} className="text-sm">
              <span className="font-medium">{category.name}:</span>{" "}
              <span className="text-muted-foreground">
                {category.items
                  .slice(0, 2)
                  .map((item) => item.name)
                  .join(", ")}
                {category.items.length > 2 && ", ..."}
              </span>
            </div>
          ))}
          {checklist.categories.length > 2 && <div className="text-sm text-muted-foreground">...</div>}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 pt-3">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center text-xs text-muted-foreground gap-2">
            <Clock className="h-3 w-3" />
            <span>Updated 2 days ago</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => onShare(checklist.id)}>
              <Share2 className="h-3.5 w-3.5" />
              Share
            </Button>
            <Button asChild>
              <Link href={`/checklist/${checklist.id}`}>Open</Link>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

function CreateNewCard({ onClick }: { onClick: () => void }) {
  return (
    <Card
      className="flex flex-col items-center justify-center p-6 h-full border-dashed cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="p-3 rounded-full bg-primary/10">
          <Plus className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-medium">Create New Checklist</h3>
        <p className="text-sm text-muted-foreground">Start from scratch or use a template</p>
      </div>
    </Card>
  )
}
