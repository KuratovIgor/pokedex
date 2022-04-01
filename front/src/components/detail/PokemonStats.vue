<template>
  <div class="pokemon-stats">
    <div class="pokemon-stats__title">Stats</div>
    <ul class="pokemon-stats__stat">
      <li class="pokemon-stats__column">
        <ul>
          <li
            class="pokemon-stats__row"
            v-for="emptyRow in statRows - stat.hp"
          />
          <li class="pokemon-stats__row-fill" v-for="fillRow in stat.hp" />
          <li class="pokemon-stats__row-name">HP</li>
        </ul>
      </li>
      <li class="pokemon-stats__column">
        <ul>
          <li
            class="pokemon-stats__row"
            v-for="emptyRow in statRows - stat.attack"
          />
          <li class="pokemon-stats__row-fill" v-for="fillRow in stat.attack" />
          <li class="pokemon-stats__row-name">Attack</li>
        </ul>
      </li>
      <li class="pokemon-stats__column">
        <ul>
          <li
            class="pokemon-stats__row"
            v-for="emptyRow in statRows - stat.defence"
          />
          <li class="pokemon-stats__row-fill" v-for="fillRow in stat.defence" />
          <li class="pokemon-stats__row-name">Defense</li>
        </ul>
      </li>
      <li class="pokemon-stats__column">
        <ul>
          <li
            class="pokemon-stats__row"
            v-for="emptyRow in statRows - stat.special_attack"
          />
          <li
            class="pokemon-stats__row-fill"
            v-for="fillRow in stat.special_attack"
          />
          <li class="pokemon-stats__row-name">Special Attack</li>
        </ul>
      </li>
      <li class="pokemon-stats__column">
        <ul>
          <li
            class="pokemon-stats__row"
            v-for="emptyRow in statRows - stat.special_defence"
          />
          <li
            class="pokemon-stats__row-fill"
            v-for="fillRow in stat.special_defence"
          />
          <li class="pokemon-stats__row-name">Special Defense</li>
        </ul>
      </li>
      <li class="pokemon-stats__column">
        <ul>
          <li
            class="pokemon-stats__row"
            v-for="emptyRow in statRows - stat.speed"
          />
          <li class="pokemon-stats__row-fill" v-for="fillRow in stat.speed" />
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
  border: 1px solid #000;
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
    border: 1px solid #000;
    width: 60px;
    height: 10px;
    background-color: #fff;

    &-fill {
      margin-bottom: 3px;
      border: 1px solid #000;
      width: 60px;
      height: 10px;
      background-color: #30a7d7;
    }

    &-name {
      font-size: 13px;
      text-align: center;
    }
  }
}
</style>
