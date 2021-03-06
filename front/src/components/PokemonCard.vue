<template>
  <div class="pokemon-card">
    <router-link :to="`/detail-page/${id}`">
      <img
        class="pokemon-card__image"
        :src="image"
        @click="handleSubmitToHistory"
      />
    </router-link>
    <div class="pokemon-info">
      <p class="pokemon-info__number">{{ idString }}</p>
      <h3 class="pokemon-info__name">{{ name }}</h3>
      <ul class="pokemon-types">
        <li
          v-for="type in types"
          class="pokemon-types__item"
          :class="`${type}-type`"
        >
          {{ type }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { idToString } from '../utils'

export default defineComponent({
  name: 'PokemonCard',

  props: {
    image: String,
    id: Number,
    name: String,
    types: Array as PropType<string[]>,
  },

  setup(props, { emit }) {
    const idString = computed((): string => {
      return idToString(props.id)
    })

    const handleSubmitToHistory = (): void => {
      emit('on-submit-to-history', {
        image: props.image,
        name: props.name,
        id: props.id,
      })
    }

    return {
      handleSubmitToHistory,
      idString,
    }
  },
})
</script>

<style lang="scss" scoped>
.pokemon-card {
  max-width: 170px;
  font-family: 'Arial';

  &__image {
    margin-bottom: 10px;
    border: 1px solid $color-black;
    border-radius: 10%;
    width: 170px;
    height: 170px;
    box-shadow: 2px 2px 10px $color-black;
    background: $card-color;
  }

  .pokemon-info {
    display: flex;
    flex-direction: column;
    padding-left: 10px;

    &__number {
      margin-bottom: 10px;
      font-size: 12px;
      color: $id-color;
    }

    &__name {
      margin-bottom: 5px;
      font-weight: 700;
    }
  }

  &:hover {
    animation: pokemon-hover 0.5s linear;
  }
}

.pokemon-types {
  display: flex;
  flex-wrap: wrap;
  max-width: 170px;

  &__item {
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

@keyframes pokemon-hover {
  50% {
    transform: translateY(-5px);
  }
}
</style>
