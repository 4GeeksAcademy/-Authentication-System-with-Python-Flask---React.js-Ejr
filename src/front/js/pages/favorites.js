import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext'
export default function CharacterCard() {
    const [characters, setCharacters] = useState([])
    const {store, actions} = useContext(Context)
    useEffect(() => {
        async function getCharacters() {
            let response = await fetch("https://www.swapi.tech/api/people")
            let data =  await response.json()
            setCharacters(data.results)
        }
        getCharacters()
    }, [])
    const handleFavorites = (item) => {
        if(store.favorites.includes(item)){
            actions.removeFavorites(item)
        }
        else {
            actions.addFavorites(item)
        }
    }
  return (
    <div className='d-flex col-10 mx-auto overflow-auto'>
        {characters?.map((character, index) => (
            <div key={index} className="card" style={{"minWidth": "18rem"}}>
            <img src="https://ew.com/thmb/kw0Gm2vwP9ChxyHOcMuzw-ddiqI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EW_StarWars_20-1-6c84c9b72c6941ef9f49f96e4d3f0257.jpg" className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
              <Link to={"charcter_description/" + character.uid} className="btn btn-primary">Learn More</Link>
              <button onClick={() => handleFavorites(character.name)}>💖</button>
            </div>
          </div>
        ))}
    </div>
  )
}