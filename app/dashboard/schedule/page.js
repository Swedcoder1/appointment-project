"use client";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Calendar from "@/app/components/calendar/calendar";

export default function Schedule() {
  const { data: session } = useSession({ required: true });

  if (session) {
    return (
      <>
        <Calendar />
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
