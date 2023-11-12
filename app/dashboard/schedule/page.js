"use client";
import { useSession } from "next-auth/react";
import Calendar from "@/app/components/calendar/calendar";
import AccessDeniedPage from "@/app/accessDeniedPage";

export default function Schedule() {
  const { data: session } = useSession({ required: true });

  if (session) {
    return (
      <>
        <Calendar />
      </>
    );
  }
  return <AccessDeniedPage />;
}
