<template>
  <div v-if="src" class="Lightbox position-fixed pt1 pb4">
    <div class="Lighbox__header text-right mr1">
      <button class="Button--primary cursor-zoom-out" v-on:click="onClose">
        close
      </button>
    </div>
    <GentleLoader v-bind:preloadContent="preloadImage" v-bind:classNames="lightboxBodyClassnames">
      <img class="Lightbox__img cursor-zoom-out" v-bind:src="src" v-bind:alt="alt" v-on:click="onClose" />
    </GentleLoader>
  </div>
</template>

<script>
  import GentleLoader from './GentleLoader';
  export default {
    name: 'LightboxComponent',
    components: {
      GentleLoader
    },
    props: {
      alt: String,
      src: String,
      medium: String,
      year: Number,
      width: Number,
      height: Number,
      onClose: Function,
    },
    data() {
      return {
        lightboxBodyClassnames: 'Lightbox__body flex justify-center align-center h100'
      }
    },
    methods: {
      preloadImage: function(didLoad) {
        if (this.src) {
          const loader = new window.Image();
          loader.src = '';
          loader.onload = didLoad;
          loader.src = this.src;
        }
      },
    }
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