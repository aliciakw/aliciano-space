<template>
  <img v-bind:class="className" v-bind:src="src" v-bind:alt="alt" />
</template>
<script>

export default {
  name: 'ImageLoader',
  props: {
    src: String,
    alt: String,
  },
  data() {
    return {
      className: 'Image'
    }
  },
  mounted() {
    this.preloadImage();
  },
  methods: {
    preloadImage: function() {
      if (this.src) {
        const loader = new window.Image();
        loader.src = '';
        loader.onload = this.didLoad;
        loader.src = this.src;
      }
    },
    didLoad: function() {
      this.className = 'Image Image--loaded';
    }
  }
}
</script>

<style scoped>
  .Image {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  .Image--loaded {
    opacity: 1;
  }
</style>