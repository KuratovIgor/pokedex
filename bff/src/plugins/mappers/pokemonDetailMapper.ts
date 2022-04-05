import fastify from 'fastify'
import axios from 'axios'

export type PokemonType = {
  image: string,
  id: number,
  name: string,
  types: string[],
  height: number,
  weight: number,
  gender: string,
  category: string,
  abilities: string[],
  stats: StatType,
  stage: any,
}

export type EvolutionType = {
  name: string,
  id: number,
  image: string,
  types: string[],
}

type EvolutionStageType = {
  stage: EvolutionType[]
}

type StatType = {
  hp: number,
  attack: number,
  defence: number,
  special_attack: number,
  special_defence: number,
  speed: number,
}

type GeneraType = {
  genus: string,
  language: {
    name: string,
  },
}

export class PokemonDetailMapper {
  static mapDetailInfoToFrontend = async (
    pokemon: any,
    evolutionChain: EvolutionType[],
    gender: string,
    genera: GeneraType[]): Promise<PokemonType> =>
  {
    let evolutionByStages = await buildEvolutionChain(evolutionChain)

    const visibleAbilities = pokemon.abilities.filter(item => !item.is_hidden)
    const category = genera.filter(item => item.language.name === 'en')

    return {
      image: pokemon.sprites.other['official-artwork'].front_default,
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map((item) => item.type.name),
      height: pokemon.height,
      weight: pokemon.weight,
      gender: gender,
      category: category.map(item => item.genus),
      abilities: visibleAbilities.map(item => item.ability.name),
      stats: {
        hp: calculateCountFilledCells(pokemon.stats[0].base_stat),
        attack: calculateCountFilledCells(pokemon.stats[1].base_stat),
        defence: calculateCountFilledCells(pokemon.stats[2].base_stat),
        special_attack: calculateCountFilledCells(pokemon.stats[3].base_stat),
        special_defence: calculateCountFilledCells(pokemon.stats[4].base_stat),
        speed: calculateCountFilledCells(pokemon.stats[5].base_stat),
      },
      evolution: evolutionByStages,
    }
  }
}

async function buildEvolutionChain(evolvesTo: EvolutionType[]): Promise<any[]>{
  let countStages = 3
  let evolutionChain: any[] = []
  let currentStage: any[] = []
  currentStage.push(evolvesTo)

  for (let i = 0; i < countStages; i++) {
    evolutionChain.push({ stage: [] })
    for (let j = 0; j < currentStage.length; j++) {
      const pokemonSpecies = await axios.get(currentStage[j].species.url)
      const id = pokemonSpecies.data.id
      const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const name = pokemon.data.name
      const image = pokemon.data.sprites.other['official-artwork'].front_default
      const types = pokemon.data.types.map((item) => item.type.name)

      const evolution = {
        id: id,
        name: name,
        image: image,
        types: types,
      }

      evolutionChain[i].stage.push(evolution)
    }

    let tempStages: any[] = []

    for (let j = 0; j < currentStage.length; j++) {
      if (currentStage[j].evolves_to.length == 'undefined') {
        tempStages.push(currentStage[j].evolves_to)
      }
      else {
        for (let k = 0; k < currentStage[j].evolves_to.length; k++) {
          tempStages.push(currentStage[j].evolves_to[k])
        }
      }
    }

    currentStage = tempStages
  }

  return evolutionChain
}

function calculateCountFilledCells(stat_value: number): number {
  const valueOneCellOfStat = 15

  return Math.round(stat_value / valueOneCellOfStat)
}
