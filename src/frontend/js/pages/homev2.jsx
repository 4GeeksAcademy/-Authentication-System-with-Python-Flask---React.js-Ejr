import React from "react"
import { Context } from "../store/appContext.jsx"

const Homev2 = () => {
  return (
    <div>
      {/* <div className="flex bg-gray-50 dark:bg-gray-900"> */}
{/*-------------------------------  form   ------------------------------------------*/}
        {/* <div id="form" className="flex-initial w-1/2"> <h2 className="p-3 text-xl">here should go login and signIn</h2>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                    kbesa    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required=""/>
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••
                                " className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                      <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div> */}
{/* -------------------------------------   img   --------------------------- */}
       {/*  <div id="image"  className="flex-initial w-1/2"> <h2 className="p-3 text-xl">here should go stock photos n shit</h2>
          <div className="w-1/2 flex flex-col items-center justify-center px- py- mx-auto md:h-screen lg:py-0">
            <img src="https://i.pinimg.com/564x/6f/f1/42/6ff1420eff13056ec51bca5c8a7dd2bf.jpg" className="w-full" alt="/"  />
          </div>
        </div>
      </div> */}



      <div className="w-max-[1240px] mx-auto grid-cols-2 md:flex py-5 md:h-screen">
{/*---------------------------------------      form       ----------------------------------------------------*/}
          <div className="flex min-h-full min-w-[640px] flex-col justify-center px-6 py-12 lg:px-8">
            <div className="bg-indigo-50 mx-auto p-5 py-8 sm:mx-auto sm:w-full sm:max-w-sm rounded-[12px]"> {/* background color */}
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                  <div>
                    <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                      <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                      <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                  </div>

                  <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                  </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Not a member? 
                  <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-2">Start using kbsa for free</a>
                </p>
              </div>
            </div>
          </div>

  {/*--------------------------------------------------       imagenes        ---------------------------------------------- */}
          <div className="columns-2 sm:columns-3 md:columns-4 justify-center items-center border-2">
            <div className="border-4 bg-red-500 p-5 gap-3 ">
              <img src="https://i.pinimg.com/564x/6c/58/6b/6c586b765f376442db99d8734ed2bfd6.jpg" className="border-2 " alt="" />
              <img src="https://i.pinimg.com/564x/6c/58/6b/6c586b765f376442db99d8734ed2bfd6.jpg" className="" alt="" />
              <img src="https://i.pinimg.com/564x/6c/58/6b/6c586b765f376442db99d8734ed2bfd6.jpg" className="" alt="" />
              <img src="https://i.pinimg.com/564x/6c/58/6b/6c586b765f376442db99d8734ed2bfd6.jpg" className="" alt="" />
              <img src="https://i.pinimg.com/564x/6c/58/6b/6c586b765f376442db99d8734ed2bfd6.jpg" className="" alt="" />
              <img src="https://i.pinimg.com/564x/6c/58/6b/6c586b765f376442db99d8734ed2bfd6.jpg" className="" alt="" />
              <img src="https://i.pinimg.com/564x/6c/58/6b/6c586b765f376442db99d8734ed2bfd6.jpg" className="" alt="" />
              <img src="https://i.pinimg.com/564x/6c/58/6b/6c586b765f376442db99d8734ed2bfd6.jpg" className="" alt="" />
              <img src="https://i.pinimg.com/564x/6c/58/6b/6c586b765f376442db99d8734ed2bfd6.jpg" className="" alt="" />
              <img src="https://i.pinimg.com/564x/6c/58/6b/6c586b765f376442db99d8734ed2bfd6.jpg" className="" alt="" />
              <img src="https://i.pinimg.com/564x/6c/58/6b/6c586b765f376442db99d8734ed2bfd6.jpg" className="" alt="" />
              <img src="https://i.pinimg.com/564x/6c/58/6b/6c586b765f376442db99d8734ed2bfd6.jpg" className="" alt="" />
            </div>
          </div>
      </div>
            
      
    </div>
  )
}

export default Homev2