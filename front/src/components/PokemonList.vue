<template>
  <div class="pokemon-list">
    <div class="pokemon-list__card-list">
      <pokemon-card
        class="pokemon-list__card"
        v-for="pokemon in pokemonList"
        :image="pokemon.image"
        :id="pokemon.id"
        :name="pokemon.name"
        :types="pokemon.types"
        @on-submit-to-history="handleSubmitToHistory"
        @click="handleOpenPokemonDetail(pokemon.id)"
      />
    </div>
    <el-pagination
      class="pokemon-list__pagination"
      layout="prev, pager, next"
      :current-page="currentPage"
      :pager-count="$screen.size === 'xs' ? 5 : 9"
      :page-size="1"
      :total="totalPages"
      @current-change="handleChangeCurrentPage"
    />
  </div>
</template>

<script lang="ts">
import PokemonCard from '@/components/PokemonCard.vue'
import { defineComponent, ref, PropType } from 'vue'
import { PokemonType } from '@/types/pokemonType'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PokemonList',
  components: { PokemonCard },

  props: {
    pokemonList: Array as PropType<PokemonType[]>,
    totalPages: Number,
  },

  setup(props, { emit }) {
    const router = useRouter()

    const currentPage = ref(1)

    const handleChangeCurrentPage = (val: number): void => {
      currentPage.value = val
      emit('on-change-page', {
        offset: (currentPage.value - 1) * 12,
      })
    }

    const handleSubmitToHistory = (item: PokemonType): void => {
      emit('on-submit-to-history', {
        image: item.image,
        name: item.name,
        id: item.id,
      })
    }

    const handleOpenPokemonDetail = (pokemonId: number) => {
      router.push({ name: 'DetailPage', params: { id: pokemonId } })
    }

    return {
      currentPage,
      handleChangeCurrentPage,
      handleSubmitToHistory,
      handleOpenPokemonDetail,
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
    justify-content: center;
  }

  &__card {
    margin: 0 25px 25px 0;
    cursor: pointer;
  }
}
</style>
