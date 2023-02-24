import React, { useEffect, useState } from 'react'
import './weather.css'
// import '../../../public/assets/04d.jpeg'
export default function Weather({weatherData, airPollution}) {
    // console.log(weatherData.city);   

    const divStyle = {
        backgroundImage: `url(/assets/${weatherData.weather[0].icon}.jpeg)`,
      };

    const [isNight, setIsNight] = useState(null);  
    const icon = weatherData.weather[0].icon;
     useEffect(()=>{
        if(icon.charAt(icon.length-1) === 'd'){
          setIsNight('');
        }else{
            setIsNight('night-text');
        }
        return()=>{
        }
     },[icon])
    //   console.log(isNight)

    const [aqi, setAqi] = useState('');
    const aqi_value = airPollution.list[0].main.aqi;
    useEffect(()=>{
        switch(aqi_value){
            case 1 :
                setAqi('Good');
                break;
            case 2 :
                setAqi ('Fair');
                break;
            case 3 :
                setAqi('Moderate');
                break;
            case 4 :
                setAqi('Poor');
                break;
            case 5 :
                setAqi('Very Poor');
                break;
            default:
                break;                   
        }
        return()=>{

        }
    },[aqi_value])

    console.log(aqi);

  return (
    <div className='weather-container'>
        <div className='weather-wrapper' style={divStyle}>
            <div className='weather-content'> 
            <div className='weather-head'>
                <video className='weather-logo' src='https://cdn.dribbble.com/userupload/2609068/file/original-30c213cf4aaccbf4bc838938ec10ea3b.mp4' playsInline autoPlay="autoplay" loop={true}></video>
                <div className='weather-head-des'>
                    <p className='head-des-title'>Weather</p>
                    <p className={`head-des-content ${isNight}`}>{weatherData.city}</p>
                </div>
            </div>
            <div className='weather-main'>
                <p className={`weather ${isNight}`}>{Math.floor(weatherData.main.temp)}°c</p>
                <p className={`weather-name ${isNight}`}>{weatherData.weather[0].description}</p>
            </div>
            <div className='weather-details'>
                <div className='weather-detail-ele feelslike'>
                    <p className='detail-label'>Feels Like</p>
                    <p>{Math.floor(weatherData.main.feels_like)}°c</p>
                </div>
                <div className='weather-detail-ele pressure'>
                    <p className='detail-label'>Pressure</p>
                    <p>{Math.floor(weatherData.main.pressure)}mb</p>
                </div>
                <div className='weather-detail-ele humidity'>
                    <p className='detail-label'>humidity</p>
                    <p>{Math.floor(weatherData.main.humidity)}%</p>
                </div>
            </div>
            </div>
        </div>
        <div className='air-wrapper'>
        <div className='weather-content'> 
            <div className='weather-head'>
                <video className='weather-logo' src='https://cdn.dribbble.com/userupload/2609068/file/original-30c213cf4aaccbf4bc838938ec10ea3b.mp4' playsInline autoPlay="autoplay" loop={true}></video>
                <div className='weather-head-des'>
                    <p className='head-des-title'>Air pollution</p>
                    <p className='head-des-content air-content'>what's like today outside</p>
                </div>
            </div>
            <div className='weather-main'>
                <p className='weather air'>{Math.floor(airPollution.list[0].components.co)}<span>carbon monoxide.</span></p>
                <div className='aqi-holder'>
                <p className='weather-name air-name'>{aqi}</p>
                <button className='aqi-tag'>AQI</button>
                </div>
            </div>
            <div className='weather-details'>
                <div className='weather-detail-ele feelslike'>
                    <p className='detail-label'>AQI</p>
                    <p>{airPollution.list[0].main.aqi}</p>
                </div>
                <div className='weather-detail-ele pressure'>
                    <p className='detail-label'>Wind Dir.</p>
                    <p>{weatherData.wind.deg}deg</p>
                </div>
                <div className='weather-detail-ele humidity'>
                    <p className='detail-label'>WindSpeed</p>
                    <p>{weatherData.wind.speed}m/s</p>
                </div>
            </div>
            </div>
        </div>
        <div className='widget'>
            <div className='widget-content'> 
                <div className='widget-ele'>
                    <p className='widget-label'>VISIBILITY</p>
                    <p className='widget-value'>{weatherData.visibility}m</p>
                </div>
                <div className='widget-ele'>
                    <p className='widget-label'>WIND SPEED</p>
                    <p className='widget-value'>{weatherData.wind.speed}km/h</p>
                </div>
                <div className= 'temp-ele'>
                    <div className='maxminTemp'>
                        <p className='widget-label'>max temp.</p>
                        <p className='widget-value'>{Math.floor(weatherData.main.temp_max)}℃</p>
                    </div>
                    <div className='maxminTemp'>
                        <p className='widget-label'>min tmep.</p>
                        <p className='widget-value'>{Math.floor(weatherData.main.temp_min)}℃</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
