<template>
  <div
    class="ability-description"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-background="rgba(0, 0, 0, 0.2)"
  >
    <template v-if="pokemonAbility">
      <div class="ability-description__header">
        <div class="ability-description__title">ability info</div>
        <button
          class="ability-description__close"
          @click="handleCloseDescription"
        >
          × Close
        </button>
      </div>
      <div class="ability-description__content">
        <div class="ability-description__name">{{ pokemonAbility.name }}</div>
        <div class="ability-description__text">
          {{ pokemonAbility.description }}
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { pokemonAPI } from '@/api/pokemon.api'
import { AbilityType } from '@/types/PokemonType'

export default defineComponent({
  name: 'AbilityDescription',

  props: {
    name: String,
  },

  setup(props, { emit }) {
    const loading = ref(true)

    let pokemonAbility = ref<AbilityType>()

    const getAbilityInfo = async (abilityName: string): Promise<void> => {
      loading.value = true

      const [error, data] = await pokemonAPI.getAbilityInfo(abilityName)
      pokemonAbility.value = data.ability

      loading.value = false
    }

    const handleCloseDescription = (): void => {
      emit('on-close-click')
    }

    onMounted((): void => {
      getAbilityInfo(props.name)
    })

    return {
      loading,
      pokemonAbility,
      handleCloseDescription,
    }
  },
})
</script>

<style lang="scss" scoped>
.ability-description {
  margin-bottom: 20px;
  border: 1px solid $color-black;
  border-radius: 10px;
  width: 500px;
  height: 215px;
  background-color: #313131;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
  }

  &__content {
    margin: 0 10px;
  }

  &__title {
    margin-left: 10px;
    font-size: 17px;
    color: #61615b;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 5px 0 25px;
    width: 80px;
    height: 100%;
    font-size: 17px;
    color: $color-white;
    background: $color-black;
  }

  &__name {
    margin-bottom: 10px;
    font-size: 30px;
    color: $color-white;
  }

  &__text {
    overflow: scroll;
    overflow-x: hidden;
    max-height: 120px;
    font-size: 15px;
    letter-spacing: 1px;
    color: $color-white;

    &::-webkit-scrollbar {
      border-radius: 20px;
      width: 10px;
      opacity: 100%;
    }

    &::-webkit-scrollbar-thumb {
      border: 1px solid $color-black;
      border-radius: 20px;
      background: #9da0a8;
    }
  }
}
</style>
