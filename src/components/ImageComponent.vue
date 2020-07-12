<template>
  <div :style="cssVars" v-on:click="openLightbox">
    <img v-bind:src="src" width="500"/>
  </div>
</template>

<script>
  export default {
    name: 'ImageComponent',
    props: {
      src: String,
      alt: String,
      left: {
        type: Number,
        default: 0,
      },
      top: {
        type: Number,
        default: 0,
      },
      setLightboxContent: Function,
    }, 
    computed: {
      cssVars() {
        return {
          '--left': this.left + 'px',
          '--top': this.top + 'px',
        }
      }
    },
    methods: {
      openLightbox: function() {
        this.setLightboxContent(
          this.src,
          'medium',
          1999,
          0,
          0
        );
      }
    }
  }
</script>
<style scoped>
  div {
    position: absolute;
    left: var(--left);
    top: var(--top);
    width: 500px;
    padding: 50px; 
    box-sizing: content-box;
    border: 1px solid white;
  }
  div:hover {
    cursor: pointer;
    border: 1px solid cadetblue;
    
  }
  img {
    width: 100%;
  }
</style>