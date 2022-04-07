export type StageType = {
  stage: string[]
}

export type EvolutionStageType = {
  stage: PokemonType[]
}

type PokemonType = {
  id: number,
  name: string,
  image: string,
  types: string[],
}

export class EvolutionMapper {
  static mapEvolutionToFronted = (evolvesTo: any): StageType[] => {
    const countStages = 3
    const evolutionChain: StageType[] = []
    let currentStage: any[] = []
    currentStage.push(evolvesTo)

    for (let i = 0; i < countStages; i++) {
      evolutionChain.push({ stage: [] })
      for (let j = 0; j < currentStage.length; j++) {
        evolutionChain[i].stage.push(currentStage[j].species.url)
      }

      const tempStages: any[] = []

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
}
