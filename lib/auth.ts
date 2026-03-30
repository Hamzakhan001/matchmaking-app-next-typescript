import 'server-only';
import NextAuth from "next-auth";
import authConfig from "./auth.config";

// Prisma adapter is only needed for database operations, not for JWT validation
// Using JWT strategy avoids the need for the adapter in edge runtime (middleware)
export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    callbacks: {
        async session({token, session}: any) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            return session;
        }
    },
    session: { strategy: "jwt" as const },
    ...authConfig,
});