import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  // Only return session info, not sensitive data
  return NextResponse.json({
    authenticated: !!session,
    user: session?.user ? {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    } : null,
  });
}