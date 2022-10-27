import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from 'axios';
import Pagination from "./Pagination";
import InputSearchPokemon from "./InputSearchPokemon";
import PokemonSearchFind from "./PokemonSearchFind";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageURL, setCurrentPageURL] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageURL, setNextPageURL] = useState();
  const [prevPageURL, setPrevPageURL] = useState();
  const [loading, setLoading] = useState(true);

  const [pokemonInputText, setPokemonInputText] = useState('');
  const [pokemonSearchURL, setpokemonSearchURL] = useState('https://pokeapi.co/api/v2/pokemon/ditto');
  const [pokemonSearchFind, setPokemonSearchFind] = useState('');

  useEffect(() => {
    setLoading(true);
    let cancel = '';
    axios.get(currentPageURL,
      {
        cancelToken: new axios.CancelToken(c => cancel = c)
      }).then(res =>{
      setLoading(false);
      setNextPageURL(res.data.next);
      setPrevPageURL(res.data.previous);
      setPokemon(res.data.results.map(p => p.name))
    })

    //prevent race conditions from multiple requests
    return () => cancel()
  }, [currentPageURL])

  function goToNextPage(){
    setCurrentPageURL(nextPageURL);
  }

  function goToPrevPage(){
    setCurrentPageURL(prevPageURL);
  }


  useEffect(() => {
    setLoading(true);
    let cancel = '';
    axios.get(pokemonSearchURL,
      {
        cancelToken: new axios.CancelToken(c => cancel = c)
      }).then(res =>{
      setLoading(false);
      setpokemonSearchURL(pokemonSearchURL)
      setPokemonSearchFind(res.data.id)
      console.log('res.data.id :', res.data.id);
    })

    //prevent race conditions from multiple requests
    return () => cancel()
  }, [pokemonSearchURL])


  if(loading) return "Loading..."
  
  return (
    <div>
    <InputSearchPokemon pokemonText={pokemonInputText}/>
    <br></br>
    <PokemonSearchFind pokemonSearched={pokemonSearchFind}/>
    <br></br>
    <PokemonList pokemon={pokemon} />
    <Pagination 
    goToNextPage={nextPageURL ? goToNextPage : null}
    goToPrevPage={prevPageURL ? goToPrevPage : null}
    />
    </div>
  );
}

export default App;