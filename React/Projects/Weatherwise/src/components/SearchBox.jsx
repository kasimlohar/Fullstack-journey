import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../styles/SearchBox.css";

/**
 * Search component for fetching weather data from API
 * @param {Function} updateInfo - Callback to update parent component with new weather data
 */
export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const API_URL = import.meta.env.VITE_API_BASE_URL; 

  /**
   * Fetches weather data from OpenWeather API
   * @param {string} city - City name to search for
   */
  const getWeatherInfo = async (city) => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }

      const data = await response.json();
      return {
        city: data.name,
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        feels_like: data.main.feels_like,
        weather: data.weather[0].description,
      };
    } catch (err) {
      throw err;
    }
  };

  // Handle form submission
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const trimmedCity = city.trim();
    
    if (!trimmedCity) {
      setError(true);
      return;
    }

    try {
      const newInfo = await getWeatherInfo(trimmedCity);
      setCity("");
      setError(false);
      updateInfo(newInfo);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className='SearchBox'>
      <form onSubmit={handleSubmit}>
        <TextField 
          id="city" 
          label="Enter City Name" 
          variant="outlined" 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
          required 
          fullWidth
        />
        <Button 
          variant="contained" 
          type='submit' 
          size="large"
          sx={{ mt: 2 }}
        >
          Get Weather
        </Button>
        {error && <p className="error">Please enter a valid city name</p>}
      </form>
    </div>
  );
}