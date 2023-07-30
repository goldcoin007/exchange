<template>
  <div class="markets-pair-list handicap handicapRight">
    <div class="nav nav-pills p-3 fn-center d-block fn-22 w-100">
      <div class="nav-item">
          {{$t("contract.f8")}}
      </div>
    </div>
    <div class="col-12 p-0 bg-plain">
      <!-- 实时成交 -->
      <div class="real-time mt-1 pt-2 px-3 pb-0">
        <div class="d-flex text-secondary fn-12">
          <div class="w-10/24">
            {{ $t("contract.b1") }}
          </div>
          <div class="w-7/24">{{ $t("contract.d8") }}(USDT)</div>
          <div class="w-7/24 text-right">
            {{ $t("contract.e1") }}({{ $t("contract.e2") }})
          </div>
        </div>
        <div class="d-flex fn-12" v-for="(item, idx) in tradeList" :key="idx">
          <div class="w-10/24">
            {{ parseTime(item.ts, false, "{h}:{i}:{s}") }}
          </div>
          <div class="w-7/24" :class="item.direction=='buy'?'increace':'decreace'">
            {{ item.price }}
          </div>
          <div class="w-7/24 text-right">
            {{ omitTo(item.amount, 2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Contract from "@/api/contract.js";
import date from "@/utils/class/date.js";
import math from "@/utils/class/math.js";
import Socket from "@/api/server/Socket.js";
export default {
  data() {
    return {
      tab: 2,
      sellList: [],
      buyList: [],
      tradeList: [],
      newPriceObj: {}
    };
  },
  props: {
    symbol: {
      default: "",
      type: String,
      required: false
    },
    wsUrl: {
      default: "",
      type: String,
      required: true
    },
    ws: {}
  },
  watch: {
    symbol(n, o) {
      this.getMarketInfo();
      this.linkSocket();
      if (o) {
        this.unLink(o);
      }
    }
  },
  computed: {
    msg() {
      return {
        buy: `swapBuyList_${this.symbol}`,
        sell: `swapSellList_${this.symbol}`,
        trade: `swapTradeList_${this.symbol}`
      };
    },
    sellListShow() {
      let list = this.sellList.splice(0, 12);
      let total = 0;
      list.forEach(item => {
        item.total = total += item.amount;
      });
      return list.reverse();
    },
    buyListShow() {
      let list = this.buyList.splice(0, 12);
      let total = 0;
      list.forEach(item => {
        item.total = total += item.amount;
      });
      return list;
    }
  },
  created() {
    if (this.symbol) {
      this.getMarketInfo();
      this.linkSocket();
    }
  },
  // 获取盘口
  methods: {
    parseTime: date.parseTime,
    omitTo: math.omitTo,
    getMarketInfo() {
      let data = {
        symbol: this.symbol
      };
      Contract.getMarketInfo(data).then(res => {
        this.sellList = res.swapSellList;
        this.buyList = res.swapBuyList;
        this.tradeList = res.swapTradeList;
        console.log(this.tradeList)
        this.newPriceObj = this.tradeList[0];
        this.$emit("input", this.newPriceObj);
      });
    },
    // 计算深度
    getValue(amount) {
      const arr = this.buyListShow
        .concat(this.sellListShow)
        .map(item => item.amount);
      let max = Math.max(...arr);
      return math.division(amount, max, 2) * 100;
    },
    // 连接socket
    linkSocket() {
      if (this.ws.socket.readyState == 1) {
        this.ws.send({
          cmd: "sub",
          msg: this.msg.buy
        });
        this.ws.send({
          cmd: "sub",
          msg: this.msg.sell
        });
        this.ws.send({
          cmd: "sub",
          msg: this.msg.trade
        });
      } else {
        this.ws.on("open", () => {
          this.ws.send({
            cmd: "sub",
            msg: this.msg.buy
          });
          this.ws.send({
            cmd: "sub",
            msg: this.msg.sell
          });
          this.ws.send({
            cmd: "sub",
            msg: this.msg.trade
          });
        });
      }

      this.ws.on("message", res => {
        let { data, msg, code, sub, type, status, cmd } = res;
        if (sub == this.msg.buy) {
          this.buyList = data;
        } else if (sub == this.msg.sell) {
          this.sellList = data;
        } else if (sub == this.msg.trade) {
          this.tradeList.unshift(data);
          this.tradeList.pop();
          this.newPriceObj = data;
          this.$emit("input", this.newPriceObj);
        } else if (cmd == "ping") {
          this.ws.send({
            cmd: "pong"
          });
        }
      });
    },
    // 取消订阅
    unLink(symbol) {
      // 取消买线
      this.ws.send({
        cmd: "unsub",
        msg: `swapBuyList_${symbol}`
      });
      // 取消卖线
      this.ws.send({
        cmd: "unsub",
        msg: `swapSellList_${symbol}`
      });
      // 取消成交
      this.ws.send({
        cmd: "unsub",
        msg: `swapTradeList_${symbol}`
      });
    }
  }
};
</script>