import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    callbacks: {
        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
        }
    }
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
});