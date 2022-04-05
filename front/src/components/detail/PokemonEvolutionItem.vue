<template>
  <div class="pokemon-evolution-item">
    <router-link :to="`/detail-page/${pokemon.id}`">
      <img
        :src="pokemon.image"
        @click="handleSubmitPokemonToHistory(pokemon)"
      />
    </router-link>
    <div class="pokemon-evolution-item-info pokemon-info">
      <div class="pokemon-info__title">
        <div class="pokemon-info__name">
          {{ pokemon.name }}
        </div>
        <div class="pokemon-info__id">
          {{ idToString(pokemon.id) }}
        </div>
      </div>
      <ul class="pokemon-info__types">
        <li
          v-for="type in pokemon.types"
          class="pokemon-info__type"
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
  background-color: $evolution-color;

  &__pokemon-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px 0;
  }

  img {
    border: 5px solid $color-white;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    box-shadow: 5px 5px 10px $color-black;

    &:hover {
      box-shadow: 5px 5px 20px $color-black;
      transform: scale(1.05);
      transition: 0.1s linear;
    }
  }
}

.pokemon-info {
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
