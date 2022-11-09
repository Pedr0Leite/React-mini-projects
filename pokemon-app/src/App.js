import InputSearchPokemon from "./components/InputSearchPokemon";
import React from "react";


import "./assets/index.css";

function App() {

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-500 via-orange-500 to-purple-500">
      <InputSearchPokemon />
    </div>
  );
}

export default App;
