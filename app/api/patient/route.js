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
    const body = await req.json();
    console.log("Request: " + JSON.stringify(body));
    if (body) {
      await dbConnect();
      const patientData = body;
      console.log(body);
      Patient.create(patientData);
      console.log("Patient created");
      return NextResponse.json({ status: 200, message: "Form submitted" });
    } else {
      return NextResponse.json({ status: 500, message: "No formdata" });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req) {
  try {
    console.log("request:" + req);
    const body = await req;
    console.log("ID: " + JSON.stringify(body));
    return NextResponse.json({ status: 200, message: "Data recieved" });
  } catch (error) {
    console.log(error);
  }
}
