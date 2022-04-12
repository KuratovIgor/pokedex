<template>
  <div class="pokemon-pagination">
    <router-link
      :to="`/detail-page/${id - 1}`"
      class="pokemon-pagination__item"
    >
      <div class="pokemon-pagination__arrow-back" />
    </router-link>
    <router-link
      :to="`/detail-page/${id + 1}`"
      class="pokemon-pagination__item"
    >
      <div class="pokemon-pagination__arrow-forward" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PokemonPagination',

  props: {
    id: Number,
  },
})
</script>

<style lang="scss" scoped>
.pokemon-pagination {
  display: flex;
  justify-content: space-between;
  width: 500px;
  height: 100px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid $color-black;
    border-radius: 50%;
    width: 100px;
    background: #a4acaf;
  }

  &__arrow-back {
    margin: 0 30px;
    border: 5px solid $color-white;
    border-top: hidden;
    border-right: hidden;
    width: 30px;
    height: 30px;
    transform: rotateZ(45deg);
  }

  &__arrow-forward {
    margin: 0 30px;
    border: 5px solid $color-white;
    border-bottom: hidden;
    border-left: hidden;
    width: 30px;
    height: 30px;
    transform: rotateZ(45deg);
  }
}
</style>
