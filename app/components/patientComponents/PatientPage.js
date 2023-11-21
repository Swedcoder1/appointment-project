import SearchPatient from "./SearchPatient";
import { Suspense } from "react";
import Loading from "../Loading";
import Error from "../error";
import { ErrorBoundary } from "react-error-boundary";
import config from "@/config";

export async function getAllPatient() {
  let res = await fetch(`${config.domainUrl}/api/patient`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: therapiest,
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function PatientPage() {
  const patientData = await getAllPatient();

  function compare(a, b) {
    if (a.firstName < b.firstName) {
      return -1;
    }
    if (a.firstName > b.firstName) {
      return 1;
    }
    return 0;
  }

  if (patientData) {
    patientData.sort(compare);
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<Error />}>
          <SearchPatient patientData={patientData} />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
