<template>
  <div class="pokemon-evolution">
    <div class="pokemon-evolution__title">Стадии Эволюции</div>
    <div class="pokemon-evolution__stages">
      <div class="pokemon-evolution__stage" v-for="stage in evolution">
        <div class="pokemon-evolution__stage-item" v-for="pokemon in stage">
          <img :src="pokemon.image" />
          <div class="pokemon-evolution__pokemon-info pokemon-info">
            <div class="pokemon-info__title">
              <div class="pokemon-info__name">{{ pokemon.name }}</div>
              <div class="pokemon-info__id">{{ getIdString(pokemon.id) }}</div>
            </div>
            <ul class="pokemon-info__types">
              <li class="pokemon-info__type" v-for="type in pokemon.types">
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
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PokemonEvolution',

  props: {
    evolution: Object,
  },

  setup() {
    const store = useStore()

    const getIdString = (id) => {
      store.commit('idToString', id)
      return store.getters.getIdString
    }

    return { getIdString }
  },
})
</script>

<style lang="scss" scoped>
.pokemon-evolution {
  border: 1px solid #000;
  border-radius: 5px 5px 5px 50px;
  width: 900px;
  min-height: 230px;
  background-color: #616161;

  img {
    border: 5px solid #fff;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    box-shadow: 5px 5px 10px #000;
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
    margin-right: 5px;
    border: 1px solid #fff;
    border-radius: 5px;
    width: 70px;
    text-align: center;
    background-color: #f2f2f2;
  }
}
</style>
