<template>
  <div class="ability-description">
    <div class="ability-description__header">
      <div class="ability-description__title">ability info</div>
      <div class="ability-description__close">× Close</div>
    </div>
    <div class="ability-description__description">
      <div class="ability-description__name">{{ pokemonAbility.name }}</div>
      <div class="ability-description__text">
        {{ pokemonAbility.description }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { pokemonAPI } from '@/api/pokemon.api'
import { AbilityType } from '@/types/PokemonType'

export default defineComponent({
  name: 'AbilityDescription',

  props: {
    name: String,
  },

  setup(props) {
    let pokemonAbility = ref<AbilityType>()

    const getAbilityInfo = async (abilityName: string) => {
      const [error, data] = await pokemonAPI.getAbilityInfo(abilityName)
      pokemonAbility.value = data.ability
    }

    getAbilityInfo(props.name)

    return {
      pokemonAbility,
    }
  },
})
</script>

<style lang="scss" scoped>
.ability-description {
  margin-bottom: 20px;
  border: 1px solid #000;
  border-radius: 10px;
  width: 400px;
  height: 200px;
  background-color: #313131;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
  }

  &__description {
    margin-left: 10px;
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
    color: #fff;
    background: #000;
  }

  &__name {
    margin-bottom: 10px;
    font-size: 30px;
    color: #fff;
  }

  &__text {
    font-size: 15px;
    color: #fff;
  }
}
</style>
