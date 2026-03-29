import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schmeas/loginSchema";
import { getUserByEmail } from "@/app/actions/authActions";
import bcrypt from "bcryptjs";

export default {
    providers: [Credentials({
        name: "Credentials",
        async authorize(cred) {
            const validated = loginSchema.safeParse(cred)

            if(!validated.success) {
                const {email, password} = validated.data;

                const user = await getUserByEmail(email);

                if(!user || !(await bcrypt.compare(password, user.passwordHash))) return null;

                return user;

            }
        }

    })],
} satisfies NextAuthConfig;