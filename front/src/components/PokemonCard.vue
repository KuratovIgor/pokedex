<template>
  <div class="pokemon-card">
    <router-link to="/detail">
      <img class="pokemon-card__image" :src="image" />
    </router-link>
    <div class="pokemon-info">
      <p class="pokemon-info__number">{{ number }}</p>
      <h3 class="pokemon-info__name">{{ name }}</h3>
      <ul class="pokemon-abilities">
        <li v-for="type in types" class="pokemon-abilities__item">
          <div>{{ type }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PokemonCard',

  props: {
    image: String,
    number: String,
    name: String,
    types: Array,
  },
}
</script>

<style lang="scss" scoped>
.pokemon-card {
  font-family: 'Arial';

  &__image {
    border-radius: 10%;
    width: 150px;
    height: 150px;
    background: $card-color;
  }

  .pokemon-info {
    display: flex;
    flex-direction: column;
    padding-left: 10px;

    &__number {
      margin-bottom: 10px;
      font-size: 11px;
      color: $id-color;
    }

    &__name {
      margin-bottom: 5px;
      font-weight: 700;
    }
  }
}

.pokemon-abilities {
  display: flex;

  &__item {
    margin-right: 5px;
    border: 1px solid #000;
    border-radius: 5px;
    width: 60px;
    text-align: center;
  }
}
</style>
