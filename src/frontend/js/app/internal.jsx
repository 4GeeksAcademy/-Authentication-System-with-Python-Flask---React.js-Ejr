import React from "react"
import { useNavigate } from "react-router-dom"

// component to redirect the navigator
export const Redirector=({ url, replace }) => {
	const nav= useNavigate()
  React.useEffect(()=>{ nav(url, { replace: replace!==undefined }) },[])
  return null
}

export const NotFound_Generic = () => {
	return (
		<div className="w-full flex-auto text-center items-center mt-5">
			<h1>404 PAGE NOT FOUND</h1>
		</div>
	)
}

// generic healthcheck in front-end
export const HealthCheck = () => {
	return "ok"
}

// paja a la crema
export const CreamyFap = () => {
	return (
		<div className="p-8 text-justify cursor-crosshair">
			<p className="font-bold font-mono text-2xl text-stone-300" style={{letterSpacing:".4ch"}}>Una paja a la crema es una buena paja, es una paja muy gustosa porque del gusto que te da en la poya te saca mucha leche de los huevos y te alivia bastante. Es muy gustosa y consiste en que yo veo el culo a la tia y se me ponen los huevos que me explotan y a continuacion me voy al vater de la oficina y me encierro y se creen que estoy jiñando pero es que me estoy haciendo una paja a la crema. Yo voy y me siento en la taza del vater y me saco la poya que esta empalma y con el capuyo morao y cojo papel, mucho papel y me envuelvo la poya toda ella como si fuera un cilindro y entonces cojo el dosificador de jabon que es blanco a la semilla de algodon y arrelleno de jabon la parte del cilindro de papel que sobresale desde la punta de la poya y echo mucho y parte se va colando por todo el cilindro y toda la poya queda llena de jabon. Un truco bueno para que la paja de mas gusto es llenar la palma de la mano izquierda de jabon y frotarse los huevos para que asi del gusto salga mas leche. Una vez hecho esto se trata de menear arriba y abajo el papel y el roce de la poya con el jabon es mejor que el mejor de los coños jugosos y abiertos y yo cierro los ojos y me imagino que me estoy foyando a la rubia y como el gusto es tan bueno la corrida es bestial y sacas mucha leche que se mezcla con el jabon y terminas echo polvo y corrido como un puto becerro o un cerdo berraco. Un truco muy bueno es que conforme te vas haciendo la paja paras un poco y echas otro chorro de jabon en el hueco superior del cilindro que poco a poco cae en la punta del nabo y continuas haciendote la paja a la crema. Como digo es una paja muy gustosa y que te saca mucha leche y espero que os sirva de consejo y os la hagais porque da mucho gusto y es lo mejor que hay. en la oficina pensaran que soy un cagon y que siempre estoy cagando pero lo que hago es hacerme muchas pajas a la crema. Hoy ya llevo tres.</p>
		</div>
	)
}