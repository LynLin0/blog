<template>
  <div>
    <Nuxt />
    <footer class="footer">
      <img class="footer__logo" src="~/assets/blog_logo.svg" />
      <div class="footer__copyright">Copyright © 2020 by Lynlin0's blog . All rights reserved.</div>
    </footer>
  </div>
</template>

<style lang="scss" >
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

ol, ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

body.is-nav-open{
  height: 100%;
  overflow: hidden;
}

button:focus,
input[type="button"]:focus,
input[type="reset"]:focus,
input[type="submit"]:focus {
  outline: none;
}

body,
button,
input,
select,
textarea {
  color: #333;
}

a {
  text-decoration: none;
}

ol,
ul {
  list-style: none;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.footer {
  position: relative;
  background: #333;
  color: #fff;
  padding: 68px 75px 26px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__logo {
    width: 190px;
  }
  &__copyright {
    margin-top: 53px;
    font-size: 12px;
  }
}
</style>
