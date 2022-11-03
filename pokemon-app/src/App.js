import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";
import InputSearchPokemon from "./InputSearchPokemon";
// import PokemonSearchFind from "./PokemonSearchFind";
var background = "https://images3.alphacoders.com/273/273289.jpg";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [showPokemonList, setShowPokemonList] = useState(false);
  const [currentPageURL, setCurrentPageURL] = useState("");
  const [nextPageURL, setNextPageURL] = useState();
  const [prevPageURL, setPrevPageURL] = useState();
  const [loading, setLoading] = useState(false);

  const currentPageURLConst = "https://pokeapi.co/api/v2/pokemon";

  const myStyle = {
    backgroundImage: `url('${background}')`,
    // height:'100vh',
    fontSize: "20px",
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    textAlign: "center",
  };

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
        setPokemonList(res.data.results.map(p => p.name))
      })
      
    //prevent race conditions from multiple requests
    return () => cancel()
  }, [currentPageURL])

  async function onClickGetList() {
    setLoading(true);

    await axios.get(currentPageURL)
      .then((res) => {
        setLoading(false);
        setShowPokemonList(true);
        setCurrentPageURL(currentPageURLConst);
        setNextPageURL(res.data.next);
        setPrevPageURL(res.data.previous);
        setPokemonList(res.data.results.map((p) => p.name));
      });
  }

  function goToNextPage() {
    setCurrentPageURL(nextPageURL);
  }

  function goToPrevPage() {
    setCurrentPageURL(prevPageURL);
  }

  if (loading) return "Loading...";

  return (
    <div style={myStyle}>
      <InputSearchPokemon />
      <br></br>
      <h3>Pokemon List</h3>
      {!showPokemonList && (
        <button onClick={onClickGetList}>Get Pokemon List</button>
      )}
      {pokemonList !== [] && <PokemonList pokemon={pokemonList} />}
      <Pagination
        goToNextPage={nextPageURL ? goToNextPage : null}
        goToPrevPage={prevPageURL ? goToPrevPage : null}
      />
    </div>
  );
}

export default App;
