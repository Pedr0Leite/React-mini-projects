import React from 'react';

export default function TypesPokemon(props) {
    
    const types = props.typesFromPokemon;
    const classNameType = {
        "dark": "inline-block bg-neutral-900 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "water": "inline-block bg-blue-300 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "grass": "inline-block bg-green-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "poison": "inline-block bg-violet-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "flying": "inline-block bg-sky-300 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "rock": "inline-block bg-yellow-900 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "ground": "inline-block bg-amber-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "ice": "inline-block bg-cyan-300 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "ghost": "inline-block bg-indigo-900 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "steel": "inline-block bg-slate-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "dragon": "inline-block bg-red-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "fire": "inline-block bg-red-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "electric": "inline-block bg-yellow-300 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "normal": "inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "fighting": "inline-block bg-rose-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "bug": "inline-block bg-green-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "psychic": "inline-block bg-violet-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "fairy": "inline-block bg-pink-300 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "shadow": "inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2",
        "unknown": "inline-block bg-neutral-50 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2",
    }
    
    return(
        <div>
      {types.map(p => (
          <span key={p.type.name} className={classNameType[p.type.name]}>{p.type.name}</span>
        ))}
    </div>      
    )
}