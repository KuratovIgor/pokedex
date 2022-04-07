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
}

type StatType = {
  hp: number,
  attack: number,
  defence: number,
  specialAttack: number,
  specialDefence: number,
  speed: number,
}

export class PokemonDetailMapper {
  static mapPokemonInfoToFrontend = (
    pokemon: any,
    gender: string,
    genera: any): PokemonType =>
  {
    const visibleAbilities = pokemon.abilities.filter(item => !item.ability.is_hidden)
    const category = genera.filter(item => item.language.name === 'en')

    return {
      image: pokemon.sprites.other['official-artwork'].front_default,
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map((item) => item.type.name),
      height: pokemon.height,
      weight: pokemon.weight,
      gender: gender,
      category: category[0].genus,
      abilities: visibleAbilities.map(item => item.ability.name),
      stats: {
        hp: calculateCountFilledCells(pokemon.stats[0].base_stat),
        attack: calculateCountFilledCells(pokemon.stats[1].base_stat),
        defence: calculateCountFilledCells(pokemon.stats[2].base_stat),
        specialAttack: calculateCountFilledCells(pokemon.stats[3].base_stat),
        specialDefence: calculateCountFilledCells(pokemon.stats[4].base_stat),
        speed: calculateCountFilledCells(pokemon.stats[5].base_stat),
      },
    }
  }
}

function calculateCountFilledCells(statValue: number): number {
  const valueOneCellOfStat = 15

  return Math.round(statValue / valueOneCellOfStat)
}
