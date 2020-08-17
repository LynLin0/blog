<template>
  <div class="container">
    <Header
      :style="{transform:visible.header?`translateY(0)`:`translateY(-100%)`}"
      :onNavClick="onHeaderItemClick"
    ></Header>
    <main class="main">
      <section>
        <div class="banner">
          <div
            class="banner__img-wrapper"
            :style="{width:`${banner.width}px`,height:`${banner.height}px`}"
          >
            <div
              v-for="(url,index) in banner.urls"
              :key="index"
              class="banner__img"
              :style="{opacity:index === (banner.curr%banner.urls.length)?'1':'0',backgroundImage:`url(${url})`,width:`${banner.width}px`,height:`${banner.height}px`}"
            ></div>
            <div
              class="banner__overlay"
              :style="{opacity:banner.overlayOpacity,width:`${banner.width}px`,height:`${banner.height}px`}"
            ></div>
          </div>
          <!-- <div class="banner__text">
            <h2 class="banner__logo">LYNLIN0</h2>
            <h3 class="banner__slogan">跬步 千里</h3>
          </div>-->
          <div
            class="banner__logo-wrapper"
            :style="{opacity:1- banner.overlayOpacity,height:`${banner.height}px`}"
          >
            <img class="banner__logo" src="~/assets/blog_logo.svg" />
            <img class="banner__arrow" src="~assets/arrow_down.svg" @click="onLogoArrowClick" />
          </div>
          <div class="banner__intro-wrapper" :style="{height:`${banner.height}px`}">
            <div class="banner__intro">
              <h2 class="banner__intro__main">
                你好，
                <br />我是林建榕，
                <br />一个前端开发者。
              </h2>
              <h3 class="banner__intro__sub">爱好电影，音乐和编程</h3>
            </div>
            <img class="banner__arrow" src="~assets/arrow_down.svg" @click="onIntroArrowClick" />
          </div>
        </div>
      </section>
      <div class="block-wrapper">
        <div class="block">
          <h2 class="block__title">文章</h2>
          <section class="note-list">
            <div class="note" v-for="(item,index) in noteArray" :key="index">
              <div class="note__slider" ref="slider" :style="{height:`${slider.height}px`}">
                <!-- :style="{width:`${slider.width}px`,height:`${slider.height}px`}" -->
                <div class="note__slider__img-wrapper">
                  <img
                    v-for="(img,index) in item.imgArray"
                    :key="img"
                    class="note__slider__img"
                    style="width:100%"
                    :style="{opacity:index===(banner.curr%item.imgArray.length)?'1':'0'}"
                    :src="img"
                  />
                </div>
                <div class="note__slider__pagination" v-show="false">
                  <div
                    class="note__slider__pagination__bullet"
                    :class="{'note__slider__pagination__bullet--active':index===(banner.curr%item.imgArray.length)}"
                    v-for="(bullet,index) in item.imgArray"
                    :key="'bullet'+index"
                  ></div>
                </div>
              </div>
              <a class="note__text" :href="`/detail?id=${item.id}`">
                <h2 class="note__title">{{item.title}}</h2>
                <div class="note__content">{{item.content}}</div>
              </a>
            </div>
          </section>
          <!-- <section class="more-wrapper">
            <button class="more" @click="onMoreClick">获取更多</button>
          </section> -->
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Header from "../components/Header";
import marked from "marked";
import http from "../infrastructure/http";
import { formatTime } from "../infrastructure/date-time";
export default {
  data() {
    this.div = null;
    this.onResize = null;
    this.bannerTimeout = -1;
    return {
      loading: false,
      currPage: 1,
      visible: {
        header: false,
      },
      slider: {
        width: 0,
        height: 0,
      },
      banner: {
        overlayOpacity: 0,
        curr: 0,
        url: "",
        width: 0,
        height: 0,
      },
      noteArray: "",
    };
  },
  async asyncData({ params }) {
    const urls = await http.get("/banner?size=6");
    const banner = {
      overlayOpacity: 0,
      curr: 0,
      urls,
      width: 1920,
      height: 1080,
    };
    const res = await http.get("/notes?page=1&size=1000");
    const getTextFromHtml = (html) => {
      return html.replace(/<.*?>/g, "");
    };
    const getImgFromHtml = (html) => {
      let array = [];
      const re = /<img.*?src="(.*?)".*?>/;
      const reg = /<img.*?src="(.*?)".*?>/g;
      const match = html.match(reg);
      if (match) {
        match.forEach((v) => {
          array.push(v.match(re)[1]);
        });
      }
      return array.slice(0, 3);
    };
    const noteArray = res.map((item) => {
      const html = marked(item.content);
      const imgArray = getImgFromHtml(html);
      item.content = getTextFromHtml(html).substring(0, 80) + "...";
      item.createDate = formatTime(new Date(item.createDate), "yyyy-MM-dd");
      item.imgArray = imgArray;
      return item;
    });
    return { noteArray, banner };
  },
  methods: {
    onHeaderItemClick(index) {
      switch (index) {
        case 0:
          window.location.hash = "intro";
          window.scrollTo({ top: this.banner.height, behavior: "smooth" });
          break;
        case 1:
          window.location.hash = "article";
          window.scrollTo({ top: this.banner.height * 2, behavior: "smooth" });
          break;
      }
    },
    onLogoArrowClick() {
      window.scrollTo({ top: this.banner.height, behavior: "smooth" });
    },
    onIntroArrowClick() {
      window.scrollTo({ top: this.banner.height * 2, behavior: "smooth" });
    },
    async onMoreClick() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const res = await http.get(`/notes?page=${this.currPage + 1}&size=6`);
      this.currPage++;
      const getTextFromHtml = (html) => {
        return html.replace(/<.*?>/g, "");
      };
      const getImgFromHtml = (html) => {
        let array = [];
        const re = /<img.*?src="(.*?)".*?>/;
        const reg = /<img.*?src="(.*?)".*?>/g;
        const match = html.match(reg);
        if (match) {
          match.forEach((v) => {
            array.push(v.match(re)[1]);
          });
        }
        return array.slice(0, 3);
      };
      const noteArray = res.map((item) => {
        const html = marked(item.content);
        const imgArray = getImgFromHtml(html);
        item.content = getTextFromHtml(html).substring(0, 160) + "...";
        item.createDate = formatTime(new Date(item.createDate), "yyyy-MM-dd");
        item.imgArray = imgArray;
        return item;
      });
      const scrollTop = document.documentElement.scrollTop;
      this.noteArray.push(...noteArray);
      this.$nextTick(() => (document.documentElement.scrollTop = scrollTop));
      this.loading = false;
    },
    onScroll() {
      const scrollTop = document.documentElement.scrollTop;
      this.banner.overlayOpacity =
        scrollTop > this.banner.height ? 1 : scrollTop / this.banner.height;
      this.visible.header = scrollTop >= this.banner.height * 2;
    },
  },
  created() {
    if (process.browser) {
      this.onResize = () => {
        if (document.documentElement.clientWidth > 980) {
          this.visible.drawer = false;
        }
        // const height = document.documentElement.offsetHeight;
        const height = window.innerHeight;
        const width = document.documentElement.clientWidth;
        this.banner.height = height;
        this.banner.width = width;

        this.$nextTick(() => {
          this.slider.width = this.$refs.slider[0].getBoundingClientRect().width;
          this.slider.height = Math.floor((this.slider.width * 281) / 375) + 16;
        });
      };
      this.onResize();
      window.addEventListener("resize", this.onResize, false);

      const toGenTimeout = () => {
        this.bannerTimeout = setTimeout(() => {
          this.banner.curr = (this.banner.curr + 1) % 10000;
          toGenTimeout();
        }, 6000);
      };
      toGenTimeout();
      document.addEventListener("scroll", this.onScroll);

      const hash = window.location.href.split("#")[1];
      if (hash) {
        const map = { intro: 0, article: 1 };
        this.onHeaderItemClick(map[hash]);
      }
    }
  },
  beforeDestroy() {
    if (process.browser) {
      window.removeEventListener("resize", this.onResize);
    }
    clearTimeout(this.bannerTimeout);
  },
  components: {
    Header,
  },
};
</script>
<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.banner {
  overflow: hidden;
  &__img-wrapper {
    position: fixed;
    top: 0;
    left: 0;
  }
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    background-position: center;
    background-repeat: no-repeat;
    transition: opacity 0.8s ease;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }

  &__logo {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 340px;
    transform: translate(-50%, -50%);
  }
  &__arrow {
    position: absolute;
    left: 50%;
    bottom: 6%;
    transform: translateX(-50%);
    width: 2.5%;
    cursor: pointer;
  }
  &__intro-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__intro {
    width: 400px;
    &__main {
      color: white;
      text-align: left;
      font-size: 50px;
    }
    &__sub {
      color: white;
      text-align: left;
      font-size: 30px;
    }
  }
}

