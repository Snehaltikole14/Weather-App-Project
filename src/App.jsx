import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const API_KEY = 'c2f14f6cd112c4ad6963b7aa4dafb276'; 

  const getWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error.info);
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to fetch weather data.");
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 flex flex-col items-center justify-center p-6">
      <h1 className="text-7xl font-bold text-white mb-10">React Weather App</h1>

      <div className="flex items-center gap-2 mb-10">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 m-4 w-90 h-15 rounded-2xl border-2 border-black-400 shadow-2xl focus:outline-none"
        />
        <button
          onClick={getWeather}
          className="bg-white   h-15 text-blue-700 px-4 py-2 rounded-2xl hover:bg-blue-100"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-800">{error}</p>}

      {weather && (
        <div className=" text-white from-black-600 mb-10 p-8 text-center w-80 ">
          <h2 className="text-3xl font-semibold">{weather.location.name}</h2>
          <p className="text-2xl">
            Temperature: {weather.current.temperature}°C
          </p>
          <p>Pressure:{weather.current.pressure}</p>
        
          <p className="capitalize">
            {weather.current.weather_descriptions[0]}
          </p>
          <img
            src={weather.current.weather_icons[0]}
            alt="Weather icon"
            className="mx-auto mt-2"
          />
        </div>
      )}
    </div>
  );
}

export default App;
