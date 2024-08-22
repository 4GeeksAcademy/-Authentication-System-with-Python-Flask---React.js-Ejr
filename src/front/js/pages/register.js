import React, { useState, useContext, useEffect } from "react"
import "../../styles/register.css";
import { useForm  } from "react-hook-form";
import { Context } from "../store/appContext";
import AlertSuccess from "../component/alertSuccess";
import { useNavigate } from "react-router-dom";
 
// INTRODUCIR BLUR IN DE MAGIC UI EN TEXTO H1
export const Register = () => {

    const { store, actions } = useContext(Context);
    const { register, formState: { errors },handleSubmit,reset  } = useForm();
    const navigate=useNavigate()
      
    const onSubmit = formData => actions.register(formData)
    
    // Pendiente recibir datos si es Dev o Empleador y al enviar los datos reenviar a los perfiles
    useEffect(()=>{
        if(store.success){
            const timer = setTimeout(()=>{
                navigate("/")
            },3000)
            return () => clearTimeout(timer);
        } else{const timer = setTimeout(()=>{
            actions.resetStore()
            reset()
        },3000)
            return () => clearTimeout(timer);
            
        }  
            
    },[store.success])

      
    return(
        <div className="container-fluid p-0">
            
            <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto my-5 m-0 ">
                
            <h1 className="w-100 text-center fw-bolder my-5">Registro</h1>
           
                {store?.msg && ( <AlertSuccess/>)}
                
            <div className="w-100 px-4 border rounded shadow p-3 mb-5 bg-white rounded py-2">
            
            <div className="form-group mb-2">
                <label htmlFor="name" className="form-label m-0 fw-semibold my-2">Nombre:</label>
                <input type="text" className="form-control" id="name" placeholder="Nombre.."
                {...register("name", { required: true, pattern:{value: /^[A-Za-z]+$/i, message:'Solo se permiten letras'} })} aria-invalid={errors.name ? "true" : "false"} />
                {errors.name?.type === 'required' && <button className="btn btn-warning w-100 mt-2"  role="alert">El campo nombre está vacío</button>}
                {errors.name?.message && <button className="btn btn-warning w-100 mt-2"  role="alert">{errors.name.message}</button>}
            </div>
           
            <div className="form-group mb-2">
                <label htmlFor="username" className="form-label m-0 fw-semibold my-2">Apellidos:</label>
                <input type="text" className="form-control" id="username" placeholder="Apellidos.."
                {...register("username", { required: true })} aria-invalid={errors.username ? "true" : "false"} />
                {errors.username?.type === 'required' && <button className="btn btn-warning w-100 mt-2"  role="alert">El campo apellidos está vacío</button>}
            </div>
            <div className="form-group mb-2">
                <label htmlFor="email" className="form-label m-0 fw-semibold my-2">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Email.."
                {...register("email", { required: true })} aria-invalid={errors.email ? "true" : "false"} />
                {errors.email?.type === 'required' && <button className="btn btn-warning w-100 mt-2"  role="alert">El campo email está vacío</button>}

            </div>
            <div className="form-group mb-2">
                <label htmlFor="country" className="form-label m-0 fw-semibold my-2">Pais:</label>
                <input type="text" className="form-control" id="country" placeholder="Pais.."
                {...register("country", { required: true })} aria-invalid={errors.country ? "true" : "false"} />
                {errors.country?.type === 'required' && <button className="btn btn-warning w-100 mt-2"  role="alert">El campo pais está vacío</button>}

            </div>
            <div className="form-group mb-2">
                <label htmlFor="password" className="form-label m-0 fw-semibold my-2">Contraseña:</label>
                <input type="password" className="form-control" id="password" placeholder="Contraseña.."
                {...register("password", { required: true, minLength:{value:6, message:'Debe tener mínimo 6 caracteres'} })} aria-invalid={errors.password ? "true" : "false"} />
                {errors.password?.type === 'required' && <button className="btn btn-warning w-100 mt-2"  role="alert">El campo contraseña está vacío</button>}
                {errors.password?.message && <button className="btn btn-warning w-100 mt-2"  role="alert">{errors.password?.message}</button>}
              
            </div>
            
                <div className="form-group">
                <label htmlFor="cif" className="form-label m-0 fw-semibold">CIF:</label>
                <input type="text" className="form-control" id="cif" {...register("cif", {required:true})} placeholder="Escriba el CIF.."/>
            </div>
           
            <button type="submit" className="btn w-100 mt-4 stylebutton p-3">Registrarse</button>
            </div>
            
            </form>

           
        </div>
    )
}
