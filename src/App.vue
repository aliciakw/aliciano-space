<template>
  <div id="app">
    <ModalComponent v-bind:body="modalContent.body" v-bind:postScript="modalContent.postScript" v-bind:onClose="clearModalContent" />
    <MenuBar v-bind:setModalContent="setModalContent" />
    <CollectionComponent collection="Frontpage" />
  </div>
</template>

<script>
import CollectionComponent from './components/CollectionComponent.vue'
import MenuBar from './components/MenuBar.vue'
import ModalComponent from './components/ModalComponent.vue'

const ESCAPE = 'Escape';
const EDGE_ESCAPE = 'Esc';

export default {
  name: 'app',
  components: {
    CollectionComponent,
    MenuBar,
    ModalComponent
  },
  data() {
    return {
      modalContent: {
        body: '',
        postScript: ''
      },
    }
  },
  methods: {
    setModalContent: function (body, postScript) {
      this.modalContent = { body, postScript };
    },
    clearModalContent: function() {
      this.modalContent = '';
    }
  },
  mounted() {
    window.addEventListener("keydown", e => {
      if (e.key === ESCAPE || e.key === EDGE_ESCAPE) {
        this.clearModalContent();
      }
    });
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
