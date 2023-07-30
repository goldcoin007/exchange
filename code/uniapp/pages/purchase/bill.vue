<template>
  <div class="layout-page" :style="themeStyle">
    <v-header :title="$t('common.a3')"></v-header>
    <v-scroll class="layout-main" @ref="ref" @load="load">
      <ul class="list">
        <div class="item bg-panel-4 m-x-md m-y-xs rounded-sm box-shadow" v-for="item in list" :key="item.datetime">
          <div class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
            <div class="d-flex">
              <div>
                <div class="color-light fn-lg">{{item.subscription_currency_name}}</div>
                <div class="fn-10">{{parseTime(item.subscription_time)}}</div>
              </div>
            </div>
            <div class="color-buy">{{$t('transfer.a1')}}</div>
          </div>
          <div class="p-x-md p-y-xs">
              <div class="row d-flex m-y-xs justify-between">
                <div class="label fn-sm">{{$t('purchase.a1')}}</div>
                <div class="color-light">{{item.payment_currency}}</div>
              </div>
            <div class="row d-flex m-y-xs justify-between">
              <div class="label fn-sm">{{$t('common.a4')}}</div>
              <div class="color-light">{{item.payment_amount}}</div>
            </div>
            <div class="row d-flex m-y-xs justify-between">
              <div class="label fn-sm">{{$t('common.a5')}}</div>
              <div class="color-light">{{item.subscription_currency_amount}}</div>
            </div>
          </div>
        </div>
      </ul>
    </v-scroll>
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
        UserWallet: this.$t('transfer.a4'),
        ContractAccount: this.$t('transfer.a5'),
        FinancialAccount: this.$t('transfer.a7'),
      },
    };
  },
  computed: {
    ...mapGetters(['themeStyle'])
  },
  methods: {
    parseTime: date.parseTime,
    ref(over) {
      this.page = 1;
      this.subscribeRecord(over);
    },
    load(over) {
      this.page++;
      this.subscribeRecord(over);
    },
    subscribeRecord(over) {
      let data = {
        page: this.page,
      };
      console.log(over)
      Wallet.subscribeRecords(data).then((res) => {
          console.log(res)
        if (res.data.current_page == 1) this.list = [];
        this.list = [...this.list, ...res.data.data];
        over && over({ finished: res.data.data.length < res.data.per_page });
      });
    },
  },
  created() {},
};
</script>