import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../service/user";
import styles from "./userForm.module.css";
import Button from "../button/index.jsx";
import Input from "../input/index.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from "../../validations/userFormValidation.js"; 
import { toast } from "react-toastify";

const initialState = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  
const UserForm = ({ textBtn }) => {

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(userSchema)
      }); 

    const [newUser, setNewUser] = useState(initialState);
  
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
    setNewUser({ ...newUser, [target.name]: target.value });
  };

    const onSubmit = async (e) => {
    const resMsg = await registerUser(newUser);
    if (resMsg?.error) {
      toast.error(resMsg?.msg);
    } else {
      toast.success(resMsg?.msg);
      navigate("/user-dashboard");
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
        type="password"
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
