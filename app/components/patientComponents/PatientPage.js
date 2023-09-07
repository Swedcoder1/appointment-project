import SearchPatient from "./SearchPatient";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NewPatient from "./newPatient";
import DeletePatient from "./deletePatient";
import Link from "next/link";

export async function getAllPatient() {
  let res = await fetch("http://localhost:3000/api/patient", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function PatientPage() {
  // const session = await getServerSession(authOptions);

  // console.log(JSON.stringify(allPatients));
  const test = await getAllPatient();
  // console.log(data);
  console.log("Patient " + test);

  return (
    <>
      <SearchPatient test={test} />
      <NewPatient />
      {/* 
      <div>
        <div className="">
          {test.map((patient, index) => (
            <>
              <div
                className="flex justify-between mb-4 border-b-2"
                key={patient._id.toString()}
              >
                <Link
                  href={`/dashboard/patients/${patient._id.toString()}`}
                  className="hover:cursor-pointer"
                >
                  <div className="flex space-x-1 ml-4">
                    <p>{patient.firstName}</p>
                    <p>{patient.lastName}</p>
                  </div>
                </Link>
                {/* <p>{patient._id.toString()}</p> */}
      {/* <DeletePatient patient={patient} /> */}
      {/* </div>
            </>
          ))}
        </div>
      </div> */}
    </>
  );
}
