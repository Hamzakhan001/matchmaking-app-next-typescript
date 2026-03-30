"use server";

import { auth } from "@/match-app/lib/auth";
import { prisma } from "@/match-app/lib/prisma";
import { getAuthUserId } from "./authActions";

export async function toggleLikeMember(targetUserId: string, isLike: boolean) {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        if (!userId) throw new Error("Unauthorized");

        if (isLike) {
            await prisma.like.delete({
                where: {
                    sourceUserId_targetUserId: {
                        sourceUserId: userId,
                        targetUserId,
                    },
                },
            });
        } else {
            await prisma.like.create({
                data: {
                    sourceUserId: userId,
                    targetUserId,
                },
            });
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        throw new Error("Failed to toggle like");
    }
}

export async function fetchCurrentUserLikes() {
    try {
        const userId = await getAuthUserId();

        const likeIds = await prisma.like.findMany({
            where: {
                sourceUserId: userId,
            },
            select: {
                targetUserId: true,
            },
        });

        return likeIds.map((like) => like.targetUserId);
    } catch (error) {
        console.error("Error fetching user likes:", error);
        throw new Error("Failed to fetch user likes");
    }
}


export async function fetchLikedMembers(type = 'source') {
    try {
        const userId = await getAuthUserId();
        
        switch (type) {
            case 'source':
                return await fetchSourceLikes(userId);

            case 'target':
                return await fetchTargetLikes(userId);

            case 'mutual':
                return await fetchMutualLikes(userId);

            default:
                break
        }
    }
    catch (error) {
        throw error;
    }
}

async function fetchSourceLikes(userId: string) {
	const sourceList = await prisma.like.findMany({
		where: { sourceUserId: userId },
		select: { targetMember: true },
	});
	return sourceList.map((x) => x.targetMember);
}

async function fetchTargetLikes(userId: string) {
	const targetList = await prisma.like.findMany({
		where: { targetUserId: userId },
		select: { sourceMember: true },
	});
	return targetList.map((x) => x.sourceMember);
}

async function fetchMutualLikes(userId: string) {
	const likedUsers = await prisma.like.findMany({
		where: { sourceUserId: userId },
		select: { targetUserId: true },
	});
	const likedIds = likedUsers.map((x) => x.targetUserId);

	const mutualList = await prisma.like.findMany({
		where: {
			AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
		},
		select: { sourceMember: true },
	});
	return mutualList.map((x) => x.sourceMember);
}