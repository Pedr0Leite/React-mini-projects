import React, { useState } from "react";
import axios from 'axios';
import PokemonSearchFind from "./PokemonSearchFind";

export default function InputSearchPokemon() {

  const [searchInfo, setSearchInfo] = useState('');
  const [pokemonSearchURL, setpokemonSearchURL] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [pokemonSearchFind, setPokemonSearchFind] = useState({});

  const [loading, setLoading] = useState(true);


  const handleChange = (e) => {
    setSearchInfo(e.target.value)
    setPokemonSearchFind('')
  }

  
  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    
    axios.get(pokemonSearchURL + searchInfo).then(res =>{
      setLoading(false);
      setpokemonSearchURL('https://pokeapi.co/api/v2/pokemon/');

      const { name, base_experience, height, id, weight, order, types } = res.data;

      const nameUpperCase = name.charAt(0).toUpperCase() + name.slice(1);

      const pokemonIcon = res.data.sprites.other['official-artwork'].front_default ? res.data.sprites.other['official-artwork'].front_default : res.data.sprites.front_default;

      setPokemonSearchFind({name:nameUpperCase, id:id, base_experience:base_experience, height:height, weight:weight, order:order, icon: pokemonIcon, types: types});

    }).catch((e) =>{
      console.error('setPokemonSearchFind ERROR: ' + e);
      setPokemonSearchFind('Invalid Pokemon!')
    })

    //prevent race conditions from multiple requests
    // return () => cancel()
  }
  
  const handleClickRandom = (e) => {
    setSearchInfo('');
    const randomId = Math.floor(Math.random() * 809);

    axios.get(pokemonSearchURL + randomId).then(res =>{
      setLoading(false);
      setpokemonSearchURL('https://pokeapi.co/api/v2/pokemon/');

      const { name, base_experience, height, id, weight, order, types } = res.data;
      
      const nameUpperCase = name.charAt(0).toUpperCase() + name.slice(1);

      const pokemonIcon = res.data.sprites.other['official-artwork'].front_default ? res.data.sprites.other['official-artwork'].front_default : res.data.sprites.front_default;

      setPokemonSearchFind({name:nameUpperCase, id:id, base_experience:base_experience, height:height, weight:weight, order:order, icon: pokemonIcon, types: types});

    }).catch((e) =>{
      console.error('setPokemonSearchFind ERROR: ' + e);
      setPokemonSearchFind('Invalid Pokemon!')
    })
  }

  //Max number of id=809 (Generation VII)

  return (
    <div className="content-center">
      <h2 className="text-3xl font-bold underline text-center">Search your pokemon info!</h2>
      <h4 className="text-center">Input a number id or a name</h4>
      <h5 className="text-center">*This search only goes up to Generation VII</h5>        
    <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" id="search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={searchInfo} onChange={handleChange} placeholder="Search" required />
        <button onClick={handleClick} className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
        <p />
        <div id="input-buttons" className="grid justify-items-center"> 
      <button onClick={handleClickRandom} className="inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
        <span className="px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Random One!
        </span>
      </button>
      </div>
        {pokemonSearchFind.id && <PokemonSearchFind pokemonSearched={pokemonSearchFind}/>}
    </div>
  );
}

