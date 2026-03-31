import { CardHeader, Divider, CardBody, user } from "@nextui-org/react";
import CardInnerWrapper from "@/match-app/app/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/match-app/app/actions/messageActions";
import MessageBox from "./MessageBox";
import { getAuthUserId } from "@/match-app/app/actions/authActions";
import MessageList from "./MessageList";
import { createChatId } from "@/match-app/lib/utils";

const ChatPage = async ({ params }: { params: { userId: string } }) => {
  const userId = await getAuthUserId();
  const messages = await getMessageThread(params.userId);
  const chatId = createChatId(userId, params.userId)
  console.log({ messages });


  return (
    <div>
      <CardInnerWrapper header="Chat" 
      body={<MessageList initialMessage={messages} 
      currentUserId={userId}
      chatId={chatId}
      />} 
      footer={<ChatForm />} />
    </div>
  );
};

export default ChatPage;
