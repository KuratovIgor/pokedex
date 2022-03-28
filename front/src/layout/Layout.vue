<template>
  <div class="layout">
    <header-component />
    <div class="layout__content">
      <div class="layout__content-listing">
        <router-view />
      </div>
      <div class="layout__content-sidebar">
        <sidebar-history :key="$forceUpdate" />
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderComponent from '@/components/layout/HeaderComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'
import SidebarHistory from '@/components/SidebarHistory.vue'

export default defineComponent({
  name: 'Layout',
  components: { SidebarHistory, HeaderComponent, FooterComponent },
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__content-sidebar {
    margin-right: 50px;
    height: 100%;
  }

  &__content-listing {
    margin-right: 200px;
  }
}
</style>
