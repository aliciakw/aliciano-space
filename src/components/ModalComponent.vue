<template>

  <div v-if="body" class="Modal p1">
    <div class="Modal__header text-right mr1">
      <button class="Button--primary" v-on:click="onClose">
        close
      </button>
    </div>
    <div class="p1">
      <div class="text-left" v-html="body"></div>
      <div v-if="postScript" class="mt2 mr1 text-right" v-html="postScript"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ModalComponent',
    props: {
      body: String,
      postScript: String,
      onClose: Function,
    },
    data() {
      return {
        visible: true,
      }
    },
  }
</script>
<style>
  .Modal {
    border: 1px solid #ccc;
    background: #fff;
    position: fixed;
    z-index: 10;

    top: 5rem;
    right: 5rem;
    width: 30rem;
  }
</style>