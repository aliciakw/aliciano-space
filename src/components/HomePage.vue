<template>
  <div class="homepage">
    <MenuBar />
    <CollectionComponent collection="Frontpage" />
  </div>
</template>

<script>
import CollectionComponent from './CollectionComponent.vue'
import MenuBar from './MenuBar.vue'

export default {
  name: 'HomePage',
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
.homepage {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;
  width: 100vw;
}
</style>
