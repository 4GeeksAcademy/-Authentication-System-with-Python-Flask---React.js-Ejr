import * as yup from "yup";


export const workerSchema = yup.object().shape({
    username: yup
        .string()
        .required("Username is required"),
    firstname: yup
        .string()
        .required("First Name is required"),
    lastname: yup
        .string()
        .required("Last Name is required"),
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),
    password: yup
        .string()
        .required("Password is required"),
});  