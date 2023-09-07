import { Schema, model, models } from "mongoose";

const journalSchema = new Schema(
  {
    // patient: String,
    patientId: String,
    therapiest: String,
    journals: {
      medicalHistory: String,
      assessment: String,
      medicalDiagnosis: String,
      exercise: String,
      followUp: String,
    },
    signed: Boolean,
  },
  { timestamps: true }
);

const Journals = models.Journals || model("Journals", journalSchema);

export default Journals;
