export type PokemonType = {
  image: string
  name: string
  id: number
  types: string[]
}

export type PokemonDetailType = {
  image: string
  id: number
  name: string
  types: string[]
  weaknesses: string[]
  height: string
  weight: string
  gender: string
  category: string
  abilities: string[]
  stats: StatType
  evolution: PokemonType[]
}

export type StatType = {
  hp: number
  attack: number
  defence: number
  specialAttack: number
  specialDefence: number
  speed: number
}

export type AbilityType = {
  name: string
  description: string
}

export type PaginationType = {
  offset: number
}

export type EvolutionType = EvolutionItem[][]

type EvolutionItem = {
  name: string
  id: number
  image: string
  types: string[]
  stage: number
}
