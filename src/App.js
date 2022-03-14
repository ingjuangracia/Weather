import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';



function App() {

  const [weather, setWeather] = useState({});
  const [temperature, setTemperature] = useState();
  const [isFareng, setIsFareng] = useState(true);

  

  const success = pos => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1e031eb246317cced30d36f464830763`)
      .then(res => {
        setWeather(res.data);
        setTemperature(((res.data.main.temp) - 273.15) * 9/5 + 32);
      })
  }

  console.log(weather)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);

  }, [])

  const convertTemp = () => {
    if (isFareng) {
      setTemperature((temperature - 32) * 5/9);
      setIsFareng(false);
    } else {
      setTemperature((temperature * 9/5) + 32);
      setIsFareng(true);
    }

  }

  let tempNoDecimal  = temperature;

  return (
    <div className="App">
      <h2><b>Weather App</b></h2>
      <h4>{weather.name}, {weather.sys?.country}</h4>
      <div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
        <h3>{tempNoDecimal?.toFixed()} {isFareng ? `°F` : `°C`}</h3>
        <ul>
          <li>Wind Speed: {weather.wind?.speed} m/s</li>
          <li>Clouds: {weather.clouds?.all} %</li>
          <li>Humidity: {weather.main?.humidity} %</li>
        </ul>
      </div>
      <button onClick={convertTemp}>Degrees °F/°C</button>



    </div>
  );
}

export default App;
