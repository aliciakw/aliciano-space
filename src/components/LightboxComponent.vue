<template>
  <div v-if="src" class="Lightbox position-fixed">
   <p>LIGHTBOX</p>
  </div>
</template>

<script>
  export default {
    name: 'LightboxComponent',
    props: {
      src: String,
      medium: String,
      year: Number,
      width: Number,
      height: Number,
      onClose: Function,
    },
  }
</script>

<style scoped>
  .Lightbox {
    border: 1px solid #ccc;
    background: #fff;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>