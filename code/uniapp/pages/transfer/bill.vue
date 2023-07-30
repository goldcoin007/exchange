<template>
  <div class="layout-page" :style="themeStyle">
    <v-header :title="$t('transfer.a0')"></v-header>
    <v-scroll class="layout-main" @ref="ref" @load="load">
      <ul class="list">
        <div @click="paying(item.order_status)" class="item bg-panel-4 m-x-md m-y-xs rounded-sm box-shadow" v-for="item in list" :key="item.datetime">
          <div class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
            <div class="d-flex">
              <div>
                <div class="color-light fn-lg">{{item.coin_name}}</div>
                <div class="fn-10">{{parseTime(item.datetime)}}</div>
              </div>
            </div>
            <div class="color-default" v-if="item.order_status==0">{{$t('auth.a5')}}</div>
            <div class="color-buy" v-if="item.order_status==1">{{$t('assets.d2')}}</div>
            <div class="color-sell" v-if="item.order_status==2">{{$t('assets.d3')}}</div>
          </div>
          <div class="p-x-md p-y-xs">
            <div class="row d-flex m-y-xs justify-between">
              <div class="label fn-sm">{{$t('transfer.a2')}}</div>
              <div class="color-light">{{item.amount}}</div>
            </div>
            <div class="row d-flex m-y-xs justify-between">
              <div class="label fn-sm">{{$t('transfer.a3')}}</div>
              <div class="color-light">
                {{accountMap[item.draw_out_direction]}}
                <i class="iconfont">&#xe61a;</i>
                {{accountMap[item.into_direction]}}
              </div>
            </div>
          </div>
        </div>
      </ul>
    </v-scroll>
    <van-popup
    custom-style="width:80%;height:auto;padding:20px;border-radius:5px" 
    :show="popshow"
    
    @close="popshow = false">
        <view class="rounded-xs color-default fn-center">
            <img src="static/img/tt.png" width="60%" class=""/>
            <text class="d-block m-y-lg">{{$t('common.c5')}}</text>
            <v-button
              type="theme"
              size="lg"
              block
              class="w-max rounded-xs "
              @click="popshow=false"
            >
              {{$t('contract.i9')}}
            </v-button>
        </view>
    </van-popup>
  </div>
</template>
<script>
import Wallet from "@/api/wallet";
import date from "@/utils/class/date.js";
import { mapGetters } from "vuex";
export default {
  name: "bill",
  data() {
    return {
      list: [],
      page: 0,
      accountMap: {
        UserWallet: this.$t('base.d7'),
        ContractAccount: this.$t('transfer.a5'),
        OtcAccount: this.$t('otc.d5'),
      },
      popshow:false
    };
  },
  computed: {
    ...mapGetters(['themeStyle'])
  },
  methods: {
    parseTime: date.parseTime,
    paying(i){
        if(i==0){
            this.popshow=true
        }
    },
    ref(over) {
      this.page = 1;
      this.transferRecord(over);
    },
    load(over) {
      this.page++;
      this.transferRecord(over);
    },
    transferRecord(over) {
      let data = {
        page: this.page,
      };
      Wallet.transferRecord(data).then((res) => {
        if (res.data.current_page == 1) this.list = [];
        this.list = [...this.list, ...res.data.data];
        over && over({ finished: res.data.data.length < res.data.per_page });
      });
    },
  },
  created() {},
};
</script>