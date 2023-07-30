<template>
<div ref="chart" class="chart-box"></div>
</template>

<script>
import Highcharts from "highcharts/highstock";
export default {
    name: "price-line",
    props: ['line'],
    data() {
        return {
            chart: undefined
        };
    },
    watch: {
        line(n) {
            if (n) {
                // debugger;
                this.chart.series[0].setData(this.dataFilter(n))
            }
        }
    },
    methods: {
        dataFilter(n) {
          
            let min = Math.min(...n)
            return n.map(item => item - min)
        },

        initMap() {
            this.chart = Highcharts.chart(this.$refs.chart, {
                chart: {
                    spacingRight: 0,
                    spacingLeft: 0,
                    animation: false,
                    backgroundColor: "transparent",
                },
                title: {
                    text: null
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    enabled: false,
                },
                xAxis: {
                    visible: false
                },
                yAxis: {
                    visible: false,
                    startOnTick: false
                },
                legend: {
                    enabled: false
                },
                series: [{
                    type: 'areaspline',
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                    data: this.dataFilter(this.line),
                    color: "#00c162",
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            x2: 0,
                            y1: 0,
                            y2: 1
                        },
                        stops: [
                            [0, "rgba(2,150,82,.5)"],
                            [1, "rgba(2,150,82,.2)"]
                        ]
                    }
                }, ]
            });
        }
    },
    mounted() {
        this.initMap();
    }
};
</script>

<style lang="scss" scoped>
.chart-box {
    height: 130px;
}
</style>
