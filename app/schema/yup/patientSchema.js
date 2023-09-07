import * as yup from "yup";

export let formSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  personalId: yup.number().positive().integer(),
});

export let historySchema = yup.object().shape({
  medicalHistory: yup.string(),
  assassment: yup.string(),
  medicalDiagnosis: yup.string(),
  exercise: yup.string(),
  followUp: yup.string(),
});
