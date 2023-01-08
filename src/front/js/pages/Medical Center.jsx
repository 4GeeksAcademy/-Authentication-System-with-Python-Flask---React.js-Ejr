import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/calendar.css";
import { Calendar } from "./Calendar.jsx";

export const MedicalCenter = () => {
  return (
    <div className="position-absolute top-0 start-0">
      <table class="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Centro Medico</th>
            <th scope="col">Comuna</th>
            <th scope="col">Direccion</th>
            <th scope="col">Horario de Atención</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Centro Catolico</td>
            <td>Providencia</td>
            <td>Pedro de Valdivia #3420</td>
            <td>09:00 - 18:00</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>ServiMED</td>
            <td>Providencia</td>
            <td>Manuel Montt #2250</td>
            <td>12:00 - 18:00</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>MediKine</td>
            <td>Maipu</td>
            <td>Arturo Pratt #032</td>
            <td>08:00 - 12:00</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>MaculMedi</td>
            <td>Macul</td>
            <td>AV Macul #380</td>
            <td>09:00 - 18:00</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>TraumaCenter</td>
            <td>Ñuñoa</td>
            <td>Irarrazaval #1059</td>
            <td>13:00 - 18:00</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>San Victor</td>
            <td>Santiago Centro</td>
            <td>San Martin #150</td>
            <td>10:00 - 15:00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
