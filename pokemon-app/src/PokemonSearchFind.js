import React, { useState } from "react";
import TypesPokemon from './TypesPokemon';

export default function PokemonSearchFind(props) {
    const pokemonSearched = props.pokemonSearched;

  return (
  <div className="max-w-sm rounded overflow-hidden shadow-lg shadow-inner backdrop-blur-sm bg-white/30">
  <img className="w-full" src={pokemonSearched.icon} alt={pokemonSearched.name} />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{pokemonSearched.name}</div>
    <p className="text-gray-700 text-base">ID: {pokemonSearched.id}</p>
    <p className="text-gray-700 text-base">Base Exp: {pokemonSearched.base_experience}</p>
    <p className="text-gray-700 text-base">Height:  {pokemonSearched.height}</p>
    <p className="text-gray-700 text-base">Weight: {pokemonSearched.weight}</p>
    <p className="text-gray-700 text-base">Order: {pokemonSearched.order}</p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <TypesPokemon typesFromPokemon={pokemonSearched.types}/>
  </div>
</div> 
  )
}