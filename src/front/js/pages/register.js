import React, { useState, useContext } from "react"
import "../../styles/register.css";
import { useForm  } from "react-hook-form";
import { Context } from "../store/appContext";
 
// INTRODUCIR BLUR IN DE MAGIC UI EN TEXTO H1
export const Register = () => {
    const [isDev, setIsDev] = useState(true)
    const { store, actions } = useContext(Context);
    const { register, formState: { errors },handleSubmit } = useForm();
      // Submit your data into Redux store
      const onSubmit = formData => actions.register(formData);

    return(
        <div className="container-fluid ">
            
            <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto my-5">
                
            <h1 className="border-bottom w-100 text-center">Registro</h1>
            <div className="w-100 px-4">
            <div className="form-group mb-2">
                <label htmlFor="name" className="form-label">Nombre:</label>
                <input type="text" className="form-control" id="name" placeholder="Nombre.."
                {...register("name", { required: true })} aria-invalid={errors.name ? "true" : "false"} />
                {errors.name?.type === 'required' && <button className="btn btn-warning w-100 mt-2"  role="alert">El nombre está vacío</button>}
            </div>
            <div className="form-group mb-2">
                <label htmlFor="username" className="form-label">Apellidos:</label>
                <input type="text" className="form-control" id="username" placeholder="Apellidos.."
                {...register("username", { required: true })} aria-invalid={errors.username ? "true" : "false"} />
                {errors.username?.type === 'required' && <button className="btn btn-warning w-100 mt-2"  role="alert">Los apellidos está vacío</button>}
            </div>
            <div className="form-group mb-2">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Email.."
                {...register("email", { required: true })} aria-invalid={errors.email ? "true" : "false"} />
                {errors.email?.type === 'required' && <button className="btn btn-warning w-100 mt-2"  role="alert">El email está vacío</button>}

            </div>
            <div className="form-group mb-2">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <input type="password" className="form-control" id="password" placeholder="Contraseña.."
                {...register("password", { required: true })} aria-invalid={errors.password ? "true" : "false"} />
                {errors.password?.type === 'required' && <button className="btn btn-warning w-100 mt-2"  role="alert">La contraseña está vacía</button>}

              
            </div>
            {!isDev &&(
                <div className="form-group">
                <label for="cif" className="form-label">CIF</label>
                <input type="text" className="form-control" id="cif" {...register("cif", {required:true})} placeholder="Escriba el CIF.."/>
            </div>
            )}
            <button type="submit" className="btn w-100 mt-2 stylebutton">Submit</button>
            </div>
            </form>

           
        </div>
    )
}
