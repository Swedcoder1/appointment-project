"use client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Patients() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Patients page</p>
        <h1>Protected Page {session.user.name}</h1>
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

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}
