// "use client";
import { getServerSession } from "next-auth/next";
import PatientPage from "@/app/components/patientComponents/PatientPage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import AccessDeniedPage from "@/app/accessDeniedPage";

export default async function Patients() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <>
        <PatientPage />
      </>
    );
  }
  return <AccessDeniedPage />;
}
