"use client"

import { useState } from "react"
import type { Category, FileItem } from "@/components/checklist-builder"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, MoreVertical, Check, Pencil } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import FileUploadItem from "@/components/file-upload-item"

interface CategorySectionProps {
  category: Category
  onUpdate: (category: Category) => void
  onDelete: (categoryId: string) => void
}

export default function CategorySection({ category, onUpdate, onDelete }: CategorySectionProps) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [newName, setNewName] = useState(category.name)

  const handleNameChange = () => {
    if (newName.trim()) {
      onUpdate({
        ...category,
        name: newName,
      })
    } else {
      setNewName(category.name)
    }
    setIsEditingName(false)
  }

  const addItem = () => {
    const newItem: FileItem = {
      id: `item-${Date.now()}`,
      name: `Item ${category.items.length + 1}`,
      files: [],
    }

    onUpdate({
      ...category,
      items: [...category.items, newItem],
    })
  }

  const updateItem = (updatedItem: FileItem) => {
    onUpdate({
      ...category,
      items: category.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    })
  }

  const deleteItem = (itemId: string) => {
    onUpdate({
      ...category,
      items: category.items.filter((item) => item.id !== itemId),
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="font-semibold"
                autoFocus
                onBlur={handleNameChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleNameChange()
                }}
              />
              <Button variant="ghost" size="sm" onClick={handleNameChange}>
                <Check className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <CardTitle className="text-xl">{category.name}</CardTitle>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsEditingName(true)
              setNewName(category.name)
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline">{category.items.length} items</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setIsEditingName(true)
                  setNewName(category.name)
                }}
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(category.id)} className="text-destructive gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <Button onClick={addItem} variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>

        {category.items.length === 0 ? (
          <div className="text-center p-4 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No items in this category yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {category.items.map((item) => (
              <FileUploadItem key={item.id} item={item} onUpdate={updateItem} onDelete={deleteItem} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
