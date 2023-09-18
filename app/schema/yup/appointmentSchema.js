import * as yup from "yup";

export let appointmentSchema = yup.object().shape({
  patientName: yup.string().required(),
  scheduleDate: yup.string().required(),
  scheduleTime: yup.string().required(),
  patientId: yup.string().required(),
});
