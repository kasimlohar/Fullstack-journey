import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import "../styles/InfoBox.css";

// Image URLs for different weather conditions
const WEATHER_IMAGES = {
  RAIN: "https://images.indianexpress.com/2024/04/rain1-4col.jpg?w=414",
  HOT: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwwj85lbvL2hyPXScqvLxi35TD48CciA5A6Q&s",
  COLD: "https://i0.wp.com/pune.news/wp-content/uploads/2024/01/Winter-Morning.webp?resize=800%2C422&ssl=1"
};

/**
 * Component to display weather information
 * @param {Object} info - Weather data object
 */
export default function InfoBox({ info }) {
  // Select appropriate image based on weather conditions
  const getWeatherImage = () => {
    if (info.humidity > 80) return WEATHER_IMAGES.RAIN;
    if (info.temp > 15) return WEATHER_IMAGES.HOT;
    return WEATHER_IMAGES.COLD;
  };

  return (
    <div className="InfoBox">
      {info.city ? (
        <Card className="weather-card">
          <CardMedia
            component="img"
            height="140"
            image={getWeatherImage()}
            alt={`Visual representation of ${info.weather} in ${info.city}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {info.city}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <p>Current Temperature: {info.temp}°C</p>
              <p>Feels Like: {info.feels_like}°C</p>
              <p>Humidity: {info.humidity}%</p>
              <p>High: {info.tempMax}°C | Low: {info.tempMin}°C</p>
              <p className="weather-description">{info.weather}</p>
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <p className="placeholder">Search for a city to view weather data</p>
      )}
    </div>
  );
}