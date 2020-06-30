<template>
  <div id="app">
    <ModalComponent v-bind:content="modalContent" v-bind:onClose="clearModalContent" />
    <MenuBar v-bind:setModalContent="setModalContent" />
    <CollectionComponent collection="Frontpage" />
  </div>
</template>

<script>
import CollectionComponent from './components/CollectionComponent.vue'
import MenuBar from './components/MenuBar.vue'
import ModalComponent from './components/ModalComponent.vue'

export default {
  name: 'app',
  components: {
    CollectionComponent,
    MenuBar,
    ModalComponent
  },
  data() {
    return {
      modalContent: '',
    }
  },
  methods: {
    setModalContent: function (modalContent) {
      this.modalContent = modalContent;
    },
    clearModalContent: function() {
      this.modalContent = '';
    }
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
