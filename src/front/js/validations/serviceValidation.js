import * as yup from "yup";


export const serviceSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
    description: yup
        .string()
        .required("Description is required"),
    service_duration: yup
        .number()
        .positive("Must be more than 0")
        .integer("Must be a multiple of 30")
        .typeError('The value must be a number and multiple of 30')
        .min(30)
        .max(270)
        .required("Service Duration is required"),
    price: yup
        .number()
        .positive("Must be more than 0")
        .integer("Must be more than 0")
        .typeError('The value must be a number')
        .required("Price is required")
});  