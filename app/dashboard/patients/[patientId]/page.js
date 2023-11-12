import React from "react";
import dbConnect from "@/lib/mongodb";
import Patient from "@/app/schema/mongoose/patientModel";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import Journals from "@/app/schema/mongoose/journalModel";
import PatientJournal from "@/app/components/journal/patientJournals";

async function getPatientData(params) {
  try {
    await dbConnect();
    const getPatient = await Patient.findById({ _id: params.patientId });
    const getJournals = await Journals.find({ patientId: params.patientId });

    return { getPatient, getJournals };
  } catch (error) {
    console.log(error);
  }
}

async function page({ params }) {
  const patientData = await getPatientData(params);
  const journalData = JSON.parse(
    JSON.stringify(patientData?.getJournals)
  ).reverse();

  let getCurrentYear = new Date().getFullYear();
  let patientYears =
    getCurrentYear - patientData?.getPatient.dateOfBirth.slice(0, 4);

  return (
    <>
      <div className="flex space-x-2 text-lg shadow-sm items-center py-2">
        <CgProfile className="text-6xl text-gray-400 mr-2 ml-2" />
        <p>{patientData?.getPatient?.firstName}</p>
        <p>{patientData?.getPatient?.lastName}</p>
        <p>{patientData?.getPatient.dateOfBirth}</p>
        <p className="ml-6">{patientYears} years old</p>
      </div>
      <div className="mb-10 mt-5">
        <Link
          href={"/dashboard/patients"}
          className=" ml-4 text-white mb-10 mt-5 bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3"
        >
          Back
        </Link>
        <Link
          href={`/dashboard/patients/${patientData?.getPatient?._id.toString()}/newJournal`}
          className=" ml-4 text-white mb-10 mt-5 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3"
        >
          New journal
        </Link>
      </div>

      <PatientJournal journalData={journalData} />
    </>
  );
}

export default page;
