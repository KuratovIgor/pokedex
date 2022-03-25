<template>
  <div class="history">
    <div class="history__title">pokemon history</div>
    <div class="history__pokemon-list">
      <pokemon-card
        class="history__pokemon"
        v-for="pokemon in pokemonListHistory"
        :image="pokemon.image"
        :number="pokemon.number"
        :name="pokemon.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PokemonCard from '@/components/PokemonCard.vue'
import { pokemonType } from '@/types/pokemonType'

export default defineComponent({
  name: 'SidebarHistory',
  components: { PokemonCard },

  setup() {
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

    return { pokemonListHistory }
  },
})
</script>

<style lang="scss" scoped>
.history {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 650px;

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
    border: 1px solid #000;
    border-radius: 10px;
  }

  &__pokemon {
    margin: 30px;
  }
}
</style>
