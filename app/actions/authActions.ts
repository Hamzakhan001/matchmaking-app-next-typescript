'use server'

import { RegisterSchema,registerSchema } from "@/lib/schmeas/registerSchema";
import bcrypt from 'bcryptjs';
import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/lib/types";
import { LoginSchema } from "@/lib/schmeas/loginSchema";
import { signIn } from "@/lib/auth";



export async function signInUser(data: LoginSchema): Promise<ActionResult<string>>{
    try{    
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        })

        return {status: 'success', data: 'Logged in successfully'}

    }catch (error) {
        console.error(error);
        if (error instanceof Error) {
            switch(error.name){
                case 'CredentialsSignin':
                    return {status: 'error', error: 'Invalid email or password'}
                
                default:
                    return {status: 'error', error: error.message}
            }
        }
        else {
            return {status: 'error', error: 'Something went wrong'}
        }
   }
}



export async function registeredUser(data: RegisterSchema): Promise<ActionResult<string>> {

    try {
         const validated = registerSchema.safeParse(data);

    if(!validated.success) {
        return {status: 'error', error: validated.error.name}
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


export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {email}
    })
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({
        where: {id}
    })
}