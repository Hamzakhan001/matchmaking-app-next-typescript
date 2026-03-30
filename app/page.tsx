import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from 'next/link'
import { FaRegSmile } from "react-icons/fa";
import { auth, signOut } from "@/match-app/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
      <Link href="/">Go back home</Link>

      <h3 className="text-2xl font-semibold">User Session data</h3>

      {session ? (
        <>
          <pre>{JSON.stringify(session, null, 2)}</pre>

          <form action={async () => {
            'use server';
            await signOut({ redirectTo: "/" })
          }}>
            <Button 
              type="submit"
              color="primary" 
              variant="bordered" 
              startContent={<FaRegSmile size={20} />}
            >
              Sign Out
            </Button>
          </form>
        </>
      ) : (
        <div>No session data available</div>
      )}

    </div>
  );
}