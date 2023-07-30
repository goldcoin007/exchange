<template>
  <v-page>
    <v-header :title="$t('base.d2')" :left-arrow="false"></v-header>
    <!-- <view style="height: var(--status-bar-height)"></view> -->
    <view
      class="box-size head bg-panel-3 h-aut p-x-md m-x-md d-flex justify-between flex-wrap align-center bgb3 rounded-ms color-light"
      :class="theme == 'light' ? 'bgb3-white' : ''"
      style="position: relative"
    >
        <view class="d-flex p-t-md justify-center align-center w-max">
          <text class="fn-16 color-default d-block">{{ $t("base.d6") }}(BTC)</text>
          <view class="fn-18 m-l-md d-flex" @click="setHide(!hideMoney)">
            <van-icon v-if="!hideMoney" name="eye-o" />
            <van-icon v-else name="closed-eye" />
          </view>
        </view>
        <view class="m-t-md d-flex flex-wrap justify-center fn-center w-max">
          <text class="fn-28 w-max">{{ filterMoney(account.total_assets_btc) }}</text>
          <text class="fn-sm m-l-md w-max"
            >≈{{ filterMoney(account.total_assets_usd) }} USD</text>
        </view>
        
        <view class="m-t-ms p-b-ms w-max " style="margin-top: 10px">
          <view
            class="d-flex justify-between align-center rounded-lg"
          >
            <v-link
              tag="view"
              to="/pages/assets/recharge"
              class="d-flex bg-form-panel-3 align-center p-y-xxs rounded-xs w-33 justify-center shadow-panel-4"
            >
              <view class="m-r-xs d-flex align-center">
                <img
                  src="static/img/13.png"
                  alt=""
                  class="h-25"
                />
              </view>
              <text class="color-light fn-middle fn-ms">{{
                $t("base.b5")
              }}</text>
            </v-link>
            <v-link tag="view" to="/pages/assets/draw" class="d-flex bg-form-panel-3 align-center p-y-xxs rounded-xs w-33 justify-center shadow-panel-4">
              <view class="m-r-xs d-flex align-center">
                <img
                  src="static/img/5.png"
                  alt=""
                  class="h-25"
                />
              </view>
              <text class="color-light fn-ms">{{
                $t("base.b6")
              }}</text>
            </v-link>
            <v-link
              tag="view"
              to="/pages/transfer/index"
              class="d-flex bg-form-panel-3 align-center p-y-xxs rounded-xs w-33 justify-center shadow-panel-4"
            >
              <view class="m-r-xs d-flex align-center">
                <img
                  src="static/img/hua.png"
                  alt=""
                  class="h-25"
                />
              </view>
              <text class="color-light fn-ms">{{
                $t("base.d8")
              }}</text>
            </v-link>
          </view>
        </view>
    </view>
    
    <view class="layout-main">
        <scroll-view
          @refresherrefresh="onRefresh"
          :refresher-enabled="refresherEnabled&&scrollTop<50"
          :refresher-triggered="refreshing"
          refresher-background="transparent"
          :refresher-threshold="50"
        >
      <!-- 头部 -->
      <view class="tab m-x-md m-t-md rounded-ms d-flex justify-between bgb3 p-xs"
      :class="theme == 'light' ? 'bgb3-white' : ''">
          <view class="w-33 fn-center p-y-xxs" :class="tabActive==0?'color-theme-1 bg-panel-3 rounded-xs shadow-panel-nei':''"
          @click="tabActive=0">
              {{$t('base.d7')}}
          </view>
          <view class="w-33 fn-center p-y-xxs m-l-xs" :class="tabActive==1?'color-theme-1 bg-panel-3 rounded-xs shadow-panel-nei':''"
          @click="tabActive=1">
              {{$t('base.e4')}}
          </view>
          <view class="w-33 fn-center p-y-xxs m-l-xs" :class="tabActive==2?'color-theme-1 bg-panel-3 rounded-xs shadow-panel-nei':''"
          @click="tabActive=2">
              {{$t('otc.d5')}}
          </view>
      </view>
      <view class="top">
        <!-- <van-tabs
          :active="tabActive"
          @change="changtTab"
          :border="false"
          v-if="show"
          :line-width="30"
          swipeable
          animated
          class="tabs-main d-flex justify-between align-center flex-col"
        >
          <van-tab :title="$t('base.d7')" :name="0"> -->
            <view class="box-shadow p-t-ms wallet m-y-md" v-if="tabActive==0">
              <view class="m-x-md m-b-xs m-t-sm">
                  <!--bgb3 :class="theme == 'light' ? 'bgb3-white' : ''" -->
                <view
                  class="shadow-panel-nei p-xs p-x-md rounded-ms bg-form-panel-3"
                  style="position: relative"
                >
                  <text class="fn-20 d-block color-light m-t-xs"
                  >≈{{ filterMoney(account.funds_account_usd) }} </text>
                  <text class="fn-sm d-block color-gray-6 m-t-xs"
                    >{{ $t("base.d6") }}(USDT)</text>

                  <!-- <text class="fn-20 d-block color-light m-t-md"
                    >{{ filterMoney(account.funds_account_btc) }} BTC</text
                  > -->
                  <!-- fn-sm d-block m-t-xs color-gray-6 -->
                  
                  </view>
              </view>

              <view class="h-30 p-x-xs d-flex justify-between align-center">
                <van-field
                  :value="searchText"
                  @input="searchText = $event.detail"
                  left-icon="search"
                  :placeholder="$t('base.d9')"
                  input-class="fn-12 "
                  class="flex-fill color-gray-6 rounded-md pos fn-12 m-r-lg"
                  style="padding-left: 0"
                />
                <van-checkbox
                  :value="hide"
                  @change="hide = !hide"
                  icon-size="16"
                >
                <text class="color-gray-6 m-r-xs"
                  >{{ $t("base.e0") }}0{{ $t("base.e1") }}</text
                >
                </van-checkbox>
              </view>
              <router-link
                :to="{
                  path: '/pages/assets/bill',
                  query: { coin_name: item.coin_name },
                }"
                v-show="ifShow(item)"
                class="p-t-xs d-block rounded-md text-none"
                v-for="(item, index) in list"
                :key="index"
              >
                <view class="m-x-md d-flex justify-between align-center p-b-xs">
                  <view>
                    <img
                      :src="item.image"
                      class="w-20 h-20 rounded-max fn-middle"
                    />
                    <text class="fn-18 fn-bold color-light fn-middle p-l-sm">{{
                      item.coin_name
                    }}</text>
                  </view>
                  <!-- <view>
                    <text class="fn-lg color-light fn-middle">{{
                      add(
                        item.usable_balance,
                        item.freeze_balance,
                        item.priceDecimals
                      )
                    }}</text>
                    <van-icon
                      class="p-l-xs fn-middle"
                      name="arrow"
                      size="16"
                      color="#646566"
                    />
                  </view> -->
                </view>
                <view class="p-x-md d-flex justify-between align-center">
                  <view class="w-4/12">
                    <p class="color-gray-6" style="padding: 5px 0">
                      {{ $t("base.b9") }}
                    </p>
                    <p class="fn-lg color-light overflow-scroll">{{ item.usable_balance }}</p>
                  </view>
                  <view class="w-4/12 fn-center">
                    <p class="color-gray-6" style="padding: 5px 0">
                      {{ $t("base.e2") }}
                    </p>
                    <p class="fn-lg color-light overflow-scroll">{{ item.freeze_balance }}</p>
                  </view>
                  <view class="w-4/12 fn-right">
                    <p class="color-gray-6" style="padding: 5px 0">
                      {{ $t("base.e3") }}(USD)
                    </p>
                    <p class="fn-lg color-light overflow-scroll">
                      {{ omitTo(item.usd_estimate, item.priceDecimals) }}
                    </p>
                  </view>
                </view>
                <view class="h-4 m-t-xs"></view>
              </router-link>
            </view>
          <!-- </van-tab>

          <van-tab :title="$t('base.e4')" :name="1" class="p-t-md"> -->
            <view class="m-x-md"  v-if="tabActive==1">
              <view
                class="bgb3 p-x-md p-y-xs m-y-xs rounded-ms"
                :class="theme == 'light' ? 'bgb3-white' : ''"
                style="position: relative"
              >
                <view class="fn-sm d-flex justify-between color-gray-6 m-t-xs">
                  <span> USDT </span>
                  <v-link class="color-buy" to="/pages/assets/account-bill"
                    >{{ $t("base.e4") }}
                    <van-icon class="fn-middle" name="arrow" size="16"
                  /></v-link>
                </view>
                <span class="fn-20 d-block color-light m-t-md"
                  >{{ filterMoney(account.contract_account_usd)
                  }}{{ account.symbol }}</span
                >
                <view class="d-flex justify-between m-t-xs">
                  <v-link to="/pages/transfer/index" class="d-flex">
                    <view class="m-r-xs align-center">
                      <img
                        :src="$localImgUrl('fill4.png')"
                        alt=""
                        class="h-18"
                      />
                    </view>
                    <!-- <van-icon class="color-theme-1 fn-26 fn-middle m-r-xs" name="exchange" /> -->
                    <text class="color-light fn-middle">{{
                      $t("base.d8")
                    }}</text>
                  </v-link>
                </view>
              </view>
            </view>
            <view class="m-x-md"  v-if="tabActive==2">
              <view
                class="bgb3 p-x-md p-y-xs m-y-xs rounded-ms"
                :class="theme == 'light' ? 'bgb3-white' : ''"
                style="position: relative"
              >
                <view class="fn-sm d-flex justify-between color-gray-6 m-t-xs">
                  <span> USDT </span>
                  <v-link class="color-buy" to="/pages/assets/currency-bill"
                    >{{ $t("otc.d5") }}
                    <van-icon class="fn-middle" name="arrow" size="16"
                  /></v-link>
                </view>
                
                <text class="d-flex m-t-ms fn-12">
                    <span class="fn-20 color-light m-r-xs"
                  >{{ filterMoney(otc.otc_usable_balance)
                  }}{{ account.symbol }}</span>
                  ({{$t('contract.e4')}})
                </text>
                <text class="d-flex m-t-ms fn-12">
                    <span class="fn-20 color-light m-r-xs"
                  >{{ filterMoney(otc.otc_freeze_balance)
                  }}{{ account.symbol }}</span>
                  ({{$t('otc.d6')}})
                </text>
                <view class="d-flex justify-between m-t-xs">
                  <v-link to="/pages/transfer/index" class="d-flex">
                    <view class="m-r-xs align-center">
                      <img
                        :src="$localImgUrl('fill4.png')"
                        alt=""
                        class="h-18"
                      />
                    </view>
                    <!-- <van-icon class="color-theme-1 fn-26 fn-middle m-r-xs" name="exchange" /> -->
                    <text class="color-light fn-middle">{{
                      $t("base.d8")
                    }}</text>
                  </v-link>
                </view>
              </view>
            </view>
          <!-- </van-tab>
        </van-tabs> -->
      </view>
      </scroll-view>
    </view>
  </v-page>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Wallet from "@/api/wallet";
