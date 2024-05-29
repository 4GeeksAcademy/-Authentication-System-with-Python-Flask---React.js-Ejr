import React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.jsx";

import Constants from "../app/constants.js";

const Navbar = () => {
  const nav = useNavigate();
  

  //--- login ---------------------
  const { store, actions }= React.useContext(Context)
  
  const [navbarState, setNavbarState] = React.useState(false);

  const[dropCreate, setDropCreate] = React.useState(false)
  const[dropProfile, setDropProfile] = React.useState(false)

  const handleDrop = () => {
      setDropProfile(!dropProfile)
      console.log("dropped down")
    }

  const handleCreate = () => {
    //this should create a new board, or open an mini tab from where u can put the name of the board...
  }

  const itF = 'italic font-medium'

  function handleAnchor(obj){
    if(store.activePage == Constants.PAGE.landing) {
      const item= document.querySelector("#" + obj)
      if(item) {
        const y= item.getBoundingClientRect().top
        window.scrollTo({ top: y, left: 0, behavior: "smooth" })
      }
    }
    else nav("/?href=" + obj)
  }

  function toggleNavbarState(){
    setNavbarState(!navbarState)
  }

  return (
    <>
    {store.userData ? 
      <div className="sticky top-0 bg-dark w-full flex z-[999]">
        <div className="flex h-[60px] w-full md:max-w-[1550px] mx-auto items-center justify-between px-8 md:px-4 border-b-[1px] border-gray-600">
          <div className="flex items-center">
            
            <p onClick={()=>nav('/')} className="cursor-pointer text-2xl f-body font-[600] mr-20">KeQQu</p>  
            
            {store.activePage == Constants.PAGE.dashboard ?
            <p onClick={()=>nav('dashboard')} className="f-body cursor-pointer">Dashboard</p>
            :
            <p onClick={()=>nav('workspaces')} className="f-body cursor-pointer">Workspaces</p>
            }
            <button className=""></button>
          </div>
            <div className="ml-10 flex items-center">
              <div className=" w-6 h-6 flex items-center justify-center rounded-full mr-8 f-body border-2 border-white">?</div>
              <button onClick={handleDrop}>
                  <img className="w-9 h-9 rounded-full" src="https://i.pinimg.com/564x/12/1a/cc/121acc97cbe3c4b1a8483e85af18d377.jpg" alt="" />
              </button>
                  {dropProfile && (
                      <div className="absolute mt-[20rem] w-48 rounded-xl">
                          <div className="bg-dark rounded-xl p-2 flex flex-col gap-2">
                              <div className="px-5 mt-2">
                                  <ul>
                                      <li className="f-body text-gray-300">name</li>
                                      <li className="f-body text-gray-300">your@email.com</li>
                                  </ul>
                              </div>
                              <span className="h-[2px] bg-gray-700 w-full mx-auto rounded-full my-1"></span>
                              <div className="px-5">
                                  <ul className="grid gap-2">
                                  <li onClick={()=>{nav("/settings")}} className="f-body hover:bg-violet-950">Account settings</li>

                                      <li onClick={()=>{handleAnchor("footer")}} className="f-body hover:bg-violet-950">Support</li>

                                  </ul>
                              </div>
                              <span className="h-[2px] bg-gray-700 w-full mx-auto rounded-full my-1"></span>
                              <div className="px-5 mb-2">
                                  <ul>
                                  <li onClick={()=>{nav("/logout")}} className="f-body text-red-600 hover:bg-red-950">Log Out</li>

                                  </ul>
                              </div>
                          </div>
                      </div>
                  )}
            </div>
          <div onClick={()=>{toggleNavbarState()}} className="black hidden">
          {navbarState ? 
            <i className="fa fa-regular fa-circle-mark" size={18} /> 
            : 
            <i className="fa fa-regular fa-bars" size={18} />} 
          </div>
          <div className={navbarState ? 'fixed left-0 top-0 h-full bg-white w-80 border-l border-r-gray-600 ease-and-out duration-500' : 'fixed top-0 h-full left-[-30rem] ease-and-out duration-700'}>
            <h1 className="mx-4 pt-8  text-3xl/9 font-bold text-black">
              KeQQu
            </h1>
            <ul className="p-4 text-black">
              <li className="border-b border-black p-5">Why KeQQu</li>
              <li className="border-b border-black p-5">How it works</li>
              <li className="border-b border-black p-5">Pricing</li>
              <li className="border-b border-black p-5">FAQ</li>
              <li className="p-5 border-b border-black">Contact</li>
              <li className="border-b border-black p-5">This should only show for mobile devices but for now...</li>
            </ul>
          </div>
        </div>
      </div> 

    : 

    <div className="sticky top-0 bg-dark w-full flex z-[999] border-b-[1px] border-gray-600">
      <div className="flex h-[60px] w-full md:max-w-[1550px] mx-auto items-center justify-between px-8 md:px-4">

          <p onClick={()=>{nav("/")}}className=" text-2xl f-body font-[600] mr-24">KeQQu</p>  

          <ul className="md:flex max-h-[60px] w-max-1/2 whitespace-nowrap hidden space-x-8">
            <li onClick={()=>{handleAnchor("whykeqqu")}} className="m-5 mx-auto f-tittle cursor-pointer">Why KeQQu</li>
            <li onClick={()=>{handleAnchor("howitworks")}} className="m-5 mx-auto f-tittle cursor-pointer">How it works</li>
            <li onClick={()=>{handleAnchor("pricing")}} className="m-5 mx-auto f-tittle cursor-pointer">Pricing</li>
            <li onClick={()=>{handleAnchor("faq")}} className="m-5 mx-auto f-tittle cursor-pointer">FAQ</li>
            <li onClick={()=>{handleAnchor("footer")}} className="m-5 mx-auto f-tittle cursor-pointer">Contact</li>
          </ul>
          <div className="ml-10">
            <button onClick={()=>{nav("/signup")}} className="f-body border rounded-[30px] px-7 py-1 bg-w text-black hover:bg-transparent hover:text-white transition duration-300 ease-in-out">Register</button>
            <button onClick={()=>{nav("/login")}} className="f-body border rounded-[30px] ml-10 px-7 py-1 hover:bg-white hover:text-black transition duration-300 ease-in-out">Login</button>
          </div>

        { navbarState &&
        <>
        <div onClick={handleNav} className="black hidden">
          {navbarState ? <i className="fa fa-regular fa-close" /> : <i className="fa fa-solid fa-bars" />} 
        </div>
        <div className={nav ? 'fixed left-0 top-0 h-full bg-white w-80 border-l border-r-gray-600 ease-and-out duration-500' : 'fixed top-0 h-full left-[-30rem] ease-and-out duration-700'}>
          <h1 className="mx-4 pt-8  text-3xl/9 font-bold text-black">
            KeQQu
          </h1>
          <ul className="p-4 text-black">
            <li className="border-b border-black p-5">Why KeQQu</li>
            <li className="border-b border-black p-5">How it works</li>
            <li className="border-b border-black p-5">Pricing</li>
            <li className="border-b border-black p-5">FAQ</li>
            <li className="p-5 border-b border-black">Contact</li>
            <li className="border-b border-black p-5">This should only show for mobile devices but for now...</li>
        <li className="border-b border-black p-5">This should only show for mobile devices
            but for now...</li>
          </ul>
        </div>
        </>
        
        }
      </div>
    </div>
    }
    
    <div id="fakeNav" className="bg-red-500 h-16" ></div>
    </>
  )
}

export default Navbar
