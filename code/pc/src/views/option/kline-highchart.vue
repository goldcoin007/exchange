<template>
  <div ref="container" class="chart"></div>
</template>
<script>
import { mapState } from "vuex";
import Highcharts from "highcharts/highstock";
export default {
  data() {
    return {
      data: [],
      now: new Date().getTime(),
      chart: null,
      lastDate: 0
    };
  },
  computed: {
    ...mapState({
      theme: "theme"
    })
  },
  methods: {
    initChart() {
      let $box = this.$refs.container;
      let arr = this.data.map(item => item);
      arr = [];
      Highcharts.setOptions({
        global: {
          timezoneOffset: -8 * 60
        }
      });
      this.chart = Highcharts.stockChart($box, {
        chart: {
          panning: false,
          spacingRight: 20,
          backgroundColor: "transparent"
        },
        rangeSelector: {
          enabled: false
        },
        navigator: {
          enabled: false
        },
        tooltip: {
          enabled: true
        },
        scrollbar: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        xAxis: {
          gridLineColor: this.theme == "light" ? "#e6e6e6" : "#2a2e39",
          gridLineWidth: "1",
          type: "datetime"
        },
        yAxis: {
          gridLineColor: this.theme == "light" ? "#e6e6e6" : "#2a2e39"
        },
        plotOptions: {
          areaspline: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, "rgba(221,25,0,.13)"],
                [1, "rgba(221,25,0,.02)"]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 2,
            states: {
              hover: {
                lineWidth: 2
              }
            },
            threshold: null
          }
        },
        series: [
          {
            name: "",
            data: arr,
            type: "areaspline",
            threshold: null,
            color: "#FD5B2C",
            tooltip: {
              valueDecimals: 2
            }
          }
        ]
      });
    },

    getLastDate() {
      this.lastDate = this.data[this.data.length - 1][0];
    },
    addPoint(poin) {
      let series = this.chart.series[0];
      series.addPoint(poin, true, true);
    },
    setData(list) {
      let series = this.chart.series[0];
      series.setData(list);
    },
    setName(name) {
      let series = this.chart.series[0];
      series.name = name;
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>

<style lang="scss" scoped>
.chart {
  height: 600px;
}
</style>
