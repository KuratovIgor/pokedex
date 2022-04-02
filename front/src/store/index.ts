import { createStore } from 'vuex'
import { PokemonType } from '@/types/pokemonType'

export default createStore({
  state: {
    pokemonCount: 1127,
    idString: '',
    pokemonListHistory: [],
  },

  getters: {
    getIdString(state): string {
      return state.idString
    },

    getHistory(state): PokemonType[] {
      return state.pokemonListHistory
    },
  },

  mutations: {
    idToString(state, id: number): void {
      if (typeof id !== 'undefined') {
        state.idString = id.toString()

        const idLength: number = state.idString.length
        const totalLength: number = state.pokemonCount.toString().length

        for (let i = 0; i < totalLength - idLength; i++) {
          state.idString = '0' + state.idString
        }

        state.idString = '#' + state.idString
      }
    },

    getHostoryFromLocalStorage(state): void {
      state.pokemonListHistory = []

      const pokemonListFromLocalStorage: PokemonType[] = JSON.parse(
        localStorage.getItem('pokemon-list')
      )

      if (
        typeof pokemonListFromLocalStorage !== 'undefined' &&
        pokemonListFromLocalStorage !== null
      ) {
        for (const pokemon of pokemonListFromLocalStorage) {
          state.pokemonListHistory.push(pokemon)
        }
      }
    },

    submitPokemonToHistory(state, pokemon: PokemonType): void {
      if (state.pokemonListHistory.length === 5) {
        state.pokemonListHistory.pop()
      }
      state.pokemonListHistory.unshift(pokemon)
      localStorage.setItem(
        'pokemon-list',
        JSON.stringify(state.pokemonListHistory)
      )
    },
  },
})
