import {
  PaginationSchemaType,
  ResponseSchemaType
} from '~/plugins/routes/pokemon/pokemonListingRoute'

type AbilityType = {
  name: string
}

type PokemonType = {
  image: string,
  id: number,
  name: string,
  abilities: AbilityType[]
}

export class PokemonMapper {
  static getPaginationInfo = (
    count: number,
    offset: number,
    limit: number
  ): PaginationSchemaType => {
    const total = Math.ceil(count / limit)
    const current = Math.ceil(offset / limit)

    return { total, current }
  }

  static getPokemonInfo = (name: string, abilityInfo: any): PokemonType => {
    let pokemon: PokemonType = {
      image: '',
      id: 0,
      name: '',
      abilities: []
    }

    pokemon.image = abilityInfo.sprites.other['official-artwork'].front_default
    pokemon.id = abilityInfo.id
    pokemon.name = name

    for (let ability of abilityInfo.abilities)
      pokemon.abilities.push({ name: ability.ability.name })

    return pokemon
  }

}
