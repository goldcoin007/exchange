<template>
  <v-page class="income-page color-plain">
    <!-- <v-header class="nav-tab border-b-0 color-black" :title="''"></v-header> -->
    <swiper class="h-max w-max" :indicator-dots="false" indicator-color="white">
      <template v-for="(item,indes) in imgList">
          <swiper-item
            class="swipe-item color-plain overflow-scroll"
            :style="`background-image:url(${item.bg_img})`"
            :key="item.peri_img"
            v-if="numMap.num>0?item.type==1:item.type==2"
          >
            <view
              class="padding-nav"
              @touchstart="touchstart"
              @touchmove="touchmove"
              @touchend="touchend"
            >
              <view class="fn-right p-t-md p-x-25 h-20"></view>
              <img class="bg-img" :src="item.peri_img" alt="" />
              <view class="p-x-25 m-t-lg" :style="{height:20+'%'}" style="position: absolute; z-index: 12; bottom: 35%; width: 100%; box-sizing: border-box;">
                <!-- <img class="w-max" :src="item.text_img" alt="" /> -->
          			<view class="imgtitle fn-center p-x-md" >	
                        <p :class="$store.state.lang=='zh-CN'?'fn-28':'fn-24 '">{{item.title}}</p>
          				<!-- <p class="" v-for="it,i in imgTitleTip[indes]" :key="i">{{it}}</p> -->
          			</view>
              </view>
              <view class="p-x-50" :style="{height:40+'%'}" style="position: absolute; z-index: 12;bottom:2%;width: 100%;box-sizing: border-box">
                <!-- <view class="p-t-lg fn-20 d-flex ">
                  <view>
                    {{ $t("contract.h0") }}
                  </view>
                  <view class="w-100"></view>
                  <view class="d-inline-block fn-13 lever m-l-lg">
                    <view class="lever-content">
                      {{query.label|| (query.side == 1 ? $t("contract.g0") : $t("contract.g1"))
                      }}{{ query.lever_rate }}X
                    </view>
                  </view>
                </view> -->
                <!-- <view class="price-box fn-center">
                  <text class="price fn-bold d-block" :class="numMap.num>0?'color-buy':'color-sell'">{{ numMap.type }}{{ numMap.num }}{{ numMap.dec }}%</text>
                  <text class="fn-14 d-block">（{{ $t("contract.h0")}})</text>
                </view>
                <view class="data-item m-y-sm p-t-md">
                  <view class="label fn-12">{{ $t("exchange.a2") }}</view>
                  <view class="num fn-22 blue">{{ query.pair_name }}</view>
                </view>
                <view class="data-item m-y-sm p-t-md">
                  <view class="label fn-12">{{ $t("contract.k0") }}</view>
                  <view class="num fn-22 blue">{{ data.price1 * 1 }}</view>
                </view>
                <view class="data-item m-y-sm p-t-md" v-if="query.newPrice">
                  <view class="label fn-12">{{ $t("contract.k1") }}</view>
                  <view class="num fn-22 blue">{{ data.price2 * 1 }}</view>
                </view>
                <view class="data-item m-y-sm p-t-md" v-else>
                  <view class="label fn-12">{{ $t("contract.j7") }}</view>
                  <view class="num fn-22 blue">{{ data.price2 }}</view>
                </view> -->
                <view class="price-box fn-center d-flex justify-center">
                    <text class="d-block color-black">{{ $t("contract.h0")}}</text>
                    <text class="m-l-xs p-x-xs rounded-xs" :class="query.side==1?'bg-buy':'bg-sell'">
                        <span v-if="query.side==1">{{ $t("contract.c0")}}</span>
                        <span v-else>{{ $t("contract.c2")}}</span>
                    </text>
                </view>
                <view class="price-box fn-center">
                    <text class="price fn-bold d-block" :class="numMap.num>0?'color-buy':'color-sell'">{{ numMap.type }}{{ numMap.num }}{{ numMap.dec }}%</text>
                    <!-- <view class="color-gray">
                        （{{ $t("contract.h0")}})
                    </view> -->
                </view>
                <view class="shuju d-flex color-black">
                    <view class="left w-33 ">
                        <text class="d-block fn-left fn-12 line-height-2 color-gray">{{ query.pair_name }}</text>
                        <text class="d-block fn-left fn-16">{{query.label|| (query.side == 1 ? $t("contract.g0") : $t("contract.g1"))
                      }}</text>
                    </view>
                    <view class="center w-33">
                        <text class="d-block fn-center fn-12 line-height-2 color-gray">{{ $t("contract.k0") }}</text>
                        <text class="d-block fn-center fn-16">
                            <span v-if="data.price1>100">{{ omitTo(data.price1* 1 ,2) }}</span>
                            <span v-if="data.price1>1&&data.price1<100">{{ omitTo(data.price1* 1 ,4) }}</span>
                            <span v-if="data.price1<1">{{ omitTo(data.price1* 1 ,6) }}</span>
                        </text>
                    </view>
                    <view class="right w-33 ">
                        <text class="d-block fn-right fn-12 line-height-2 color-gray">{{ $t("contract.k1") }}</text>
                        <text class="d-block fn-right fn-16 ">
                            <span v-if="data.price2>100">{{ omitTo(data.price2* 1 ,2) }}</span>
                            <span v-if="data.price2>1&&data.price2<100">{{ omitTo(data.price2* 1 ,4) }}</span>
                            <span v-if="data.price2<1">{{ omitTo(data.price2* 1 ,6) }}</span>
                        </text>
                    </view>
                </view>
                <view class="code-body align-center d-flex justify-between">
                    <view class="w-f d-flex align-end">
                        <img class="img rounded-3 w-60 w-60" src="static/img/logo.png"/>
                        <view class="m-l-md">
                            <view class="fn-bold color-black fn-16">
                                AMATAK
                            </view>
                            <view class="fn-6 color-black">
                                全球合约领跑者
                            </view>
                        </view>
                    </view>
                    <view class="">
                        <v-qr
                          :text="detail.invite_url"
                          class="share-code w-65 h-65"
                        ></v-qr>
                    </view>
                </view>
                <!-- <view class="fn-center">{{ $t("contract.k6") }}</view> -->
              </view>
            </view>
          </swiper-item>
      </template>
    </swiper>
  </v-page>
