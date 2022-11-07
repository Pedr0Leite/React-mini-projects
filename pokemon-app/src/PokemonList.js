import React from 'react'

export default function PokemonList(props) {
    const pokemon = props.pokemon;

    return (
    <div className="grid grid-cols-4 gap-4">
      {pokemon.map(p => (
          <div key={p}> {p}</div>  
        ))}
    </div>
  )
}
