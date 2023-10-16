import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Patient from "@/app/schema/mongoose/patientModel";

export async function GET() {
  try {
    await dbConnect();
    const allPatients = await Patient.find({});
    console.log(allPatients);
    return NextResponse.json(allPatients);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const patientData = body;
    const checkPatient = await Patient.findOne({
      dateOfBirth: patientData.dateOfBirth,
    });

    if (!checkPatient) {
      console.log("Does not exist");
      await Patient.create(patientData);
      return NextResponse.json({ status: 200, message: "Patient created" });
    } else if (checkPatient) {
      console.log("Does exist");
      return NextResponse.json({
        status: 409,
        message: "Patient already exist",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Patient not created, try again",
    });
  }
}
