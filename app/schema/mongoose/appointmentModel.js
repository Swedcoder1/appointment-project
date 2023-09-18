import { Schema, model, models } from "mongoose";

const appointmentSchema = new Schema({
  patientName: { type: String, required: true },
  scheduleDate: { type: String, required: true },
  scheduleTime: { type: String, required: true },
  patientId: { type: String, required: true },
});

const Appointments =
  models.Appointments || model("Appointments", appointmentSchema);

export default Appointments;
