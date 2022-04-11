<template>
  <div class="listing-page">
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
import { submitPokemonToHistory } from '@/utils'

export default defineComponent({
  name: 'ListingPage',
  components: { SidebarHistory, PokemonList },

  setup() {
    const loading = ref(true)

    let totalPages = ref<number>()
    let pokemonList = ref<PokemonType[]>([])

    const getPokemonList = async (offset: number): Promise<void> => {
      loading.value = true

      const [error, data] = await pokemonAPI.getPokemonList(offset)

      loading.value = false
      totalPages.value = data.paginationInfo.total
      pokemonList.value = data.pokemon
    }

    const handleChangePage = (pagination: PaginationType): void => {
      getPokemonList(pagination.offset)
    }

    const handleSubmitPokemonToHistory = (pokemon: PokemonType): void => {
      submitPokemonToHistory(pokemon)
    }

    onMounted((): void => {
      getPokemonList(0)
    })

    return {
      loading,
      totalPages,
      pokemonList,
      getPokemonList,
      handleSubmitPokemonToHistory,
      handleChangePage,
    }
  },
})
</script>

<style lang="scss" scoped>
.listing-page {
  min-width: 1000px;
  max-width: 1300px;
}
</style>
