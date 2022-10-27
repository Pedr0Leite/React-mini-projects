import React from 'react'

export default function inputSearchPokemon(props) {
    const pokemonText = props.inputSearchPokemon;
  return (
    <div>
      <form>
    <label>Search your Pokemon here!</label>
    <br/>
    <input type="text"></input>
    <br/>
    <button>Search it!</button>

      </form>
    </div>
    
  )
}
