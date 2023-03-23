import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import "./search.css";
import { GET_CITIES } from "../../api";
import { getGeoCities } from "../../api";  
import {motion} from 'framer-motion';

export default function Search({ OnSeachChange }) {
  const [searchValue, setSearchValue] = useState(null);

    // this is the API call for the AsyncPaginate.(can make this an async function, but not required as we are already using Asyncpaginate)
    // we imported the API method and header and hid the URL, specifies some parameters for the APIs
  const loadOptions = (InputValue) => {
    return fetch(`${GET_CITIES}/cities?minPopulation=1000000&namePrefix=${InputValue}`, getGeoCities)
	.then(response => response.json())
	.then(response => {
        // we are formatting the response, as AsyncPaginate, which has a `options attribute` which take value and label.
        // we need lalitude and longitude for the OPEN_WEATHER API.
        return {
            // mapped the response as we only need the selected data not the whole chunk of data
            options : response.data.map((city)=>{
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                }
            })
        }
    })
	.catch(err => console.error(err));
}

  const handleSearch = (searchData) => {
    //updating the value of the state
    setSearchValue(searchData);
    //running the prop of the parent component so that we can use this data on the parent component.
    OnSeachChange(searchData);
  };

 
//   console.log(test);

  const [wish, setWish] = useState('');
  const hour = new Date().getHours();
//  console.log(hour)
  useEffect(()=>{
    if(hour > 3 && hour < 12){
        setWish('Good Morning');
    }else if (hour >= 12 && hour < 18){
        setWish('Good Afternoon');
    }else{
        setWish('Good Evening');
    }
  },[hour]);


  return (
    <div className="search-container">
        <div className="search-wrapper">
        <div className="wishing-hero">
            <img className="wishing-photo" src="https://cdn.dribbble.com/users/1008875/screenshots/5300828/media/f74758f97034b5214a078bd47292275b.png?compress=1&resize=1600x1200&vertical=top"/>
            <div className="wish-txt">
                <p className="wish-txt-i">Hello,</p>
                <motion.p 
                initial={{opacity: 0, y: -100}}
                animate={{opacity:1, y:0}}
                transition={{type:"spring", delay:0.5}}
                className="wish-txt-ii">{wish}.</motion.p>
            </div>
        </div>
      {/* this component is the search bar with auto-complete features */}
      <AsyncPaginate
      styles={{
        container : (baseStyles) =>({
            ...baseStyles,
            minWidth: '400px',
        }),
        control : (baseStyles) =>({
            ...baseStyles,
            borderRadius: '20px',
            padding: '3px 5px',
            backgroundColor: '#EFEFEF'
        }),
        option : (baseStyles) => ({
            ...baseStyles,
            fontWeight: '500',
            fontSize: '15px'
        }),
        placeholder : (baseStyles) =>({
            ...baseStyles,
            fontSize: '13px',
            color: 'black',
        }),
      }}
      className="smart-search"
        placeholder="search by cities..."
        debounceTimeout={600}
        value={searchValue} //we are setting the value inside the input
        onChange={handleSearch} //listening to any change of value made inside the input by user
        loadOptions={loadOptions} //will make the async request to the server for every prefix as we are typing
      />
      </div>
    </div>
  );
}
