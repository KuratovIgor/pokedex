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
  evolution: EvolutionType[],
}

export type EvolutionType = {
  name: string,
  id: number,
  image: string,
  types: string[],
  stage: number,
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
  static mapDetailInfoToFrontend = (
    pokemon: any,
    evolutionChain: EvolutionType[],
    gender: string,
    genera: GeneraType[]): PokemonType =>
  {
    const evolutionByStages = buildEvolutionChainByStages(evolutionChain)

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

function buildEvolutionChainByStages(evolutionChain: EvolutionType[]): any[]{
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

  return evolutionByStages
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

function calculateCountFilledCells(stat_value: number): number {
  const valueOneCellOfStat = 15

  return Math.round(stat_value / valueOneCellOfStat)
}
