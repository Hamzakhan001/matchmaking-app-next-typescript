import { notFound } from "next/navigation";
import React from "react";
import { getMemberByUserId } from "../../actions/memberActions";
import { Card, CardBody, Divider } from "@nextui-org/react";

const MemberDetailedPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

  const member = await getMemberByUserId(userId);
  if (!member) {
    return notFound();
  }
  return (
    <div>
      <CardHeader className='text-2xl font-semibold text-secondary'>{member.name}</CardHeader>
      <Divider />
      <CardBody>
        {member.description}
      </CardBody>

    </div>
  );
};

export default MemberDetailedPage;
