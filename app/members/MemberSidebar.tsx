"use client";

import { Member } from "../../lib/generated/prisma";
import { calculateAge } from "@/lib/utils";
import { Button, Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import React from "react";

type Props = {
  member: Member;
};

const MemberSidebar = ({ member }: Props) => {
  const pathName = usePathname();
  const basePath = `/members/${member.userId}`;
  const navLinks = [
    { name: "Profile", href: basePath },
    { name: "Photos", href: `${basePath}/photos` },
    { name: "Chat", href: `${basePath}/chat` },
  ];

  return (
    <Card className="w-full mt-10 items-center h-[80vh]">
      <Image
        height={200}
        width={200}
        src={member.image || "/images/user.png"}
        alt="User profile main image"
        className="rounded-full mt-6 aspect-square object-cover"
      />
      <CardBody>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold">
            {member.name}, {calculateAge(member.dateOfBirth)}
          </div>
        </div>
        <div className="text-sm text-neutral-500">
          {member.city}, {member.country}
        </div>
        <Divider className="my-3" />
        <nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className={`block rounded ${pathName === link.href ? "text-secondary" : "hover:text-secondary/50"}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          href="/members"
          fullWidth
          color="secondary"
          variant="bordered"
        >
          Back to Members
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MemberSidebar;
