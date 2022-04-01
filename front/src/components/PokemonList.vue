<template>
  <div class="pokemon-list">
    <div class="pokemon-list__card-list">
      <pokemon-card
        class="pokemon-list__card"
        v-for="pokemon in pokemonList"
        :pokemon-count="store.state.pokemonCount"
        :image="pokemon.image"
        :id="pokemon.id"
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
      :total="totalPages"
      @current-change="handleChangeCurrentPage"
    />
  </div>
</template>

<script lang="ts">
import PokemonCard from '@/components/PokemonCard.vue'
import { defineComponent, ref, PropType } from 'vue'
import { PokemonType } from '@/types/PokemonType'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PokemonList',
  components: { PokemonCard },

  props: {
    pokemonList: Array as PropType<PokemonType[]>,
    totalPages: Number,
  },

  setup(props, { emit }) {
    const store = useStore()

    const currentPage = ref<number>(1)

    const handleChangeCurrentPage = (val: number): void => {
      currentPage.value = val
      emit('onChangePage', {
        offset: (currentPage.value - 1) * 10,
      })
    }

    const handleSubmitToHistory = (item: PokemonType): void => {
      emit('onSubmitToHistory', {
        image: item.image,
        name: item.name,
        id: item.id,
      })
    }

    return {
      store,
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
  transition: 1s linear;

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
