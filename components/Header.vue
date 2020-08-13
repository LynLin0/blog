<template>
  <header class="header">
    <div class="header__inner">
      <a class="header__logo" href="/">LYNLIN0</a>
      <div class="header__drawer">
        <nav class="nav">
          <ul class="nav__list">
            <li class="nav__item">
              <a class="nav__link" href="#" @click.prevent="onHeaderItemClick(0)">我是谁</a>
              <a class="nav__link" href="#" @click.prevent="onHeaderItemClick(1)">文章</a>
              <a class="nav__link" href="#">关于</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  props: {
    onNavClick: {
      type: Function,
      default: null,
    },
  },
  methods: {
    onHeaderItemClick(index) {
      console.log("22222", this.onNavClick);
      if (this.onNavClick) {
        this.onNavClick(index);
      } else {
        console.log("1111111");
        if (process.browser) {
          console.log(window);
          switch (index) {
            case 0:
              window.location.href = "/#intro";
              break;
            case 1:
              window.location.href = "/#article";
              break;
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 70px;
  background-color: rgba(0, 0, 0, 0.35);
  position: fixed;
  z-index: 1;
  top: 0;
  transition: transform 0.3s linear;
  &__inner {
    padding: 0 40px;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
  }
  &__logo {
    color: white;
    font-size: 28px;
    cursor: pointer;
    user-select: none;
  }
  &__drawer {
    font-size: 16px;
  }

  .nav {
    display: flex;
    &__link {
      color: white;
      margin-left: 40px;
      padding: 3px 0;
      font-weight: 700;
      border-bottom: 1px solid transparent;
      transition: border-bottom-color 0.2s ease;
      &:hover {
        border-bottom-color: white;
      }
    }
  }
}
</style>
