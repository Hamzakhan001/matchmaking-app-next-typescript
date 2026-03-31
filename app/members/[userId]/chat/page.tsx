import {CardHeader, Divider, CardBody} from "@nextui-org/react";
import CardInnerWrapper from "@/match-app/app/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/match-app/app/actions/messageActions";

const ChatPage = async ({params}: {params: {userId: string}}) => {
    const messages = await getMessageThread(params.userId)
    console.log({messages})
  return (
    <div>
      <CardInnerWrapper 
      header= 'Chat'
      body = {<div>Chat goes here</div>}
      footer = {<ChatForm />}
      />
    </div>
  );
};

export default ChatPage;
