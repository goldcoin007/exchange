<template>
  <v-page>
    <!-- <view class="app-nav"></view> -->
    <view class="w-max" style="height: var(--status-bar-height)"></view>
    <view class="h-100" v-if="android=='Android'"></view>
    <view class="flex-fill boxs">
     <web-view
        :webview-styles="webviewStyle"
        class="iframe"
        :src="url"
        frameborder="0"
      ></web-view>
    </view>
    <view class="back" @click.stop="$back(2)"></view>
  </v-page>
</template>
<script>
import app from "app.js";
export default {
  name: "service",
  data() {
    return {
      webviewStyle: {
        height: "300px",
      },
      url:uni.getStorageSync('otc')
    };
  },
  mounted() {
    // #ifdef APP-PLUS
    var currentWebview = this.$scope.$getAppWebview(); //获取当前web-view
    var wv = currentWebview.children()[0];
    wv.setStyle({
      top: uni.getSystemInfoSync().statusBarHeight+40, //此处是距离顶部的高度，应该是你页面的头部
      zindex: 1,
      scalable: false, //webview的页面是否可以缩放，双指放大缩小
    });
    // #endif
  },
  computed: {
      mobileBase() {
      // #ifdef APP-PLUS
        return app.mobile+'/';
      // #endif
      // #ifdef H5
		    return '/';
      // #endif
      },
      android(){
          // #ifdef APP-PLUS
          console.log(plus.os.name)
          return plus.os.name
          // #endif
      }
  },
  methods: {
   
  },
  onLoad(a) {
      console.log(a)
  }
};
</script>
<style lang="scss" scoped>
// .app-nav{
//     width: 100%;
//     height: 60px;
//     background-color: white;
// }
.iframe {
  width: 100%;
}
.h-100{
    height: 200px;
}
</style>
