"use client"

import { useState, useRef, type ChangeEvent } from "react"
import type { FileItem } from "@/components/checklist-builder"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, MoreVertical, File, X, Check, Pencil, Paperclip } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface FileUploadItemProps {
  item: FileItem
  onUpdate: (item: FileItem) => void
  onDelete: (itemId: string) => void
  readOnly?: boolean
}

export default function FileUploadItem({ item, onUpdate, onDelete, readOnly = false }: FileUploadItemProps) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [newName, setNewName] = useState(item.name)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleNameChange = () => {
    if (newName.trim()) {
      onUpdate({
        ...item,
        name: newName,
      })
    } else {
      setNewName(item.name)
    }
    setIsEditingName(false)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      onUpdate({
        ...item,
        files: [...item.files, ...newFiles],
      })
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = [...item.files]
    updatedFiles.splice(index, 1)
    onUpdate({
      ...item,
      files: updatedFiles,
    })
  }

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="font-medium"
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
                <h3 className="font-medium">{item.name}</h3>
              )}
              {!readOnly && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsEditingName(true)
                    setNewName(item.name)
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </div>

            {!readOnly && (
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
                      setNewName(item.name)
                    }}
                    className="gap-2"
                  >
                    <Pencil className="h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(item.id)} className="text-destructive gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {item.files.map((file, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1 px-2">
                <File className="h-3 w-3" />
                <span className="max-w-[150px] truncate">{file.name}</span>
                {!readOnly && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-destructive/10 rounded-full p-0"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </Badge>
            ))}
          </div>

          <div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
            <Button variant="outline" size="sm" className="gap-2" onClick={() => fileInputRef.current?.click()}>
              <Paperclip className="h-4 w-4" />
              {item.files.length > 0 ? "Add More Files" : "Upload Files"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
