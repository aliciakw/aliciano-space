<template>
  <div class="ImageComponent text-left" :style="cssVars">
    <img v-bind:src="src" v-on:click="openLightbox" />
    <div class="ImageComponent__plaque p_5">
      <p class="detail">
        <strong>{{title}}</strong>
      <p>
      <p class="detail"> 
        <em>{{medium}}, {{width}} x {{height}} inches.</em>
        {{year}}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ImageComponent',
    props: {
      alt: String,
      borderColor: {
        type: String,
        default: 'pink',
      },
      height: Number,
      left: {
        type: Number,
        default: 0,
      },
      medium: String,
      setLightboxContent: Function,
      src: String,
      title: String,
      top: {
        type: Number,
        default: 0,
      },
      width: Number,
      year: Number,
    }, 
    computed: {
      cssVars() {
        return {
          '--left': this.left + 'px',
          '--top': this.top + 'px',
          '--border-color': this.borderColor || 'pink',
        }
      }
    },
    methods: {
      openLightbox: function() {
        this.setLightboxContent(
          this.src,
          'medium',
          1999,
          0,
          0
        );
      }
    }
  }
</script>
<style scoped>
  .ImageComponent {
    /* position: absolute;
    left: var(--left);
    top: var(--top); */
    width: 500px;
    padding: 50px;
  }
  img {
    width: 100%;
    border-width: 0;
    border-style: solid;
    border-color: var(--border-color);
    transition: border-width 0.2s ease-in-out;
  }

  img:hover {
    cursor: pointer;
    border-width: 0 3rem 3rem 0;
  }

  .ImageComponent__plaque {
    display: inline-block;
    width: 10rem;
    opacity: 0.5;
  }
  


</style>