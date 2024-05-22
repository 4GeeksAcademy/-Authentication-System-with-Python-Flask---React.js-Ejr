import React from "react";
import { Link } from "react-router-dom";
import {Link as NavTo} from "react-scroll" ;
import { animateScroll as scroll } from "react-scroll";

import { IoMdMenu } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

const NavbarUser = () => {
  const [nav, setNav] = React.useState(false);


  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
    <div className="fixed top-0 bg-dark w-full flex z-50">
      <div className="flex h-[60px] w-full md:max-w-[1880px] mx-auto items-center justify-around px-8 md:px-4">
          <Link to="/">
            <p className=" text-2xl f-body font-[600] mr-24">KeQQu</p>  
          </Link>
          <ul className="md:flex max-h-[60px] w-max-1/2 whitespace-nowrap hidden space-x-8">
            <NavTo to="whyKeqquSection" smooth={true}  offset={50} duration={500} > 
              <li className="m-5 mx-auto f-tittle cursor-pointer" href="#whyKeqquSection">Why KeQQu</li>
            </NavTo> 
            <NavTo to="howItWorksSection" smooth={true}  offset={50} duration={500} > 
              <li className="m-5 mx-auto f-tittle cursor-pointer" href="#whyKeqquSection">How it works</li>
            </NavTo> 
            <NavTo to="pricingSection" smooth={true}  offset={50} duration={500} > 
              <li className="m-5 mx-auto f-tittle cursor-pointer" href="#whyKeqquSection">Pricing</li>
            </NavTo> 
            <NavTo to="faqSection" smooth={true}  offset={50} duration={500} > 
              <li className="m-5 mx-auto f-tittle cursor-pointer" href="#whyKeqquSection">FAQ</li>
            </NavTo> 
            <NavTo to="footerSection" smooth={true}  offset={50} duration={500} > 
              <li className="m-5 mx-auto f-tittle cursor-pointer" href="#whyKeqquSection">Contact</li>
            </NavTo> 
          </ul>
          <div className="ml-10">
            <Link to="/signup">
             <button className="f-body border rounded-[30px] px-7 py-1 bg-w text-black">Register</button>
            </Link>
            <Link to="login">
             <button className="f-body border rounded-[30px] ml-10 px-7 py-1">Login</button>
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
        <li className="border-b border-black p-5">This should only show for mobile devices
        but for now...</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default NavbarUser;
