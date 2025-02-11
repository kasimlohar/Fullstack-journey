import SearchBox from './SearchBox'
import InfoBox from './InfoBox'
import { useState } from 'react'

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "wonderland",
        feels_like: 22.51,
        humidity: 37,
        temp: 23.17,
        tempMax: 23.17,
        tempMin: 23.17,
        weather: "clear sky"
    });
    

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }
    
    return (
        <div style={{textAlign: "center"}}>
            <h2>Weather App by Delta </h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}