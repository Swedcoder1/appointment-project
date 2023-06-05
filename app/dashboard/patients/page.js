"use client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import PatientPage from "@/app/components/patientComponents/PatientPage";

export default function Patients() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <PatientPage session={session} />
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
