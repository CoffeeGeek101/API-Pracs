import React from 'react'
import './App.css'
import Report from './components/report/Report'
export default function SideHome({weather,forecast}) {
  return (
    <div className='sidehome'>
      {weather && <Report 
      weatherData={weather}
      forecastData={forecast}
      />}
    </div>
  )
}
