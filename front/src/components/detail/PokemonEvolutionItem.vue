<template>
  <div class="pokemon-evolution-item">
    <router-link :to="`/detail-page/${pokemon.id}`">
      <img :src="pokemon.image" />
    </router-link>
    <div class="pokemon-evolution-item__info">
      <div class="pokemon-evolution-item__title">
        <div class="pokemon-evolution-item__name">
          {{ pokemon.name }}
        </div>
        <div class="pokemon-evolution-item__id">
          {{ idToString(pokemon.id) }}
        </div>
      </div>
      <ul class="pokemon-evolution-item__types">
        <li
          v-for="type in pokemon.types"
          class="pokemon-evolution-item__type"
          :class="`${type}-type`"
        >
          {{ type }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PokemonType } from '@/types/pokemonType'
import { idToString } from '@/utils'

export default defineComponent({
  name: 'PokemonEvolutionItem',

  props: {
    pokemon: Object as PropType<PokemonType>,
  },

  setup() {
    return {
      idToString,
    }
  },
})
</script>

<style lang="scss" scoped>
.pokemon-evolution-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-content: center;
  margin: 10px;
  background-color: transparent;

  img {
    border: 5px solid $color-white;
    border-radius: 50%;
    width: 140px;
    height: 140px;
    box-shadow: 5px 5px 10px $color-black;

    &:hover {
      box-shadow: 5px 5px 20px $color-black;
      transform: scale(1.05);
      transition: 0.1s linear;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px 0;
  }

  &__title {
    display: flex;
    margin-bottom: 10px;
    font-size: 20px;
  }

  &__name {
    margin-right: 5px;
    color: $color-white;
  }

  &__id {
    color: $id-color;
  }

  &__types {
    display: flex;
    font-size: 17px;
  }

  &__type {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px 5px 0;
    border: 1px solid $color-black;
    border-radius: 5px;
    width: 70px;
    height: 25px;
  }
}
</style>
