import { PaginationSchemaType } from '~/plugins/routes/pokemon/pokemonListingRoute'

export class PokemonMapper {
  static getPaginationInfo = (count: number, offset: number, limit: number): PaginationSchemaType => {
    const total = Math.ceil(count / limit)
    const current = Math.ceil(offset / limit)

    return { total, current }
  }
}
