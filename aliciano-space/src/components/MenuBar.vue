<template>
  <nav role="navigation">
    <ul>
      <li>
        <a href="/">ALICIA NO</a>
      </li>
      <li>
        <a target="_blank" href="https://www.instagram.com/lili_3thousand/">insta</a>
      </li>
      <li>
        <a target="_blank" href="mailto:aliciayesorno@gmail.com">email</a>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
  nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-grow: 0;
    height: 50px;
    border-top: 1px solid #ccc;
  }
  ul {
    list-style: none;
    float: right;
  }
  ul li {
    display: inline-block;
    padding: 0 10px;
  }
  ul li:not(:first-child):before {
    content: "*";
    position: relative;
    left: -7px;
    bottom: -3px;
    color: #aaa;
  }
  ul li a {
    text-decoration: none;
    color: #aaa;
  }
  ul li a:hover {
    color: #222;
  }
</style>