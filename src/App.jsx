import { useState } from 'react'
import { WEATHER_API_KEY, WEATHER_API_URL } from './api'
import './App.css'
import Search from './components/search/Search'
import Home from './Home'
import SideHome from './SideHome'

function App() {

  const[weather, setWeather] = useState(null);
  const[forecast, setForecast] = useState(null);
  const[airPollution, setAirPollution] = useState(null);

  // we are going to prop drill here as this is a light project and we only have 3 components
  const handleHomeSearch = (searchData) =>{
    console.log(searchData)
    const [lat, lon] = searchData.value.split(" ");
    const weatherReq = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastReq = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const airPollutionReq = fetch(`${WEATHER_API_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
  
// api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
    Promise.all([weatherReq, forecastReq, airPollutionReq])
    .then( async(res)=>{
      const weatherRes = await res[0].json();
      const forecastRes = await res[1].json();
      const airPollutionRes = await res[2].json();

      setWeather({city:searchData.label, ...weatherRes});
      setForecast({city:searchData.label,...forecastRes});
      setAirPollution({city:searchData.label,...airPollutionRes});
    });
  }

  console.log(weather);
  console.log(forecast);
  console.log(airPollution);

  return (
    <div className="App">
      {/* this component have a prop have extract the search value form
      the search bar on the search component */}
     <Home 
     weather={weather} 
     pollution={airPollution}
     forecast ={forecast}
     mainSeach={handleHomeSearch}
     />
     <SideHome 
     weather={weather} 
     forecast ={forecast}
     />
    </div>
  )
}

export default App;
