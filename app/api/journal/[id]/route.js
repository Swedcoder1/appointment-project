import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Journals from "@/app/schema/mongoose/journalModel";

export async function DELETE(req) {
  dbConnect();
  //Get journals id from url.
  const id = await req.url.split("journal/")[1];

  //Delete specific journals from patient.
  const deleteJournal = await Journals.findByIdAndDelete(id);

  if (deleteJournal) {
    return NextResponse.json({ status: 200, message: "Deleted successfully" });
  } else {
    return NextResponse.json({
      status: 500,
      message: "Couldn´t delete appointment",
    });
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    // console.log("no stringify" + body);
    console.log("Request: " + JSON.stringify(body));
    const journalData = body;
    const journalId = journalData.journalId;

    const updatedJournal = await Journals.findOneAndUpdate(
      { _id: journalId },
      {
        therapiest: journalData.therapiest,
        journals: {
          medicalHistory: journalData.medicalHistory,
          assessment: journalData.assessment,
          medicalDiagnosis: journalData.medicalDiagnosis,
          exercise: journalData.exercise,
          followUp: journalData.followUp,
        },
        signed: journalData.signed,
      },
      { new: true } // Set the 'new' option to return the updated document
    );

    // console.log("Updated " + updatedJournal);
    if (!updatedJournal) {
      return NextResponse.json({
        status: 404,
        message: "Medicalrecord not found",
      });
    }

    return NextResponse.json({ status: 200, message: "Medicalrecord updated" });
  } catch (error) {
    console.log(error);
  }
}
