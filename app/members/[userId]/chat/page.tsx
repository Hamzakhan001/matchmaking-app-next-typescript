import { CardHeader, Divider, CardBody } from "@nextui-org/react";
import CardInnerWrapper from "@/match-app/app/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/match-app/app/actions/messageActions";
import MessageBox from "./MessageBox";
import { getAuthUserId } from "@/match-app/app/actions/authActions";

const ChatPage = async ({ params }: { params: { userId: string } }) => {
  const userId = await getAuthUserId();
  const messages = await getMessageThread(params.userId);
  console.log({ messages });

  const body =
    messages.length === 0 ? (
      "No messages to display"
    ) : (
      <div>
        {messages.map((message) => (
          <MessageBox
            key={message.id}
            message={message}
            currentUserId={userId}
          />
        ))}
      </div>
    );

  return (
    <div>
      <CardInnerWrapper header="Chat" body={body} footer={<ChatForm />} />
    </div>
  );
};

export default ChatPage;
