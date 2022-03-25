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
import { pokemonType } from '@/types/pokemonType'

export default defineComponent({
  name: 'ListingPage',
  components: { SidebarHistory, PokemonList },

  setup() {
    const pokemonList = ref([
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        number: 'N001',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
        number: 'N002',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
        number: 'N003',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
        number: 'N004',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
        number: 'N005',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
        number: 'N006',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
        number: 'N007',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
        number: 'N008',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
        number: 'N009',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 1,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png',
        number: 'N010',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png',
        number: 'N011',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png',
        number: 'N012',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png',
        number: 'N013',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png',
        number: 'N014',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png',
        number: 'N0015',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png',
        number: 'N016',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png',
        number: 'N017',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png',
        number: 'N018',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png',
        number: 'N019',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 2,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png',
        number: 'N020',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png',
        number: 'N021',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/22.png',
        number: 'N022',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png',
        number: 'N023',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png',
        number: 'N024',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        number: 'N025',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
        number: 'N026',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png',
        number: 'N027',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/28.png',
        number: 'N028',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/29.png',
        number: 'N029',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
      {
        page: 3,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/30.png',
        number: 'N030',
        name: 'pokemon name',
        types: ['water', 'fire'],
      },
    ])

    let pokemonListHistory = ref<pokemonType[]>([])

    const pokemonListFromLocalStorage: pokemonType[] = JSON.parse(
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

    const handleSubmitPokemonToHistory = (item: pokemonType): void => {
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
