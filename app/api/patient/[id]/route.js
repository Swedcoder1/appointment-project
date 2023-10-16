import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Patient from "@/app/schema/mongoose/patientModel";
import Journals from "@/app/schema/mongoose/journalModel";

export async function DELETE(req) {
  dbConnect();

  //Get patients id from url.
  const id = await req.url.split("patient/")[1];

  //Delete journals and patient at the same time.
  const deletePatient = await Patient.findByIdAndDelete(id);
  const deleteJournals = await Journals.deleteMany({ patientId: { $gte: id } });

  if (deletePatient && deleteJournals) {
    return NextResponse.json({ status: 200, message: "Deleted successfully" });
  } else {
    return NextResponse.json({
      status: 500,
      message: "Couldn´t delete patient or journals",
    });
  }
}
