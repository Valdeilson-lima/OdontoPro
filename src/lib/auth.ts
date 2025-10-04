import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import { Adapter } from "next-auth/adapters";
import GitHub from "next-auth/providers/github";

const githubProvider = GitHub({
  clientId: process.env.AUTH_GITHUB_ID,
  clientSecret: process.env.AUTH_GITHUB_SECRET,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  trustHost: true,
  providers: [githubProvider],
  // Ensure a secret is provided. Auth.js checks `secret` or common env vars.
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
});
