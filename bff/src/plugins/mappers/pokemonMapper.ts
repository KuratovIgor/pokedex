import {
  PaginationSchemaType,
  ResponseSchemaType
} from '~/plugins/routes/pokemon/pokemonListingRoute'

export type PokemonType = {
  image: string,
  id: number,
  name: string,
  types: string[]
}

export class PokemonMapper {
  static mapPaginationInfoToFrontend = (
    count: number,
    offset: number,
    limit: number
  ): PaginationSchemaType => {
    const total = Math.ceil(count / limit)
    let current = Math.ceil(offset / limit)

    if (current == 0){
      current = 1
    }

    return { total, current }
  }

  static mapPokemonInfoToFrontend = (name: string, pokemon: any): PokemonType => {
    return {
      image: pokemon.sprites.other['official-artwork'].front_default,
      id: pokemon.id,
      name,
      types: pokemon.types.map((item) => item.type.name)
    }
  }
}
