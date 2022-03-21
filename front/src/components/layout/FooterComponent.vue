<template>
  <div class="footer">
    <div class="footer__contacts">
      <a href="#">
        <icon-template
          width="40"
          height="40"
          name="telegram"
          class="footer__contacts-item"
        />
      </a>
      <a href="#">
        <icon-template
          width="40"
          height="40"
          name="whatsapp"
          class="footer__contacts-item"
        />
      </a>
      <a href="#">
        <icon-template
          width="40"
          height="40"
          name="instagram"
          class="footer__contacts-item"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: right;
  height: 120px;
  background: url('../../assets/images/footer-image.jpg') 0 0 no-repeat;

  &__contacts {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 200px;

    &-item {
      margin-top: 50px;
    }
  }
}
</style>
