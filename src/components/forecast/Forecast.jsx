import React from 'react'
import './forecast.css'
import {motion} from 'framer-motion'
export default function Forecast({curForcast}) {
    // console.log(curForcast.list.slice(0,8).map((hourlyForecast)=>{
    //    return hourlyForecast.dt_txt.slice(11,16);
    // }));
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{delay:0.5, ease:"easeInOut"}}
    className='forecast-container'>
        <div className='forecast-wrapper'>
            <p className='forecast-title'>Temperature.</p>
            <div className='forecast-card-holder'>
                {curForcast.list.slice(0,8).map((hourlyFor, index)=>(
                <div className='forecast-card' key={index}>
                    <p className='timeOfDay'>{hourlyFor.dt_txt.slice(11,16)}</p>
                    <img className='weather-sign' src={`icons/${hourlyFor.weather[0].icon}.png`}/>
                    <div className='forecast-detail'>
                        <p className='temperature'>{Math.floor(hourlyFor.main.temp)}℃</p>
                        <p className='weather-name'>{hourlyFor.weather[0].main}</p>
                    </div>
                </div>
                ))
            }
            </div>
        </div>
    </motion.div>
  )
}