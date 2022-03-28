<template>
  <div class="pokemon-evolution">
    <div class="pokemon-evolution__title">Стадии Эволюции</div>
    <div class="pokemon-evolution__stages">
      <div class="pokemon-evolution__stage-item">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        />
        <div class="pokemon-evolution__pokemon-info pokemon-info">
          <div class="pokemon-info__title">
            <div class="pokemon-info__name">Bulbasaur</div>
            <div class="pokemon-info__id">#001</div>
          </div>
          <ul class="pokemon-info__types">
            <li class="pokemon-info__type">type</li>
            <li class="pokemon-info__type">type</li>
          </ul>
        </div>
      </div>
      <div class="pokemon-evolution__arrow" />
      <div class="pokemon-evolution__stage-item">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        />
        <div class="pokemon-evolution__pokemon-info pokemon-info">
          <div class="pokemon-info__title">
            <div class="pokemon-info__name">Bulbasaur</div>
            <div class="pokemon-info__id">#001</div>
          </div>
          <ul class="pokemon-info__types">
            <li class="pokemon-info__type">type</li>
            <li class="pokemon-info__type">type</li>
          </ul>
        </div>
      </div>
      <div class="pokemon-evolution__arrow" />
      <div class="pokemon-evolution__stage-item">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        />
        <div class="pokemon-evolution__pokemon-info pokemon-info">
          <div class="pokemon-info__title">
            <div class="pokemon-info__name">Bulbasaur</div>
            <div class="pokemon-info__id">#001</div>
          </div>
          <ul class="pokemon-info__types">
            <li class="pokemon-info__type">type</li>
            <li class="pokemon-info__type">type</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PokemonEvolution',
})
</script>

<style lang="scss" scoped>
.pokemon-evolution {
  border: 1px solid #000;
  border-radius: 5px 5px 5px 50px;
  width: 900px;
  height: 230px;
  background-color: #616161;

  img {
    border: 5px solid #fff;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    box-shadow: 5px 5px 10px #000;
  }

  &__title {
    margin: 10px;
    color: #fff;
  }

  &__stages {
    display: flex;
    justify-content: space-around;
  }

  &__stage-item {
    background-color: #616161;
  }

  &__pokemon-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px 0;
  }

  &__arrow {
    margin-top: 40px;
    border: 5px solid #fff;
    border-bottom: hidden;
    border-left: hidden;
    width: 40px;
    height: 40px;
    transform: rotateZ(45deg);
  }
}

.pokemon-info {
  &__title {
    display: flex;
    margin-bottom: 10px;
    font-size: 20px;
  }

  &__name {
    margin-right: 5px;
    color: #fff;
  }

  &__id {
    color: $id-color;
  }

  &__types {
    display: flex;
    font-size: 17px;
  }

  &__type {
    margin-right: 5px;
    border: 1px solid #fff;
    border-radius: 5px;
    width: 70px;
    text-align: center;
    background-color: #f2f2f2;
  }
}
</style>
