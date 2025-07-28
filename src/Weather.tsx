import { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard.tsx'

const Weather = () => {
    interface WeatherData {
        main: {
            temp: number;
            [key: string]: any; // For other properties in main, if needed
        };
        weather: {
            main: string;
            [key: string]: any; // For other properties in weather, if needed
        }[];
    }
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const def = 'visalia';

    const fetchData = async () => {
        try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${def}&units=metric&appid=827b97b57c577002e0aec422c94c2a49`
        );
        setWeatherData(response.data);
        console.log(response.data); //You can see all the weather data in console log
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    function changeUnits(val : number)
    {
        console.log(val);
        console.log(weatherData);
        return Math.floor((val * 9/5) + 32)
    }

        return (
        <div>
        {weatherData && 
            <WeatherCard temp={changeUnits(weatherData.main.temp)} desc={weatherData.weather[0].main}>
            </WeatherCard>
        }
        </div>
    );
};

export default Weather;