// /app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        // Add the user ID to the session
        session.user.id = token.sub || token.id as string;
        console.log("Setting session user ID:", session.user.id); // Debug info
      }
      return session;
    },
    jwt: async ({ token, user, account }) => {
      // Initial sign in
      if (account && user) {
        token.id = user.id;
        token.provider = account.provider;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: true, // Enable debug messages
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
