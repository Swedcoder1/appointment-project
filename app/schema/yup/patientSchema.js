import * as yup from "yup";

export let formSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  personalId: yup.number().positive().integer(),
});
