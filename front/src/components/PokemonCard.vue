<template>
  <el-card class="pokemon-card" shadow="hover">
    <template #header>
      <h3 class="pokemon-info__name">{{ name }}</h3>
    </template>
    <img
      class="pokemon-card__image"
      :src="image"
      @click="handleSubmitToHistory"
    />
    <div class="pokemon-info">
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
  </el-card>
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
      idString,
      handleSubmitToHistory,
    }
  },
})
</script>

<style lang="scss" scoped>
.pokemon-card {
  width: 100%;
  max-width: 220px;

  &__image {
    margin-bottom: 10px;
    width: 178px;
    height: 178px;

    @media (max-width: 900px) {
      width: 120px;
      height: 120px;
    }
  }

  .pokemon-info {
    display: flex;
    flex-direction: column;

    &__name {
      font-weight: 700;

      @media (max-width: 900px) {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 900px) {
    max-width: 150px;
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
    margin-right: 5px;
    border: 1px solid $color-black;
    border-radius: 5px;
    width: 70px;
    height: 25px;
  }

  @media (max-width: 900px) {
    font-size: 12px;

    &__item {
      border-radius: 5px;
      width: 50px;
      height: 20px;
    }
  }
}
</style>
