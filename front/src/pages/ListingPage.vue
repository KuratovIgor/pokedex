<template>
  <div class="listing-page">
    <pokemon-list
      :pokemon-list="pokemonList"
      @on-submit-to-history="handleSubmitPokemonToHistory"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PokemonList from '@/components/PokemonList.vue'
import SidebarHistory from '@/components/SidebarHistory.vue'
import { PokemonType } from '@/types/PokemonType'

export default defineComponent({
  name: 'ListingPage',
  components: { SidebarHistory, PokemonList },

  setup() {
    const pokemonList = ref([
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        id: 1,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
        id: 2,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
        id: 3,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
        id: 4,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
        id: 5,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
        id: 6,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
        id: 7,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
        id: 8,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
        id: 9,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png',
        id: 10,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png',
        id: 11,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png',
        id: 12,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png',
        id: 13,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png',
        id: 14,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png',
        id: 15,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png',
        id: 16,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png',
        id: 17,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png',
        id: 18,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png',
        id: 19,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png',
        id: 20,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png',
        id: 21,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/22.png',
        id: 22,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png',
        id: 23,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png',
        id: 24,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        id: 25,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
        id: 26,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png',
        id: 27,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/28.png',
        id: 28,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/29.png',
        id: 29,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/30.png',
        id: 30,
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
    ])

    let pokemonListHistory = ref<PokemonType[]>([])

    const pokemonListFromLocalStorage: PokemonType[] = JSON.parse(
      localStorage.getItem('pokemon-list')
    )

    if (
      typeof pokemonListFromLocalStorage !== 'undefined' &&
      pokemonListFromLocalStorage !== null
    ) {
      for (let pokemon of pokemonListFromLocalStorage) {
        pokemonListHistory.value.push(pokemon)
      }
    }

    const handleSubmitPokemonToHistory = (item: PokemonType): void => {
      if (pokemonListHistory.value.length === 5) {
        pokemonListHistory.value.pop()
      }
      pokemonListHistory.value.unshift(item)
      localStorage.setItem(
        'pokemon-list',
        JSON.stringify(pokemonListHistory.value)
      )
    }

    return {
      pokemonList,
      pokemonListHistory,
      handleSubmitPokemonToHistory,
    }
  },
})
</script>

<style lang="scss" scoped></style>
