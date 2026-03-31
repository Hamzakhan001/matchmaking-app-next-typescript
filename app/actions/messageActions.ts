"use server";

import {
  messageSchema,
  MessageSchema,
} from "@/match-app/lib/schmeas/messageSchema";
import { ActionResult } from "@/match-app/lib/types";
import { Message } from "@/match-app/lib/generated/prisma";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/match-app/lib/prisma";
import { mapMessageToMessageDto } from "@/match-app/lib/mappings";

export async function createMessage(
  recepientUserId: string,
  data: MessageSchema,
): Promise<ActionResult<Message>> {
  try {
    const userId = await getAuthUserId();

    const validated = messageSchema.safeParse(data);

    if (!validated.success)
      return { status: "error", error: validated.error.name };
    const { text } = validated.data;

    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recepientUserId,
        senderId: userId,
      },
    });

    return {
      status: "success",
      data: message,
    };
  } catch (error) {
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getMessageThread(recipientId: string) {
  try {
    const userId = await getAuthUserId();

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId,
          },
          {
            senderId: recipientId,
            recipientId: userId,
          },
        ],
      },
      orderBy: {
        created: "asc",
      },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return messages.map(message=> mapMessageToMessageDto(message)) 
  } catch (error) {
    throw error;
  }
}
