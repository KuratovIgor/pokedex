<template>
  <div class="pokemon-stats">
    <div class="pokemon-stats__title">Stats</div>
    <ul class="pokemon-stats__stat">
      <li class="pokemon-stats__column">
        <ul>
          <li
            v-for="emptyRow in statRows - stat.hp"
            class="pokemon-stats__row"
          />
          <li v-for="fillRow in stat.hp" class="pokemon-stats__row-fill" />
          <li class="pokemon-stats__row-name">HP</li>
        </ul>
      </li>
      <li class="pokemon-stats__column">
        <ul>
          <li
            v-for="emptyRow in statRows - stat.attack"
            class="pokemon-stats__row"
          />
          <li v-for="fillRow in stat.attack" class="pokemon-stats__row-fill" />
          <li class="pokemon-stats__row-name">Attack</li>
        </ul>
      </li>
      <li class="pokemon-stats__column">
        <ul>
          <li
            v-for="emptyRow in statRows - stat.defence"
            class="pokemon-stats__row"
          />
          <li v-for="fillRow in stat.defence" class="pokemon-stats__row-fill" />
          <li class="pokemon-stats__row-name">Defense</li>
        </ul>
      </li>
      <li class="pokemon-stats__column">
        <ul>
          <li
            v-for="emptyRow in statRows - stat.specialAttack"
            class="pokemon-stats__row"
          />
          <li
            v-for="fillRow in stat.specialAttack"
            class="pokemon-stats__row-fill"
          />
          <li class="pokemon-stats__row-name">Special Attack</li>
        </ul>
      </li>
      <li class="pokemon-stats__column">
        <ul>
          <li
            v-for="emptyRow in statRows - stat.specialDefence"
            class="pokemon-stats__row"
          />
          <li
            v-for="fillRow in stat.specialDefence"
            class="pokemon-stats__row-fill"
          />
          <li class="pokemon-stats__row-name">Special Defense</li>
        </ul>
      </li>
      <li class="pokemon-stats__column">
        <ul>
          <li
            v-for="emptyRow in statRows - stat.speed"
            class="pokemon-stats__row"
          />
          <li v-for="fillRow in stat.speed" class="pokemon-stats__row-fill" />
          <li class="pokemon-stats__row-name">Speed</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { StatType } from '@/types/pokemonType'

export default defineComponent({
  name: 'PokemonStats',

  props: {
    stat: Object as PropType<StatType>,
  },

  setup() {
    const statRows = ref(15)

    return { statRows }
  },
})
</script>

<style lang="scss" scoped>
.pokemon-stats {
  border: 1px solid $color-black;
  border-radius: 10px;
  width: 100%;
  height: 270px;
  max-width: 450px;
  background-color: #a4a4a4;

  &__title {
    margin: 10px;
  }

  &__stat {
    display: flex;
    justify-content: space-between;
    margin: 10px;
  }

  &__column {
    margin-right: 10px;
    width: 100%;
    max-width: 60px;
  }

  &__row {
    margin-bottom: 3px;
    border: 1px solid $color-black;
    width: 100%;
    height: 10px;
    background-color: $color-white;

    &-fill {
      margin-bottom: 3px;
      border: 1px solid $color-black;
      height: 10px;
      background-color: $color-blue;
    }

    &-name {
      font-size: 13px;
      text-align: center;

      @media (max-width: 550px) {
        font-size: 10px;
      }
    }
  }

  @media (max-width: 820px) {
    max-width: 500px;
  }
}
</style>
