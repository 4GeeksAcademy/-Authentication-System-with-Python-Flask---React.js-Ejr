import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import rigo from "../../img/rigo-baby.jpg";

export default function GetPlants() {
  const { store, actions } = useContext(Context);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    actions.getPlants();
  }, []);

  useEffect(() => {
    setPlants(store.plants);
  }, [store.plants]);

  return (
    <>
      <div className="table-container container bg-pink mt-3 ">
        <table className="w-100 rounded  rounded" style={{ fontWeight: 300 }}>
          <thead>
            <tr>
              <th style={{ fontWeight: 300 }}>Nombre de la planta</th>
              <th>34</th>
              <th>35</th>
              <th>36</th>
              <th>37</th>
              <th>38</th>
              <th>39</th>
              <th>40</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((item, index) => (
              <tr key={index} className="separador">
                <td>
                  <span>{item.name}</span>
                </td>
                <td>
                  <span>{item.size34}</span>
                </td>
                <td>
                  <span>{item.size35}</span>
                </td>
                <td>
                  <span>{item.size36}</span>
                </td>
                <td>
                  <span>{item.size37}</span>
                </td>
                <td>
                  <span>{item.size38}</span>
                </td>
                <td>
                  <span>{item.size39}</span>
                </td>
                <td>
                  <span>{item.size40}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </>
  );
}
