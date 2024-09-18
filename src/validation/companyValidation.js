import * as Yup from "yup";
import dayjs from "dayjs";
import messages from "../constants/messages";

const validationSchema = Yup.object().shape({
  companyName: Yup.string()
    .required(messages.companyName.required)
    .min(3, messages.companyName.minLength),

  email: Yup.string()
    .email(messages.email.invalid)
    .required(messages.email.required),

  phone: Yup.string()
    .matches(/^[0-9]+$/, messages.phone.digitsOnly)
    .min(10, messages.phone.minLength)
    .max(15, messages.phone.maxLength)
    .required(messages.phone.required),

  address: Yup.string().required(messages.address.required),

  state: Yup.string().required(messages.state.required),

  city: Yup.string().required(messages.city.required),

  zipCode: Yup.string()
    .matches(/^[0-9]+$/, messages.zipCode.digitsOnly)
    .min(5, messages.zipCode.minLength)
    .max(10, messages.zipCode.maxLength)
    .required(messages.zipCode.required),

  joiningDate: Yup.date()
    .required(messages.joiningDate.required)
    .max(dayjs(), messages.joiningDate.max),
});

export default validationSchema;
