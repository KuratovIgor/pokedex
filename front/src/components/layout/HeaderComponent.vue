<template>
  <div class="header">
    <div class="header__col">
      <router-link class="header__router" to="/">
        <icon-template
          :width="$screen.size === 'xs' ? 40 : 50"
          :height="$screen.size === 'xs' ? 40 : 50"
          name="pikachu"
          class="header__icon"
        />
      </router-link>
      <div class="header__title">pokedex</div>
    </div>

    <icon-template
      class="header__history"
      name="history"
      :width="$screen.size === 'xs' ? 30 : 40"
      :height="$screen.size === 'xs' ? 30 : 40"
      @click="handleOpenHistory"
    />

    <el-drawer
      v-model="isHistoryVisible"
      title="History"
      direction="rtl"
      :size="calculateDrawerSize($screen.size)"
    >
      <pokemon-card
        class="header__pokemon"
        v-for="pokemon in pokemonListHistory"
        :key="pokemon.id"
        :pokemon-count="1127"
        :image="pokemon.image"
        :id="pokemon.id"
        :name="pokemon.name"
        @click="handleOpenPokemonDetail(pokemon.id)"
      />
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from 'vue'
import PokemonCard from '@/components/PokemonCard.vue'
import { PokemonType } from '@/types/pokemonType'
import { getHistoryFromLocalStorage } from '@/utils'
import { useStorage } from '@/composable/storage'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'HeaderComponent',
  components: { PokemonCard },

  setup() {
    const router = useRouter()

    const { isStorageUpdated, setIsStorageUpdated } = useStorage()

    const isHistoryVisible = ref(false)
    const pokemonListHistory = ref<PokemonType[]>()

    watch(
      () => isStorageUpdated.value,
      () => {
        pokemonListHistory.value = getHistoryFromLocalStorage()
        setIsStorageUpdated(false)
      }
    )

    const calculateDrawerSize = (size: string): string => {
      if (size === 'xs') return '60%'
      if (size === 'md') return '50%'
      if (size === 'sm') return '50%'
      if (size === 'lg') return '42%'

      return '35%'
    }

    const handleOpenHistory = () => {
      isHistoryVisible.value = true
    }

    const handleOpenPokemonDetail = (pokemonId: number) => {
      router.push({ name: 'DetailPage', params: { id: pokemonId } })
    }

    onMounted((): void => {
      pokemonListHistory.value = getHistoryFromLocalStorage()
    })

    return {
      isHistoryVisible,
      pokemonListHistory,
      calculateDrawerSize,
      handleOpenHistory,
      handleOpenPokemonDetail,
    }
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 20px 20px;
  padding: 10px 50px;
  box-shadow: 0 3px 20px $color-black;
  font-size: 30px;
  background-color: #f9b81e;

  &__col {
    display: flex;
    align-items: center;
  }

  &__title {
    margin-left: 50px;
    letter-spacing: 15px;
    text-transform: uppercase;
    color: #fffc00;

    @media (max-width: 600px) {
      margin-left: 25px;
      font-size: 20px;
    }
  }

  &__router {
    display: flex;
    align-items: center;
    margin-top: 5px;
    height: 50px;
  }

  &__history {
    cursor: pointer;
  }

  &__pokemon {
    margin-bottom: 20px;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    padding: 5px 20px;
  }
}
</style>
