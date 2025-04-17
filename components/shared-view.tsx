"use client"

import type { Checklist } from "@/components/checklist-builder"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import FileUploadItem from "@/components/file-upload-item"

interface SharedViewProps {
  checklist: Checklist
}

export default function SharedView({ checklist }: SharedViewProps) {
  // In a real app, this would be a separate state that's synced with the server
  // For this demo, we'll just use the same state as the editor view

  const updateItem = (categoryId: string, updatedItem: any) => {
    console.log("File uploaded in shared view", { categoryId, updatedItem })
    // In a real app, this would update the server state
  }

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Shared View Mode</AlertTitle>
        <AlertDescription>
          In this view, users can only upload files to existing items but cannot modify the checklist structure.
        </AlertDescription>
      </Alert>

      <h2 className="text-2xl font-semibold">{checklist.name}</h2>

      {checklist.categories.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">This checklist has no categories yet.</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {checklist.categories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{category.name}</CardTitle>
              </CardHeader>

              <CardContent className="pt-4 space-y-4">
                {category.items.length === 0 ? (
                  <div className="text-center p-4 border border-dashed rounded-lg">
                    <p className="text-muted-foreground">No items in this category yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <FileUploadItem
                        key={item.id}
                        item={item}
                        onUpdate={(updatedItem) => updateItem(category.id, updatedItem)}
                        onDelete={() => {}} // No-op in shared view
                        readOnly={true}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
