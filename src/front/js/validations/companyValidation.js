import * as yup from "yup";


export const companySchema = yup.object({
    name: yup
        .string()
        .required("Name is required"),
    cif: yup
        .string()
        .min(8)
        .max(10)
        .required("CIF is required"),
    description: yup
        .string()
        .required("Description is required"),
    address: yup
        .string()
        .required("Address is required"),
    workingSchedule: yup
        .string()
        .required("Working Schedule is required"),
}); 