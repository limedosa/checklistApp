"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { FaGoogle } from "react-icons/fa"

export default function GoogleLoginButton() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <Button 
      variant="outline" 
      type="button" 
      className="w-full" 
      onClick={handleGoogleSignIn}
    >
      <FaGoogle className="mr-2 h-4 w-4" />
      Sign in with Google
    </Button>
  )
}