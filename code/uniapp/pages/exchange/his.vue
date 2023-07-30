<template>
  <v-page>
    <v-header :title="$t('first.a6')"></v-header>
    <van-tabs
      :ellipsis="false"
      :border="false"
      class="border-b"
      :active="tab"
      @change="tab = $event.detail.name"
    >
      <!-- <van-tab :title="`${$t('contract.a0')}`" :name="0"></van-tab> -->
      <!-- <van-tab
        :title="`${$t('contract.a1')}(${symbolLeft})`"
        :name="1"
      ></van-tab> -->
      <van-tab :title="$t('contract.a2')" :name="0"></van-tab>
      <van-tab :title="$t('contract.a3')" :name="1"></van-tab>
      <!-- <van-tab
        :title="`${$t('exchange.a2')}${$t('assets.a7')}(${symbolLeft})`"
        :name="4"
      ></van-tab> -->
    </van-tabs>
    <!-- 开仓 -->
    <!-- <view class="layout-main" v-if="tab == 0">
      <open-position
        :query="query"
        :collect="collect"
        @option="option"
        :isShow="isShow"
        ref="openposition"
        :increase="increase"
        @symbol="symbolListShow = !symbolListShow"
        @getSymbolDetail="symbolDetail = $event"
      />
    </view> -->
    <!-- 持仓 -->
    <!-- <main class="layout-main" v-if="tab == 1">
      <position
        :isShow="isShow"
        :symbolDetail="symbolDetail"
        :symbolLeft="symbolLeft"
      />
    </main> -->
    <!-- 委托 -->
    <main class="layout-main" v-if="tab == 0">
      <contract-entrustment style="min-height: 100%" />
    </main>
    <!-- 历史 -->
    <main class="layout-main" v-if="tab == 1">
      <contract-history :tabs='tab'/>
    </main>
    <!-- 流水 -->
    <!-- <main class="layout-main" v-if="tab == 4">
      <contract-bill :symbolLeft="symbolLeft" />
    </main> -->

    <van-popup
      :show="symbolListShow"
      @close="symbolListShow = false"
      closeable
      close-on-popstate
      position="left"
      custom-style="height:100%;width:70%"
    >
      <symbol-list
        :collect="collect"
        :title="$t('contract.a4')"
        :marketList="marketList"
        @check-symbol="checkSymbol"
      />
    </van-popup>
    <van-dialog
      use-slot
      :show="contractStatusShow"
      :title="contractAgreement.title"
      @confirm="openContract"
      show-cancel-button
      @cancel="contractStatusShow = false"
    >
      <view class="p-md overflow-scroll">
        <rich-text class="p-md" :nodes="contractAgreement.body"></rich-text>
      </view>
    </van-dialog>
  </v-page>
</template>
<script>
import openPosition from "@/pages/exchange/open-position";
import position from "@/pages/exchange/position";
import contractEntrustment from "@/pages/exchange/contract-entrustment";
import contractHistory from "@/pages/exchange/contract-history";
import symbolList from "@/pages/exchange/symbol-list";
import contractBill from "@/pages/exchange/contract-bill";
import Home from "@/api/home";
import Contract from "@/api/contract";
import { mapState } from "vuex";
export default {
  name: "contract",
  props: ['tabs'],
  components: {
    openPosition,
    position,
    contractEntrustment,
    contractHistory,
    symbolList,
    contractBill,
  },
  data() {
    return {
      tab: 0,
      collect: [],
      marketList: [],
      symbolListShow: false,
      contractStatusShow: false,
      contractAgreement: {},
      symbolDetail: {},
      query: {},
      increase:{}
    };
  },
  computed: {
    symbolLeft() {
      if (!this.query.symbol) return "";
      return this.query.symbol.split("/")[0];
    },
    isLogin() {
      return Boolean(uni.getStorageSync("token"));
    },
    ...mapState({
      ws: "ws1",
    }),
  },
  watch:{
      tab(n){
          console.log(n)
      }
  },
  methods: {
    // 获取市场行情
    getMarketList() {
      Contract.getMarketList().then((res) => {
        // 整理数据格式
        this.marketList = res.data.map((item) => {
          item.marketInfoList.forEach((el) => {
            el.coin_name = el.symbol;
          });
          return item;
        });

        if (!this.query.symbol) {
          let parentItem = this.marketList[0].marketInfoList[0];
          this.checkSymbol(parentItem);
        }
      });
    },
    //
    checkSymbol(obj) {
      this.symbolListShow = false;
      if (obj.pair_name != this.query.symbol)
        this.query = { symbol: obj.pair_name };
    },
    // 获取自选列表
    getCollect() {
      if (!this.isLogin) return;
      Home.getCollect()
        .then((res) => {
          this.collect = res.data || [];
        })
        .catch(() => {});
    },

    // 链接socket
    linkSocket() {
      let msg = "swapMarketList";
      this.ws.send({
        cmd: "sub",
        msg: msg,
      });
      this.ws.on("message", (res) => {
        if(!this.isShow) return;
        let { data, sub } = res;
        if (sub == msg) {
          this.marketList = data.map((item) => {
            item.marketInfoList.forEach((el) => {
              el.coin_name = el.symbol;
            });
            return item;
          });
          var symbol=this.query.symbol.split('/')
          // console.log(symbol)
          var market=this.marketList.find((item) => item.coin_name == symbol[1])
          this.increase=market.marketInfoList.find((item) => item.coin_name == symbol[0])||{}
        }
      });
    },
    // 添加自选
    option() {
      let data = {
        pair_name: this.query.symbol,
      };
      Home.option(data)
        .then((res) => {
          this.getCollect();
          if (res.data) {
            this.$toast(this.$t("exchange.a6"));
          } else {
            this.$toast(this.$t("exchange.a7"));
          }
        })
        .catch(() => {});
    },
    // 获取开通永续合约
    openStatus() {
      if (!this.isLogin) return;
      Contract.openStatus({}).then((res) => {
        if (!res.data.open) {
          this.contractAgreement = res.data.contractAgreement;
          this.contractStatusShow = true;
          this.$refs.openposition.getSymbolDetail();
        }
      });
    },
    // 开通永续合约
    openContract() {
      Contract.opening().then(() => {
        this.$toast(this.$t("contract.a5"));
        this.contractStatusShow = false;
      });
    },
  },
  onLoad(query) {
      this.query=query
  },
  created() {
    this.getMarketList();
    this.getCollect();
    this.linkSocket();
    // this.openStatus();
  },
  destroyed() {
    this.ws.send({
      cmd: "unsub",
      msg: "swapMarketList",
    });
  },
};
</script>
