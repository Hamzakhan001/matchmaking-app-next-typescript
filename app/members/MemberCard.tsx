"use client";

import { Member } from "@/match-app/lib/generated/prisma";
import { Card, CardFooter, Image, Link } from "@nextui-org/react";
import { calculateAge } from "@/match-app/lib/utils";
import LikeButton from "@/match-app/app/components/LikeButton";

type Props = {
  member: Member;
  likeIds: string[];
};

const MemberCard = ({ member, likeIds }: Props) => {
  const hasLiked = likeIds.includes(member.userId);
  const preventLinkAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card fullwidth as={Link} href={`/members/${member.userId}`} isPressable>
      <Image
        isZoomed
        alt={member.name}
        width={300}
        src={member.image || "https://via.placeholder.com/300"}
        className="aspect-square object-cover"
      />
      <div className="" onClick={preventLinkAction}>
        <div className="absolute top-3 right-3 z-50">
          <LikeButton targetId={member.userId} hasLiked={hasLiked} />
        </div>
      </div>
      <CardFooter className="flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member.name} , {calculateAge(member.dateOfBirth)}
          </span>
          <span className="text-sm">{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
