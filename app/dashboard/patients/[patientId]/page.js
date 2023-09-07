import React from "react";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
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
    console.log("patient data from function" + getPatient);
    // return NextResponse.json(getPatient);
    return { getPatient, getJournals };
  } catch (error) {
    console.log(error);
  }
}

async function page({ params }) {
  const patientData = await getPatientData(params);
  const journalData = patientData?.getJournals;
  console.log(
    "patient data from page" + JSON.stringify(patientData?.getPatient)
  );

  return (
    <>
      <div className="flex space-x-1 text-lg shadow-sm items-center py-2">
        <CgProfile className="text-6xl text-gray-400 mr-2 ml-2" />
        <p>{patientData?.getPatient?.firstName}</p>
        <p>{patientData?.getPatient?.lastName}</p>
      </div>
      <div className="mb-10 mt-5">
        <Link
          href={`/dashboard/patients/${patientData?.getPatient?._id.toString()}/newJournal`}
        >
          New journal
        </Link>
      </div>

      <PatientJournal journalData={journalData} />
    </>
  );
}

export default page;
