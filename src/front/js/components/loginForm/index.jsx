import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "../button/index.jsx";
import styles from "./login.module.css";
import InputField from "../inputField/index.jsx";
import { Link } from "react-router-dom";
import Spinner from "../spinner/index.jsx";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = ({ handleClick, handleChange, invalidDate, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    handleClick(data);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={handleChange}
          className={styles._form}
        >
          <InputField
            icon="fa-solid fa-envelope"
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            errors={errors}
          />
          {errors?.email && (
            <small className={styles._fail}>
              <i className="fa-solid fa-circle-exclamation"></i>{" "}
              {errors.email?.message}
            </small>
          )}
          <InputField
            icon="fa-solid fa-lock"
            type="password"
            placeholder="Password"
            name="password"
            register={register}
          />
          {errors?.password && (
            <small className={styles._fail}>
              <i className="fa-solid fa-circle-exclamation"></i>{" "}
              {errors.password?.message}
            </small>
          )}
          <Button type="submit" title="Login" />
        </form>
      )}
      {invalidDate && (
        <div>
          <p className={styles._fail}>The data entered is incorrect.</p>
          <Link to={"/user-register"} className={styles._registerLink}>
            Register like client!
          </Link>
          <Link to={"/company-register"} className={styles._registerLink}>
            Register your company!
          </Link>
        </div>
      )}
    </>
  );
};

export default LoginForm;
