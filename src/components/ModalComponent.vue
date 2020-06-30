<template>

  <div v-if="content" class="Modal p1">
    <div class="Modal__header text-right mr1">
      <button class="Button--primary" v-on:click="onClose">
        close
      </button>
    </div>
    <div class="Modal__body p1" v-html="content"></div>
  </div>
</template>

<script>
  export default {
    name: 'ModalComponent',
    props: {
      content: String,
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