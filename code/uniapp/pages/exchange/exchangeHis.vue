<template>
    <v-page class="layout-main">
      <v-header :title="$t('first.a6')"></v-header>
      <view class="d-flex border-b">
        <view class="d-flex rounded-lg justify-between w-max p-b-xs">
          <view
            @click="active = 0"
            class="p-y-xs p-x-lg fn-center w-50"
            >
                <text :class="{ 'color-theme-1 active p-b-xs': active == 0 }">{{$t('first.a7')}}</text>
            </view>
          <view
            @click="active = 1"
            class="p-y-xs p-x-lg fn-center w-50"
            >
                <text :class="{ 'color-theme-1 active p-b-xs': active == 1 }">{{$t('first.a8')}}</text>
          </view
          >
        </view>
      </view>
      <v-paging :ajax="getCurrentEntrust" :key="1" ref="list" tag="div" v-if="active==0">
        <template #box="list">
          <not-data v-if="!$list(list).length"></not-data>
          <div v-for="item in $list(list)" class="item bg-panel-4 m-md rounded-sm box-shadow" :key="item.order_no">
            <div class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
              <div class="d-flex">
                <div v-if="item.entrust_type==1" class="suatus color-buy fn-20 m-r-xs rounded">{{$t('exchange.b5')}}</div>
                <div v-if="item.entrust_type==2" class="suatus color-sell fn-20 m-r-xs rounded">{{$t('exchange.b6')}}</div>
                <div>
                  <div class="color-light fn-20">{{item.symbol}}</div>
                  <div class="fn-10">{{item.created_at}}</div>
                </div>
              </div>
              <div class="d-flex">
                <span>{{item.status_text}}</span>
              </div>
            </div>
            <div class="p-x-md p-y-xs">
              <div class="row d-flex m-y-xs justify-between">
                <div class="label fn-sm">{{$t('exchange.b7')}}</div>
                <div class="color-light">{{item.entrust_price}}</div>
              </div>
              <div class="row d-flex m-y-xs justify-between">
                <div class="label fn-sm">{{$t('exchange.b8')}}</div>
                <div class="color-light">
                  <template v-if="item.type==1">{{$t('exchange.b9')}}</template>
                  <template v-if="item.type==2">{{$t('exchange.c0')}}</template>
                </div>
              </div>
              <div class="row d-flex m-y-xs justify-between">
                <div class="label fn-sm">{{$t('exchange.c1')}}</div>
                <div class="color-buy">{{item.traded_amount}}</div>
              </div>
              <div class="row d-flex m-y-xs justify-between">
                <div class="label fn-sm">{{$t('exchange.c2')}}</div>
                <div class="color-light">{{item.amount}}</div>
              </div>
              <div class="row d-flex m-y-xs justify-between">
                <div class="label fn-sm">{{$t('exchange.g3')}}</div>
                <div class="color-light">
                  <v-button type="red" class="rounded-xs" size="mini" @click="ifCancel(item)">{{$t('exchange.g4')}}</v-button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </v-paging>
      
      <v-paging class="layout-main" :key="2" :ajax="getHistoryEntrust" v-if="active==1">
          <template #box="list">
            <not-data v-if="!$list(list).length"></not-data>
            <div v-for="item in $list(list)" class="item bg-panel-4 m-md rounded-sm box-shadow" :key="item.order_no">
              <div class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
                <div class="d-flex">
                  <div v-if="item.entrust_type==1" class="suatus color-buy fn-20 m-r-xs rounded">{{$t('exchange.b5')}}</div>
                  <div v-if="item.entrust_type==2" class="suatus color-sell fn-20 m-r-xs rounded">{{$t('exchange.b6')}}</div>
                  <div>
                    <div class="color-light fn-20">{{item.symbol}}</div>
                    <div class="fn-10">{{item.created_at}}</div>
                  </div>
                </div>
                <div>{{item.status_text}}</div>
              </div>
              <div class="p-x-md p-y-xs">
                <div class="row d-flex m-y-xs justify-between">
                  <div class="label fn-sm">{{$t('exchange.b7')}}</div>
                  <div class="color-light">{{item.entrust_price}}</div>
                </div>
                <div class="row d-flex m-y-xs justify-between">
                  <div class="label fn-sm">{{$t('exchange.b8')}}</div>
                  <div class="color-light">
                    <template v-if="item.type==1">{{$t('exchange.b9')}}</template>
                    <template v-if="item.type==2">{{$t('exchange.c0')}}</template>
                  </div>
                </div>
                <div class="row d-flex m-y-xs justify-between">
                  <div class="label fn-sm">{{$t('exchange.c1')}}</div>
                  <div class="color-buy">{{item.traded_amount}}</div>
                </div>
                <div class="row d-flex m-y-xs justify-between">
                  <div class="label fn-sm">{{$t('exchange.e2')}}</div>
                  <div class="color-light">{{item.avg_price}}</div>
                </div>
            
                <div class="row d-flex m-y-xs justify-between">
                  <div class="label fn-sm">{{$t('exchange.c2')}}</div>
                  <div class="color-light">{{item.amount}}</div>
                </div>
              </div>
            </div>
          </template>
        </v-paging>
    </v-page>
</template>
<script>
import Order from "@/api/order";
import math from '@/utils/class/math'
export default {
    data(){
        return {
            active: 0,
            getHistoryEntrust: Order.getHistoryEntrust,
            getCurrentEntrust: Order.getCurrentEntrust,
        }
    },
    methods:{
      division:math.division,
      ifCancel(item) {
        this.$dialog
          .confirm({
            title: this.$t('common.tips'),
            message: this.$t('exchange.g5')+'?',
            confirmButtonText:  this.$t("common.confirm"),
            cancelButtonText: this.$t("common.cancel")
          })
          .then(() => {
            this.cancelEntrust(item);
          })
          .catch(() => {});
      },
      // 撤销委托
      cancelEntrust(item) {
        let data = {
          entrust_id: item.id,
          entrust_type: item.entrust_type,
          symbol: item.symbol,
        };
        Order.cancelEntrust(data).then(() => {
          this.$toast.success(this.$t('exchange.g6'));
          this.$refs.list.list.forEach((ele, idx) => {
            if (item.id == ele.id) {
              this.$refs.list.list.splice(idx, 1);
            }
          });
        });
      },
    }
}
</script>
<style lang="scss" scoped>
    .active{
        position: relative;
        // border-bottom: 1px solid $theme-1;
    }
    .active:after{
        position: absolute;
        content: "";
        width: 30%;
        height: 2px;
        background-color: $theme-1;
        bottom: 0;
        left: 35%;
    }
    .w-50{
        width: 50%;
    }
</style>