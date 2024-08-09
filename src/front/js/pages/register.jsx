import React, {useContext}from "react";
import{Context} from "../store/appContext"
import "../../styles/login.css";
import Logo from "../../../../public/images/nutri-logo-icon-b.png";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
    const{actions} = useContext(Context)
return (
    <div className="login-body d-flex justify-content-center align-items-center">
    <div className="bg-light rounded col-12 col-lg-6 container container-login">
        <div className="header-container container-header-register my-5 d-flex align-items-center justify-content-between">
            <div className="logo-img-container d-flex">
                <img className="logo-img" src={Logo} alt="logo-nutri-4-well" />
            </div>
            <h1 className="text-center header-login-title">
                Registrarse
            </h1>
        </div>
        <Formik
            initialValues={{
                name:'',
                email: '',
                password: '',
                password2:'',
                address:'',
                phone:''
            }}
            validationSchema={Yup.object({
                name: Yup.string().required('Requerido').label('Ingresa un nombre válido'),
                email: Yup.string().email('Ingresa un correo válido').required('Requerido'),
                password: Yup.string().required('Contraseña inválida'),
                password2: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir') 
                            .required('Confirmación de contraseña requerida'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                // setTimeout(() => {
                //     alert(JSON.stringify(values, null, 2));
                //     setSubmitting(false);
                // }, 400);
                console.log(values);
                actions.register(values.email,values.password)
            }}
        >

            <Form className="row g-3 d-flex flex-column justify-content-center align-items-center">
                <div className="col-auto w-75">
                    <Field name="name" type="text" className="form-control" id="inputName2" placeholder="Nombre Completo" />
                    <ErrorMessage name="name" />
                </div>
                <div className="col-auto w-75">
                    <Field name="email" type="email" className="form-control" placeholder="Correo electrónico" />
                    <ErrorMessage name="email" />
                </div>
                <div className="col-auto w-75">
                    <Field name="password" type="password" className="form-control" placeholder="Contraseña" />
                    <ErrorMessage name="password" />
                </div>
                <div className="col-auto w-75">
                    <Field name="password2" type="password" className="form-control" placeholder="Repetir Contraseña" />
                    <ErrorMessage name="password" />
                </div>
                <div className="col-auto w-75">
                    <Field name="address" type="text" className="form-control" placeholder="Dirección" />
                    
                </div>
                <div className="col-auto w-75">
                    <Field name="address" type="number" className="form-control" placeholder="Teléfono" />
                </div>
                <div className="register-link-container d-flex justify-content-center">
                    <Link className="register-link" to='/login'>¿Ya tienes una cuenta? Inicia sesión</Link>
                </div>
                <div className="col-auto d-flex justify-content-center w-100">
                    <button type="submit" className="btn btn-login mb-3 p-2 w-75">Registrarse</button>
                </div>

            </Form>
        </Formik>
    </div>
</div>
)

}


export default Register;