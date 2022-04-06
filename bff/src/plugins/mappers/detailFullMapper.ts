import { EvolutionStageType } from '~/plugins/mappers/evolutionMapper'
import { PokemonType } from '~/plugins/mappers/pokemonDetailMapper'

export type PokemonDetailType = {
  pokemonInfo: PokemonType,
  evolution: EvolutionStageType[],
}

export class DetailFullMapper {
  static mapDetailInfoToFrontend = (
    pokemon: PokemonType,
    evolutionChain: EvolutionStageType[],
  ): PokemonDetailType =>
  {
    return {
      pokemonInfo: pokemon,
      evolution: evolutionChain
    }
  }
}
