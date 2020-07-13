<template>
  <div class="ImageComponent text-left mt2" :style="cssVars">
    <div class="ImageComponent__image-wrapper position-relative">
      <img v-bind:src="src" v-bind:alt="alt" v-on:click="openLightbox" />
    </div>
    <div class="ImageComponent__plaque p_5" v-on:click="openLightbox">
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
    width: auto;
  }
  img {
    width: 100%;
  }

  .ImageComponent__image-wrapper::after {
    content: "";
    width: auto;
    left: 0;
    top: 0;
    height: calc(100% - 10px);
    background-color: var(--border-color);
    position: absolute;
    z-index: -1;
    transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
    clip-path: polygon(0 0, calc(100% - 50px) 0%, 100% 10%, 100% 100%, 10% 100%, 0% calc(100% - 50px));
  }

  .ImageComponent:hover .ImageComponent__image-wrapper::after {
    width: 100%;
    height: calc(100% + 45px);
  }

  img:hover {
    cursor: zoom-in;
  }

  .ImageComponent__plaque {
    display: inline-block;
    width: 10rem;
    opacity: 0.7;
    background: #fff;
    color: #333;
  }
  
  .ImageComponent__plaque:hover {
    cursor: zoom-in;
  }

  @media screen and (min-width: 450px) {
    .ImageComponent {
      width: 500px;
      padding-right: 10rem;
    }
    .ImageComponent__image-wrapper::after {
      width: 500px;
    }
    .ImageComponent:hover .ImageComponent__image-wrapper::after {
      width: 550px;
      height: calc(100% + 45px);
    }
  }


</style>