import React from 'react';

const CARDS = [
    {
        title: "Crunches",
        description: "<ol><li>Acuéstese boca arriba en el suelo con las rodillas dobladas.</li><li>Flexione los hombros hacia la pelvis. Las manos pueden estar detrás o al costado del cuello o cruzadas sobre el pecho.</li><li>Repita.</li></ol>",
        img: "https://wger.de/media/exercise-images/91/Crunches-1.png"
    },
    {
        title: "Crunch en banco declinado",
        description: "<ol><li>Comience recostado en un banco declinado con las rodillas dobladas.</li><li>Coloque las manos detrás de la cabeza o cruzadas sobre el pecho.</li><li>Realice una contracción abdominal llevando los hombros hacia las rodillas.</li></ol>",
        img: "https://wger.de/media/exercise-images/93/Decline-crunch-1.png"
    },
    {
        title: "Hiperextensiones",
        description: "<ol><li>Acuéstese boca abajo en un banco de hiperextensiones.</li><li>Mantenga las manos detrás de la cabeza o cruzadas sobre el pecho.</li><li>Levante la parte superior del cuerpo utilizando los músculos de la espalda baja.</li></ol>",
        img: "https://wger.de/media/exercise-images/128/Hyperextensions-1.png"
    },
    {
        title: "Press de banca con agarre estrecho",
        description: "<ol><li>Acuéstese en un banco con una barra en las manos y las manos separadas a una distancia inferior al ancho de los hombros.</li><li>Baje la barra lentamente hacia el pecho, manteniendo los codos cerca del cuerpo.</li><li>Empuje la barra hacia arriba hasta extender completamente los brazos.</li></ol>",
        img: "https://wger.de/media/exercise-images/88/Narrow-grip-bench-press-1.png"
    },
    {
        title: "Curl de bíceps de pie",
        description: "<ol><li>De pie, sostenga una barra con las manos a la altura de los hombros y las palmas hacia arriba.</li><li>Flexione los codos para levantar la barra hacia los hombros.</li><li>Baje la barra de manera controlada hasta la posición inicial.</li></ol>",
        img: "https://wger.de/media/exercise-images/129/Standing-biceps-curl-1.png"
    },
    {
        title: "Curl de bíceps",
        description: "<ol><li>Sostenga dos pesas con los brazos estirados y las palmas hacia el cuerpo.</li><li>Flexione los codos para levantar las pesas hacia los hombros, girando las palmas hacia arriba durante el movimiento.</li><li>Baje las pesas de manera controlada hasta la posición inicial.</li></ol>",
        img: "https://wger.de/media/exercise-images/81/Biceps-curl-1.png"
    },
    {
        title: "Curl de bíceps con barra",
        description: "<ol><li>Sostenga una barra con los brazos estirados y las palmas hacia arriba.</li><li>Flexione los codos para levantar el peso hacia los hombros.</li><li>Baje el peso de manera controlada hasta la posición inicial.</li></ol>",
        img: "https://wger.de/media/exercise-images/74/Bicep-curls-1.png"
    },
    {
        title: "Fondos en banco",
        description: "<ol><li>Coloque las manos en el borde de un banco y los pies en otro banco frente a usted.</li><li>Baje el cuerpo doblando los codos hasta que los brazos formen un ángulo de 90 grados.</li><li>Empuje hacia arriba hasta extender los brazos nuevamente.</li></ol>",
        img: "https://wger.de/media/exercise-images/83/Bench-dips-1.png"
    },

    {
        title: "Encogimientos de hombros con barra",
        description: "<ol><li>Sostenga una barra con las manos separadas al ancho de los hombros y los brazos rectos.</li><li>Levante los hombros hacia las orejas, manteniendo los brazos rectos.</li><li>Baje los hombros de manera controlada hasta la posición inicial.</li></ol>",
        img: "https://wger.de/media/exercise-images/150/Barbell-shrugs-1.png"
    }
];



export const InfiniteSlider = () => {
    return (
        <div className="relative m-auto overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[50px] before:bg-[linear-gradient(to_right,rgba(115,115,115,0)_0%,rgba(25,25,25,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[50px] after:-scale-x-100 after:bg-[linear-gradient(to_right,rgba(115,115,115,0)_0%,rgba(25,25,25,0)_100%)] after:content-['']">

            <div
                className="
                animate-infinite-slider
                flex w-[calc(216px*9)] gap-4
            "
            >
                {CARDS.map((card, index) => (
                    <div
                        className="bg-neutral-800 border-emerald-500 slide flex-shrink-0 w-[200px] h-[150px] flex flex-col items-center justify-center border rounded-md"
                        key={index}
                    >
                        <img
                            className="w-full h-[120px] p-2 object-scale-down invert"
                            src={card.img}
                            alt={card.title}
                        />
                        <h3 className="w-10/12 text-xs font-bold text-center h-1/4 text-emerald-500">{card.title}</h3>
                    </div>
                ))}
                {CARDS.map((card, index) => (
                    <div
                        className="bg-neutral-800 border-emerald-500 slide flex-shrink-0 w-[200px] h-[150px] flex flex-col items-center justify-center border rounded-md"
                        key={index}
                    >
                        <img
                            className="w-full h-[120px] p-2 object-scale-down invert"
                            src={card.img}
                            alt={card.title}
                        />
                        <h3 className="w-10/12 text-xs font-bold text-center h-1/4 text-emerald-500">{card.title}</h3>
                    </div>
                ))}
            </div>
        </div>




    );
};
