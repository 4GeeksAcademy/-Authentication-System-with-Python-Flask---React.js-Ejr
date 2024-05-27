import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {Link as NavTo} from "react-scroll" ;
import { Context } from "../store/appContext.jsx";



import { IoMdMenu } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  
  //--- login ---------------------
  const { store, actions }= React.useContext(Context)
  const[dropCreate, setDropCreate] = React.useState(false)
  const[dropProfile, setDropProfile] = React.useState(false)
  
  const handleDrop = () => {
      setDropProfile(!dropProfile)
      console.log("dropped down")
    }

  const handleCreate = () => {
    //this should create a new board, or open an mini tab from where u can put the name of the board...
  } 



//--- no login --------------------
  const [nav, setNav] = React.useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
    {store.fakeUser ? 
      <div className="sticky top-0 bg-dark w-full flex z-[999]">
        <div className="flex h-[60px] w-full md:max-w-[1550px] mx-auto items-center justify-between px-8 md:px-4 border-b-[1px] border-gray-600">
          <div className="flex items-center">
            
            <p onClick={()=>navigate('/')} className="cursor-pointer text-2xl f-body font-[600] mr-28">KeQQu</p>  
            
            <p onClick={()=>navigate('dashboard')} className="f-body cursor-pointer mr-10">Dashboard</p>
            <div className="flex items-center">
              <button onClick={handleCreate}
              className="w-8 h-8 rounded-md border-[1px] border-w hover:bg-transparent bg-w text-b text-xl flex items-center justify-center transition-all ease-in-out duration-500">
                <i className="fa-solid fa-plus p-0 hover:text-w"> </i>
              </button> 
            {/* { location.host = "/dashboard" && (
                <p className="ml-2 text-gray-400 text-xs">create a new workspace</p>
              )
              } */}
              <p className="ml-2 text-gray-400 text-xs">create a new board</p>
            </div>
                


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
                                      <Link to="accountsettings">
                                      <li onClick={handleDrop} className="f-body hover:bg-violet-950">Account settings</li>
                                      </Link>
                                      <Link to="support">
                                          <li onClick={handleDrop} className="f-body hover:bg-violet-950">Support</li>
                                      </Link>
                                  </ul>
                              </div>
                              <span className="h-[2px] bg-gray-700 w-full mx-auto rounded-full my-1"></span>
                              <div className="px-5 mb-2">
                                  <ul>
                                      <Link to="/logout">
                                          <li onClick={handleDrop} className="f-body text-red-600 hover:bg-red-950">Log Out</li>
                                      </Link>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  )}
            </div>
          <div onClick={handleNav} className="black hidden">
            {nav ? <AiOutlineClose size={18} /> : <IoMdMenu size={18} />} 
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
            </ul>
          </div>
        </div>
      </div> 

    : 

    <div className="sticky top-0 bg-dark w-full flex z-[999] border-b-[1px] border-gray-600">
      <div className="flex h-[60px] w-full md:max-w-[1550px] mx-auto items-center justify-between px-8 md:px-4">
          <Link to="/">
            <p className=" text-2xl f-body font-[600] mr-24">KeQQu</p>  
          </Link>
          <ul className="md:flex max-h-[60px] w-max-1/2 whitespace-nowrap hidden space-x-8">
            <NavTo to="whyKeqquSection" smooth={true}  offset={50} duration={500} > 
              <li className="m-5 mx-auto f-tittle cursor-pointer">Why KeQQu</li>
            </NavTo> 
            <NavTo to="howItWorksSection" smooth={true}  offset={50} duration={500} > 
              <li className="m-5 mx-auto f-tittle cursor-pointer">How it works</li>
            </NavTo> 
            <NavTo to="pricingSection" smooth={true}  offset={50} duration={500} > 
              <li className="m-5 mx-auto f-tittle cursor-pointer">Pricing</li>
            </NavTo> 
            <NavTo to="faqSection" smooth={true}  offset={50} duration={500} > 
              <li className="m-5 mx-auto f-tittle cursor-pointer">FAQ</li>
            </NavTo> 
            <NavTo to="footerSection" smooth={true}  offset={50} duration={500} > 
              <li className="m-5 mx-auto f-tittle cursor-pointer">Contact</li>
            </NavTo> 
          </ul>
          <div className="ml-10">
            <Link to="/signup">
            <button className="f-body border rounded-[30px] px-7 py-1 bg-w text-black hover:bg-transparent hover:text-white transition duration-300 ease-in-out">Register</button>
            </Link>
            <Link to="login">
            <button className="f-body border rounded-[30px] ml-10 px-7 py-1 hover:bg-white hover:text-black transition duration-300 ease-in-out">Login</button>
            </Link>
          </div>


        <div onClick={handleNav} className="black hidden">
          {nav ? <AiOutlineClose size={18} /> : <IoMdMenu size={18} />} 
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
          </ul>
        </div>
      </div>
    </div>
    }
    
    </>
  );
};

export default Navbar;

