<template>
  <div class="main-chart mb5">
    <!-- TradingView Widget BEGIN -->
    <div class="tradingview-widget-container">
      <div id="tradingview_lautin">
        <!-- 存放图表库容器 -->
      </div>
    </div>
    <!-- TradingView Widget END -->
  </div>
</template>

<script>
import Model from "@/api/custom/Model";
import Option from "@/api/option";
import Exchange from "@/api/exchange";
import tvStyle from "@/assets/js/tvStyle.js";
import { mapState } from "vuex";

export default {
  props: ["socket", "symbol", "priceDecimals"],

  data() {
    return {
      model: null, // 数据模型
      interval: "1" // [字符串格式]和TV的resolution同步
    };
  },

  computed: {
    lang() {
      let local;
      console.log(localStorage.lang)
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
    ...mapState({
      theme: "theme"
    })
  },
  methods: {
    translateInterval2Period() {
      let period;
      switch (this.interval) {
        case "1":
          period = "1min";
          break;
        case "5":
          period = "5min";
          break;
        case "15":
          period = "15min";
          break;
        case "30":
          period = "30min";
          break;
        case "60":
          period = "60min";
          break;
        case "D":
        case "1D":
          period = "1day";
          break;
        case "W":
        case "1W":
          period = "1week";
          break;
        case "M":
        case "1M":
          period = "1mon";
          break;
      }
      return period;
    },

    // 创建分时按钮
    createBtns() {
      const model = this.model;
      const widget = this.model.widget;
      // widget.createButton()
      //         .addClass("my-theme")
      //         .text("主题")
      //         .on("click", function () {
      //             console.log(widget);
      //             widget.changeTheme("aa");

      //         }).parent().addClass('my-aa')

      // 创建分时按钮
      const resolutions = [
        // {
        //     title: 'Time',
        //     resolution: '1',
        //     chartType: 3
        // }, // 1，2，3几种类型
        {
          title: "1" + this.$t("exchange.min"),
          resolution: "1",
          chartType: 1
        },
        {
          title: "5" + this.$t("exchange.min"),
          resolution: "5",
          chartType: 1
        },
        {
          title: "15" + this.$t("exchange.min"),
          resolution: "15",
          chartType: 1
        },
        {
          title: "30" + this.$t("exchange.min"),
          resolution: "30",
          chartType: 1
        },
        {
          title: "1" + this.$t("exchange.hour"),
          resolution: "60",
          chartType: 1
        },
        {
          title: "1" + this.$t("exchange.day"),
          resolution: "1D",
          chartType: 1
        },
        {
          title: "1" + this.$t("exchange.week"),
          resolution: "1W",
          chartType: 1
        },
        {
          title: "1" + this.$t("exchange.month"),
          resolution: "1M",
          chartType: 1
        }
      ];

      let btns = [], // 存放所有按钮
        parents = [];
      resolutions.forEach(item => {
        // 生成按钮
        let $parent = widget
          .createButton()
          .attr("title", item.title)
          .addClass("my-date")
          .css({
            background: (index, value) => {
              if (this.interval == item.resolution) {
                return this.theme=='light'?'#ccc':'#091722';
              }
            },
            color: () => {
              if (this.interval == item.resolution) {
                return "#758696";
              }
            }
          })
          .text(item.title)
          .on("click", function(e) {
            const btns = this.parentNode.parentNode.querySelectorAll(
              ".my-date"
            );

            btns.forEach(btn => {
              if (btn === this) {
                btn.style.cssText = `background : ${this.theme=='light'?'#ccc':'#091722'};
                                        color:#758696;`;
              } else btn.style.cssText = ``;
            });

            // widget.chart().setResolution(item.resolution, function onReadyCallback() {});
            model.setResolution(item.resolution, function onReadyCallback() {});
          })
          .parent()
          .addClass("my-group");

        parents.push($parent[0]); // 父节点集合
      });
       widget.chart()
            .createStudy(
              "Moving Average",
              false,
              true,
              [5, "close", 0],
              null,
              {
                "Plot.color": "#e843da",
              }
            );
      widget.chart()
            .createStudy(
              "Moving Average",
              false,
              true,
              [10, "close", 0],
              null,
              {
                "Plot.color": "#53b987",
              }
            );
      widget.chart()
            .createStudy(
              "Moving Average",
              false,
              true,
              [30, "close", 0],
              null,
              {
                "Plot.color": "#ff231f",
              }
            );

      // setTimeout(function () {
      //     // 给my-group外层套一个DIV
      //     const resolution_container = document.createElement("div");
      //     resolution_container.className = "resolution_container";
      //     $(resolution_container).append($(parents).clone());
      //     $(resolution_container).replaceAll($(parents[0]));
      //     //
      // }, 50)
    },

    // 获取交易对基本信息
    getSymbol() {
      if (this.priceDecimals) {
        return Promise.resolve({
          pair_name: this.priceDecimals
        });
      } else {
        return Exchange.getSymbolInfo({
          symbol: this.symbol
        });
      }
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
    // 获取历史记录数据
    getHistoryCallback(onLoadCallback) {
      // 取图表回传的solution
      this.interval = this.model.interval;

      // 转化接口所需的period
      let period = this.translateInterval2Period();

      Option.getKline({
        symbol: this.symbol,
        period,
        size: 500,
        zip:1
      })
        .then(data => {
          let list = [];
          // 组装tv数据格式
          for (let item of this.unzip(data.data)) {
            list.push({
              time: item.id * 1000,
              open: item.open,
              high: item.high,
              low: item.low,
              close: item.close,
              volume: item.amount
            });
          }
          let lastTime = list[list.length - 1].time;
          console.log(lastTime,'--------')
          onLoadCallback(list, lastTime);
        })
        .catch(err => {});
    },

    // 初始化图表
    initTV() {
      // 先订阅数据 再创建图表库
      this.model.subscribe([
        {
          cmd: "sub",
          msg: `Kline_${this.symbol}_${this.interval}min`
        }
      ]);
      console.log(this.lang)
      this.model.init(
        {
          // 初始化交易对和分时
          symbol: this.symbol,
          interval: this.interval,
          container_id: "tradingview_lautin", // 设置容器
          height: 1000,
          locale: this.lang, // 语言设置
          priceDecimals: this.priceDecimals,
          disabled_features:['header_resolutions','header_symbol_search', "volume_force_overlay"],
          enabled_features:['header_indicators'],
          overrides: tvStyle[this.theme],
          toolbar_bg: this.theme == "light" ? "#f1f3f6" : "#222e3d",
          custom_css_url: `/static/Kline/charting_library/static/css/tradingview_${
            this.theme == "light" ? "white" : "black"
          }.css`,
          debug:false
        },
        this.getHistoryCallback
      );

      // 创建分时和主题按钮
      this.model.widget.onChartReady(this.createBtns.bind(this));
    }
  },

  watch: {
    // 渲染图表库内容
    symbol(newVal, oldVal) {
      if (!oldVal) {
        // 初始化订阅数据并渲染图表库
        this.initTV();
      } else {
        // 切换交易对 取消旧数据 订阅新数据
        this.model.subscribe([
          {
            cmd: "unsub",
            msg: `Kline_${oldVal}_${this.interval}min`
          },
          {
            cmd: "sub",
            msg: `Kline_${newVal}_${this.interval}min`
          }
        ]);

        // 已有图表库 通过修改symbol触发图标库更新 重新执行getSymbol和getBar
        this.model.setSymbol(newVal);
      }
    }
  },

  created() {},

  mounted() {
    // 初始化模型对象 建立ws连接
    this.model = new Model(this.socket, this);

    // 刷新页面时订阅数据并创建图表
    if (this.symbol) this.initTV(); // 必须在mounted之后 因为渲染tv时需要查找容器
  }
};
</script>

<style lang="scss">
#tradingview_lautin {
  height: 550px;
}

// 分时按钮
#tradingview_878d2 .my-group {
  cursor: pointer !important;
  border: 1px solid red !important;
}
</style>
