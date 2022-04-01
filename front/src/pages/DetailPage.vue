<template>
  <div class="detail-page">
    <div class="detail-page__title">
      <div class="detail-page__title__name">{{ pokemonDetail.name }}</div>
      <div class="detail-page__title__number">{{ idString }}</div>
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
      <pokemon-stats class="pokemon-info__stats" :stat="pokemonDetail.stats" />
    </div>
    <pokemon-evolution :evolution="pokemonDetail.evolution" />
  </div>
</template>
<script lang="ts">
import PokemonDescription from '@/components/detail/PokemonDescription.vue'
import PokemonStats from '@/components/detail/PokemonStats.vue'
import PokemonEvolution from '@/components/detail/PokemonEvolution.vue'
import { defineComponent, ref, computed } from 'vue'
import { pokemonAPI } from '@/api/pokemon.api'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DetailPage',
  components: { PokemonEvolution, PokemonDescription, PokemonStats },

  setup() {
    const store = useStore()
    const route = useRoute()

    let pokemonDetail = ref()

    const getPokemonDetail = async (id) => {
      const [error, data] = await pokemonAPI.getPokemonDelail(id)
      pokemonDetail.value = data.pokemon
    }

    getPokemonDetail(route.params.id)

    const idString = computed(() => {
      store.commit('idToString', pokemonDetail.value.id)
      return store.getters.getIdString
    })

    return {
      pokemonDetail,
      idString,
    }
  },
})
</script>

<style lang="scss" scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  margin-left: 50px;

  &__title {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    font-family: 'Arial';
    font-size: 30px;

    &__name {
      margin-right: 10px;
    }

    &__number {
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
      width: 450px;
      height: 450px;
      background-color: #f2f2f2;
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
