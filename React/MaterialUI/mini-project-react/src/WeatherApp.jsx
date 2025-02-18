import SearchBox from './SearchBox';
import InfoBox from './InfoBox';
import { useState } from 'react';

/**
 * Main weather application component that manages weather data state
 */
export default function WeatherApp() {
  // Initialize state with empty weather data
  const [weatherInfo, setWeatherInfo] = useState({
    city: '',
    feels_like: 0,
    humidity: 0,
    temp: 0,
    tempMax: 0,
    tempMin: 0,
    weather: '',
  });

  // Handler for updating weather information
  const handleWeatherUpdate = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div className="weather-app">
      <h1>WeatherWise 🌦️</h1>
      <div className="card">
        <SearchBox updateInfo={handleWeatherUpdate} />
        <InfoBox info={weatherInfo} />
      </div>
    </div>
  );
}