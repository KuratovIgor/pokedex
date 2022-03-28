<template>
  <div class="detail-page">
    <div class="detail-page__title">
      <div class="detail-page__title__name">Bulbasaur</div>
      <div class="detail-page__title__number">#001</div>
    </div>
    <div class="pokemon-info">
      <div class="pokemon-info__detail">
        <div class="pokemon-info__image">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          />
        </div>
        <pokemon-description
          class="pokemon-info__description"
          :pokemon="pokemonDetail"
        />
      </div>
      <pokemon-stats class="pokemon-info__stats" :stat="pokemonDetail.stats" />
    </div>
    <pokemon-evolution />
  </div>
</template>
<script>
import PokemonDescription from '@/components/detail/PokemonDescription'
import PokemonStats from '@/components/detail/PokemonStats'
import PokemonEvolution from '@/components/detail/PokemonEvolution'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'DetailPage',
  components: { PokemonEvolution, PokemonDescription, PokemonStats },

  props: {
    id: Number,
  },

  setup() {
    let pokemonDetail = ref({
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      number: 'N001',
      name: 'pokemon name',
      types: ['water', 'fire'],
      weaknesses: ['water', 'fire'],
      height: '0.5 m',
      weight: '5.5 kg',
      gender: '♂ ♀',
      category: 'Balloon',
      abilities: ['water', 'fire'],
      stats: {
        hp: 2,
        attack: 5,
        defence: 3,
        specialAttack: 6,
        specialDefence: 5,
        speed: 10,
      },
      evolution: [
        {
          image:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          number: 'N001',
          name: 'pokemon name',
          types: ['water', 'fire'],
        },
        {
          image:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          number: 'N001',
          name: 'pokemon name',
          types: ['water', 'fire'],
        },
        {
          image:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          number: 'N001',
          name: 'pokemon name',
          types: ['water', 'fire'],
        },
      ],
    })

    return { pokemonDetail }
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
