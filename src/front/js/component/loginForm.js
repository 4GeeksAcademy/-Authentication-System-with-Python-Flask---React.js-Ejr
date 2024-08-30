import React, { useContext, useState } from "react"
import { Context } from "../store/appContext"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../styles/home.css"
import formImg from '../../img/login-form-img.jpg'

export const LoginForm = () => {
  const { store, actions } = useContext(Context)

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(e.target.value)
  }

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear una promesa para manejar el login
    const loginPromise = new Promise(async (resolve, reject) => {
      const response = await actions.login(user.email, user.password);

      if (response.success) {
        await actions.getUserProfile();
        resolve("Sesión iniciada");
      } else {
        reject(response.error || "Error al iniciar sesión");
      }
    });

    toast.promise(
      loginPromise,
      {
        pending: 'Iniciando sesión...',
        success: 'Inicio de sesión exitoso 👌',
        error: {
          render({ data }) {
            const errorMessages = {
              "Invalid email or password": "Correo o contraseña incorrectos",
              "User not found": "Correo o contraseña incorrectos",
              "Unexpected error": "Correo o contraseña incorrectos",
            };

            return errorMessages[data] || "Correo o contraseña incorrectos";
          }
        }
      }
    );

    loginPromise.then(() => {
      navigate("/");
    }).catch((error) => {
      console.error(error);
    });
  };


  return (
    <section className="animate__animated animate__fadeIn absolute min-h-screen w-full top-0 z-50 bg-white dark:bg-neutral-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-neutral-900 lg:col-span-5 w-full  lg:h-screen xl:col-span-6 aspect-[2/3] object-cover">
          <img alt="" src={formImg} className="object-[0%_35%] absolute inset-0 h-full w-full object-cover opacity-80 " />
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-12 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block">
              <Link to={'/'} className="inline-flex size-16 items-center border border-neutral-800 justify-center rounded-full bg-white text-emerald-600 sm:size-20 dark:bg-neutral-900 hover:bg-neutral-800 transition-all duration-300">
                <span className="sr-only">Home</span>
                <svg className="size-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"><path d="m536-84-56-56 142-142-340-340-142 142-56-56 56-58-56-56 84-84-56-58 56-56 58 56 84-84 56 56 58-56 56 56-142 142 340 340 142-142 56 56-56 58 56 56-84 84 56 58-56 56-58-56-84 84-56-56-58 56Z" />
                </svg>
              </Link>

              <h1 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl md:text-4xl dark:text-white"> Bienvenido a GymTrack </h1>

            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"> Email </label>

                <input value={user.email} onChange={handleChange} required type="email" id="Email" name="email" className="mt-1 w-full rounded-md border-neutral-200 bg-white py-1 text-sm text-neutral-700 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="Password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"> Contraseña </label>

                <input value={user.password} onChange={handleChange} required type="password" id="Password" name="password" className="mt-1 w-full rounded-md border-neutral-200 bg-white py-1 text-sm text-neutral-700 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-emerald-600 bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-emerald-600 focus:outline-none focus:ring active:text-emerald-500 dark:hover:bg-emerald-700 dark:hover:text-white">Iniciar sesión</button>

                <p className="mt-4 text-sm text-neutral-500 sm:mt-0 dark:text-neutral-400">
                  ¿No tienes una cuenta?
                  <Link to={'/signup'} className="text-neutral-700 underline dark:text-neutral-300 hover:text-neutral-50 transition-all ml-1">Regístrate</Link>.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  )
}
