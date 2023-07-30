<template>
  <v-page>
    <template v-for="item in navList">
      <component
        v-if="cashViews.includes(item.tel)"
        v-show="tab == item.tel"
        :is="item.tel"
        :key="item.tel"
        :isShow="tab == item.tel && tabShow"
        :tabs="tab"
        class="layout-main"
      ></component>
    </template>
    <view class="footer d-flex p-y-xs bg-tab-nav flex-wrap fn-center">
      <view
        class="item line-height-1 flex-fill"
        :class="{ 'router-link-active': tab == item.tel }"
        v-for="item in navList"
        :key="item.tel"
        @click="tabChange(item.tel)"
      >
        <view class="icon">
          <img
            class="h-15"
            v-if="tab == item.tel"
            :src="item.activeIcon"
            alt=""
          />
          <img class="h-15" v-else :src="item.icon" alt="" />
        </view>
        <view class="fn-12" style="margin-top: 4px">{{ item.label }}</view>
      </view>
      <!-- #ifdef APP-PLUS -->
      <view class="w-max" style="height:20px"></view>
      <!-- #endif -->
    </view>
    <view class="mode d-flex flex-wrap" v-if="mode">
        <img class="w-max m-x-xl" src='static/img/right.png'/>
        <text class="p-x-50">微信客户端请点击右上角【...】选择在浏览器打开</text>
    </view>
  </v-page>
</template>

<script>
import Home from "./home";
import ExchangeOperation from "./exchange-operation";
import Mine from "./mine";
import OptionList from "./option-list";
// import List from "./list";
import Contract from "./contract";
export default {
  name: "Base",
  components: {
    Home,
    ExchangeOperation,
    OptionList,
    Mine,
    Contract
  },
  computed: {
    navList() {
      return [
        {
          label: this.$t("base.d0"),
          tel: "home",
          icon: "static/img/base_home_0.png",
          activeIcon: "static/img/base_home_1.png",
        },
        {
          label: this.$t("exchange.a0"),
          tel: "exchange-operation",
          icon: "static/img/base_link_0.png",
          activeIcon: "static/img/base_link_1.png",
        },
        {
          label: this.$t("base.a4"),
          tel: "option-list",
          icon: "static/img/base_qukuai_0.png",
          activeIcon: "static/img/base_qukuai_1.png",
        },
        {
          label: this.$t("exchange.a2"),
          tel: "contract",
          icon: "static/img/base_caidan_0.png",
          activeIcon: "static/img/base_caidan_1.png",
        },
        {
          label: this.$t("base.d2"),
          tel: "mine",
          icon: "static/img/base_assets_0.png",
          activeIcon: "static/img/base_assets_1.png",
        },
      ];
    },
  },
  data() {
    return {
      cashViews: [],
      tab: "",
      tabShow: true,
      mode:false
    };
  },
  methods: {
    tabChange(name) {
      this.tab = name;
      if (!this.cashViews.includes(name)) {
        this.cashViews.push(name);
      }
    },
    // #ifdef H5
        isWeiXinLogin() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.mode=true
            } else {
                return false // 普通浏览器中打开
            }
        }
    // #endif
  },
  onShow() {
    this.tabShow = true;
    // #ifdef H5
    this.isWeiXinLogin()
    // #endif
  },
  onLoad(query) {
    if (query.tel) {
      this.tabChange(query.tel);
    } else {
      this.tabChange("home");
    }
  },
  mounted() {},
  onHide() {
    this.tabShow = false;
  },
};
</script>
<style lang="scss" scoped>
.footer {
  box-shadow: $tab-nav-shadow;
  position: relative;
  z-index:5;
}
.router-link-active {
  color: $theme-1;
}
.mode{
    position: fixed;
    z-index: 1000000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    color: white;
    background: rgba(0,0,0,0.5);
    font-size: 16px;
    box-sizing: border-box;
    img{
        width: 95%;
        height: auto;
        box-sizing: border-box;
    }
}
.p-x-50{
    padding: 0 50px;
}
</style>