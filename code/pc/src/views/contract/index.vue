<template>
  <div class="contract-page">
    <div class="page-top d-flex pt-2">
      <div class="kline-box flex-fill mr-2">
        <div
          class="coin-change d-flex align-items-center py-2 pl-4 heading justify-content-between"
        >
          <div class="d-flex align-items-center">
            <div class="coin d-flex align-items-center">
              <el-popover
                placement="bottom"
                ref="popover"
                width="400"
                trigger="click"
              >
                <div slot="reference">
                  {{ activeContract.pair_name }}
                  <el-button size="mini">
                    <i class="el-icon-arrow-down"></i>
                  </el-button>
                </div>
                <div
                  class="markets-pair-list"
                  style="max-height:300px;overflow:auto;"
                >
                  <template v-for="parent in contractList">
                    <div class="px-3 text-primary" :key="parent.coin_name">
                      {{ parent.coin_name }}
                    </div>
                    <table class="table" :key="parent.coin_name + 1">
                      <thead>
                        <tr class="text-secondary">
                          <th class="w-10/24">{{ $t("contract.h5") }}</th>
                          <th class="w-7/24">{{ $t("contract.g3") }}</th>
                          <th class="w-7/24 text-right">
                            {{ $t("contract.h6") }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in parent.marketInfoList"
                          :key="item.symbol"
                          :class="{ active: item.symbol == activeSymbol }"
                          @click="activeSymbol = item.symbol"
                        >
                          <td class="w-10/24">
                            {{ item.symbol }}/{{ parent.coin_name }}
                          </td>
                          <td
                            class="w-7/24 "
                            :class="item.increase < 0 ? 'decreace' : 'increase'"
                          >
                            {{ item.price }}
                          </td>
                          <td
                            class="w-7/24"
                            :class="item.increase < 0 ? 'decreace' : 'increase'"
                          >
                            {{ item.increaseStr }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </template>
                </div>
              </el-popover>
            </div>
            <div
              class="price px-3 border-right"
              :class="{
                decreace: activeContract.increase < 0,
                increace: activeContract.increase >= 0
              }"
            >
              <span class="current">{{ activeContract.price }}$</span>
              &nbsp;
              <span class="zf">{{ activeContract.increaseStr }}</span>
            </div>
            <!-- 币种价值数据 -->
            <div class="d-flex fn-12">
              <div class="item px-2">
                <div class="title mb-1 text-secondary">
                  {{ $t("contract.h7") }}
                </div>
                <div>
                  {{ activeContract.high }}
                </div>
              </div>
              <div class="item px-2">
                <div class="title mb-1 text-secondary">
                  {{ $t("contract.h8") }}
                </div>
                <div>
                  {{ activeContract.low }}
                </div>
              </div>
              <div class="item px-2">
                <div class="title mb-1 text-secondary">
                  24H{{ $t("contract.h9") }}（{{ $t("contract.e2") }}）
                </div>
                <div>
                  {{ activeContract.vol }}
                </div>
              </div>
            </div>
          </div>
          <div><theme-change /></div>
        </div>
        <kline
          :activeCoin="{ pair_name: activeContract.pair_name }"
          v-if="activeContract.pair_name"
          :contract="true"
          :wsUrl="wsUrl"
        />
      </div>
      <!-- 盘口 -->
      <handicap
        @input="newPriceObj = $event"
        @selectprice="defaultPrice = $event"
        :symbol="activeSymbol"
        :wsUrl="wsUrl"
        :ws="ws"
        class="mr-2"
      />
      <!-- 交易 -->
      <exchange-store
        :holdPositionList="holdPositionList"
        :symbol="activeSymbol"
        :defaultPrice="defaultPrice"
        :newPriceObj="newPriceObj"
        :contractOpen="contractOpen"
        @accountInfo="accountInfo = $event"
        @position="holdPosition"
        @getSymbolDetail="symbolDetail=$event"
      />
    </div>
    <page-bottom
      @position="holdPosition"
      @isall="
        holdPositionAll = $event;
        holdPosition();
      "
      @setactiveItem="setactiveItem"
      :accountInfo="accountInfo"
      :newPriceObj="newPriceObj"
      :holdPositionList="holdPositionList"
      :holdPositionAll="holdPositionAll"
      :symbol="activeSymbol"
      :symbolDetail="symbolDetail"
    />
    <div
      class="modal fade"
      id="openContract"
      tabindex="-1"
      role="dialog"
      aria-labelledby="contractClose"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="contractClose">
              {{ contractAgreement.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-html="contractAgreement.body"></div>
          </div>
          <div class="modal-footer d-flex justify-content-center">
          
            <button type="button" class="btn btn-primary" @click="opening">
             {{$t('contract.j8')}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import kline from "../option/kline";
import handicap from "./handicap.vue";
import account from "./account.vue";
import exchangeStore from "./exchange-store.vue";
import pageBottom from "./page-bottom.vue";
import Contract from "../../api/contract";
import Socket from "@/api/server/Socket.js";
export default {
  components: {
    kline,
    handicap,
    account,
    exchangeStore,
    pageBottom
  },
  data() {
    return {
      contractList: [],
      activeSymbol: "",
      holdPositionAll: false,
      holdPositionList: [],
      newPriceObj: {},
      accountInfo: {},
      defaultPrice: "",
      wsUrl: this.Globals.Server.Path.WS1,
      ws: new Socket(this.Globals.Server.Path.WS1),
      _time: null,
      contractOpen: false,
      contractAgreement: {},
      symbolDetail:{}
    };
  },
  computed: {
    activeContract() {
      return (
        this.contractList
          .map(item => item.marketInfoList)
          .flat()
          .find(item => item.symbol == this.activeSymbol) || {}
      );
    },
    isLogin() {
      return Boolean(localStorage.token);
    }
  },
  watch: {
    activeSymbol() {
      this.holdPosition();
    },
  },
  destroyed() {
    clearInterval(this._time);
  },
  created() {
    // this.openStatus();
    this.getMarketList();
    this.holdPosition();
    this._time = setInterval(() => {
      if (this.contractOpen) {
        this.holdPosition();
      }
    }, 3000);
    this.ws.on("open", () => {
      this.swapMarketList();
    });
  },
  //三秒更新一次数据
  mounted: function () {
      setInterval(() => {
        this.holdPosition();
      }, 3000)
  },
  methods: {
    swapMarketList() {
      let msg = "swapMarketList";
      this.ws.send({
        cmd: "sub",
        msg: msg
      });
      this.ws.on("message", res => {
        let { data, sub,cmd } = res;

        if (sub == msg) {
          this.contractList = data;
        }else if (cmd == "ping") {
          this.ws.send({
            cmd: "pong"
          });
        }
      });
    },
    // 获取合约市场
    getMarketList() {
      Contract.getMarketList().then(res => {
        this.contractList = res;
        // 默认值
        let firstParent = res[0];
        if (firstParent) {
          let first = firstParent.marketInfoList[0];
          if (first) this.activeSymbol = first.symbol;
        }
      });
    },
    // 获取持仓
    holdPosition() {
      if (!this.isLogin) return;
      let data = {
        symbol: (this.holdPositionAll && this.activeSymbol) || ""
      };
      Contract.holdPosition(data, { loading: false }).then(res => {
        this.holdPositionList = res;        
      });
    },
    // 获取永续合约开通状态
    openStatus() {
      if(!this.isLogin) return;
      Contract.openStatus().then(res => {
        this.contractOpen = res.open;
        if (!this.contractOpen) {
          this.contractAgreement = res.contractAgreement;
          $("#openContract").modal("show");
        }
      });
    },
    // 开通永续合约
    opening() {
      Contract.opening().then(res => {
        $("#openContract").modal("hide");
        this.contractOpen = true;
        this.$message.success(this.$t('contract.j9'));
      });
    },
    //获取某一个持仓订单的数据
    setactiveItem(index=0){
        this.accountInfo=this.holdPositionList[index]
    }
  }
};
</script>
<style lang="scss" scoped>
</style>