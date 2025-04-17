"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Save, Edit, Copy, Share2, FolderPlus, ArrowLeft } from "lucide-react"
import CategorySection from "@/components/category-section"
import SharedView from "@/components/shared-view"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export type FileItem = {
  id: string
  name: string
  files: File[]
}

export type Category = {
  id: string
  name: string
  items: FileItem[]
}

export type Checklist = {
  id: string
  name: string
  categories: Category[]
  isCloned?: boolean
  clonedFrom?: string
}

// Mock data for demonstration
const mockChecklists: Record<string, Checklist> = {
  "1": {
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
  "2": {
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
  "3": {
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
  "cloned-1": {
    id: "cloned-1",
    name: "Project Onboarding (Copy)",
    categories: [
      {
        id: "cat-1-clone",
        name: "Documentation",
        items: [
          { id: "item-1-clone", name: "Project Brief", files: [] },
          { id: "item-2-clone", name: "Technical Requirements", files: [] },
        ],
      },
      {
        id: "cat-2-clone",
        name: "Setup",
        items: [
          { id: "item-3-clone", name: "Development Environment", files: [] },
          { id: "item-4-clone", name: "Access Credentials", files: [] },
        ],
      },
    ],
    isCloned: true,
    clonedFrom: "1",
  },
}

interface ChecklistBuilderProps {
  id?: string
}

export default function ChecklistBuilder({ id = "new" }: ChecklistBuilderProps) {
  const [checklist, setChecklist] = useState<Checklist>({
    id: id === "new" ? `new-${Date.now()}` : id,
    name: "New Checklist",
    categories: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [newTitle, setNewTitle] = useState(checklist.name)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        // In a real app, this would be an API call to fetch the checklist
        await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate API call

        if (id !== "new" && mockChecklists[id]) {
          setChecklist(mockChecklists[id])
          setNewTitle(mockChecklists[id].name)
        }
      } catch (error) {
        console.error("Failed to fetch checklist:", error)
        toast({
          title: "Error",
          description: "Failed to load checklist",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchChecklist()
  }, [id, toast])

  const addCategory = () => {
    const newCategory: Category = {
      id: `category-${Date.now()}`,
      name: `Category ${checklist.categories.length + 1}`,
      items: [],
    }

    setChecklist({
      ...checklist,
      categories: [...checklist.categories, newCategory],
    })
  }

  const updateCategory = (updatedCategory: Category) => {
    setChecklist({
      ...checklist,
      categories: checklist.categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category,
      ),
    })
  }

  const deleteCategory = (categoryId: string) => {
    setChecklist({
      ...checklist,
      categories: checklist.categories.filter((category) => category.id !== categoryId),
    })
  }

  const handleTitleChange = () => {
    if (newTitle.trim()) {
      setChecklist({
        ...checklist,
        name: newTitle,
      })
    } else {
      setNewTitle(checklist.name)
    }
    setIsEditingTitle(false)
  }

  const saveChecklist = () => {
    // Mock save functionality
    toast({
      title: "Success",
      description: "Checklist saved successfully!",
    })
  }

  const cloneChecklist = () => {
    // Create a deep copy with new IDs
    const clonedChecklist: Checklist = {
      id: `cloned-${Date.now()}`,
      name: `${checklist.name} (Copy)`,
      categories: checklist.categories.map((category) => ({
        id: `${category.id}-clone-${Date.now()}`,
        name: category.name,
        items: category.items.map((item) => ({
          id: `${item.id}-clone-${Date.now()}`,
          name: item.name,
          files: [],
        })),
      })),
      isCloned: true,
      clonedFrom: checklist.id,
    }

    // In a real app, this would be an API call to save the cloned checklist
    toast({
      title: "Success",
      description: "Checklist cloned successfully!",
    })

    // Navigate to the new cloned checklist
    // For demo purposes, we'll just show a success message and redirect to a mock cloned checklist
    setTimeout(() => {
      router.push("/checklist/cloned-1")
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 space-y-6 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="h-10 bg-muted rounded"></div>
        <div className="h-64 bg-muted rounded"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <span className="text-muted-foreground">Back to Dashboard</span>
      </div>

      {checklist.isCloned && (
        <div className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 px-4 py-2 rounded-md flex items-center gap-2">
          <Copy className="h-4 w-4" />
          <span>This is a cloned checklist from "{mockChecklists[checklist.clonedFrom || ""].name}"</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          {isEditingTitle ? (
            <div className="flex items-center gap-2">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="text-xl font-semibold"
                autoFocus
                onBlur={handleTitleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleTitleChange()
                }}
              />
              <Button variant="outline" size="sm" onClick={handleTitleChange}>
                Save
              </Button>
            </div>
          ) : (
            <h2
              className="text-2xl font-semibold cursor-pointer hover:text-blue-600"
              onClick={() => {
                setIsEditingTitle(true)
                setNewTitle(checklist.name)
              }}
            >
              {checklist.name}
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsEditingTitle(true)
              setNewTitle(checklist.name)
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={saveChecklist} className="gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" onClick={cloneChecklist} className="gap-2">
            <Copy className="h-4 w-4" />
            Clone
          </Button>
          <Button variant="secondary" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="edit">Edit Checklist</TabsTrigger>
          <TabsTrigger value="shared">Shared View</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-6">
          <Button onClick={addCategory} className="gap-2">
            <FolderPlus className="h-4 w-4" />
            Add Category
          </Button>

          {checklist.categories.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <FolderPlus className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-xl font-medium">No categories yet</h3>
                <p className="text-muted-foreground">Start by adding a category to your checklist</p>
                <Button onClick={addCategory} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {checklist.categories.map((category) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  onUpdate={updateCategory}
                  onDelete={deleteCategory}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="shared">
          <SharedView checklist={checklist} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
