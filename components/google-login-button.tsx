"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

export default function GoogleLoginButton() {
  return (
    <Button 
      variant="outline" 
      className="w-full flex items-center gap-2"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <FcGoogle className="h-5 w-5" />
      Sign in with Google
    </Button>
  )
}