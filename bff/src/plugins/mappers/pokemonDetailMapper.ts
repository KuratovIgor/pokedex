import fastify from 'fastify'
import axios from "axios";

export type PokemonType = {
  image: string,
  id: number,
  name: string,
  types: string[],
  height: number,
  weight: number,
  abilities: string[],
  stats: string[],
  //evolution: object[],
}

let evolutionChain: any[] = []

async function getPokemonInfo(id) {
  const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

  console.log(pokemon)

  return {
    image: pokemon.data.image,
    id: pokemon.data.id,
    name: pokemon.data.name,
    types: pokemon.data.types.map((item) => item.type.name),
  }
}

function getEvolution(evolves_to: any[]) {
  if (evolves_to){
    let pokemon

    for (let i = 0; i < evolves_to.length; i++) {
      pokemon = getPokemonInfo(evolves_to[i].species.url.id)
      evolutionChain.push(pokemon)

      if (evolves_to[i].evolves_to){
        getEvolution(evolves_to[i].evolves_to)
      }
    }
  }
}

export class PokemonDetailMapper {
  static mapDetailInfoToFrontend = (pokemon: any, pokemonEvolution: any): PokemonType => {

    const pokemonInfo = getPokemonInfo(pokemonEvolution.species.url.id)
    evolutionChain.push(pokemonInfo)

    console.log(pokemonInfo)

    getEvolution(pokemonEvolution.chain.evolves_to)

    return {
      image: pokemon.sprites.other['official-artwork'].front_default,
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map((item) => item.type.name),
      height: pokemon.height,
      weight: pokemon.weight,
      abilities: pokemon.abilities.map((item) => item.ability.name),
      stats: pokemon.stats.map((item) => item.stat.name)
      //evolution:
    }
  }
}
