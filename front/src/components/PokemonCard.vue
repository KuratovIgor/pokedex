<template>
  <div class="pokemon-card">
    <router-link :to="`/detail-page/${id}`">
      <img
        class="pokemon-card__image"
        :src="image"
        @click="onSubmitToHistory"
      />
    </router-link>
    <div class="pokemon-info">
      <p class="pokemon-info__number">{{ idString }}</p>
      <h3 class="pokemon-info__name">{{ name }}</h3>
      <ul class="pokemon-abilities">
        <li v-for="type in types" class="pokemon-abilities__item">
          <div>{{ type }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

export default defineComponent({
  name: 'PokemonCard',

  props: {
    pokemonCount: Number,
    image: String,
    id: Number,
    name: String,
    types: Array as PropType<string[]>,
  },

  setup(props, { emit }) {
    const onSubmitToHistory = (): void => {
      emit('onSubmitToHistory', {
        image: props.image,
        name: props.name,
        id: props.id,
      })
    }

    const idString = computed(() => {
      if (typeof props.id !== 'undefined') {
        let idString: string = props.id.toString()
        const idLength: number = idString.length
        const totalLength: number = props.pokemonCount.toString().length

        for (let i = 0; i < totalLength - idLength; i++) {
          idString = '0' + idString
        }

        idString = '#' + idString

        return idString
      }
    })

    return { onSubmitToHistory, idString }
  },
})
</script>

<style lang="scss" scoped>
.pokemon-card {
  font-family: 'Arial';

  &__image {
    border-radius: 10%;
    width: 170px;
    height: 170px;
    background: $card-color;
  }

  .pokemon-info {
    display: flex;
    flex-direction: column;
    padding-left: 10px;

    &__number {
      margin-bottom: 10px;
      font-size: 11px;
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

.pokemon-abilities {
  display: flex;

  &__item {
    margin-right: 5px;
    border: 1px solid #000;
    border-radius: 5px;
    width: 60px;
    text-align: center;
  }
}

@keyframes pokemon-hover {
  50% {
    transform: translateY(-5px);
  }
}
</style>
