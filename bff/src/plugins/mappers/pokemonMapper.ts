import {
  PaginationSchemaType,
  ResponseSchemaType
} from '~/plugins/routes/pokemon/pokemonListingRoute'

export type PokemonType = {
  image: string,
  id: number,
  name: string,
  abilities: string[]
}

export class PokemonMapper {
  static mapPaginationInfoToFrontend = (
    count: number,
    offset: number,
    limit: number
  ): PaginationSchemaType => {
    const total = Math.ceil(count / limit)
    const current = Math.ceil(offset / limit)

    return { total, current }
  }

  static mapPokemonInfoToFrontend = (name: string, pokemon: any): PokemonType => {
    return {
      image: pokemon.sprites.other['official-artwork'].front_default,
      id: pokemon.id,
      name,
      abilities: pokemon.abilities.map((item) => item.ability.name)
    }
  }
}
