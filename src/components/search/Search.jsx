import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import "./search.css";
import { GET_CITIES } from "../../api";
import { getGeoCities } from "../../api";  

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

  return (
    <div className="search">
      {/* this component is the search bar with auto-complete features */}
      <AsyncPaginate
        placeholder="search by cities..."
        debounceTimeout={600}
        value={searchValue} //we are setting the value inside the input
        onChange={handleSearch} //listening to any change of value made inside the input by user
        loadOptions={loadOptions} //will make the async request to the server for every prefix as we are typing
      />
    </div>
  );
}
