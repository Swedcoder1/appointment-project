import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Patient from "@/app/schema/mongoose/patientModel";
import Journals from "@/app/schema/mongoose/journalModel";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    console.log("no stringify" + body);
    console.log("Request: " + JSON.stringify(body));
    const journalData = body;
    Journals.create({
      patientId: journalData.patientId,
      therapiest: journalData.therapiest,
      signed: journalData.signed,
      journals: {
        medicalHistory: journalData.medicalHistory,
        assessment: journalData.assessment,
        medicalDiagnosis: journalData.medicalDiagnosis,
        exercise: journalData.exercise,
        followUp: journalData.followUp,
      },
    });
    console.log("Journal saved");
    return NextResponse.json({ status: 200, message: "Saved successfully" });
    //   } else {
    //     return NextResponse.json({ status: 500, message: "No formdata" });
    //   }
  } catch (error) {
    console.log(error);
  }
}
