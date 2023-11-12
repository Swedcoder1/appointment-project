import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Patient from "@/app/schema/mongoose/patientModel";

export async function GET() {
  try {
    await dbConnect();
    // const session = await getServerSession();
    // const userName = session;
    // console.log("Username:" + userName);
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
    console.log("Patientdata " + JSON.stringify(patientData));
    const checkPatient = await Patient.findOne({
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      dateOfBirth: patientData.dateOfBirth,
      therapiest: patientData.therapiest,
    });

    if (!checkPatient) {
      console.log("Does not exist");
      await Patient.create(patientData);
      return NextResponse.json({ message: "Patient created" }, { status: 200 });
    } else if (checkPatient) {
      console.log("Does exist");
      return NextResponse.json(
        { message: "Patient already exist" },
        { status: 409 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Patient not created, try again" },
      { status: 500 }
    );
  }
}
