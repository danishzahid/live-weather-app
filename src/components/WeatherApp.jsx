// WeatherApp.jsx

import React, { useEffect, useState } from "react";
import styles from "./WeatherApp.module.css"; // Adjust the path based on your project structure

export const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchedWeatherData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude.toFixed(2);
          const long = position.coords.longitude.toFixed(2);

          const response = await fetch(
            `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${long}`
          );
          const data = await response.json();
          setWeatherData(data);
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
        <div className={styles.container}>
          <h2>Weather at {weatherData.name}</h2>
          <p className={styles.weatherInfo}>
            Temperature: {weatherData.main.temp}°C
          </p>
          <p className={styles.weatherInfo}>
            Weather: {weatherData.weather[0].main}
          </p>
          <img
            src={weatherData.weather[0].icon}
            alt={weatherData.weather[0].description}
            className={`${styles.weatherIcon} ${
              weatherData.weather[0].main === "Clear"
                ? styles.sun
                : weatherData.weather[0].main === "Clouds"
                ? styles.cloud
                : weatherData.weather[0].main === "Rain"
                ? styles.rain
                : weatherData.weather[0].main === "Smoke"
                ? styles.rain
                : ""
            }`}
          />
        </div>
      )}
    </>
  );
};