.main {
  width: 100%;
}
.block-wrapper {
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 50px;
}
.block {
  max-width: 1200px;
  &__title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 50px;
    padding-top: 100px;
    text-align: left;
    &::after {
      background: #000;
      content: " ";
      display: block;
      height: 1px;
      width: 40px;
      margin-top: 20px;
    }
  }
}

.note-list {
  position: relative;
  overflow: hidden;
}
.note {
  display: flex;
  margin-top: 50px;
  align-items: center;

  &__title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 50px;
    text-align: left;
  }
  &__content {
    font-size: 14px;
    line-height: 25px;
    text-align: left;
  }
  &__date {
    margin-top: 50px;
    font-size: 12px;
    line-height: 25px;
    text-align: left;
  }
  &__text {
    width: 40%;
    cursor: pointer;
    color: #333;
  }
  &__slider {
    width: 50%;
    margin-left: 10%;
    position: relative;
    order: 1;
    &__img-wrapper {
      position: relative;
      height: calc(100% - 16px);
      width: 100%;
      overflow: hidden;
    }
    &__img {
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      transition: opacity 0.8s ease;
    }
    &__pagination {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      &__bullet {
        border-radius: 0;
        background: black;
        height: 1px;
        opacity: 0.5;
        width: 78px;
        &--active {
          opacity: 1;
          transform: translateY(-1);
        }
      }
    }
  }
}

.more-wrapper {
  position: relative;
  background: white;
  height: 380px;
  text-align: center;
}
.more {
  width: 300px;
  height: 75px;
  background: white;
  border: 2px solid black;
  font-size: 26px;
  font-weight: bold;
  border-radius: 10px;
  margin-top: 145px;
  outline: none;
  cursor: pointer;
  user-select: none;
  &:hover {
    border-color: black;
    color: white;
    background: black;
  }
}

@media (max-width: 980px) {
  .banner {
    &__arrow {
      width: 9.3vw;
    }
    &__intro {
      width: 250px;
      &__main {
        font-size: 30px;
      }
      &__sub {
        color: white;
        text-align: left;
        font-size: 20px;
      }
    }
  }
  .note {
    display: block;
    &__slider {
      margin-left: 0;
      width: 100%;
    }
    &__title {
      margin-top: 30px;
    }
  }
  .more {
    font-size: 20px;
    height: 45px;
    width: 182px;
  }
}
</style>
