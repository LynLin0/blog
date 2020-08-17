<template>
  <header class="header">
    <div class="header__inner">
      <a class="header__logo" href="/">LYNLIN0</a>
      <div class="header__drawer">
        <nav class="nav">
          <ul class="nav__list">
            <li class="nav__item">
              <a class="nav__link" href="#" @click.prevent="onHeaderItemClick(0)">我是谁</a>
            </li>
            <li class="nav__item">
              <a class="nav__link" href="#" @click.prevent="onHeaderItemClick(1)">文章</a>
            </li>
            <!-- <li class="nav__item">
              <a class="nav__link" href="#">关于</a>
            </li>-->
          </ul>
        </nav>
      </div>
    </div>
    <button type="button" class="header__toggle" @click="onToggleClick">Menu</button>
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
  data() {
    this.onResize = null;
    return {

    }
  },
  created() {
    if (process.browser) {
      this.onResize = () => {
        if (document.documentElement.clientWidth > 980) {
          document.body.classList.remove("is-nav-open");
        }
      };
      this.onResize();
      window.addEventListener("resize", this.onResize, false);
    }
  },
   beforeDestroy() {
    if (process.browser) {
      window.removeEventListener("resize", this.onResize);
    }
  },
  methods: {
    onToggleClick() {
      if ([].indexOf.call(document.body.classList, "is-nav-open") === -1) {
        document.body.classList.add("is-nav-open");
      } else {
        document.body.classList.remove("is-nav-open");
      }
    },
    onHeaderItemClick(index) {
      console.log(document.documentElement.clientWidth);
      if (document.documentElement.clientWidth < 980) {
        this.onToggleClick();
      }
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
  height: 70px;
  background-color: rgba(0, 0, 0, 0.35);
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  transition: transform 0.3s linear, background 0.3s ease;
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
    z-index: 1;
  }
  &__drawer {
    font-size: 16px;
  }
  &__toggle {
    display: none;
  }

  .nav {
    height: 100%;
    &__list {
      height: 100%;
      display: flex;
    }
    &__item {
      margin-left: 40px;
    }
    &__link {
      color: white;
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
@media (max-width: 980px) {
  .is-nav-open {
    .header {
      background-color: transparent;
      &__drawer {
        opacity: 1;
        transition: opacity 0.3s ease, visibility 0s;
        visibility: visible;
      }
      &__toggle {
        &::before {
          top: 50%;
          transform: rotate(45deg);
        }

        &::after {
          top: 50%;
          transform: rotate(-45deg);
        }
      }
    }
  }
  .header {
    height: 50px;
    &__inner {
      justify-content: center;
    }
    &__drawer {
      background: rgba(0, 0, 0, 0.85);
      height: 100vh;
      opacity: 0;
      padding: 50px 46px 46px;
      position: absolute;
      top: 0;
      transition: opacity 0.3s ease, visibility 0s 0.3s;
      visibility: hidden;
      width: 100%;
    }
    &__toggle {
      background: none;
      border: none;
      color: transparent;
      display: block;
      font-size: 0;
      height: 40px;
      padding: 0;
      position: fixed;
      left: 15px;
      top: 5px;
      width: 40px;
      z-index: 21;
      &::before {
        background: #fff;
        content: " ";
        display: block;
        height: 2px;
        width: 30px;
        position: absolute;
        left: 5px;
        top: calc(50% - 6px);
      }
      &::after {
        background: #fff;
        content: " ";
        display: block;
        height: 2px;
        width: 30px;
        position: absolute;
        left: 5px;
        top: calc(50% + 4px);
      }
    }

    .nav {
      &__list {
        flex-direction: column;
        justify-content: center;
      }
      &__item {
        font-size: 16px;
        margin-top: 40px;
        margin-left: 0;
      }
    }
  }
}
</style>