</template>

<script>
import Profile from "@/api/profile";
import Contract from "@/api/contract";
import math from "@/utils/class/math";
import { mapState } from "vuex";
export default {
  name: "index",
  data() {
    return {
      detail: {},
      query: {},
      data: {},
      dTime: null,
      imgList: [],
	  imgTitleTip: [],
      windowHeight:''
    };
  },
  mounted() {
      uni.getSystemInfo({
          success: function (res) {
              this.windowHeight=60
              console.log(this.windowHeight)
          }
      });
  },
  created() {
    this.generalizeInfo();
    if (this.query.entrust_id) {
      this.entrustShare();
    } else if (this.query.position_side) {
      this.positionShare();
    }
  },
  computed: {
    ...mapState({
      logoMap: "logoMap",
    }),
    // 收益率
    numMap() {
      let strs = this.query.profitRate.replace("%", "").split(".");
      return {
        type: strs[0] >= 0 ? "+" : "",
        num: strs[0],
        dec: strs[1] ? `.${strs[1].substring(0, 3)}` : "",
      };
    },
  },
  onLoad(query) {
    this.query = query;
  },
  methods: {
      omitTo:math.omitTo,
    generalizeInfo() {
      Profile.generalizeInfo().then((res) => {
        this.detail = res.data;
      });
    },
    entrustShare() {
      Contract.entrustShare({
        symbol: this.query.symbol,
        entrust_id: this.query.entrust_id,
      }).then((res) => {
        this.data = res.data;
        this.imgList = res.data.share_imgs;
		this.imgTitleTip=res.data.tip;
      });
    },
    positionShare() {
      Contract.positionShare({
        symbol: this.query.symbol,
        position_side: this.query.position_side,
        lang:uni.getStorageSync('language')||'zh-CN'
      }).then((res) => {
        this.data = res.data;
        this.imgList = res.data.share_imgs;
		this.imgTitleTip=res.data.tip;
      });
    },
    // -----长按事件----
    touchstart() {
      clearTimeout(this.dTime);
      this.dTime = setTimeout(() => {
        this.bitmap();
      }, 600);
    },
    touchmove() {
      clearTimeout(this.dTime);
    },
    touchend() {
      clearTimeout(this.dTime);
    },
    bitmap() {
      /* eslint-disable */
      let self = this;
      if (!plus) return;
      let pages = getCurrentPages();
      let page = pages[pages.length - 1];
      let ws = page.$getAppWebview();
      // 截图
      let bitmap1 = new plus.nativeObj.Bitmap();
      // 将webview内容绘制到Bitmap对象中
      ws.draw(
        bitmap1,
        function (e) {
          bitmap1.save("_doc/share.png", {}, function (i) {
            plus.gallery.save(
              i.target,
              function (d) {
                //销毁Bitmap图片
                bitmap1.clear();
                self.$toast(self.$t("common.b3"));
              },
              function (e) {
                //销毁Bitmap图片
                self.$toast(self.$t("common.b4"));
                bitmap1.clear();
              }
            );
          });
        },
        function (e) {
          self.$toast(self.$t("common.b3"));
        }
      );
      /* eslint-disable */
    },
  },
};
</script>

