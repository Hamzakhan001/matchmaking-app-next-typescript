import { notFound } from "next/navigation";
import React from "react";
import { getMemberByUserId } from "../../actions/memberActions";
import CardInnerWrapper from "../../components/CardInnerWrapper";

const MemberDetailedPage = async ({
  params,
}: {
  params: { userId: string};
}) => {
  const { userId } = await params;

  const member = await getMemberByUserId(userId);
  if (!member) {
    return notFound();
  }
  return (
    <div>
     <CardInnerWrapper 
     header='Profile'
     body={<div>{member.description}</div>}
     />
    </div>
  );
};

export default MemberDetailedPage;
