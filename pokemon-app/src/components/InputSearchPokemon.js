import React, { useState, useEffect } from "react";
import axios from 'axios';
import PokemonSearchFind from "./PokemonSearchFind";
import GetFullListButton from "./GetFullListButton";
import RandomOneButton from "./RandomOneButton";
import Pagination from "./Pagination";
import PokemonList from "./PokemonList";
import ClipLoader from 'react-spinners/ClipLoader';

export default function InputSearchPokemon(prop) {

  const [searchInfo, setSearchInfo] = useState('');
  const [pokemonSearchURL, setpokemonSearchURL] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [pokemonSearchFind, setPokemonSearchFind] = useState({});
  const [currentPageURL, setCurrentPageURL] = useState("");
  const [prevPageURL, setPrevPageURL] = useState("");
  const [nextPageURL, setNextPageURL] = useState("");
  
  const [pokemonForFullList, setPokemonForFullList] = useState({});
  const [number, setNumber] = useState(20);
  const [pokemon, setPokemon] = useState([]);
  
  const [loading, setLoading] = useState(false);
  
  //USE EFFECTS PART
useEffect(()=>{
  let cancel = '';
  setLoading(true);
  
  axios.get("https://pokeapi.co/api/v2/pokemon", {
    cancelToken: new axios.CancelToken((c) => (cancel = c)),
  })
  .then(async (res) => {
        setNextPageURL(res.data.next);
        setPrevPageURL(res.data.previous);

        res.data.results.forEach(async (obj) => {
          await axios.get(pokemonSearchURL + obj.name, {
              cancelToken: new axios.CancelToken((c) => (cancel = c)),
            })
            .then((res) => {
              setLoading(false);
              const { name, types, sprites } = res.data;
              setPokemonForFullList((currentObj) => ({
                ...currentObj,
                [obj.name]: { name: name, types: types, sprites: sprites },
              }));
            });
        });
        //prevent race conditions from multiple requests
      return () => cancel()
      });
}, [])

  
    //Runs every time a new page is loaded
    useEffect(() => {
      if(currentPageURL !== ""){
      setLoading(true);
      let cancel = '';
      let tempArr = [];
      axios.get(currentPageURL, { cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res =>{

        setNextPageURL(res.data.next);
        setPrevPageURL(res.data.previous);
        setPokemon(res.data.results.map(p => p.name))
        tempArr = res.data.results.map(p => p.name);

        setPokemonForFullList({})
        tempArr.forEach(async (name) => {
          await axios
            .get(pokemonSearchURL + name, {
              cancelToken: new axios.CancelToken((c) => (cancel = c)),
            })
            .then((res) => {
              setLoading(false);
              const { name, types, sprites } = res.data;
              setPokemonForFullList((currentObj) => ({
                ...currentObj,
                [name]: { name: name, types: types, sprites: sprites },
              }));
            });
        });
            //prevent race conditions from multiple requests
            return () => cancel()
          })
    }
  }, [currentPageURL, pokemonSearchURL])
  
  //Handles
  const handleChange = (e) => {
    setSearchInfo(e.target.value)
    setPokemonSearchFind('')
  }
  
  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    setSearchInfo('');
    setPokemon([]);
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
    setPokemon([]);
    setLoading(true);
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

  
  const handleFullList = async (e) => {
    setLoading(true);
    setSearchInfo('');
    setPokemonSearchFind({});
    getFullList();
  }

  //Async function to get elements to list grid
  //Max number of id=809 (Generation VII)
  async function getFullList() {
    let cancel = '';
    setLoading(true);
    await axios.get("https://pokeapi.co/api/v2/pokemon", {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setNextPageURL(res.data.next);
        setPrevPageURL(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
        
        res.data.results.forEach(async (obj) => {
          await axios.get(pokemonSearchURL + obj.name, {
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          })
          .then((res) => {
              setLoading(false);
              const { name, types, sprites } = res.data;
              setPokemonForFullList((currentObj) => ({
                ...currentObj,
                [obj.name]: { name: name, types: types, sprites: sprites },
              }));
            });
        });
        //prevent race conditions from multiple requests
      return () => cancel()
      });
  }

function goToNextPage(){
  setCurrentPageURL(nextPageURL);
}

function goToPrevPage(){
  setCurrentPageURL(prevPageURL);
}

  return (
    <div className="content-center">
      <h2 className="text-3xl font-bold underline text-center">Search your Pokémon!</h2>
      <br/>
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
        <div id="input-buttons" className="grid grid-cols-2 gap-2"> 
        <GetFullListButton getFullList={handleFullList }/>
        <RandomOneButton handleClickRandom={handleClickRandom}/>
      </div>
      {loading ? (
        <div className="loader-container text-center">
        <ClipLoader color={'#fff'} size={150} />
      </div>
      ) :  (<div>
        {pokemonSearchFind.id && <PokemonSearchFind pokemonSearched={pokemonSearchFind}/>}
        {pokemon.length !== 0 && <PokemonList pokemon={pokemon} pokemonForFullList={pokemonForFullList}/>}
      <div>
        <br/>
      {pokemon.length !== 0 && <Pagination
      goToNextPage={nextPageURL ? goToNextPage : null}
      goToPrevPage={prevPageURL ? goToPrevPage : null}
      />}
      </div>
      </div>
      )}
        
    </div>
  );
}