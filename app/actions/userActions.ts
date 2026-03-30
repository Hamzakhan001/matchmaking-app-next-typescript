'use server'


import { MemberEditSchema,memberEditSchema } from "@/match-app/lib/schmeas/memberEditSchema";
import { ActionResult } from '@/match-app/lib/types';
import { Member } from '@/match-app/lib/generated/prisma';
import { getAuthUserId } from './authActions';
import { prisma } from '@/match-app/lib/prisma';
import { Photo } from "@/match-app/lib/generated/prisma";


export async function updateMemberProfile(
	data: MemberEditSchema,
	nameUpdated: boolean
): Promise<ActionResult<Member>> {
	try {
		const userId = await getAuthUserId();

		const validated = memberEditSchema.safeParse(data);

		if (!validated.success)
			return { status: 'error', error: validated.error?.name };

		const { name, description, city, country } = validated.data;

		if (nameUpdated) {
			await prisma.user.update({
				where: { id: userId },
				data: { name },
			});
		}

		const member = await prisma.member.update({
			where: { userId },
			data: {
				name,
				description,
				city,
				country,
			},
		});
		return { status: 'success', data: member };
	} catch (error) {
		console.log(error);

		return { status: 'error', error: 'Something went wrong' };
	}
}


export async function addImage(url: string, publicId: string) {
    try{
        const userId = await getAuthUserId()

        return prisma.member.update({
            where: {userId},
            data: {
                photos: {
                    create: [
                        {
                            url,
                            publicId
                        }
                    ]
                }
            }
        })
    }catch(error) {
        throw error;
    }
}


export async function setMainImage(photo: Photo) {
    try{
        const userId = await getAuthUserId()
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {image: photo.url}
        })

        return prisma.member.update({
            where: {
                userId
            },
            data : {
                image: photo.url
            }
        })
    }catch(error){
        throw error;
    }
}