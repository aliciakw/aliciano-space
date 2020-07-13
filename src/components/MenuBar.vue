<template>
  <nav class="MenuBar position-fixed bg-white flex align-center p_5" role="navigation" :style="cssVars">

    <div class="MenuBar__header flex w100 align-center flex-row justify-between">
      <h1 class="heading color-gray">ALICIA NO ART</h1>
      <button v-if="$mq === 'mobile'" v-on:click="toggleMobileCollapsed" class="MenuBar__nav-toggle color-gray" aria-label="show navigation">
        <span v-if="mobileCollapsed">=</span>
        <span v-else>x</span>
      </button>
    </div>

    <ul class="heading flex flex-col py4" v-if="!mobileCollapsed || $mq !== 'mobile'">
      <li class="m1">
        <a class="Button--primary" v-on:click="onClickInfo">info</a>
      </li>
      <li class="m1">
        <a class="Button--primary" target="_blank" href="https://www.instagram.com/noooo.art/">instagram</a>
      </li>
      <li class="m1">
        <a class="Button--primary" target="_blank" href="https://motha-of-thousands.now.sh/">blog</a>
      </li>
    </ul>
  </nav>
</template>
<script>
  import { RichText } from 'prismic-dom'
  const graphQuery = `{
    textblock {
      title
      body
      post_script
    }
  }`;
  export default {
    name: 'MenuBar',
    props: {
      setModalContent: Function,
    },
    data() {
      return {
        mobileCollapsed: true,
        infoContent: {
          body: null,
          postScript: null,
        },
      }
    },
    created() {
      this.getContent()
    },
    computed: {
      cssVars() {
        return {
          '--mobile-height': this.mobileCollapsed ? 'auto' : '100vh',
          '--mobile-direction': this.mobileCollapsed ? 'row' : 'column',
          '--mobile-justify': this.mobileCollapsed ? 'space-between' : 'flex-start',
          '--mobile-border-top': this.mobileCollapsed ? '1px solid #ccc' : 'none'
        }
      }
    },
    methods: {
      getContent: function() {
        // load info section
        this.$prismic.client.getByUID('textblock', 'info', { 'graphQuery': graphQuery })
          .then((document) => {
            if (document && document.data && Array.isArray(document.data.body)) {
              this.infoContent.body = document.data.body;
            }
            if (document && document.data && Array.isArray(document.data.post_script)) {
              this.infoContent.postScript = document.data.post_script;
            }
          });
      },
      onClickInfo: function() {
        if (!Array.isArray(this.infoContent.body)) {
          console.log('[Error]: Invalid prismic entry for infoContent.body');
          return;
        }
        const serializedBody = RichText.asHtml(this.infoContent.body);
        const serializedPostScript = RichText.asHtml(this.infoContent.postScript);
        this.setModalContent(serializedBody, serializedPostScript);
        this.toggleMobileCollapsed();
      },
      toggleMobileCollapsed: function () {
        this.mobileCollapsed = !this.mobileCollapsed;
      } 
    }
  };
</script>
<style scoped>
  .MenuBar {
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    flex-direction: var(--mobile-direction);
    justify-content: var(--mobile-justify);
  }

  .MenuBar__header {
    height: 3rem;
  }

  .MenuBar__nav-toggle {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    width: 2.5rem;
    font-size: 2rem;
    background: none;
    border: none;
  }
  .MenuBar__nav-toggle__collapse {
    flex-direction: row;
  }
  ul {
    list-style: none;
  }

  @media screen and (min-width: 450px) {
    .MenuBar {
      height: 3rem;
      border-top: 1px solid #ccc;
      flex-direction: row;
      justify-content: space-between;
    }
    h1 {
      align-self: center;
    }
    ul {
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      margin: 0 10px;
      font-size: 1rem;
    }
    ul li {
      margin: 1rem;
    }
    
  }
</style>