import {CardHeader, Divider, CardBody} from "@nextui-org/react";
import CardInnerWrapper from "@/match-app/app/components/CardInnerWrapper";

const ChatPage = () => {
  return (
    <div>
      <CardInnerWrapper 
      header= 'Chat'
      body = {<div>Chat goes here</div>}
      footer = {<div>Chat form goes here</div>}
      />
    </div>
  );
};

export default ChatPage;
