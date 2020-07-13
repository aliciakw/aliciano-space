<template>
  <div v-if="src" class="Lightbox position-fixed pt1 pb4">
    <div class="Lighbox__header text-right mr1">
      <button class="Button--primary cursor-zoom-out" v-on:click="onClose">
        close
      </button>
    </div>
    <div class="Lightbox__body flex justify-center align-center mt_5 h100 ">
      <img class="Lightbox__img cursor-zoom-out" v-bind:src="src" v-bind:alt="alt" v-on:click="onClose" />
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

<style>
  .Lightbox {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
  }
  .Lightbox__img {
    max-width: 90%;
    max-height: 90%;
  }
</style>