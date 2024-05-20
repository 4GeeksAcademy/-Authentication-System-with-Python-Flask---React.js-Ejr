import React from "react"

//--- icons ------------------------------------
import { HiOutlinePlus } from "react-icons/hi";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import bricks from "../../assets/img/home-view-images/bricks.svg"
//--- icons ------------------------------------



// @dreisup copy your -Home- contents to this file
const LandingView = () => {
	return (
    <div className="bg-dark w-full h-[100rem]">
      <div className="pt-[60px] w-[1440px] mx-auto h-screen bg-primary-l">
    {/*--- hero section ------------------------------------ */}
        <div className="w-full bg-dark grid grid-cols-2 p-5">
          <div className="mx-auto bg-b">
            <h1 className="f-tittle text-[64px] py-8">Copyright text that sounds amazing for selling KeQQu</h1>
            <p className="f-body text-xl py-2 w-3/5">Here some more copyright but smaller that will make the customer look at the CTA below</p>
            <button className="border rounded-[10rem] px-10 py-4 f-tittle text-xl bg-accent-l text-black mt-10">Get started - its free!</button>
          </div>
          <div className="mx-auto bg-b">
            <img src="https://i.pinimg.com/564x/f1/e1/c1/f1e1c10886fcc4971cbf95fb0ac5217c.jpg" alt="" />
            </div>
        </div>
        
    {/*--- trusted by ------------------------------------ */}
    <div className="bg-secondary-n w-full grid py-20">
      <h2 className="flex justify-center w-full f-tittle text-[48px] my-5">
        Trusted by
      </h2>
        <ul className="grid grid-cols-5 my-10">
          <li className="mx-auto f-tittle text-4xl">apple</li>
          <li className="mx-auto f-tittle text-4xl">microsoft</li>
          <li className="mx-auto f-tittle text-4xl">google</li>
          <li className="mx-auto f-tittle text-4xl">amazon</li>
          <li className="mx-auto f-tittle text-4xl">open ai</li>
        </ul>
    </div>


    {/*--- Why KeQQu?  ------------------------------------*/}
    <div className="bg-dark w-full py-28">
      <h2 className="flex justify-center py-10 f-tittle text-[48px] ">Why KeQQu?</h2>
      <div className="grid grid-cols-3 py-10">
        <div className="bg-primary-d w-[26rem] h-[18rem] rounded-xl mx-auto p-5">
          <img className="w-24 h-24 mx-auto" src={bricks} alt="" /> 
          <p className=" flex justify-center f-tittle text-xl pt-2">Customize as you want</p>
          <div className="w-4/6 mx-auto rounded-l-lg h-3 bg-accent-n"></div>
          <p>Fuck Trello, that shit is ugly asf, and u even have to pay to customize their shit like cmon bruh, we are much better then those mfs.</p>
        </div>
        <div className="bg-primary-d w-[26rem] h-[18rem] rounded-xl mx-auto">
          <FaRegCircleCheck className="text-7xl" />
          <p className="">Simple to use</p>
          <div className="w-20 h-4 bg-accent-n"></div>
          <p>Fuck Trello, that shit is ugly asf, and u even have to pay to customize their shit like cmon bruh, we are much better then those mfs.</p>
        </div>
        <div className="bg-primary-d w-[26rem] h-[18rem] rounded-xl mx-auto">
          <FaRegClock className="text-7xl"/>
          <p className="">Save a lot of time</p>
          <div className="w-20 h-4 bg-accent-n"></div>
          <p>Save time and mind space, you won’t fo rget again about your gf bday, im kidding, this app is destinated to work shit</p>
        </div>
      </div>
    </div>

      {/*--- How does it work? -----------------------------------*/}
      <div className="bg-secondary-n w-full py-28 text-black">
        <div className="bg-accent-l w-[1360px] px-10 h-[18rem] rounded-[3rem] mx-auto py-4 flex">
          <div className="w-2/5">
            <h2 className="f-tittle text-[32px]">How Does it Work?</h2>
            <p className="f-body">Start using KeQQu in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex">
            <h4 className="">1</h4>
            <p>First you do this, so be carefull cuz this is the first step cuh</p>
            </div>
            <div className="flex">
            <h4 className="">2</h4>
            <p>Then you do this, yeah i know it’s pretty obvious but you know</p>
            </div>
            <div className="flex">
            <h4 className="">3</h4>
            <p>Then you do that. Haha u did not expect this right</p>
            </div>
            <div className="flex">
            <h4 className="">4</h4>
            <p>Finally, the last step. Ahora toca una paja a la crema</p>
            </div>
          </div>
        </div>
      </div>

      {/*--- Plans & Pricing ------------------------------------*/}
      <div className="bg-dark w-full py-28">
        <h2 className="flex justify-center py-10 f-tittle text-[48px] ">Plans & Pricing</h2>
        <div className="grid grid-cols-3 py-10">
          <div className="bg-primary-d w-[26rem] h-[36rem] rounded-xl mx-auto">
            <h4 className="f-tittle text-4xl">BASIC</h4>
            <div className="w-20 h-4 bg-accent-n"></div>
            <div className="bg-primary-n w-1/2 mx-auto">
              <div className="flex ">1st feature</div>
              <div className="flex ">2nd feature</div>
              <div className="flex ">3rd feature</div>
              <div className="flex ">4th feature</div>
            </div>
            <p className="f-tittle text-2xl">0.00€</p>
            <button className=" f-body border rounded-[30px] px-7 py-1 bg-accent-l text-black">Get started</button>
          </div>

          <div className="bg-primary-d w-[26rem] h-[36rem] rounded-xl mx-auto">
          <h4 className="f-tittle text-4xl">PRO</h4>
            <div className="w-20 h-4 bg-accent-n"></div>
            <div className="bg-primary-n w-1/2 mx-auto">
              <div className="flex ">1st feature</div>
              <div className="flex ">2nd feature</div>
              <div className="flex ">3rd feature</div>
              <div className="flex ">4th feature</div>
            </div>
            <p className="f-tittle text-2xl">0.00€</p>
            <button className=" f-body border rounded-[30px] px-7 py-1 bg-w text-black">Get started</button>
          </div>

          <div className="bg-primary-d w-[26rem] h-[36rem] rounded-xl mx-auto">
          <h4 className="f-tittle text-4xl">ENTERPRISE</h4>
            <div className="w-20 h-4 bg-accent-n"></div>
            <div className="bg-primary-n w-1/2 mx-auto">
              <div className="flex ">1st feature</div>
              <div className="flex ">2nd feature</div>
              <div className="flex ">3rd feature</div>
              <div className="flex ">4th feature</div>
            </div>
            <p className="f-tittle text-2xl">0.00€</p>
            <button className=" f-body border rounded-[30px] px-7 py-1 bg-accent-l text-black">Get started</button>
          </div>

        </div>
      </div>


        {/*--- FAQ -----------------------------------*/}
      <div className="bg-secondary-n w-full py-28 text-black">
        <div className="bg-accent-l w-[1360px] px-20 rounded-[3rem] mx-auto py-4 flex ">
          <div className="w-2/5 py-14">
            <h2 className="f-tittle text-[48px]">FAQ</h2>
            <p className="f-body my-2">Answers to some questions you may have</p>
          </div>
          <div className="w-3/5 p-10">
            <div className="flex bg-primary-n rounded-[40px] h-20 p-10 my-8 justify-between">
              <p className="text-white f-tittle flex items-center">How much does it cost...</p>
              <div className="flex items-center">
              <HiOutlinePlus className="text-yellow-400 text-3xl"/>
              </div>
            </div>
            <div className="flex bg-primary-n rounded-[40px] h-20 p-10 my-8 justify-between">
              <p className="text-white f-tittle flex items-center">How much does it cost...</p>
              <div className="flex items-center">
              <HiOutlinePlus className="text-yellow-400 text-3xl"/>
              </div>
            </div>
            <div className="flex bg-primary-n rounded-[40px] h-20 p-10 my-8 justify-between">
              <p className="text-white f-tittle flex items-center">How much does it cost...</p>
              <div className="flex items-center">
              <HiOutlinePlus className="text-yellow-400 text-3xl"/>
              </div>
            </div>
            <div className="flex bg-primary-n rounded-[40px] h-20 p-10 my-8 justify-between">
              <p className="text-white f-tittle flex items-center">How much does it cost...</p>
              <div className="flex items-center">
              <HiOutlinePlus className="text-yellow-400 text-3xl"/>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/*--- Footer ----------------------------------------------------*/}
      <div className="bg-dark w-full py-28 text-black">
        <div className="bg-primary-d w-[1360px] px-10 rounded-[3rem] mx-auto py-4 text-white">
          <div className="w-4/5 m-10 mx-auto flex justify-around">
            <h3 className="f-tittle text-[32px]">KeQQu</h3>
            <ul className="flex w-2/5 items-center">
              <li className="f-tittle text-lg mx-auto">About</li>
              <li className="f-tittle text-lg mx-auto">Contact</li>
              <li className="f-tittle text-lg mx-auto">Support</li>
            </ul>
            <div className="flex items-center pl-10">
              <div> {/* here should go an input */}
                <input type="email" placeholder="join our newsletter!" className="border-none outline-none bg-transparent placeholder-[#fff5c2] p-0 mx-2 placeholder:italic"  />
                {/* <p className="px-2 f-tittle text-lg text-[#fff5c2]">join our newsletter!</p> */}
                <div className="bg-accent-l h-[1px] w-56"></div>
              </div>
              <button className="mx-4 f-body border rounded-[30px] px-5  bg-[#fff5c2] text-black text-2xl">⟶</button>
            </div>
          </div>
          <div className="bg-gray-400 w-5/6 mx-auto h-1"></div>
          <div className="flex w-9/12 mx-auto mt-5 mb-8 px-20 justify-between">
            <p className="f-body">2024 - Keqqu,Inc.</p>
            <div className="flex items-center">
            <AiFillInstagram  className="text-2xl mx-2" />
            <FaYoutube className="text-2xl mx-2" />
            <FaDiscord className="text-2xl mx-2" />
            <FaTiktok className="text-xl mx-2" />
            <FaTwitter className="text-xl mx-2" />

            </div>

          </div>
          
        </div>
      </div>


      {/*--- colors --------------------------------------------------------*/}
        <div className="w-full flex-auto text-center items-center mt-24">
          <div className=" mx-auto grid-cols-2 md:flex py-5 md:h-screen">   
            <div className="w-48 h-48 bg-w"></div>
            <div className="w-48 h-48 bg-b"></div>
            <div className="w-48 h-48 bg-dark"></div>

            <div className="w-48 h-48 bg-primary-n"></div>
            <div className="w-48 h-48 bg-primary-l"></div>
            <div className="w-48 h-48 bg-primary-d"></div>

            <div className="w-48 h-48 bg-accent-n"></div>
            <div className="w-48 h-48 bg-accent-l"></div>

            <div className="w-48 h-48 bg-secondary-n"></div> 
          </div>
        </div> 
    </div>
  </div>
	)
}

export default LandingView