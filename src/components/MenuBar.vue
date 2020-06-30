<template>
  <nav role="navigation" :style="cssVars">
    <h1 v-if="!mobileCollapsed || $mq !== 'mobile'">ALICIA NO</h1>
    <ul v-if="!mobileCollapsed || $mq !== 'mobile'">
      <li>
        <a class="Button--primary" v-on:click="onClickInfo">info</a>
      </li>
      <li>
        <a class="Button--primary" target="_blank" href="https://www.instagram.com/noooo.art/">instagram</a>
      </li>
      <li>
        <a class="Button--primary" target="_blank" href="https://motha-of-thousands.now.sh/">blog</a>
      </li>
      <li v-if="$mq === 'mobile'">
        <button v-on:click="toggleMobileCollapsed" class="MenuBar__nav-toggle MenuBar__nav-toggle__collapse" aria-label="hide navigation">
          &ndash;
        </button>
      </li>
    </ul>

    <button v-else v-on:click="toggleMobileCollapsed" class="MenuBar__nav-toggle" aria-label="show navigation">
      +
    </button>
  </nav>
</template>
<script>
  const graphQuery = `{
    textblock {
      title
      body
      post_script
    }
  }`;
  const INFO_HTML = `
    <p>
      Hello traveler, thanks for visiting my site. 
    </p>
    <p> 
      Feel free to check out whichever virtual gallery(s) I might have up at the moment. I'll try to change 
      them out regularly, but no promises.
    </p>

    <p>
      Lately I've been making things about alienation and landscape. I worry a lot about how big the world is
      and how easy it is to get lost in the a web of arbitrary connections. I worry that becoming an android
      is destroying the human way of seeing buried deep in my lizard brain. Waiting for the comet to hit, here's
      left of what I can see.
    </p>

    <p>
      I'm currently located in Burlington, VT, but I'm from the Washington, D.C. area.
    </p>
    <p>
      For inquiries or to chat about anything, find me on the 'gram @nooo.art or email me at aliciayesorno@gmail.com!
    </p>
  `;
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
          '--mobile-height': this.mobileCollapsed ? '4.5rem' : '100vh',
          '--mobile-direction': this.mobileCollapsed ? 'row' : 'column',
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
        this.setModalContent(INFO_HTML);
      },
      toggleMobileCollapsed: function () {
        this.mobileCollapsed = !this.mobileCollapsed;
      } 
    }
  };
</script>
<style scoped>
  nav {
    display: flex;
    flex-direction: var(--mobile-direction);
    justify-content: center;
    align-items: center;
    flex-grow: 0;
    height: var(--mobile-height);
    border-top: var(--mobile-border-top);
    background: #fff;
    z-index: 1;
  }
  h1 {
    display: flex;
    align-self: flex-start;
    justify-content: center;
    margin: 1rem auto 0 auto;
    color: #aaa;
    font-weight: normal;
    font-size: 2rem;
  }
  .MenuBar__nav-toggle {
    font-size: 3rem;
    margin-bottom: 1rem;
    width: 100%;
    color: #aaa;
    background: none;
    border: none;
  }
  .MenuBar__nav-toggle__collapse {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  ul {
    list-style: none;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    font-size: 2rem;
  }
  ul li {
    margin: 1rem;
  }

  @media screen and (min-width: 450px) {
    nav {
      flex-direction: row;
      justify-content: flex-end;
      height: 3rem;
      border-top: 1px solid #ccc;
    }
    h1 {
      align-self: center;
      margin: 0 0 0 1rem;
      font-size: 1.5rem;
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