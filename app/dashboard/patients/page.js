// "use client";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import PatientPage from "@/app/components/patientComponents/PatientPage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Patients() {
  // const { data: session } = useSession();
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <>
        <PatientPage />
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
