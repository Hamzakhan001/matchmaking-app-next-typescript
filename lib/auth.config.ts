import 'server-only';
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schmeas/loginSchema";
import bcrypt from "bcryptjs";

export default {
    providers: [Credentials({
        name: "Credentials",
        async authorize(cred) {
            try {
                const validated = loginSchema.safeParse(cred)

                if(!validated.success) {
                    console.error("Validation failed:", validated.error);
                    return null;
                }

                const {email, password} = validated.data;

                // Dynamically import server-only code to avoid bundling into middleware
                const { prisma } = await import("@/match-app/lib/prisma");
                
                const user = await prisma.user.findUnique({
                    where: { email }
                });

                if(!user) {
                    console.log("User not found:", email);
                    return null;
                }
                
                if (!user.passwordHash) {
                    console.log("No password hash for user:", email);
                    return null;
                }

                const passwordMatch = await bcrypt.compare(password, user.passwordHash);
                if (!passwordMatch) {
                    console.log("Password mismatch for user:", email);
                    return null;
                }

                // Return user object with fields that NextAuth expects
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                };
            } catch (error) {
                console.error("Auth error:", error);
                return null;
            }

        }

    })],
} satisfies NextAuthConfig;