<style scoped lang="scss">
.color-plain {
  color: $white !important;
}
.nav-tab {
  position: absolute;
  width: 100%;
  background: transparent;
  /deep/ {
    .van-hairline--bottom:after {
      border-bottom-width: 0px;
    }
    .van-nav-bar {
      background-color: transparent;
    }
  }
}
::v-deep .van-nav-bar__title {
  color: $white;
}
::v-deep .van-nav-bar .van-icon {
  color: $white;
}
.p-x-50 {
  padding-left: 40px;
  padding-right: 40px;
}
.blue {
  color: #00daff;
}
.income-page {
  // background: #170043 center/100% 100%;
  position: relative;
  .top-tips {
    word-spacing: 20px;
    color: transparent;
  }
  .lever {
    background: linear-gradient(to right, #00daff, #9e61ff);
    padding: 1px;
    border-radius: 4px;
    .lever-content {
      padding: 4px 6px;
      border-radius: 4px;
      background: #170043;
    }
  }
  .swipe-item {
    background-position: top center;
    background-size: 100% 100%;
  }
  .price-box {
      margin-bottom: 10%;
    .price {
      font-size: 56px;
      // background: linear-gradient(to right, #00daff, #9e61ff);
      background-clip: text;
      -webkit-background-clip: text;
    }
  }
  .data-item {
    position: relative;
    &::before {
      display: block;
      position: absolute;
      content: "";
      width: 25px;
      height: 3px;
      background: $white;
      top: 0;
    }
  }
  .code-body {
      width: 100%;
      height: 6rem;
      .img{
          // width: 26%;
      }
  }
  .bg-img {
    width: 100%;
  }
}
.imgtitle p{
    color: #113062;
	    // background-image:-webkit-linear-gradient(top,#dff4ff,#85c3e3);
	    // -webkit-background-clip:text;
	    // -webkit-text-fill-color:transparent; 
        // font-family: '宋体';
}
.w-50{
    width:25%;
}
.h-50{
    // height:250%;
}
.share-code{
    background-color: white;
    padding: 5px;
}
.shuju{
    margin-bottom: 6%;
    .center{
        border-left: 1px solid ;
        border-right: 1px solid ;
    }
}
.color-black{
    color: black;
}
.w-33{
    width: 33%;
}
.color-gray{
    color: gray;
}
.rounded-3{
    border-radius: 5px;
}
.w-f{
    width: fit-content;
}
</style>