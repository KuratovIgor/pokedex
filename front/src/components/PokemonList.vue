<template>
  <div class="pokemon-list">
    <pokemon-card
      class="pokemon-list__item"
      v-for="pokemon in pokemonFiltered"
      :image="pokemon.image"
      :number="pokemon.number"
      :name="pokemon.name"
      :types="pokemon.types"
    />
  </div>
  <el-pagination
    class="pagination"
    layout="prev, pager, next"
    :current-page="currentPage"
    :page-size="1"
    :total="3"
    @currentChange="handleChangeCurrentPage"
  />
</template>

<script lang="ts">
import PokemonCard from '@/components/PokemonCard.vue'
import { computed, ref } from 'vue'

export default {
  name: 'PokemonList',
  components: { PokemonCard },

  props: {
    pokemonList: Array,
  },

  setup(props) {
    const currentPage = ref(1)

    const pokemonFiltered = computed(() => {
      return props.pokemonList.filter((item) => item.page === currentPage.value)
    })

    const handleChangeCurrentPage = (val) => {
      currentPage.value = val
    }

    return {
      pokemonFiltered,
      currentPage,
      handleChangeCurrentPage,
    }
  },
}
</script>

<style lang="scss" scoped>
.pokemon-list {
  display: flex;
  flex-wrap: wrap;

  &__item {
    margin: 25px;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  font-weight: 700;
}
</style>
