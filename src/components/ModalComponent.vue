<template>

  <div v-if="body" class="Modal p1">
    <div class="Modal__header text-right mr1">
      <button class="Button--primary" v-on:click="onClose">
        close
      </button>
    </div>
    <div class="Modal__body m1">
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
  }
</script>
<style>
  .Modal {
    border: 1px solid #ccc;
    background: #fff;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .Modal__body {
    max-height: calc(100vh - 7rem);
    overflow-y: scroll;
  }

  @media screen and (min-width: 350px) {
    .Modal {
      top: 1rem;
      left: 1rem;
      right: 1rem;
      bottom: auto;
    }
  }

  @media screen and (min-width: 450px) {
    .Modal {
      top: 5rem;
      left: auto;
      right: 5rem;
      width: 30rem;
    }
  }
</style>