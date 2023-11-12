import * as yup from "yup";

export let formSchema = yup.object().shape({
  firstName: yup.string().required().lowercase(),
  lastName: yup.string().required().lowercase(),
  dateOfBirth: yup.string().required(),
});

export let historySchema = yup.object().shape({
  medicalHistory: yup.string(),
  assassment: yup.string(),
  medicalDiagnosis: yup.string(),
  exercise: yup.string(),
  followUp: yup.string(),
  signed: yup.boolean(),
});
