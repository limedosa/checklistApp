import LandingPage from "@/components/landing-page"
import Dashboard from "@/components/dashboard"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const isLoggedIn = !!session

  return isLoggedIn ? <Dashboard /> : <LandingPage />
}
