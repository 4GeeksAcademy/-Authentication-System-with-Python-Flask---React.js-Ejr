import React from "react"
import { useNavigate } from "react-router-dom"

import pajuelas from "../../assets/img/pajuelas.jpg"

import { Context } from "../store/appContext.jsx"
import Constants from "./constants.js"

// component to redirect the navigator
export const Redirector=({ url, replace })=>{
	const nav= useNavigate()
  React.useEffect(()=>{ nav(url, { replace: replace!==undefined }) },[])
  return null
}

export const NotFound_Generic=()=>{
	const 
    { language, actions }= React.useContext(Context),
    nav= useNavigate(),
    imagesrc= actions.getUserPref(Constants.USERPREFS_DARKMODE) ? Constants.LOGO.white : Constants.LOGO.black

	return (
		<div className="bg-gray-100 dark:bg-dark select-none w-screen h-screen flex flex-col justify-center items-center">
      <img src={imagesrc} className="absolute h-90scr m-auto opacity-5 blur-sm" />
			<div className="mb-32 flex flex-col justify-center items-center z-10">
				<p className="text-7xl text-primary-n dark:text-accent-n font-bold mb-4">404</p>
				<p className="text-3xl text-gray-800 dark:text-gray-400 mb-4">{language.get("404.notfound")}</p>
				<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{language.get("404.message")}</p>
				
				<button 
					onClick={() => nav('/')} 
					className="px-8 py-3 rounded-3xl bg-gradient-to-r border-2 border-accent-n from-accent-n to-accent-l text-dark shadow-lg hover:bg-none hover:bg-black hover:bg-opacity-30 hover:text-accent-n transition duration-700 ease-in-out hover:transition-none"
				>
					{language.get("404.back")}
				</button>
			</div>
		</div>
	)
}

// generic healthcheck in front-end
export const HealthCheck=()=>{
	return "ok"
}

// paja a la crema
export const CreamyFap=()=>{
  const text= "Una paja a la crema es una buena paja, es una paja muy gustosa porque del gusto que te da en la poya te saca mucha leche de los huevos y te alivia bastante. Es muy gustosa y consiste en que yo veo el culo a la tia y se me ponen los huevos que me explotan y a continuacion me voy al vater de la oficina y me encierro y se creen que estoy jiñando pero es que me estoy haciendo una paja a la crema. Yo voy y me siento en la taza del vater y me saco la poya que esta empalma y con el capuyo morao y cojo papel, mucho papel y me envuelvo la poya toda ella como si fuera un cilindro y entonces cojo el dosificador de jabon que es blanco a la semilla de algodon y arrelleno de jabon la parte del cilindro de papel que sobresale desde la punta de la poya y echo mucho y parte se va colando por todo el cilindro y toda la poya queda llena de jabon. Un truco bueno para que la paja de mas gusto es llenar la palma de la mano izquierda de jabon y frotarse los huevos para que asi del gusto salga mas leche. Una vez hecho esto se trata de menear arriba y abajo el papel y el roce de la poya con el jabon es mejor que el mejor de los coños jugosos y abiertos y yo cierro los ojos y me imagino que me estoy foyando a la rubia y como el gusto es tan bueno la corrida es bestial y sacas mucha leche que se mezcla con el jabon y terminas echo polvo y corrido como un puto becerro o un cerdo berraco. Un truco muy bueno es que conforme te vas haciendo la paja paras un poco y echas otro chorro de jabon en el hueco superior del cilindro que poco a poco cae en la punta del nabo y continuas haciendote la paja a la crema. Como digo es una paja muy gustosa y que te saca mucha leche y espero que os sirva de consejo y os la hagais porque da mucho gusto y es lo mejor que hay. en la oficina pensaran que soy un cagon y que siempre estoy cagando pero lo que hago es hacerme muchas pajas a la crema. Hoy ya llevo tres."
  return (
		<div className="pajuelas" style={{background:`repeat url('${pajuelas}')`}}>
      { text.split(" ").map((e,i)=>
        <a key={`${e}-${i}`} href={`https://dle.rae.es/${e}`} target="blank">{e} </a>
      )}
		</div>
	)
}