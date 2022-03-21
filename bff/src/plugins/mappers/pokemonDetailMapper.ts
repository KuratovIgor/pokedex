import fastify from 'fastify'

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

export class PokemonDetailMapper {
  static mapDetailInfoToFrontend = (pokemon: any, pokemonEvolution: any): PokemonType => {
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
