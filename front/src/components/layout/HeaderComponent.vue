<template>
  <div class="header">
    <router-link class="header__router" to="/">
      <icon-template
        width="50"
        height="50"
        name="pikachu"
        class="header__icon"
      />
    </router-link>
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
  padding-left: 50px;
  height: 110px;
  font-size: 30px;
  background: url('../../assets/images/head-image.png') 0 0 no-repeat;

  &__title {
    margin: 15px 0 60px 100px;
    letter-spacing: 15px;
    text-transform: uppercase;
    color: #fffc00;
  }

  &__router {
    margin-top: 5px;
    height: 50px;
  }
}
</style>
