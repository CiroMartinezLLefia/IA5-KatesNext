import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [], // Empty here, populated in auth.ts
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/exercici3/auth/login",
  },
} satisfies NextAuthConfig;
