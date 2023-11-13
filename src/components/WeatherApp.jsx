import { useEffect, useState } from "react";

export const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchedWeatherData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude.toFixed(2);
          const long = position.coords.longitude.toFixed(2);

          console.log(lat);
          console.log(long);

          const response = await fetch(
            `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${long}`
          );
          const data = await response.json();
          setWeatherData(data);

          console.log(data);
        });
      } catch (e) {
        console.log("Geolocation not supported by browser. " + e);
      }
    };
    fetchedWeatherData();
  }, []);

  return (
    <>
      {weatherData && (
        <div>
          <h2>Weather at {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].main}</p>
          <img
            src={weatherData.weather[0].icon}
            alt={weatherData.weather[0].description}
          />
        </div>
      )}
    </>
  );
};
