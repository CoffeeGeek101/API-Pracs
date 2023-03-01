import React, { useState } from 'react'
import Search from './components/search/Search'
import './App.css'
import Weather from './components/weather/Weather';
import Forecast from './components/forecast/Forecast';

export default function ({mainSeach, weather, pollution,forecast}) {

    const [search, setSearch] = useState(null);


    const handleOnSeachChange = (searchData) =>{
        setSearch(searchData);
        mainSeach(searchData);
    }


  return (
    <div className='home'>
        <Search  OnSeachChange={handleOnSeachChange}/>
        { weather && <Weather 
        weatherData={weather}
        airPollution={pollution}
        />}
        {forecast && <Forecast curForcast={forecast}/>}
    </div>
  )
}
