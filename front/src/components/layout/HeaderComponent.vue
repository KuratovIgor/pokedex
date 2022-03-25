<template>
  <div class="header">
    <icon-template width="50" height="50" name="pikachu" class="header__icon" />
    <div class="header__title">pokedex</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderComponent',
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: left;
  height: 110px;
  font-size: 30px;
  background: url('../../assets/images/head-image.png') 0 0 no-repeat;

  &__title {
    margin-top: 15px;
    letter-spacing: 15px;
    text-transform: uppercase;
    color: #fffc00;
  }

  &__icon {
    margin: 5px 100px 0 50px;
  }
}
</style>
