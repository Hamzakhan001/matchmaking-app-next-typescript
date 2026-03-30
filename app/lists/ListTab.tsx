"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Key, useTransition } from "react";
import { Member } from "@/match-app/lib/generated/prisma";
import MemberCard from "@/match-app/app/members/MemberCard";
import LoadingComponent from "@/match-app/app/components/LoadingComponent";

type Props = {
  members: Member[];
  likeIds: string[];
};

const ListTab = ({ members, likeIds }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const tabs = [
    { id: "source", label: "Member I have liked" },
    { id: "target", label: "Member that like me" },
    { id: "mutual", label: "Mutual " },
  ];

  function handleTabChange(key: Key) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("type", key.toString());
      router.replace(`${pathname}?${params.toString()}`);
    });
  }
  return (
    <div className="flex w-full flex-col mt-10 gap-5">
      <Tabs
        aria-label="Like tabs"
        items={tabs}
        color="secondary"
        onSelectionChange={(key) => handleTabChange(key)}
      >
        {(item) => (
          <Tab key={items.id} title={item.label}>
            {isPending ? (
              <div>
                {" "}
                <LoadingComponent />{" "}
              </div>
            ) : (
              <>
                {members.length > 0 ? (
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        likeIds={likeIds}
                      />
                    ))}
                  </div>
                ) : (
                  <div>No members for this filter</div>
                )}
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default ListTab;
