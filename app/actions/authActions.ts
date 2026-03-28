'use server'
import { RegisterSchema,registerSchema } from "@/lib/schmeas/registerSchema";
import bcrypt from 'bcryptjs';
import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/lib/types";



export async function registeredUser(data: RegisterSchema): Promise<ActionResult<string>> {

    try {
         const validated = registerSchema.safeParse(data);

    if(!validated.success) {
        return {status: 'error', error: validated.error.errors}
    }

    const {name,email,password} = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await prisma.user.findUnique({
        where: {email}
    });

    if(existingUser) {
        throw new Error("User already exists");
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash: hashedPassword
        }
    })

    return {status: 'success', data: user}
    }

    catch (error) {
        console.error(error);
        return {status: 'error', error: 'Something went wrong'}
    }

}



   