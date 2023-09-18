import React from "react";






// <!DOCTYPE html>
// <html lang="es">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Tabla de Componentes</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//         }

//         table {
//             width: 100%;
//             border-collapse: collapse;
//             margin-bottom: 20px;
//         }

//         th, td {
//             border: 1px solid #ccc;
//             padding: 10px;
//             text-align: center;
//         }

//         .button-cell {
//             width: 50%;
//             background-color: #FFD700; /* Naranja pastel */
//             padding: 20px;
//         }

//         .button-code {
//             width: 50%;
//             background-color: #FFF;
//             padding: 20px;
//         }

//         .button {
//             display: inline-block;
//             background-color: #FFA500; /* Naranja vivo */
//             color: #FFF;
//             padding: 3px 9px; /* Tamaño modificado */
//             font-size: 16px;
//             border: none;
//             cursor: pointer;
//             border-radius: 5px;
//         }

//         .button:hover {
//             background-color: #FF8C00; /* Naranja más intenso */
//         }
//     </style>
// </head>
// <body>

//     <table>
//         <tr>
//             <td class="button-cell">
//                 <button class="button">Mi Botón</button>
//             </td>
//             <td class="button-code">
//                 <pre>&lt;button class="button"&gt;Mi Botón&lt;/button&gt;</pre>
//             </td>
//         </tr>
//         <!-- Puedo añadir más filas según sea necesario -->
//     </table>

// </body>
// </html>

export const ButtonView = () => {
    return (
        <div className="container w-50">
            <h1 className="mt-5">Buttons</h1>
            <p className="fs-5 mt-2 mb-3">The <span style={{"color":"#FD5812"}}>c-btn component</span> replaces the standard html button with a material design theme and a multitude of options. Any color helper class can be used to alter the background or text color.</p>
            <div className="container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
                <button type="button" class="c-btn c-btn-dark">Dark</button>
                <button type="button" class="c-btn c-btn-slate">Slate</button>
                <button type="button" class="c-btn c-btn-gloomy">Gloomy</button>
                <button type="button" class="c-btn c-btn-silver">Silver</button>
                <button type="button" class="c-btn c-btn-risk">Risk</button>
                <button type="button" class="c-btn c-btn-caution">Caution</button>
                <button type="button" class="c-btn c-btn-gold">Gold</button>
                <button type="button" class="c-btn c-btn-lime">Lime</button>
                <button type="button" class="c-btn c-btn-mint">Mint</button>
                <button type="button" class="c-btn c-btn-win">Win</button>
                <button type="button" class="c-btn c-btn-azure">Azure</button>
                <button type="button" class="c-btn c-btn-aqua">Aqua</button>
                <button type="button" class="c-btn c-btn-lavender">Lavender</button>
                <button type="button" class="c-btn c-btn-purple">Purple</button>
                <button type="button" class="c-btn c-btn-lollypop">Lollypop</button>
                <button type="button" class="c-btn c-btn-fog">Fog</button>
                <button type="button" class="c-btn c-btn-componentify">Componentify</button>
                <button type="button" class="c-btn c-btn-mocca">Mocca</button>
            </div>
            <h4 className="mt-3 mb-3">Hovered Buttons</h4>
            <p className="fs-5 mt-2 mb-3">Hover over the buttons below to see the <span style={{"color":"#FD5812"}}>colors</span> change.</p>
            <div className="container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
                <button type="button" class="c-btn c-btn-dark c-btn-dark-hover">Dark</button>
                <button type="button" class="c-btn c-btn-slate c-btn-slate-hover">Slate</button>
                <button type="button" class="c-btn c-btn-gloomy c-btn-gloomy-hover">Gloomy</button>
                <button type="button" class="c-btn c-btn-silver c-btn-silver-hover">Silver</button>
                <button type="button" class="c-btn c-btn-risk c-btn-risk-hover">Risk</button>
                <button type="button" class="c-btn c-btn-caution c-btn-caution-hover">Caution</button>
                <button type="button" class="c-btn c-btn-gold c-btn-gold-hover">Gold</button>
                <button type="button" class="c-btn c-btn-lime c-btn-lime-hover">Lime</button>
                <button type="button" class="c-btn c-btn-mint c-btn-mint-hover">Mint</button>
                <button type="button" class="c-btn c-btn-win c-btn-win-hover">Win</button>
                <button type="button" class="c-btn c-btn-azure c-btn-azure-hover">Azure</button>
                <button type="button" class="c-btn c-btn-aqua c-btn-aqua-hover">Aqua</button>
                <button type="button" class="c-btn c-btn-lavender c-btn-lavender-hover">Lavender</button>
                <button type="button" class="c-btn c-btn-purple c-btn-purple-hover">Purple</button>
                <button type="button" class="c-btn c-btn-lollypop c-btn-lollypop-hover">Lollypop</button>
                <button type="button" class="c-btn c-btn-fog c-btn-fog-hover">Fog</button>
                <button type="button" class="c-btn c-btn-componentify c-btn-componentify-hover">Componentify</button>
                <button type="button" class="c-btn c-btn-mocca c-btn-mocca-hover">Mocca</button>
            </div>
            {/* const Componente = ({ nombre, codigo }) => {
  return (
    <tr>
      <td>
        <button>{nombre}</button>
      </td>
      <td>
        <pre>{codigo}</pre>
      </td>
    </tr>
  );
};

const VistaDeBotones = () => {
  const botones = [
    { nombre: "Botón 1", codigo: "<button>Botón 1</button>" },
    { nombre: "Botón 2", codigo: "<button>Botón 2</button>" },
    // Agrega más botones según sea necesario
  ];

  return (
    <div>
      <h1>Vista de Botones</h1>
      <table>
        <thead>
          <tr>
            <th>Botón</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          {botones.map((boton, index) => (
            <Componente key={index} nombre={boton.nombre} codigo={boton.codigo} />
          ))}
        </tbody>
      </table>
    </div>
  );
}; */}

{/* export default VistaDeBotones; */}
        </div>
    )
}