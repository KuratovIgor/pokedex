<template>
  <div class="pokemon-evolution">
    <div class="pokemon-evolution__title">Стадии Эволюции</div>
    <div class="pokemon-evolution__stages">
      <div v-for="stage in evolution" class="pokemon-evolution__stage">
        <div v-for="pokemon in stage" class="pokemon-evolution__stage-item">
          <router-link :to="`/detail-page/${pokemon.id}`">
            <img
              :src="pokemon.image"
              @click="submitPokemonToHistory(pokemon)"
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
          v-if="stage != evolution[evolution.length - 1]"
          class="pokemon-evolution__arrow"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { PokemonType } from '@/types/pokemonType'

export default defineComponent({
  name: 'PokemonEvolution',

  props: {
    evolution: Object,
  },

  setup() {
    const store = useStore()
    const route = useRoute()

    const getIdString = (id: string): void => {
      store.commit('idToString', id)
      return store.getters.getIdString
    }

    const submitPokemonToHistory = (pokemon: PokemonType): void => {
      if (pokemon.id !== Number(route.params.id)) {
        store.commit('submitPokemonToHistory', pokemon)
      }
    }

    return {
      getIdString,
      submitPokemonToHistory,
    }
  },
})
</script>

<style lang="scss" scoped>
.pokemon-evolution {
  border: 1px solid #000;
  border-radius: 10px 10px 10px 50px;
  width: 1000px;
  min-height: 230px;
  background-color: #616161;

  img {
    border: 5px solid #fff;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    box-shadow: 5px 5px 10px #000;

    &:hover {
      box-shadow: 5px 5px 20px #000;
      transform: scale(1.05);
      transition: 0.1s linear;
    }
  }

  &__title {
    margin: 10px;
    color: #fff;
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
    background-color: #616161;
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
    border: 5px solid #fff;
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
    color: #fff;
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
    border: 1px solid #000;
    border-radius: 5px;
    width: 70px;
    height: 25px;
  }
}
</style>
