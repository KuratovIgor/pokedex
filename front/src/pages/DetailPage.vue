<template>
  <div
    class="detail-page"
    v-loading.body="loading"
    element-loading-text="Loading..."
  >
    <template v-if="pokemonDetail">
      <div class="detail-page__title">
        <div class="detail-page__title-name">{{ pokemonDetail.name }}</div>
        <div class="detail-page__title-number">{{ idString }}</div>
      </div>
      <div class="pokemon-info">
        <div class="pokemon-info__detail">
          <div class="pokemon-info__image">
            <img :src="pokemonDetail.image" />
          </div>
          <pokemon-description
            class="pokemon-info__description"
            :pokemon="pokemonDetail"
          />
        </div>
        <pokemon-stats
          class="pokemon-info__stats"
          :stat="pokemonDetail.stats"
        />
      </div>
      <pokemon-evolution :evolution="pokemonEvolution" :key="$forceUpdate" />
    </template>
  </div>
</template>
<script lang="ts">
import PokemonDescription from '@/components/detail/PokemonDescription.vue'
import PokemonStats from '@/components/detail/PokemonStats.vue'
import PokemonEvolution from '@/components/detail/PokemonEvolution.vue'
import { defineComponent, ref, onMounted, watch } from 'vue'
import { pokemonAPI } from '@/api/pokemon.api'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { EvolutionType, PokemonDetailType } from '@/types/pokemonType'
import { idToString } from '../utils'

export default defineComponent({
  name: 'DetailPage',
  components: { PokemonEvolution, PokemonDescription, PokemonStats },

  setup() {
    const loading = ref(false)
    let pokemonDetail = ref<PokemonDetailType>()
    let pokemonEvolution = ref<EvolutionType>()
    let idString = ref<string>()

    const route = useRoute()

    onBeforeRouteUpdate(async (to): Promise<void> => {
      await getPokemonDetail(Number(to.params.id))
    })

    const getPokemonDetail = async (id: number): Promise<void> => {
      loading.value = true

      const [_, data] = await pokemonAPI.getPokemonDelail(id)
      pokemonDetail.value = data.pokemon.pokemonInfo
      pokemonEvolution.value = data.pokemon.evolution
      idString.value = idToString(pokemonDetail.value.id)

      loading.value = false
    }

    onMounted((): void => {
      getPokemonDetail(Number(route.params.id))
    })

    return {
      loading,
      pokemonDetail,
      pokemonEvolution,
      idString,
    }
  },
})
</script>

<style lang="scss" scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px 50px;
  width: 100%;
  height: 100%;

  &__title {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    font-size: 30px;

    &-name {
      margin-right: 10px;
    }

    &-number {
      color: $id-color;
    }

    @media (max-width: 820px) {
      margin-bottom: 30px;
    }
  }

  @media (max-width: 820px) {
    align-items: center;
  }

  @media (max-width: 760px) {
    padding: 10px 30px;
  }
}

.pokemon-info {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__detail {
    display: flex;
    margin-bottom: 20px;
    width: 100%;

    @media (max-width: 820px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__image {
    min-width: 320px;
    max-width: 450px;
    max-height: 450px;

    img {
      border: 1px solid $color-black;
      border-radius: 15px;
      width: 100%;
      height: 100%;
      background-color: $card-color;
    }

    @media (max-width: 820px) {
      margin-bottom: 20px;
      min-width: 250px;
    }
  }

  &__description {
    margin-left: 30px;

    @media (max-width: 820px) {
      margin: 0;
    }
  }

  &__stats {
    margin-bottom: 20px;
  }

  @media (max-width: 820px) {
    align-items: center;
  }
}
</style>
