import { Navbar, Button } from "@nextui-org/react";
import { GiMatchTip } from "react-icons/gi";
import UserMenu from "./navbar/UserMenu";
import Link from "next/link";
import { auth } from "@/lib/auth";

const TopNav = async () => {
  const session = await auth();



  return (
    <Navbar
      maxWidth="full"
      className="bg-gradient-to-r from-purple-400 to-purple-700"
    >
      <div className="flex w-full items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <GiMatchTip size={40} className="text-gray-200" />
          <div className="font-bold text-3xl flex">
            <span className="text-gray-900">Next</span>
            <span className="text-gray-200">Match</span>
          </div>
        </Link>
        <div className="flex gap-8">
          <Link href="/members" className="text-white uppercase text-xl">Matches</Link>
          <Link href="/lists" className="text-white uppercase text-xl">Lists</Link>
          <Link href="/messages" className="text-white uppercase text-xl">Messages</Link>
        </div>
        <div className="flex gap-2">
          {session?.user ? (
            <UserMenu user={session.user} />
          ): (
            <>
            <Button as={Link} href="/login" variant="bordered" className="text-white border-white">Login</Button>
            <Button as={Link} href="/register" variant="bordered" className="text-white border-white">Register</Button>
            </>
          )}
          
        </div>
      </div>
    </Navbar>
  );
};

export default TopNav;
