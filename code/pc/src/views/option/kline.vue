<template>
  <div id="tradingview_1355aw2"></div>
</template>

<script>
// import pako from "pako";
import VDatafeed from "./VDatafeed";
import Option from "@/api/option";
import Contract from "@/api/contract";
import Socket from "@/api/server/Socket.js";
import tvStyle from "@/assets/js/tvStyle.js";
import { mapState } from "vuex";
let exchangeAjax = {
  getKline: Option.getKline,
  getSymbol(name) {
    return name.split("/").join("").toLowerCase();
  },
  msg: "Kline_",
};
let contractAjax = {
  getKline: Contract.getKline,
  getSymbol(name) {
    return name.split("/")[0];
  },
  msg: "swapKline_",
};
export default {
  props: {
    contract: {
      default: false,
      type: Boolean,
      required: false,
    },
    activeCoin: {
      default: {},
      type: Object,
      required: false,
    },
    wsUrl: {
      default: "",
      type: String,
      required: false,
    },
  },
  watch: {
    activeCoin(n, o) {
      if (!n) return;
      let boo = this.contract
        ? n.pair_name != o.pair_name
        : n.pair_time_name != o.pair_time_name;
      if (boo) {
        // 获取准备取消订阅的消息的精度值
        let timer = this.timer;
        this.page[n.pair_name] = 1;
        this.TView.setSymbol(n.pair_name, this.timer);
        // 取消订阅
        if (n.pair_id != o.pair_id) {
          this.unsub(o.pair_id, timer);
        }
      }
    },
    symbol(n, o) {
      if (n != o && o) {
        this.unsub(this.ajaxTv.getSymbol(o), this.timer);
      }
    },
  },
  computed: {
    lang() {
      let local;
      if (localStorage.lang) {
        if (localStorage.lang == "tw") {
          local = "zh_TW";
        } else if (localStorage.lang == "cn") {
          local = "zh";
        } else if (localStorage.lang == "kor") {
          local = "ko";
        } else if (localStorage.lang == "jp") {
          local = "ja";
        } else if (localStorage.lang == "de") {
          local = "de_DE";
        } else if (localStorage.lang == "fra") {
          local = "fr";
        } else if (localStorage.lang == "it") {
          local = "it";
        } else if (localStorage.lang == "pt") {
          local = "pt";
        } else if (localStorage.lang == "spa") {
          local = "es";
        } else if (localStorage.lang == "en") {
          local = "en";
        }else {
          local = "en";
        }
      } 
      return local;
    },
    symbol() {
      return this.activeCoin.pair_name;
    },
    ...mapState({
      theme: "theme",
    }),
    ajaxTv() {
      return this.contract ? contractAjax : exchangeAjax;
    },
    msg() {
      return `${this.ajaxTv.msg}${this.ajaxTv.getSymbol(
        this.symbol
      )}_${this.resolution(this.interval)}`;
    },
  },
  data() {
    return {
      TView: undefined,
      ws: undefined,
      onLoadedCallback: undefined,
      onRealtimeCallback: undefined,
      timer: "15",
      sub: "",
      isCreateSocket: false,
      page: {},
    };
  },
  methods: {
    // 链接socket
    linkSocket(call) {
      const ws = new Socket(this.wsUrl);
      ws.on("open", () => {
        this.ws = ws;
        call && call();
      });
      ws.on("message", (res) => {
        let { data, msg, code, sub, type, status, req, cmd } = res;
        if (sub == this.sub && this.onRealtimeCallback) {
          this.onRealtimeCallback(this.getMap(data));
        } else if (type == "ping" || cmd == "ping") {
          this.ws.send({
            cmd: "pong",
          });
        }
      });
    },
    // 取消订阅
    unsub(pair_id, timer) {
      let msgObj = {
        cmd: "unsub",
        msg: `${this.ajaxTv.msg}${pair_id}_${this.resolution(timer)}`,
      };
      this.ws.send(msgObj);
    },
    getConfig() {
      return {};
    },
    getSymbol() {
      return {};
    },
    getMap(data) {
      return {
        time: data.id * 1000,
        close: data.close,
        open: data.open,
        high: data.high,
        low: data.low,
        volume: data.vol,
      };
    },
    resolution(resolution) {
      let T = "";
      if (isNaN(resolution * 1)) {
        T = resolution
          .replace("D", "day")
          .replace("W", "week")
          .replace("M", "mon");
      } else {
        if (resolution > 60) {
          T = Math.floor(resolution / 60) + "hours";
        } else {
          T = resolution + "min";
        }
      }
      return T;
    },
    // 解压
    unzip(b64Data) {
      let u8 = window.atob(b64Data);
      let jiya =  window.pako.inflate(u8)
      let str = this.Uint8ArrayToString(jiya);
      return JSON.parse(str);
    },
    Uint8ArrayToString(fileData) {
      var dataString = "";
      for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
      }
      return dataString;
    },
    getBars(
      symbolInfo,
      resolution,
      rangeStartDate,
      rangeEndDate,
      onLoadedCallback,
      onErrorCallback
    ) {
      this.page[this.symbol] = this.page[this.symbol] || 1;
      let page = this.page[this.symbol] > 3 ? 3 : this.page[this.symbol];
      let data = {
        symbol: this.ajaxTv.getSymbol(symbolInfo.name),
        period: this.resolution(resolution),
        form: rangeStartDate,
        to: rangeEndDate,
        size: page * 200,
        zip: 1,
      };

      this.onLoadedCallback = onLoadedCallback;
      //   检测接口币种是不是后台返回的
      if (!this.activeCoin.pair_name) {
        onLoadedCallback([]);
        return;
      }
      // 取消订阅
      if (this.timer && this.timer != resolution) {
        this.unsub(
          this.ajaxTv.getSymbol(this.activeCoin.pair_name),
          this.timer
        );
      } else {
      }

      this.timer = resolution;
      this.ajaxTv.getKline(data).then((res) => {
        let arr = this.unzip(res.data).map((item) => {
          return this.getMap(item);
        });
        this.page[this.symbol]++;
        onLoadedCallback(arr);
        setTimeout(() => {
          if (this.page[this.symbol] > 3) {
            onLoadedCallback([]);
          }
        }, 60);
      });

      // 发送消息
      let msgObj = {
        cmd: "sub",
        msg: `${this.ajaxTv.msg}${data.symbol}_${data.period}`,
      };
      this.sub = msgObj.msg;
      let send = (msgObj) => {
        if (this.ws) {
          this.ws.send(msgObj);
        } else {
          if (this.isCreateSocket) {
            setTimeout(() => {
              send(msgObj);
            }, 200);
            return;
          }
          this.isCreateSocket = true;
          this.linkSocket(() => {
            this.isCreateSocket = false;
            this.ws.send(msgObj);
          });
        }
      };
      send(msgObj);
    },
    subscribeBars(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback
    ) {
      this.onRealtimeCallback = onRealtimeCallback;
      if (!this.activeCoin.pair_name) {
        setTimeout(() => {
          onResetCacheNeededCallback();
        }, 100);
      }
    },
    initView() {
      let Tdata = new VDatafeed(this);
      this.TView = new TradingView.widget({
        width: "100%",
        height: 590,
        interval: this.timer,
        timezone: "Asia/Shanghai",
        theme: "light", // 自定义主题
        style: "1",
        library_path: "/static/Kline/charting_library/",
        datafeed: Tdata,
        locale: this.lang,
        toolbar_bg: this.theme == "light" ? "#f1f3f6" : "#222e3d",
        enable_publishing: false,
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        show_popup_button: true,
        popup_width: "1000",
        popup_height: "650",
        container_id: "tradingview_1355aw2",
        disabled_features: [
          "header_symbol_search",
          "header_compare",
          "volume_force_overlay",
          "header_widget_dom_node",
          'timeframes_toolbar',
          "control_bar",
          "main_series_scale_menu",
          "header_resolutions",
          "legend_context_menu",
          "symbol_search_hot_key",
          "symbol_info",
          "pane_context_menu",
          "header_widget_dom_node",
          'timeframes_toolbar',
        ],
        supported_resolutions: ["5", "15", "30", "60", "240", "1D", "1W", "1M"],
        overrides: tvStyle[this.theme],
        custom_css_url: `/static/Kline/charting_library/static/css/tradingview_${
          this.theme == "light" ? "white" : "black"
        }.css`,
      });
    },
  },
  mounted() {
    this.initView();
  },
};
</script>
