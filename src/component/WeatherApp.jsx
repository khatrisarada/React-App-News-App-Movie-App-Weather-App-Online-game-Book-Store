// import React, { useEffect, useState } from 'react';
// import './weather.css';

// function WeatherApp() {
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState(null);
//   const [unit, setUnit] = useState('C'); 
//   const API_KEY = '92e6dfb32adcfd104d6b22d780562c3f'; 
//   const CITY = 'Kathmandu'; 

//   useEffect(() => {
//     // Fetch current weather data
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`)
//       .then((res) => res.json())
//       .then((data) => setWeather(data))
//       .catch((error) => console.error('Error fetching weather data:', error));

//     // Fetch 5-day weather forecast (3-hour intervals)
//     fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`)
//       .then((res) => res.json())
//       .then((data) => {
//         // Group forecast data by day
//         const groupedForecast = groupForecastByDay(data.list);
//         setForecast(groupedForecast);
//       })
//       .catch((error) => console.error('Error fetching forecast data:', error));
//   }, []);

//   const groupForecastByDay = (forecastList) => {
//     const grouped = {};
//     forecastList.forEach((item) => {
//       const date = new Date(item.dt * 1000).toLocaleDateString();
//       if (!grouped[date]) {
//         grouped[date] = [];
//       }
//       grouped[date].push(item);
//     });
//     return Object.keys(grouped).map((date) => {
//       return {
//         date,
//         temp: grouped[date][0].main.temp, // Use the first item's temperature for simplicity
//         icon: grouped[date][0].weather[0].icon, // Use the first item's icon
//         description: grouped[date][0].weather[0].description, // Use the first item's description
//       };
//     });
//   };

//   const toggleUnit = () => {
//     setUnit(unit === 'C' ? 'F' : 'C');
//   };

//   const convertTemp = (temp) => {
//     return unit === 'C' ? temp : (temp * 9 / 5) + 32;
//   };

//   return (
//     <div className="weather-container">
//       <div className="weather-card">
//         <h1 className="text-3xl font-bold text-center text-blue-900">Weather App</h1>
//         {weather && weather.weather && weather.weather[0] ? (
//           <div className="p-8">
//             <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
//               Current Weather in {weather.name}
//             </div>
//             <div className="flex items-center">
//               <img
//                 src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//                 alt="Weather icon"
//                 className="weather-icon"
//               />
//               <div>
//                 <p className="block mt-1 text-lg leading-tight font-medium text-black">
//                   {weather.weather[0].main}
//                 </p>
//                 <p className="mt-2 weather-description">{weather.weather[0].description}</p>
//               </div>
//             </div>
//             <p className="mt-4 temperature">
//               Temperature: {convertTemp(weather.main.temp).toFixed(1)}°{unit}
//               <button onClick={toggleUnit} className="unit-toggle ml-2">
//                 Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
//               </button>
//             </p>
//             <p className="text-gray-600">Humidity: {weather.main.humidity}%</p>
//             <p className="text-gray-600">Wind Speed: {weather.wind.speed} m/s</p>
//           </div>
//         ) : (
//           <p className="loading-text">Loading weather data...</p>
//         )}
//       </div>

//       {forecast ? (
//         <div className="mt-10">
//           <h2 className="text-2xl font-bold text-center text-blue-900">7-Day Forecast</h2>
//           <div className="forecast-grid">
//             {forecast.map((day, index) => (
//               <div key={index} className="forecast-card">
//                 <p className="forecast-date">{day.date}</p>
//                 <img
//                   src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
//                   alt="Weather icon"
//                   className="weather-icon"
//                 />
//                 <p className="forecast-temp">{convertTemp(day.temp).toFixed(1)}°{unit}</p>
//                 <p className="forecast-description">{day.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p className="loading-text">Loading forecast data...</p>
//       )}
//     </div>
//   );
// }

// export default WeatherApp;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric"); // metric for Celsius, imperial for Fahrenheit

  const API_KEY = "92e6dfb32adcfd104d6b22d780562c3f";
  const CITY = "Kathmandu";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=${unit}&appid=${API_KEY}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeather();
  }, [unit]);

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return <WiDaySunny size={50} color="gold" />;
      case "Clouds":
        return <WiCloud size={50} color="gray" />;
      case "Rain":
        return <WiRain size={50} color="blue" />;
      case "Snow":
        return <WiSnow size={50} color="lightblue" />;
      default:
        return <WiCloud size={50} color="gray" />;
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-400 to-purple-600 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <button
        onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
        className="bg-white text-black px-4 py-2 rounded-full mb-4"
      >
        Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>

      {weather ? (
        <div className="w-full max-w-md bg-white text-black p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">{weather.city.name}</h2>
          <p>{weather.list[0].weather[0].description}</p>
          <div className="flex items-center justify-center my-4">
            {getWeatherIcon(weather.list[0].weather[0].main)}
            <span className="text-4xl ml-2">
              {Math.round(weather.list[0].main.temp)}° {unit === "metric" ? "C" : "F"}
            </span>
          </div>

          <h3 className="text-lg font-semibold mt-4">7-Day Forecast</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {weather.list.slice(0, 7).map((day, index) => (
              <div key={index} className="flex justify-between p-2 bg-gray-200 rounded">
                <span>{new Date(day.dt * 1000).toLocaleDateString()}</span>
                <span>{getWeatherIcon(day.weather[0].main)}</span>
                <span>{Math.round(day.main.temp)}°</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherApp;