<template>
  <div class="pokemon-description" :key="$forceUpdate">
    <ability-description
      v-show="isAbilityDescriptionOpened"
      class="pokemon-description__about-pokemon"
      :name="abilityName"
      @on-close="closeDescription"
    />
    <div
      v-show="isAbilityDescriptionOpened === false"
      class="pokemon-description__about-pokemon about-pokemon"
    >
      <div class="about-pokemon__left-column">
        <div class="about-pokemon__item">
          <div class="about-pokemon__item-title">Height</div>
          <div class="about-pokemon__item-value">{{ pokemon.height }}</div>
        </div>
        <div class="about-pokemon__item">
          <div class="about-pokemon__item-title">Weight</div>
          <div class="about-pokemon__item-value">{{ pokemon.weight }}</div>
        </div>
        <div class="about-pokemon__item">
          <div class="about-pokemon__item-title">Gender</div>
          <div class="about-pokemon__item-value">{{ pokemon.gender }}</div>
        </div>
      </div>
      <div class="about-pokemon__right-column">
        <div class="about-pokemon__item">
          <div class="about-pokemon__item-title">Category</div>
          <div class="about-pokemon__item-value">{{ pokemon.category }}</div>
        </div>
        <div class="about-pokemon__item">
          <div class="about-pokemon__item-title">Abilities</div>
          <div
            class="about-pokemon__item-abilities"
            v-for="ability in pokemon.abilities"
          >
            <div class="about-pokemon__item-value">{{ ability }}</div>
            <div class="about-pokemon__item-icon">
              <icon-template
                width="15"
                height="15"
                name="question-sign"
                @click="openAbilityDescription(ability)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pokemon-description__type">
      <div class="pokemon-description__type-title">Type</div>
      <ul class="pokemon-description__type-items">
        <li
          class="pokemon-description__type-item"
          v-for="type in pokemon.types"
        >
          {{ type }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, PropType, ref } from 'vue'
import { PokemonDetailType } from '@/types/PokemonType'

const AbilityDescription = defineAsyncComponent(
  () => import('./AbilityDescription.vue')
)

export default defineComponent({
  name: 'PokemonDescription',
  components: { AbilityDescription },

  props: {
    pokemon: Object as PropType<PokemonDetailType>,
  },

  setup() {
    let abilityName = ref<string>()
    let isAbilityDescriptionOpened = ref<boolean>()

    const openAbilityDescription = (ability: string): void => {
      abilityName.value = ability
      isAbilityDescriptionOpened.value = true
    }

    const closeDescription = (item): void => {
      isAbilityDescriptionOpened.value = item.value
    }

    return {
      abilityName,
      isAbilityDescriptionOpened,
      closeDescription,
      openAbilityDescription,
    }
  },
})
</script>

<style lang="scss" scoped>
.pokemon-description {
  &__about-pokemon {
    margin-bottom: 20px;
    border: 1px solid #000;
    border-radius: 10px;
    background-color: #30a7d7;
  }

  &__type {
    margin-bottom: 10px;
    width: 400px;
    height: 70px;
    font-size: 20px;

    &-title {
      margin-bottom: 10px;
    }

    &-items {
      display: flex;
    }

    &-item {
      margin-right: 10px;
      border: 1px solid #000;
      border-radius: 5px;
      width: 100px;
      height: 30px;
      text-align: center;
    }
  }
}

.about-pokemon {
  display: flex;
  justify-content: space-between;
  padding: 15px;

  &__right-column {
    margin-right: 100px;
  }

  &__item {
    margin-bottom: 15px;

    &-title {
      margin-bottom: 10px;
      color: #fff;
    }

    &-value {
      font-size: 20px;
    }

    &-abilities {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 5px;
    }
  }
}
</style>
