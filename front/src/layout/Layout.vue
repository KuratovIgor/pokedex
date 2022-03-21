<template>
  <div class="body">
    <header-component />
    <div class="body__center">
      <router-view />
    </div>
    <footer-component />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderComponent from '@/components/layout/HeaderComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'

export default defineComponent({
  name: 'Layout',
  components: { HeaderComponent, FooterComponent },
})
</script>

<style lang="scss" scoped>
.body {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__center {
    flex: 1 1 auto;
  }
}
</style>
