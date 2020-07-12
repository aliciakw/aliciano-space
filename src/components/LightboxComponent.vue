<template>
  <div v-if="src" class="Lightbox position-fixed p1">
    <div class="Lighbox__header text-right mr1">
      <button class="Button--primary" v-on:click="onClose">
        close
      </button>
    </div>
    <div class="Lightbox__body display-flex justify-center align-start pb2 mt_5">
      <img class="Lightbox__img" v-bind:src="src" v-bind:alt="alt" />
    </div>
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
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
  }
  .Lightbox__img {
    max-width: 90vw;
    max-height: 90vh;
  }
</style>