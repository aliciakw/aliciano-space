<template>
  <div id="app" class="flex flex-1 text-center">
    <MenuBar v-bind:setModalContent="setModalContent" />
    <ModalComponent
      v-bind:body="modalContent.body"
      v-bind:postScript="modalContent.postScript"
      v-bind:onClose="clearModalContent"
    />
    <LightboxComponent
      v-bind:alt="lightboxContent.alt"
      v-bind:src="lightboxContent.src"
      v-bind:medium="lightboxContent.medium"
      v-bind:year="lightboxContent.year"
      v-bind:width="lightboxContent.width"
      v-bind:height="lightboxContent.height"
      v-bind:onClose="clearLightboxContent"
    />
    <div class="App__body flex align-center justify-center pt_5 px_5">
      <CollectionComponent collection="Frontpage" v-bind:setLightboxContent="setLightboxContent" />
    </div>
  </div>
</template>

<script>
import CollectionComponent from './components/CollectionComponent.vue'
import LightboxComponent from './components/LightboxComponent.vue'
import MenuBar from './components/MenuBar.vue'
import ModalComponent from './components/ModalComponent.vue'

const ESCAPE = 'Escape';
const EDGE_ESCAPE = 'Esc';
const DEFAULT_MODAL_CONTENT = {
  body: '',
  postScript: ''
};
const DEFAULT_LIGHTBOX_CONTENT = {
  alt: '',
  src: '',
  medium: '',
  year: 0,
  width: 0,
  height: 0
};

export default {
  name: 'app',
  components: {
    CollectionComponent,
    LightboxComponent,
    MenuBar,
    ModalComponent
  },
  data() {
    return {
      lightboxContent: DEFAULT_LIGHTBOX_CONTENT,
      modalContent: DEFAULT_MODAL_CONTENT,
    }
  },
  methods: {
    setLightboxContent: function (newLightboxContent) {
      this.closeAllOverlays();
      this.lightboxContent = newLightboxContent;
    },
    clearLightboxContent: function () {
      if (this.lightboxContent !== DEFAULT_LIGHTBOX_CONTENT) {
        this.lightboxContent = DEFAULT_LIGHTBOX_CONTENT;
      }
    },
    setModalContent: function (body, postScript) {
      this.closeAllOverlays();
      this.modalContent = { body, postScript };
    },
    clearModalContent: function() {
      if (this.modalContent !== DEFAULT_MODAL_CONTENT) {
        this.modalContent = DEFAULT_MODAL_CONTENT;
      }
    },
    closeAllOverlays: function() {
      this.clearLightboxContent();
      this.clearModalContent();
    }
  },
  mounted() {
    window.addEventListener("keydown", e => {
      if (e.key === ESCAPE || e.key === EDGE_ESCAPE) {
        this.closeAllOverlays();
      }
    });
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  display: flex;
  flex: 1;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.App__body {
  min-height: 100vh;
}

@media() {
  .App__body {
    padding: 4rem;
  }
}
</style>
