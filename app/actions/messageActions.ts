"use server";

import {
  messageSchema,
  MessageSchema,
} from "@/match-app/lib/schmeas/messageSchema";
import { ActionResult, MessageDto } from "@/match-app/lib/types";
import { Message } from "@/match-app/lib/generated/prisma";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/match-app/lib/prisma";
import { mapMessageToMessageDto } from "@/match-app/lib/mappings";
import { pusherServer } from "@/match-app/lib/pusher";
import { createChatId } from "@/match-app/lib/utils";

export async function createMessage(
  recepientUserId: string,
  data: MessageSchema,
): Promise<ActionResult<MessageDto>> {
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
      select: messageSelect
    });

    const messageDto = mapMessageToMessageDto(message)

    await pusherServer.trigger(createChatId(userId, recepientUserId), 'message:new', messageDto)

    return {
      status: "success",
      data: messageDto,
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
      select: messageSelect
    })

    if (messages.length >0 ){
      const readMessageIds = messages.filter(
        m => m.dateRead === null && m.recipient?.userId === userId
        && m.sender?.userId === recipientId
      ).map(m => m.id);

       await prisma.message.updateMany({
      where: {id: {in: readMessageIds}},
      data: {dateRead: new Date()}
    })

    await pusherServer.trigger(createChatId(recipientId, userId), 'messages:read', readMessageIds);  
    }

   

    return messages.map(message=> mapMessageToMessageDto(message)) 
  } catch (error) {
    throw error;
  }
}


const messageSelect = {
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
        }
  }