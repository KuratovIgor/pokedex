import { PaginationSchemaType } from '~/plugins/routes/pokemon/pokemonListingRoute'

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
    const image: string = getPokemonImage(pokemon)

    return {
      image: image,
      id: pokemon.id,
      name,
      types: pokemon.types.map((item) => item.type.name)
    }
  }
}

export function getPokemonImage(pokemon: any): string {
  let image: string = pokemon.sprites.other['official-artwork'].front_default

  if (image === null) {
    image = pokemon.sprites.other['home'].front_default

    if (image === null) {
      image = 'https://yt3.ggpht.com/a/AATXAJxMsidCAHeINMkguKlmS4T4z36rC3VsMBKQsRAW=s900-c-k-c0xffffffff-no-rj-mo'
    }
  }

  return image
}
