<template>
  <div id="app">
    <MenuBar />
    <CollectionComponent collection="Frontpage" />
  </div>
</template>

<script>
import CollectionComponent from './components/CollectionComponent.vue'
import MenuBar from './components/MenuBar.vue'

export default {
  name: 'app',
  components: {
    CollectionComponent,
    MenuBar
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;
  width: 100vw;
}
</style>
