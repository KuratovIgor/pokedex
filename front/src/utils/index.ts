import { PokemonType } from '@/types/pokemonType'

export function idToString(id: number): string {
  if (typeof id !== 'undefined') {
    let idString: string = id.toString()

    const idLength: number = idString.length
    const pokemonCount = 1127
    const totalLength: number = pokemonCount.toString().length

    for (let i = 0; i < totalLength - idLength; i++) {
      idString = '0' + idString
    }

    idString = '#' + idString

    return idString
  }
}

export function getHistoryFromLocalStorage(): PokemonType[] {
  const pokemonListHistory: PokemonType[] = []

  const pokemonListFromLocalStorage: PokemonType[] = JSON.parse(
    localStorage.getItem('pokemon-list')
  )

  if (
    typeof pokemonListFromLocalStorage !== 'undefined' &&
    pokemonListFromLocalStorage !== null
  ) {
    for (const pokemon of pokemonListFromLocalStorage) {
      pokemonListHistory.push(pokemon)
    }
  }

  return pokemonListHistory
}

export function submitPokemonToHistory(pokemon: PokemonType): void {
  const pokemonListHistory: PokemonType[] = getHistoryFromLocalStorage()

  if (pokemonListHistory.length === 5) {
    pokemonListHistory.pop()
  }
  pokemonListHistory.unshift(pokemon)
  localStorage.setItem('pokemon-list', JSON.stringify(pokemonListHistory))
}
