import Image from "next/image";
import { Button } from "@heroui/react";
import Link from 'next/link'
import { FaRegSmile } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <Link href="/">Go back home</Link>
    </div>
  );
}



