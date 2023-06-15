import React, { useState, useContext} from "react";
import styles from "./userForm.module.css";
import { createCompany } from "../../service/company.js";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from "../../validations/userFormValidation.js"
import { toast } from "react-toastify";
import Button from "../button/index.jsx";
import Input from "../input/index.jsx";

const UserForm = ({ textBtn }) => {

  const { store } = useContext(Context);

  const [newCompany, setNewCompany] = useState(store.companyData.data);
  
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(userSchema)
  }); 

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setNewCompany({ ...newCompany, [target.name]: target.value });
  }; 

  const onSubmit = async () => {
    const resMsg = await createCompany(newCompany);
    if (resMsg) {
      console.log(resMsg)
      toast.success(resMsg?.msg);
      navigate(`/admin-dashboard/${resMsg?.data.id}`);
    } else {
      toast.error(resMsg?.msg);
    }
  };

  return (
  <form
    className={styles._form}
    onChange={handleChange}
    onSubmit={handleSubmit(onSubmit)}
  >
    <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="Username"
        label="username"
        name="username"
        register={register}
      />
        {errors?.username && (
        <small className={styles._fail}>
          <i className="fa-solid fa-circle-exclamation"></i> {errors.username?.message}
        </small>
      )}
    <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="First Name"
        label="firstname"
        name="firstname"
        register={register}
      />
        {errors?.firstname && (
        <small className={styles._fail}>
          <i className="fa-solid fa-circle-exclamation"></i> {errors.firstname?.message}
        </small>
      )}
   <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="Last Name"
        label="lastname"
        name="lastname"
        register={register}
      />
        {errors?.lastname && (
        <small className={styles._fail}>
          <i className="fa-solid fa-circle-exclamation"></i> {errors.lastname?.message}
        </small>
      )}
    <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="Email"
        label="email"
        name="email"
        register={register}
      />
        {errors?.email && (
        <small className={styles._fail}>
          <i className="fa-solid fa-circle-exclamation"></i> {errors.email?.message}
        </small>
      )}
   <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="Password"
        label="password"
        name="password"
        register={register}
      />
        {errors?.password && (
        <small className={styles._fail}>
          <i className="fa-solid fa-circle-exclamation"></i> {errors.password?.message}
        </small>
      )}
    <Button type="submit" title={textBtn} />
  </form>
)
}; 
export default UserForm;
