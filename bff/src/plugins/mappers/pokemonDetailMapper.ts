import fastify from 'fastify'
import {Type} from "@sinclair/typebox";

export type PokemonType = {
  image: string,
  id: number,
  name: string,
  types: string[],
  //weaknesses: string[],
  height: number,
  weight: number,
  gender: string,
  abilities: string[],
  stats: string[],
  evolution: any,
}

export type EvolutionType = {
  name: string,
  id: number,
  image: string,
  types: string[],
  stage: number,
}

function generateEvolutionStages(evolutionChain: EvolutionType[]): any[] {
  let stages: any[] = []
  let maxStage = 1

  for (let evolution of evolutionChain) {
    if (evolution.stage > maxStage){
      maxStage = evolution.stage
    }
  }

  for (let i = 0; i < maxStage; i++){
    stages.push([])
  }

  return stages
}


export class PokemonDetailMapper {
  static mapDetailInfoToFrontend = (pokemon: any, evolutionChain: EvolutionType[], gender: string): PokemonType => {
    let evolutionByStages = generateEvolutionStages(evolutionChain)

    for (let evolution of evolutionChain){
      const evolveItem = {
        id: evolution.id,
        name: evolution.name,
        image: evolution.image,
        types: evolution.types,
      }

      evolutionByStages[evolution.stage - 1].push(evolveItem)
    }

    return {
      image: pokemon.sprites.other['official-artwork'].front_default,
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map((item) => item.type.name),
      height: pokemon.height,
      weight: pokemon.weight,
      gender: gender,
      abilities: pokemon.abilities.map((item) => item.ability.name),
      stats: pokemon.stats.map((item) => item.stat.name),
      evolution: evolutionByStages,
    }
  }
}
