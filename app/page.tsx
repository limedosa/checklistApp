import LandingPage from "@/components/landing-page"
import { cookies } from "next/headers"
import Dashboard from "@/components/dashboard"

export default function Home() {
  // In a real app, this would verify a JWT token or session
  // For this demo, we'll just check if a user cookie exists
  const cookieStore = cookies()
  const isLoggedIn = cookieStore.has("user")

  return isLoggedIn ? <Dashboard /> : <LandingPage />
}
