<template>
  <div>
    <common-header :class="{'home-bg' : isHome}"></common-header>
    <main>
      <router-view></router-view>
    </main>
    <common-footer></common-footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Member from "@/api/member";
export default {
  name: "App",
  data() {
    return {
      oldTheme: ""
    };
  },
  computed: {
    isHome() {
      return this.$route.path == "/home";
    },
    ...mapState({
      theme: "theme",
      appConfig: "appConfig"
    }),
    
    currentTheme() {
      let current = this.$route.name;
      // 需要切换主题的页面
      let paths = ["option", "exchange","contract"];
      if (paths.includes(current)) {
        return this.theme + "-app";
      } else {
        return "";
      }
    }
  },
  watch: {
    currentTheme() {
      this.setAppTheme();
    }
  },
  methods: {
    ...mapActions({
      setAppConfig: "setAppConfig"
    }),
    // 移除旧主题  并设置新
    setAppTheme() {
      let $body = $(document.body);
      $body.removeClass(this.oldTheme);
      $body.addClass(this.currentTheme);
      this.oldTheme = this.currentTheme;
    },
    // 获取应用配置
    getLogo() {
      Member.getLogo().then(res => {
        this.setAppConfig(res);
        this.setConfig();
      });
    },
    // 设置应用配置
    setConfig() {
      document.getElementById("appTitle").innerText = this.appConfig.name;
      document.getElementById("appIcon").href = this.appConfig.titles_logo;
    }
  },
  created() {
    this.getLogo();
  },
  mounted() {
    this.setAppTheme();
  }
};
</script>

<style lang="scss">
@import './assets/scss/base/_base.scss';
@import './assets/scss/module/_module.scss';
.home-bg {
  background: #172636 !important;
  border: none !important;
  // height: 100px;
  .nav-link {
    color: #fff;
    @include fs(18);
  }

  .profile-nav {
    a {
      color: #18214d !important;
    }
  }
}
</style>
