import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import "./InfoBox.css"


export default function InfoBox({info}) {
    const INIT_URL = "https://img.etimg.com/thumb/msid-112463905,width-300,height-225,imgsize-1229233,resizemode-75/imd-issues-yellow-alert-in-6-districts-of-maharashtra.jpg"
    const HOT_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwwj85lbvL2hyPXScqvLxi35TD48CciA5A6Q&s"
    const COLD_URL = "https://i0.wp.com/pune.news/wp-content/uploads/2024/01/Winter-Morning.webp?resize=800%2C422&ssl=1"
    const RAIN_URL = "https://images.indianexpress.com/2024/04/rain1-4col.jpg?w=414"
    return (
        <div className="InfoBox">
            <h1>Weather Info - { info.weather }</h1>
            <div className='cardContainer'>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={info.humidity > 80 ? RAIN_URL : info.temp > 15 ? HOT_URL : COLD_URL}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {info.city}
                    </Typography>
                    <Typography variant="body2" color='text.secondary' component={"span"}>
                        <p>Temperature: {info.temp}&deg;C</p>
                        <p>Feels Like: {info.feels_like}&deg;C</p>
                        <p>Humidity: {info.humidity}</p>
                        <p>Max Temperature: {info.tempMax}&deg;C</p>
                        <p>Min Temperature: {info.tempMin}&deg;C</p>
                        <p>The weather can be described as <i> {info.weather} </i> and feels like {info.feels_like} &deg;C</p>
                    </Typography>
                </CardContent>
            </Card>
            </div>
        </div>
    )
}



