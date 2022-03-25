<template>
  <div class="pokemon-list">
    <div class="pokemon-list__card-list">
      <pokemon-card
        class="pokemon-list__card"
        v-for="pokemon in pokemonFiltered"
        :image="pokemon.image"
        :number="pokemon.number"
        :name="pokemon.name"
        :types="pokemon.types"
        @on-submit-to-history="handleSubmitToHistory"
      />
    </div>
    <el-pagination
      class="listing__pagination"
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="1"
      :total="3"
      @current-change="handleChangeCurrentPage"
    />
  </div>
</template>

<script lang="ts">
import PokemonCard from '@/components/PokemonCard.vue'
import { defineComponent, computed, ref } from 'vue'
import { pokemonType } from '@/types/pokemonType'

export default defineComponent({
  name: 'PokemonList',
  components: { PokemonCard },

  props: {
    pokemonList: Array,
  },

  setup(props, { emit }) {
    const currentPage = ref<number>(1)

    const pokemonFiltered = computed(() => {
      return props.pokemonList.filter(
        (item: pokemonType) => item.page === currentPage.value
      )
    })

    const handleChangeCurrentPage = (val: number): void => {
      currentPage.value = val
    }

    const handleSubmitToHistory = (item: pokemonType): void => {
      emit('onSubmitToHistory', {
        image: item.image,
        name: item.name,
        number: item.number,
      })
    }

    return {
      pokemonFiltered,
      currentPage,
      handleChangeCurrentPage,
      handleSubmitToHistory,
    }
  },
})
</script>

<style lang="scss" scoped>
.pokemon-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__card-list {
    display: flex;
    flex-wrap: wrap;
    max-width: 1100px;
  }

  &__card {
    margin: 0 25px 25px;
  }

  &__pagination {
    font-weight: 700;
  }
}
</style>
