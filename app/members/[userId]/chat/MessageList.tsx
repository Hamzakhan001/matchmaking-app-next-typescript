'use client'
import { MessageDto } from "@/match-app/lib/types";
import React, { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import { pusherClient } from "@/match-app/lib/pusher";

type Props = {
  initialMessage: MessageDto[];
  currentUserId: string;
  chatId: string;
};

function MessageList({ initialMessage, currentUserId, chatId }: Props) {
  const [messages, setMessages] = useState(initialMessage);

  useEffect (() => {
    const channel = pusherClient.subscribe(chatId);

    channel.bind('message:new', ()=> {})

    return () => {
        channel.unsubscribe()
        channel.unbind('message:new')
    }
},[chatId])

  return (
    <div>
      {messages.length === 0 ? ( "No messages to display" ) : (
      <div>
        {messages.map((message) => (
          <MessageBox
            key={message.id}
            message={message}
            currentUserId={currentUserId}
          />
        ))}
      </div>
      )}
    </div>
  );
}

export default MessageList;
