<template>
  <div id="app">
    <!-- <h1>alicia no</h1> -->
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->

    <CollectionComponent collection="Frontpage" />
  </div>
</template>

<script>
import CollectionComponent from './components/CollectionComponent.vue'

export default {
  name: 'app',
  components: {
    CollectionComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
