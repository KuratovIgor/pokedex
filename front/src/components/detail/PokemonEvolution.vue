<template>
  <div class="pokemon-evolution">
    <div class="pokemon-evolution__title">Стадии Эволюции</div>
    <ul class="pokemon-evolution__stages">
      <li class="pokemon-evolution__stage-first">
        <div class="pokemon-evolution__stage-item">
          <pokemon-evolution-item :pokemon="evolution[0].stage[0]" />
        </div>
      </li>
      <li
        class="pokemon-evolution__arrows"
        :class="{
          'arrow-alone': countFirstArrows !== 2,
          'arrow-not-alone': countFirstArrows === 2,
        }"
      >
        <div
          v-for="arrow in countFirstArrows"
          class="pokemon-evolution__arrow"
        />
      </li>
      <ul
        class="pokemon-evolution__stage-middle"
        :class="{ column: countFirstArrows === 2, row: countFirstArrows !== 2 }"
      >
        <li
          v-for="stage in evolution[1].stage"
          class="pokemon-evolution__stage-item"
        >
          <pokemon-evolution-item :pokemon="stage" />
        </li>
      </ul>
      <li
        class="pokemon-evolution__arrows"
        :class="{
          'arrow-alone': countSecondArrows !== 2,
          'arrow-not-alone': countSecondArrows === 2,
        }"
      >
        <div
          v-for="arrow in countSecondArrows"
          class="pokemon-evolution__arrow"
        />
      </li>
      <ul
        class="pokemon-evolution__stage-last"
        :class="{
          column: countSecondArrows === 2,
          row: countSecondArrows !== 2,
        }"
      >
        <li
          v-for="stage in evolution[2].stage"
          class="pokemon-evolution__stage-item"
        >
          <pokemon-evolution-item :pokemon="stage" />
        </li>
      </ul>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { EvolutionType } from '@/types/pokemonType'
import { idToString } from '@/utils'
import PokemonEvolutionItem from '@/components/detail/PokemonEvolutionItem.vue'

export default defineComponent({
  name: 'PokemonEvolution',
  components: { PokemonEvolutionItem },

  props: {
    evolution: Array as PropType<EvolutionType>,
  },

  setup(props) {
    const countFirstArrows = ref<number>()
    const countSecondArrows = ref<number>()

    const setCountArrow = (id: number): number => {
      if (
        props.evolution[id].stage.length !== 1 &&
        props.evolution[id].stage.length < 3
      ) {
        return props.evolution[id].stage.length
      } else {
        return 1
      }
    }

    countFirstArrows.value = setCountArrow(1)
    countSecondArrows.value = setCountArrow(2)

    return {
      idToString,
      countFirstArrows,
      countSecondArrows,
    }
  },
})
</script>

<style lang="scss" scoped>
.column {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-flow: row wrap;
}

.arrow-alone {
  justify-content: center;
}

.arrow-not-alone {
  justify-content: space-between;
}

.pokemon-evolution {
  border: 1px solid $color-black;
  border-radius: 10px 10px 10px 50px;
  width: 1000px;
  background: url('../../assets/images/evolution_bg.png');

  &__title {
    margin: 10px;
    color: $color-white;
  }

  &__stages {
    display: flex;
    justify-content: space-around;
  }

  &__stage-first {
    display: flex;
  }

  &__stage-middle {
    max-width: 800px;
  }

  &__stage-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    justify-content: center;
    margin: 10px;
  }

  &__pokemon-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px 0;
  }

  &__arrows {
    display: flex;
    flex-direction: column;
    margin: 70px 0 130px;
  }

  &__arrow {
    align-self: center;
    margin: 0 30px;
    border: 5px solid $color-white;
    border-bottom: hidden;
    border-left: hidden;
    width: 30px;
    height: 30px;
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
