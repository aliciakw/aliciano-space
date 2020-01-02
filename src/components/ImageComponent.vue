<template>
  <div :style="cssVars">
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
      }
    }, 
    computed: {
      cssVars() {
        return {
          '--left': this.left + 'px',
          '--top': this.top + 'px',
        }
      }
    },
  }
</script>
<style scoped>
  div {
    position: absolute;
    left: var(--left);
    top: var(--top);
    width: 500px;
    padding: 50px;
  }
  img {
    width: 100%;
  }
</style>