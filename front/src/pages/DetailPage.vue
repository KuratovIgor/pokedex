<template>
  <div
    class="detail-page"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-background="rgba(0, 0, 0, 0.6)"
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
      <pokemon-evolution
        :evolution="pokemonDetail.evolution"
        @open-pokemon-detail="handleOpenDetailPage"
      />
    </template>
  </div>
</template>
<script lang="ts">
import PokemonDescription from '@/components/detail/PokemonDescription.vue'
import PokemonStats from '@/components/detail/PokemonStats.vue'
import PokemonEvolution from '@/components/detail/PokemonEvolution.vue'
import { defineComponent, ref, computed, onMounted } from 'vue'
import { pokemonAPI } from '@/api/pokemon.api'
import { useRoute } from 'vue-router'
import { PokemonDetailType } from '@/types/pokemonType'
import { idToString } from '@/utils'

export default defineComponent({
  name: 'DetailPage',
  components: { PokemonEvolution, PokemonDescription, PokemonStats },

  setup() {
    const loading = ref(false)
    let pokemonDetail = ref<PokemonDetailType>()
    let idString = ref<string>()

    const route = useRoute()

    const getPokemonDetail = async (id): Promise<void> => {
      loading.value = true

      const [error, data] = await pokemonAPI.getPokemonDelail(id)
      pokemonDetail.value = data.pokemon
      idString.value = idToString(pokemonDetail.value.id)

      loading.value = false
    }

    const handleOpenDetailPage = async (item): Promise<void> => {
      await getPokemonDetail(item.id)
    }

    onMounted(() => {
      getPokemonDetail(route.params.id)
    })

    return {
      loading,
      pokemonDetail,
      idString,
      handleOpenDetailPage,
    }
  },
})
</script>

<style lang="scss" scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  min-width: 1000px;

  &__title {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    font-family: 'Arial';
    font-size: 30px;

    &-name {
      margin-right: 10px;
    }

    &-number {
      color: $id-color;
    }
  }
}

.pokemon-info {
  display: flex;
  flex-direction: column;

  &__detail {
    display: flex;
    margin-bottom: 20px;
  }

  &__image {
    img {
      border: 1px solid $color-black;
      border-radius: 15px;
      width: 450px;
      height: 450px;
      background-color: $card-color;
    }
  }

  &__description {
    margin-left: 30px;
  }

  &__stats {
    margin-bottom: 20px;
  }
}
</style>
