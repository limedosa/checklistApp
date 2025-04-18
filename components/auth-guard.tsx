"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/auth-client";

const publicPaths = ["/login", "/register", "/forgot-password"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isPublicPath = publicPaths.includes(pathname);
    
    if (!isAuthenticated && !isPublicPath) {
      router.push("/login");
    }
    
    if (isAuthenticated && isPublicPath) {
      router.push("/");
    }
  }, [isAuthenticated, pathname, router]);

  // For public paths, always render the children
  if (publicPaths.includes(pathname)) {
    return <>{children}</>;
  }

  // For protected paths, only render if authenticated
  return isAuthenticated ? <>{children}</> : null;
}