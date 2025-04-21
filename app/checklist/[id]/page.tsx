import ChecklistBuilder from "@/components/checklist-builder"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function ChecklistPage({ params }: { params: { id: string } }) {
  // Use NextAuth session instead of cookies
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/login")
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <ChecklistBuilder id={params.id} />
    </main>
  )
}
