// import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const patientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  therapiest: { type: String, required: true },
});

// export const Patient = mongoose.model("Patients", patientSchema);
const Patient = models.Patients || model("Patients", patientSchema);

export default Patient;
