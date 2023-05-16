"use client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="bg-green-500">
        <li>
          <Link href="/dashboard/schedule">Appointments</Link>
        </li>

        <div>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    );
  }
  return null;
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}
