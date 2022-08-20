import React, { useEffect, useState } from "react";

const Temperatura = () => {
  const [weather, setWeather] = useState(null);

  const weatherApi =
    "https://api.openweathermap.org/data/2.5/weather?lat=9.9199094&lon=-84.1403284&appid=96fe99c4f31628147b370103832da32a";

  useEffect(() => {
    fetch(weatherApi)
      .then((data) => data.json())
      .then((data) => setWeather(data))
      .catch((err) => err);
  }, []);

  const hightemp = () => {
    if (Math.trunc(weather.main.temp - 273) >= 20) {
      return "row text-center text-light bg-danger bg-gradient rounded align-items-center pt-4 mb-3";
    } else {
      return "row text-center text-light bg-secondary bg-gradient rounded align-items-center pt-4 pb-4 mb-3";
    }
  };

  const highAlert = () => {
    if (Math.trunc(weather.main.temp - 273) >= 20) {
      return (
        <div className="row">
          <div className="col"></div>
          <div className="col align-items-center bg-alert bg-gradient rounded">
            <p className="text-dark mt-2">
              Por favor ten en cuenta que la temperatura está por encima de los
              30 grados, los perritos podrian quemarse sus patitas. ¡Dales mucha
              agua porque se pueden dehidratar!
            </p>
          </div>
          <div className="col"></div>
        </div>
      );
    } else {
      return "";
    }
  };

  return (
    <div>
      {weather != null ? (
        <div className={hightemp()}>
          <div className="col">Ciudad: {weather.name}</div>
          <div className="col">
            Temperatura: {Math.round(weather.main.temp - 273)}°C
          </div>
          <div className="col">Humedad: {weather.main.humidity}%</div>
          {highAlert()}
        </div>
      ) : (
        <div className="row text-center text-light bg-secondary bg-gradient rounded align-items-center pt-4 pb-4 mb-3">
          <div className="col">Cargando Ciudad</div>
          <div className="col">Cargando Temperatura</div>
          <div className="col">Cargando Humedad</div>
        </div>
      )}
    </div>
  );
};

export default Temperatura;
