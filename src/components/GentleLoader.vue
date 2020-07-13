<template>
  <div v-bind:class="finalClassNames">
   <slot/>
  </div>
</template>
<script>

export default {
  name: 'GentleLoader',
  props: {
    classNames: {
      type: String,
      default: ''
    },
    preloadContent: Function,
  },
  data() {
    return {
      finalClassNames: 'GentleLoader ' + this.classNames
    }
  },
  mounted() {
    this.loadGently();
  },
  methods: {
    loadGently: function() {
      this.preloadContent(this.didLoad);
    },
    didLoad: function() {
      this.finalClassNames = 'GentleLoader GentleLoader--loaded ' + this.classNames;
    }
  }
}
</script>

<style scoped>
  .GentleLoader {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  .GentleLoader--loaded {
    opacity: 1;
  }
</style>