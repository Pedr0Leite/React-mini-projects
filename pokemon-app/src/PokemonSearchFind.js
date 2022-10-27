import React from 'react'

export default function PokemonSearchFind(props) {
    const pokemonSearched = props.pokemonSearched;
console.log('HERE: ' + pokemonSearched)
  return (
    <div>
        <h1>THE FIND:</h1>
        <h2>{pokemonSearched}</h2>
        </div>
  )
}
