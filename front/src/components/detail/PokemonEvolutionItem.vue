<template>
  <div class="pokemon-evolution-item">
    <router-link :to="`/pokemon/${pokemon.id}`">
      <img
        :src="pokemon.image"
        @click="handleSubmitPokemonToHistory(pokemon)"
      />
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
import { defineComponent, PropType, ref } from 'vue'
import { useRoute } from 'vue-router'
import { PokemonType } from '@/types/pokemonType'
import { idToString, submitPokemonToHistory } from '@/utils'

export default defineComponent({
  name: 'PokemonEvolutionItem',

  props: {
    pokemon: Object as PropType<PokemonType>,
  },

  setup() {
    const route = useRoute()

    const handleSubmitPokemonToHistory = (pokemon: PokemonType): void => {
      if (pokemon.id !== Number(route.params.id)) {
        submitPokemonToHistory(pokemon)
      }
    }

    return {
      idToString,
      handleSubmitPokemonToHistory,
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

    @media (max-width: 1200px) {
      border: 2px solid $color-white;
    }

    @media (max-width: 1000px) {
      width: 90px;
      height: 90px;
    }

    @media (max-width: 600px) {
      width: 60px;
      height: 60px;
    }

    @media (max-width: 450px) {
      width: 40px;
      height: 40px;
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

    @media (max-width: 820px) {
      font-size: 12px;
    }

    @media (max-width: 600px) {
      flex-direction: column;
      font-size: 10px;
    }
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

    @media (max-width: 820px) {
      font-size: 10px;
    }

    @media (max-width: 600px) {
      display: none;
    }
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

    @media (max-width: 820px) {
      width: 50px;
      height: 20px;
    }
  }
}
</style>
