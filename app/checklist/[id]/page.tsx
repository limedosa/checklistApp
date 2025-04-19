import ChecklistBuilder from "@/components/checklist-builder"

export default function ChecklistPage({ params }: { params: { id: string } }) {
  // We can safely access params.id directly here since this is a synchronous function
  // You just need to make sure the parent component that supplies params is async
  return (
    <main className="container mx-auto py-8 px-4">
      <ChecklistBuilder id={params.id} />
    </main>
  );
}