import math from "@/utils/class/math.js";
import Contract from "@/api/contract.js";
export default {
  name: "mine",
  data() {
    return {
      account: {},
      list: [],
      tabActive: 0, // 切换选择
      searchText: "",
      hide: false,
      show: false,
      accountDetail: {},
      scrollTop:0,
      refreshing:false,
      otc:{}
    };
  },
  computed: {
    ...mapState({
      hideMoney: "hideMoney",
      theme: "theme",
    }),
  },
  props: {
    isShow: {
      default: true,
      type: Boolean,
      required: false,
    },
    refresherEnabled:{
      default:true,
      required:false,
      type:Boolean
    },
  },
  watch: {
    isShow(n, o) {
      if (n) {
        this.upDateData();
      }
    },
    tabActive(){
        this.upDateData();
    }
  },
  methods: {
      onRefresh(){
          if (this.refreshing) return;
          this.refreshing = true;
          this.fundAccount()
          this.personalAssets()
          setTimeout(() => {
              this.refreshing = false;
          }, 1000)
      },
      scroll(event){
        this.scrollTop = event.detail.scrollTop
      },
    omitTo: math.omitTo,
    // 计算和
    add: math.add,
    ...mapActions({
      setHide: "hideMoney",
    }),
    filterMoney(val) {
      if (this.hideMoney) return "******";
      return this.omitTo(val, 8);
    },

    ifShow(item) {
      // 搜索过滤
      let show =
        item.coin_name
          .toLocaleLowerCase()
          .indexOf(this.searchText.toLocaleLowerCase()) != -1;
      if (!this.hide) return true && show;

      // 0余额资金过滤
      let hasMoney =
        this.add(item.usable_balance, item.freeze_balance, item.priceDecimals) *
          1 !=
        0;
      return hasMoney && show;
    },
    fundAccount() {
      Wallet.fundAccount().then((res) => {
        this.list = res.data.list;
        this.otc=res.data
      });
    },
    personalAssets(e) {
      Wallet.personalAssets().then((res) => {
        this.account = res.data;
      });
    },
    // 获取合约列表
    accounts() {
      Contract.contractAccount().then((res) => {
        this.accountDetail = res.data;
      });
    },
    changtTab($ev) {
      this.tabActive = $ev.detail.name;
      this.upDateData();
    },
    // 刷新数据
    upDateData() {
      if (this.tabActive == 1) {
        this.accounts();
      } else if(this.tabActive == 0) {
        this.personalAssets();
        this.fundAccount();
      }else{
        this.fundAccount();
      }
    },
  },
  mounted() {
    this.show = true;
  },
  created() {
    this.upDateData();
  },
};
</script>

