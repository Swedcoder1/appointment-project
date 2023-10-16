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
