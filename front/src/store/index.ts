import { createStore } from 'vuex'

export default createStore({
  state: {
    pokemonCount: 1127,
    idString: '',
  },

  getters: {
    getIdString(state): string {
      return state.idString
    },
  },

  mutations: {
    idToString(state, id) {
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
  },
})
