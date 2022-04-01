<template>
  <div class="listing-page">
    <div class="listing-page__loading" />
    <pokemon-list
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-background="rgba(0, 0, 0, 0.6)"
      :pokemon-list="pokemonList"
      :total-pages="totalPages"
      @on-submit-to-history="handleSubmitPokemonToHistory"
      @on-change-page="handleChangePage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import PokemonList from '@/components/PokemonList.vue'
import SidebarHistory from '@/components/SidebarHistory.vue'
import { PaginationType, PokemonType } from '@/types/PokemonType'
import { pokemonAPI } from '@/api/pokemon.api'

export default defineComponent({
  name: 'ListingPage',
  components: { SidebarHistory, PokemonList },

  setup() {
    const loading = ref(true)

    let totalPages = ref<number>()
    let pokemonList = ref<PokemonType[]>([])
    let pokemonListHistory = ref<PokemonType[]>([])

    const getPokemonList = async (offset: number) => {
      loading.value = true

      const [error, data] = await pokemonAPI.getPokemonList(offset)

      loading.value = false
      totalPages.value = data.paginationInfo.total
      pokemonList.value = data.pokemon
    }

    const handleChangePage = (pagination: PaginationType): void => {
      getPokemonList(pagination.offset)
    }

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

    const handleSubmitPokemonToHistory = (pokemon: PokemonType): void => {
      if (pokemonListHistory.value.length === 5) {
        pokemonListHistory.value.pop()
      }
      pokemonListHistory.value.unshift(pokemon)
      localStorage.setItem(
        'pokemon-list',
        JSON.stringify(pokemonListHistory.value)
      )
    }

    onMounted(() => {
      getPokemonList(0)
    })

    return {
      loading,
      totalPages,
      pokemonList,
      pokemonListHistory,
      getPokemonList,
      handleSubmitPokemonToHistory,
      handleChangePage,
    }
  },
})
</script>

<style lang="scss" scoped>
.listing-page {
  &__loading {
    margin: 0 0 0 800px;
  }
}
</style>
