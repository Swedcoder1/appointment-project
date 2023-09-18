import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Appointments from "@/app/schema/mongoose/appointmentModel";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    console.log("no stringify" + body);
    console.log("Request: " + JSON.stringify(body));
    const appointmentData = body;
    Appointments.create(appointmentData);

    console.log("Journal saved");

    return NextResponse.json({ status: 200, message: "Saved successfully" });
  } catch (error) {
    console.log(error);
  }
}
