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
            v-for="emptyRow in statRows - stat.special_attack"
            class="pokemon-stats__row"
          />
          <li
            v-for="fillRow in stat.special_attack"
            class="pokemon-stats__row-fill"
          />
          <li class="pokemon-stats__row-name">Special Attack</li>
        </ul>
      </li>
      <li class="pokemon-stats__column">
        <ul>
          <li
            v-for="emptyRow in statRows - stat.special_defence"
            class="pokemon-stats__row"
          />
          <li
            v-for="fillRow in stat.special_defence"
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
import { StatType } from '@/types/PokemonType'

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
  width: 450px;
  height: 270px;
  background-color: #a4a4a4;

  &__title {
    margin: 10px;
  }

  &__stat {
    display: flex;
    justify-content: center;
    margin: 10px;
  }

  &__column {
    margin-right: 10px;
    width: 60px;
    height: 10px;
  }

  &__row {
    margin-bottom: 3px;
    border: 1px solid $color-black;
    width: 60px;
    height: 10px;
    background-color: $color-white;

    &-fill {
      margin-bottom: 3px;
      border: 1px solid $color-black;
      width: 60px;
      height: 10px;
      background-color: $color-blue;
    }

    &-name {
      font-size: 13px;
      text-align: center;
    }
  }
}
</style>
