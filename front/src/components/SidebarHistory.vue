<template>
  <div class="history">
    <div class="history__title">pokemon history</div>
    <div class="history__pokemon-list">
      <pokemon-card
        class="history__pokemon"
        v-for="pokemon in pokemonListHistory"
        :pokemon-count="1127"
        :image="pokemon.image"
        :id="pokemon.id"
        :name="pokemon.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PokemonCard from '@/components/PokemonCard.vue'
import { PokemonType } from '@/types/PokemonType'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SidebarHistory',
  components: { PokemonCard },

  setup() {
    let pokemonListHistory = ref<PokemonType[]>()

    const store = useStore()

    store.commit('getHostoryFromLocalStorage')

    pokemonListHistory = store.getters.getHistory

    return {
      pokemonListHistory,
    }
  },
})
</script>

<style lang="scss" scoped>
.history {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    margin-bottom: 10px;
    font-family: 'Arial Italic';
    font-size: 25px;
    text-align: center;
    text-transform: uppercase;
  }

  &__pokemon-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow: scroll;
    overflow-x: hidden;
    border: 2px solid #000;
    border-radius: 15px;
    width: 500px;
    height: 615px;

    &::-webkit-scrollbar {
      border-radius: 20px;
      width: 15px;
      opacity: 100%;
    }

    &::-webkit-scrollbar-thumb {
      border: 1px solid #000;
      border-radius: 20px;
      background: #30a7d7;
    }
  }

  &__pokemon {
    margin: 30px;
  }
}
</style>
