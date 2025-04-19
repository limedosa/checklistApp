"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FolderPlus, Clock, Share2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Checklist } from "@/components/checklist-builder"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { fetchChecklists as fetchChecklistsFromApi } from "@/lib/api-client"

export default function Dashboard() {
  const { data: session } = useSession()
  const [checklists, setChecklists] = useState<Checklist[]>([])
  const [filteredChecklists, setFilteredChecklists] = useState<Checklist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  // Log session info for debugging
  useEffect(() => {
    console.log("Current session:", session)
  }, [session])

  useEffect(() => {
    const loadChecklists = async () => {
      try {
        setIsLoading(true)
        console.log("Fetching checklists for user:", session?.user?.id)
        const data = await fetchChecklistsFromApi()
        console.log('API Response:', data)
        
        // Handle different possible response formats
        let checklistArray: Checklist[] = []
        if (Array.isArray(data)) {
          checklistArray = data
        } else if (data && typeof data === 'object') {
          if (Array.isArray(data.checklists)) {
            checklistArray = data.checklists
          } else if (data.checklists && typeof data.checklists === 'object') {
            // If checklists is an object with ID keys
            checklistArray = Object.values(data.checklists)
          }
        }

        setChecklists(checklistArray)
        setFilteredChecklists(checklistArray)
      } catch (error) {
        console.error("Failed to fetch checklists:", error)
        // Handle unauthorized errors appropriately
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          toast({
            title: "Authentication Error",
            description: "Please sign in to view your checklists",
            variant: "destructive",
          })
          // Redirect to login if needed
          router.push('/login')
        } else {
          toast({
            title: "Error",
            description: "Failed to load checklists",
            variant: "destructive",
          })
        }
        setChecklists([])
        setFilteredChecklists([])
      } finally {
        setIsLoading(false)
      }
    }

    if (session?.user) {
      loadChecklists()
    }
  }, [session, toast, router])

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
                <div key={checklist.id} className="border rounded-md p-4">
                  <h3 className="font-bold">{checklist.name}</h3>
                  <p className="text-sm text-gray-500">
                    {checklist.categories.length} categories, 
                    {checklist.categories.reduce((acc, category) => acc + category.items.length, 0)} items
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/checklist/${checklist.id}`)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShare(checklist.id)}
                    >
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
