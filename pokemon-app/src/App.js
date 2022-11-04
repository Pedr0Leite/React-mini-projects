import React, { useState, useEffect } from "react";
import axios from "axios";
import InputSearchPokemon from "./InputSearchPokemon";
import "./assets/index.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageURL, setCurrentPageURL] = useState("");
  const [loading, setLoading] = useState(false);

  const currentPageURLConst = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    setLoading(true);
    let cancel = '';
    axios.get(currentPageURL,
      {
        cancelToken: new axios.CancelToken(c => cancel = c)
      }).then(res =>{
        setLoading(false);
        
      })
      
    //prevent race conditions from multiple requests
    return () => cancel()
  }, [currentPageURL])

  // async function onClickGetList() {
  //   setLoading(true);

  //   await axios.get(currentPageURL)
  //     .then((res) => {
  //       setLoading(false);
  // }

  if (loading) return "Loading...";

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-500 via-orange-500 to-purple-500">
      <InputSearchPokemon />
    </div>
  );
}

export default App;
