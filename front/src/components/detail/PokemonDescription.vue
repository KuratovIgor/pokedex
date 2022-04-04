<template>
  <div class="pokemon-description">
    <ability-description
      v-if="isAbilityOpen"
      class="pokemon-description__about-pokemon"
      :name="abilityName"
      @on-close-click="handleCloseDescription"
    />
    <div v-else class="pokemon-description__about-pokemon about-pokemon">
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
            v-for="ability in pokemon.abilities"
            class="about-pokemon__item-abilities"
          >
            <div class="about-pokemon__item-value">{{ ability }}</div>
            <div class="about-pokemon__item-icon">
              <icon-template
                width="15"
                height="15"
                name="question-sign"
                @click="handleOpenAbilityDescription(ability)"
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
          v-for="type in pokemon.types"
          class="pokemon-description__type-item"
          :class="`${type}-type`"
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
    let isAbilityOpen = ref(false)

    const handleOpenAbilityDescription = (ability: string): void => {
      abilityName.value = ability
      isAbilityOpen.value = true
    }

    const handleCloseDescription = (): void => {
      isAbilityOpen.value = false
    }

    return {
      abilityName,
      isAbilityOpen,
      handleCloseDescription,
      handleOpenAbilityDescription,
    }
  },
})
</script>

<style lang="scss" scoped>
.pokemon-description {
  width: 500px;

  &__about-pokemon {
    margin-bottom: 20px;
    border: 1px solid #000;
    border-radius: 10px;
    background-color: $color-blue;
  }

  &__type {
    margin-bottom: 10px;
    width: 500px;
    height: 70px;
    font-size: 20px;

    &-title {
      margin-bottom: 10px;
    }

    &-items {
      display: flex;
    }

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 5px 5px 0;
      border: 1px solid $color-black;
      border-radius: 5px;
      width: 100px;
      height: 30px;
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
      color: $color-white;
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

    &-icon {
      margin-left: 10px;

      &:hover {
        transform: scale(1.2);
        transition: 0.1s linear;
      }
    }
  }
}
</style>
