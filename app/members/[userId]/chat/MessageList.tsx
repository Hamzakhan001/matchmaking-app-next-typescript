"use client";
import { MessageDto } from "@/match-app/lib/types";
import React, { useCallback, useEffect, useState,useRef } from "react";
import MessageBox from "./MessageBox";
import { pusherClient } from "@/match-app/lib/pusher";
import { mapMessageToMessageDto } from "@/match-app/lib/mappings";
import { formatShortDateTime } from "@/match-app/lib/utils";

import { Channel } from "pusher-js";

type Props = {
  initialMessage: MessageDto[];
  currentUserId: string;
  chatId: string;
};

function MessageList({ initialMessage, currentUserId, chatId }: Props) {
  const [messages, setMessages] = useState(initialMessage);

  const channelRef = useRef<Channel | null>(null);

  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages((prevState) => {
      return [...prevState, message];
    });
  },[]);


  const handleReadMessages = useCallback((messageIds: string[]) => {
    setMessages(prevState => prevState.map((message => messageIds.includes(message.id)
    ? { ...message, dateRead: formatShortDateTime(new Date())}
    : message
   )))
  },[])

  useEffect(() => {
    if(!channelRef.current){
    channelRef.current = pusherClient.subscribe(chatId);

    channelRef.current.bind("message:new", handleNewMessage);
    channelRef.current.bind('messages:read', handleReadMessages);
    }
    

    return () => {
      if(channelRef.current && channelRef.current.subscribed) {
       channelRef.current.unsubscribe();
       channelRef.current.unbind("message:new", handleNewMessage);
       channelRef.current.unbind('messages:read', handleReadMessages);
      } 

      

    };
  }, [chatId, handleNewMessage, handleReadMessages]);

  return (
    <div>
      {messages.length === 0 ? (
        "No messages to display"
      ) : (
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
