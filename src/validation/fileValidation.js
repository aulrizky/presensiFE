import * as Yup from "yup";
import messages from "../constants/messages";

const validationSchema = Yup.object().shape({
    file: Yup.mixed()
        .required(messages.file.required)
        .test(
            "fileSize",
            messages.file.size,
            (value) => !value || (value && value.size <= 2 * 1024 * 1024)
        )
        .test(
            "fileType",
            messages.file.format,
            (value) => 
                !value || (value && ["image/jpeg", "image/png"].includes(value.type))
    ),
});

export default validationSchema;