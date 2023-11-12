import { Schema, model, models } from "mongoose";

const journalSchema = new Schema(
  {
    // patient: String,
    patientId: String,
    therapiest: String,
    signed: Boolean,
    journals: {
      medicalHistory: String,
      assessment: String,
      medicalDiagnosis: String,
      exercise: String,
      followUp: String,
    },
  },
  { timestamps: true }
);

const Journals = models.Journals || model("Journals", journalSchema);

export default Journals;
