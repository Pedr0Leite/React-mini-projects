import React, { useState } from "react";
import axios from 'axios';
import PokemonSearchFind from "./PokemonSearchFind";

export default function InputSearchPokemon() {

  const [searchInfo, setSearchInfo] = useState('');
  const [pokemonSearchURL, setpokemonSearchURL] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [pokemonSearchFind, setPokemonSearchFind] = useState({id:'', baseExp:'', height:'', weight:'', order:''});
  // const [pokemonSearchFind, setPokemonSearchFind] = useState('');

  const [loading, setLoading] = useState(true);


  const handleChange = (e) => {
    setSearchInfo(e.target.value)
    setPokemonSearchFind('')
  }

  
  const handleClick = (e) => {
    // e.preventDefault();
    // setLoading(true);
    let pokemonInfoResult = {};
    
    axios.get(pokemonSearchURL + searchInfo).then(res =>{
      // setLoading(false);
      setpokemonSearchURL('https://pokeapi.co/api/v2/pokemon/');

      pokemonInfoResult.baseExp = res.data.base_experience;
      pokemonInfoResult.height = res.data.height;
      pokemonInfoResult.id = res.data.id;
      pokemonInfoResult.weight = res.data.weight;
      pokemonInfoResult.order = res.data.order;

      // setPokemonSearchFind(pokemonInfoResult.id);
      setPokemonSearchFind({id:pokemonInfoResult.id, baseExp:pokemonInfoResult.baseExp, height:pokemonInfoResult.height, weight:pokemonInfoResult.weight, order:pokemonInfoResult.order});

    }).catch((e) =>{
      console.error('setPokemonSearchFind ERROR: ' + e);
      setPokemonSearchFind('Invalid Pokemon!')
    })

    //prevent race conditions from multiple requests
    // return () => cancel()
  }

  // if(loading) return "Loading Pokemon Info..."

  return (
    <div>
      <h2>Search your pokemon info!</h2>
        <label>Inserted value: {searchInfo}</label>
        <br />
        <input type="text" value={searchInfo} onChange={handleChange}></input>
        <br />
        <button onClick={handleClick}>Search it!</button>
        {pokemonSearchFind && <PokemonSearchFind pokemonSearched={pokemonSearchFind}/>}
    </div>
  );
}
