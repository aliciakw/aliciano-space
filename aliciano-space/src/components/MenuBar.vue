<template>
  <nav role="navigation" :style="cssVars">
    <h1 v-if="!mobileCollapsed || $mq !== 'mobile'">ALICIA NO</h1>
    <ul v-if="!mobileCollapsed || $mq !== 'mobile'">
      <li>
        <a target="_blank" href="https://www.instagram.com/lili_3thousand/">insta</a>
      </li>
      <li>
        <a target="_blank" href="mailto:aliciayesorno@gmail.com">email</a>
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
  export default {
    name: 'MenuBar',
    data() {
      return {
        mobileCollapsed: false,
      }
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
  }
  h1 {
    display: flex;
    align-self: flex-start;
    justify-content: center;
    margin: 1rem auto 0 auto;
  }
  .MenuBar__nav-toggle {
    font-size: 3rem;
    margin-bottom: 1rem;
    width: 100%;
    color: #aaa;
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
  ul li a {
    text-decoration: none;
    color: #aaa;
  }
  ul li a:hover {
    color: #222;
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
    ul li:before {
      content: "*";
      position: relative;
      left: -7px;
      bottom: -3px;
      color: #aaa;
    }
  }
</style>