<style lang="scss" scoped>
.tabs-main {
  ::v-deep.van-tabs {
    width: 100%;
  }
  ::v-deep.van-tabs__wrap,
  ::v-deep.van-tabs__content {
    // width: 100%;
  }
  ::v-deep.van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  ::v-deep.van-pull-refresh {
    height: calc(100vh - 200px);
    overflow-y: auto;
  }
  ::v-deep.van-cell {
    background: transparent;
    &::after {
      border-width: 0;
    }
  }
  ::v-deep .van-cell__left-icon {
    color: $white;
  }
}
.bgb3 {
  background: url(../../static/img/bgb3.png) no-repeat;
  background-size: 100% auto;
  background-position: right bottom;
  &.bgb3-white {
    background-image: url(../../static/img/light/bgb3.png);
  }
}
.bgb4 {
  background: url(../../static/img/bgb4.png) no-repeat;
  background-size: 100% auto;
  background-position: right bottom;
}
.pos {
  position: relative;
}
.posa {
  position: absolute;
}
.rounded-ms{
    border-radius: 10px;
}
.p-y-xxs{
    padding: 5px 0;
}
.w-33{
    width: 30%;
}
.w-50{
    width: 50%;
}
.wallet{
    border-radius: 30px;
}
.text-none{
    text-decoration: none;
}
::v-deep .van-cell{
    background-color: $panel-3;
}
::v-deep .van-cell{
    background-color:transparent;
    padding: 0 10px;
}
</style>