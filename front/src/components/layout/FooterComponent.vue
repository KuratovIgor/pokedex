<template>
  <div class="footer">
    <div class="footer__contacts">
      <a href="#">
        <icon-template
          :width="$screen.size === 'xs' ? 30 : 40"
          :height="$screen.size === 'xs' ? 30 : 40"
          name="telegram"
        />
      </a>
      <a href="#">
        <icon-template
          :width="$screen.size === 'xs' ? 30 : 40"
          :height="$screen.size === 'xs' ? 30 : 40"
          name="whatsapp"
        />
      </a>
      <a href="#">
        <icon-template
          :width="$screen.size === 'xs' ? 30 : 40"
          :height="$screen.size === 'xs' ? 30 : 40"
          name="instagram"
        />
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterComponent',
})
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: right;
  border-radius: 20px 20px 0 0;
  padding: 10px 50px;
  box-shadow: 0 3px 20px $color-black;
  background-color: #f9b81e;

  &__contacts {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 200px;
  }

  @media (max-width: 600px) {
    padding: 10px 20px;
  }
}
</style>
