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
    return NextResponse.json({
      status: 500,
      message: "Could not schedule appointment",
    });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const allAppointments = await Appointments.find({});
    console.log(allAppointments);
    return NextResponse.json(allAppointments);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Could not schedule appointment",
    });
  }
}
