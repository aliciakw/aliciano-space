<template>
  <main>

    
    <h1>u n - b r a n d i n g</h1>
    <img src="unbranded-tote.png">

    <section class="arguments">
      <p>kill the brands &ndash; save the people</p>
      <p>brands create desire independent of value</p>
      <p>brands make us throw away perfectly good stuff</p>
      <p>less branding == more reuse</p>
      
    </section>

    <section class="contact">
      <p>
        Want the branding removed from any of your possessions?
      </p>
      <p>
        Email <a href="mailto:aliciayesorno+unbranding@gmail.com">aliciayesorno+unbranding@gmail.com</a>
        for a very resonable quote. 
      </p>

      <p>Free delivery* in the NYC area!</p>
      
    </section>

    <h6>* to a mutually-convenient subway station</h6>
  </main>
</template>

<script>
export default {
  name: 'UnbrandingPage'
}
</script>

<style scoped>
  main {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    padding-bottom: 2.5em;
  }
  h1 {
    font-size: 4rem;
  }
  a {
    word-break: break-all;
    color: #0581ca;
  }
  img {
    width: 14em;
  }
  section {
    margin: 0 auto;
    width: 32em;
    max-width: 70vw;
    padding: 0.5rem 1.5rem;
    overflow: hidden;
  }
  .arguments p {
   font-size: 1.4rem;
   line-height: 2;
  }
  .contact {
    margin-top: 2em;
    margin-bottom: 2em;
    border: 1px solid #000;
  }
</style>