import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Appointments from "@/app/schema/mongoose/appointmentModel";

export async function DELETE(req) {
  dbConnect();
  //   console.log(req);

  const id = await req.url.split("appointments/")[1];
  //   console.log("id " + id);
  const deleteAppointment = await Appointments.findByIdAndDelete(id);
  //   console.log(deleteAppointment);

  if (deleteAppointment) {
    return NextResponse.json({ status: 200, message: "Deleted successfully" });
  } else {
    return NextResponse.json({
      status: 500,
      message: "Couldn´t delete appointment",
    });
  }
}
