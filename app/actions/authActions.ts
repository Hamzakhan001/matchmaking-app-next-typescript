'use server'
import { RegisterSchema,registerSchema } from "@/lib/schmeas/registerSchema";
import bcrypt from 'bcryptjs';
import { prisma } from "@/lib/prisma";



export async function registeredUser(data: RegisterSchema) {
    const validated = registerSchema.safeParse(data);

    if(!validated.success) {
        throw new Error("Invalid data");
    }

    const {name,email,password} = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await prisma.user.findUnique({
        where: {email}
    });

    if(existingUser) {
        throw new Error("User already exists");
    }

    return prisma.user.create({
        data: {
            name,
            email,
            passwordHash: hashedPassword
        }
    })
}