import { useState } from 'react'
import './App.css'
import Search from './components/search/Search'

function App() {

  // we are going to prop drill here as this is a light project and we only have 3 components
  const handleOnSeachChange = (searchData) =>{
    console.log(searchData)
  }

  return (
    <div className="App">
      {/* this component have a prop have extract the search value form
      the search bar on the search component */}
     <Search OnSeachChange={handleOnSeachChange}/>
    </div>
  )
}

export default App
