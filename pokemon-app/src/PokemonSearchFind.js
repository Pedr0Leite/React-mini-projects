import React from 'react'

export default function PokemonSearchFind(props) {
    const pokemonSearched = props.pokemonSearched;
    console.log('pokemonSearched :', pokemonSearched);
  return (
    <div>
        <h4>Info Found:</h4>
        <p>ID: {pokemonSearched.id}</p>
        <p>Base Exp: {pokemonSearched.baseExp}</p>
        <p>Height: {pokemonSearched.height}</p>
        <p>Weight: {pokemonSearched.weight}</p>
        <p>Order: {pokemonSearched.order}</p>
        </div>
  )
}
