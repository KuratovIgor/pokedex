<template>
  <div
    v-loading.body="loading"
    element-loading-text="Loading..."
    element-loading-background="()"
    class="listing-page"
  >
    <pokemon-list
      :pokemon-list="pokemonList"
      :total-pages="totalPages"
      @on-submit-to-history="handleSubmitPokemonToHistory"
      @on-change-page="handleChangePage"
      @click="handleChoosePokemon"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import PokemonList from '@/components/PokemonList.vue'
import { PaginationType, PokemonType } from '@/types/pokemonType'
import { pokemonAPI } from '@/api/pokemon.api'
import { submitPokemonToHistory } from '@/utils'
import { useStorage } from '@/composable/storage'

export default defineComponent({
  name: 'ListingPage',
  components: { PokemonList },

  setup() {
    const { setIsStorageUpdated } = useStorage()

    const loading = ref(true)

    let totalPages = ref<number>()
    let pokemonList = ref<PokemonType[]>([])

    const getPokemonList = async (offset: number): Promise<void> => {
      loading.value = true

      const [_, data] = await pokemonAPI.getPokemonList(offset)

      totalPages.value = data.paginationInfo.total
      pokemonList.value = data.pokemon

      loading.value = false
    }

    const handleChoosePokemon = () => {
      setIsStorageUpdated(true)
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
      handleChoosePokemon,
      handleSubmitPokemonToHistory,
      handleChangePage,
    }
  },
})
</script>

<style lang="scss" scoped>
.listing-page {
  overflow-y: auto;
  padding: 20px 100px;
  height: 100%;

  @media (max-width: 900px) {
    padding: 20px 40px;
  }

  @media (max-width: 600px) {
    padding: 20px 10px;
  }
}
</style>
