<template>
  <div class="layout-page" :style="themeStyle">
    <v-header :title="$t('otc.a3')"></v-header>
    <!-- 币币 -->
    <v-paging class="layout-main" :ajax="list" :data="query">
      <template #box="list">
        <view v-for="item in $list(list)" class="item bg-panel-4 m-md rounded-sm" :key="item.order_no">
          <view class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
            <view class="d-flex">
              <view
                v-if="item.type=='buy'"
                class="suatus color-buy fn-20 m-r-xs rounded"
              >{{$t('exchange.b5')}}</view>
              <view
                v-if="item.type=='sell'"
                class="suatus color-sell fn-20 m-r-xs rounded"
              >{{$t('exchange.b6')}}</view>
              <!-- <view>
                <view class="color-light fn-20">{{item.currency}}</view>
              </view> -->
            </view>
            <view>{{item.order_status_text}}</view>
          </view>
          <view class="p-x-md p-y-xs">
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('assets.c0')}}</view>
              <view class="color-light">{{item.amount}} USDT</view>
            </view>
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('otc.b0')}}</view>
              <view class="color-light">{{item.unitPrice}} CNY</view>
            </view>
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('assets.d0')}}</view>
              <view class="fn-10">{{item.status_text}}</view>
            </view>
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('otc.f5')}}</view>
              <view class="fn-10">{{item.order_on}}</view>
            </view>
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('otc.h6')}}</view>
              <view class="fn-10">{{item.created_at}}</view>
            </view>
          </view>
        </view>
      </template>
    </v-paging>
  </div>
</template>
<script>
import math from "@/utils/class/math";
import Otc from "@/api/otc";
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
        list:Otc.legalList,
        query:{
            coin_name:'USDT'
        }
    };
  },
  computed: {
      
    ...mapGetters(['themeStyle'])
  },
  methods: {
    omitTo:math.omitTo,
    appTokenAssets() {
      let data = {
        coin_name: this.query.coin_name,
      };

      Wallet.appTokenAssets(data).then((res) => {
        this.detail = res.data;
      });
    },
  },
  onLoad(query) {
      console.log(this.list)
  },
};
</script>
<style lang="scss" scoped>
::v-deep .van-tabs__wrap {
  background-color: $panel-4;
}
.w-50{
    width: 50%;
}
</style>