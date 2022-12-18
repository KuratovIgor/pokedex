<template>
  <div class="layout">
    <header-component />
    <div class="layout__content">
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
.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &__content {
    overflow: hidden;
  }
}
</style>
