import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  personalId: Number,
});

const patient = new mongoose.model("Patients", patientSchema);
