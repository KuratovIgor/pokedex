export type PokemonType = {
  page: number
  image: string
  name: string
  id: number
  types: string[]
}

export type PokemonDetailType = {
  image: string
  number: string
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
