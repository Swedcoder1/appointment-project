"use client";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Schedule() {
  const { data: session } = useSession({ required: true });

  if (session) {
    return (
      <>
        <p>Schedule page</p>

        <h1>Protected Page {session?.user?.name}</h1>
        <p>You can view this page because you are signed in.</p>
      </>
    );
  }
  return (
    <p>
      Access Denied. You need to{" "}
      <Link className="text-blue-600" href="/">
        log in
      </Link>
    </p>
  );
}
