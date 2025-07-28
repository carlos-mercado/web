//import Weather from './Weather';
import sunny from './assets/weather.png';
//import Cloudy from './assets/partly_cloudy.png'
//import Rain from './assets/rain.png'
//import Scattered from './assets/rain_s_c.png'


interface WeatherInfo{
    temp: number;
    desc: string;
}

function WeatherCard(props: WeatherInfo)  {
    
    const today = new Date();
    const dayIndex = today.getDay();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    console.log(props.desc)

    return (
        <div id='weather-card'>
            <h1 id='day'>{dayNames[dayIndex]}</h1>
            <h2 id='temperature'>{props.temp}°</h2>
            <img id='image' src={sunny}></img>
        </div>
    );
};

export default WeatherCard;