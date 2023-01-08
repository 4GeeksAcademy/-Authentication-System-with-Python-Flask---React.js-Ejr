import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/month.css";
import { Calendar } from "./Calendar.jsx";

export const Month = () => {
  return (
    <div className="position-absolute top-0 start-50 border border-dark">
        <div className="text-center bg-info"><strong>Enero 2023</strong></div>
      <table class="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col">Su</th>
            <th scope="col">Mo</th>
            <th scope="col">Tu</th>
            <th scope="col">We</th>
            <th scope="col">Th</th>
            <th scope="col">Fr</th>
            <th scope="col">Sa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><div className="bg-warning td">1</div></td>
            <td><div className="bg-warning td">2</div></td>
            <td><div className="bg-warning td">3</div></td>
            <td><div className="bg-warning td">4</div></td>
            <td><div className="bg-warning td">5</div></td>
            <td><div className="bg-warning td">6</div></td>
            <td><div className="bg-warning td">7</div></td>
          </tr>
          <tr>
            <td><div className="bg-warning td">8</div></td>
            <td><div className="bg-warning td">9</div></td>
            <td><div className="bg-warning td">10</div></td>
            <td><div className="bg-warning td">11</div></td>
            <td><div className="bg-warning td">12</div></td>
            <td><div className="bg-warning td">13</div></td>
            <td><div className="bg-warning td">14</div></td>
          </tr>
          <tr>
            <td><div className="bg-warning td">15</div></td>
            <td><div className="bg-warning td">16</div></td>
            <td><div className="bg-warning td">17</div></td>
            <td><div className="bg-warning td">18</div></td>
            <td><div className="bg-warning td">19</div></td>
            <td><div className="bg-warning td">20</div></td>
            <td><div className="bg-warning td">21</div></td>
          </tr>
          <tr>
            <td><div className="bg-warning td">22</div></td>
            <td><div className="bg-warning td">23</div></td>
            <td><div className="bg-warning td">24</div></td>
            <td><div className="bg-warning td">25</div></td>
            <td><div className="bg-warning td">26</div></td>
            <td><div className="bg-warning td">27</div></td>
            <td><div className="bg-warning td">28</div></td>
          </tr>
          <tr>
            <td><div className="bg-warning td">29</div></td>
            <td><div className="bg-warning td">30</div></td>
            <td><div className="bg-warning td">31</div></td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
