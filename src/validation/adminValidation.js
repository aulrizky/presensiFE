import * as Yup from "yup";
import messages from "../constants/messages";

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required(messages.first_name.required)
    .min(2, messages.first_name.minLength)
    .max(50, messages.first_name.maxLength),
  last_name: Yup.string()
    .required(messages.last_name.required)
    .min(2, messages.last_name.minLength)
    .max(50, messages.last_name.maxLength),
  email: Yup.string()
    .email(messages.email.invalid)
    .required(messages.email.required),
  username: Yup.string()
    .required(messages.username.required)
    .min(7, messages.username.minLength)
    .max(20, messages.username.maxLength),
  id_company: Yup.string().required(messages.id_company.required),
  password: Yup.string()
    .min(8, messages.password.minLength)
    .max(50, messages.password.maxLength)
    .required(messages.password.required),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], messages.confirmPassword.notMatch)
    .required(messages.confirmPassword.required),
});

export default validationSchema;
