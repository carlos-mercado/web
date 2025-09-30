//import Weather from './Weather';
import sunny from './assets/sunny.png';
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
    //<img id='image' src={sunny}></img>

    return (
        <div id='weather-card'>
            <div className="left">
                <h2 id='day'>{dayNames[dayIndex]}</h2>
                <h1 id='temperature'>{props.temp}°</h1>
                <p>Visalia, CA</p>
            </div>
            <div className='right'>
                <img src={sunny}></img>
            </div>
        </div>
    );
};

export default WeatherCard;