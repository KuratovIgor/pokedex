<template>
  <div class="pokemon-evolution">
    <div class="pokemon-evolution__title">Стадии Эволюции</div>
    <div class="pokemon-evolution__stages">
      <div v-for="stage in evolution" class="pokemon-evolution__stage">
        <div v-for="pokemon in stage" class="pokemon-evolution__stage-item">
          <router-link :to="`/detail-page/${pokemon.id}`">
            <img
              :src="pokemon.image"
              @click="handleSubmitPokemonToHistory(pokemon)"
            />
          </router-link>
          <div class="pokemon-evolution__pokemon-info pokemon-info">
            <div class="pokemon-info__title">
              <div class="pokemon-info__name">{{ pokemon.name }}</div>
              <div class="pokemon-info__id">{{ getIdString(pokemon.id) }}</div>
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
        <div
          v-if="stage !== evolution[evolution.length - 1]"
          class="pokemon-evolution__arrow"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useRoute } from 'vue-router'
import { PokemonType, EvolutionType } from '@/types/pokemonType'
import { idToString, submitPokemonToHistory } from '@/utils'

export default defineComponent({
  name: 'PokemonEvolution',

  props: {
    evolution: Array as PropType<EvolutionType>,
  },

  setup(__, { emit }) {
    const route = useRoute()

    const getIdString = (id: number): string => {
      return idToString(id)
    }

    const handleSubmitPokemonToHistory = (pokemon: PokemonType): void => {
      if (pokemon.id !== Number(route.params.id)) {
        submitPokemonToHistory(pokemon)

        emit('openPokemonDetail', { id: pokemon.id })
      }
    }

    return {
      getIdString,
      handleSubmitPokemonToHistory,
    }
  },
})
</script>

<style lang="scss" scoped>
.pokemon-evolution {
  border: 1px solid $color-black;
  border-radius: 10px 10px 10px 50px;
  width: 1000px;
  min-height: 230px;
  background-color: $evolution-color;

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

  &__title {
    margin: 10px;
    color: $color-white;
  }

  &__stages {
    display: flex;
  }

  &__stage {
    display: flex;
    flex-wrap: wrap;
    margin-left: 20px;
    min-width: 300px;
  }

  &__stage-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    justify-content: center;
    margin: 10px;
    background-color: $evolution-color;
  }

  &__pokemon-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px 0;
  }

  &__arrow {
    align-self: center;
    margin-left: 50px;
    border: 5px solid $color-white;
    border-bottom: hidden;
    border-left: hidden;
    width: 40px;
    height: 40px;
    transform: rotateZ(45deg);
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
