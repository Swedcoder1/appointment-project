import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema({
  firstName: { type: String, requireed: true },
  lastName: { type: String, requireed: true },
  personalId: Number,
});

const patient = new mongoose.model("Patients", patientSchema);
