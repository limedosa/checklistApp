import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Checklist } from "@/components/checklist-builder";

interface ChecklistCardProps {
  checklist: Checklist;
  onShare: (id: string) => void;
}

export function ChecklistCard({ checklist, onShare }: ChecklistCardProps) {
  console.log("Rendering checklist:", checklist); // Debug info
  const router = useRouter();
  
  const totalItems = checklist.categories.reduce(
    (acc, category) => acc + category.items.length, 
    0
  );

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{checklist.name}</CardTitle>
        <CardDescription>
          {checklist.categories.length} {checklist.categories.length === 1 ? 'category' : 'categories'}, 
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
          {checklist.userEmail && (
            <div className="text-xs mt-1">Created by: {checklist.userEmail}</div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="text-sm text-muted-foreground">
          {checklist.categories.slice(0, 3).map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
          {checklist.categories.length > 3 && (
            <li>+{checklist.categories.length - 3} more categories</li>
          )}
        </ul>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => router.push(`/checklist/${checklist.id}`)}
        >
          <Edit className="mr-2 h-4 w-4" /> Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full ml-2"
          onClick={() => onShare(checklist.id)}
        >
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
}