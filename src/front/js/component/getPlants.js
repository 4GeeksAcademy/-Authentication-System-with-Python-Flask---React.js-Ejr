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



  const styles = {
    tableHeader: {
      fontWeight: 300,
      fontSize: '2em',
    },
    tableHeaderColumn: {
      fontSize: '1em',
      padding: '0 0.5em',
    },
  };
  return (
    <>
      <section className="tables">
        <div className="text-center">Inventario de plantas</div>
      <div className="table-container bg-pink mt-1">
        
        <div>34</div>
        <div>35</div>
        <div>36</div>
        <div>37</div>
        <div>38</div>
        <div>39</div>
        <div>40</div>
        <div>41</div>
      </div>
      {plants.map((item, index) => (
        <>
        <div className="text-center mt-2">{item.name}</div>
        <div className="table-container border-left-dark mt-1" key={index}>
          
          <div>{item.size34}</div>
          <div>{item.size35}</div>
          <div>{item.size36}</div>
          <div>{item.size37}</div>
          <div>{item.size38}</div>
          <div>{item.size39}</div>
          <div>{item.size40}</div>
          <div>{item.size41}</div>
        </div>
        </>
))}

      </section>
      
    </>
  );
}
