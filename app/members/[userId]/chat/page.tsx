import React from "react";

const ChatPage = () => {
  return (
    <div>
      <CardHeader className="text-2xl font-semibold text-secondary">
        {member.name}
      </CardHeader>
      <Divider />
      <CardBody>{member.description}</CardBody>
    </div>
  );
};

export default ChatPage;
