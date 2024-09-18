import * as yup from "yup";
import messages from "../constants/messages";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required(messages.username.required)
    .min(messages.username.minLength)
    .max(messages.username.maxLength),
  password: yup
    .string()
    .required(messages.password.required)
    .min(messages.password.maxLength)
    .max(messages.password.maxLength),
});

export default loginSchema;
