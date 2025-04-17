import ChecklistBuilder from "@/components/checklist-builder"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function ChecklistPage({ params }: { params: { id: string } }) {
  // In a real app, this would verify a JWT token or session
  const cookieStore = cookies()
  const isLoggedIn = cookieStore.has("user")

  if (!isLoggedIn) {
    redirect("/login")
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <ChecklistBuilder id={params.id} />
    </main>
  )
}
