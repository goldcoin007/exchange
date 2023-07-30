<template>
<div class="col-md-3">
    <div class="order-book mb15">
        <h2 class="heading">{{ $t("exchange.order-book") }}</h2>
        <table class="table">
            <thead>
                <tr style="display:block;">
                    <th class="w-33">{{ $t("exchange.price") }}({{pair.to}})</th>
                    <th class="w-33 text-right">{{ $t("exchange.amount") }}({{pair.from}})</th>
                    <th class="w-33 text-right">{{ $t("exchange.total") }}({{pair.from}})</th>
                </tr>
            </thead>

            <tbody class="sell-orders" v-if="symbol!='gitpusdt'">
                <div class="order-item" v-for="item in sellList" :key="item.id">
                    <el-progress class="progress" type="line" :stroke-width="39" :percentage="getValue(item.amount)" :show-text="false" color="rgba(216,43,43,0.15)">
                    </el-progress>
                    <!-- 卖单 使用弹性盒子倒序排列 -->
                    <tr style="display:block;" class="tb-cells" @click.stop="handleOrder(item.price)">
                        <td class="w-33 red" title="pick this price to sell">{{ item.price|omitTo(priceDecimals) }}</td>
                        <td class="w-33 text-right">{{ item.amount|omitTo(qtyDecimals) }}</td>
                        <td class="w-33 text-right">{{ item.price|multiple(item.amount, priceDecimals) }}</td>
                    </tr>
                </div>
            </tbody>

            <tbody class="ob-heading">
                <tr style="display:block;" v-if="newTrade">
                    <td class="w-33">
                        <span>{{ $t("exchange.last-price") }}</span>
                        <i :class="newTrade.changeRate > 0 ? 'tri-inc' : 'tri-dec'"></i>
                        <b :class="newTrade.changeRate > 0 ? 'increace' : 'decreace'">{{ newTrade.price}}</b>
                    </td>
                    <td class="w-33 text-right">
                        <span v-if="langs=='cn'">CNY</span>
                        <span v-else>$</span>
                        <!-- ≈ {{omitTo(newTrade.price*price_cny)}} -->
                        <span v-if="langs=='cn'">≈ {{newTrade.price*priceCny|omitTo(2)}}</span>
                        <span v-else>≈ {{newTrade.price|omitTo(2)}}</span>
                    </td>
                    <td class="w-33 text-right" :class="changeRate.startsWith('+') ? 'increace' : 'decreace'">
                        <span>{{ $t("exchange.change") }}</span>
                        {{ changeRate }}
                    </td>
                </tr>
                <tr style="display:block;" v-else>
                    <td class="w-33"><span>{{ $t("exchange.last-price") }}</span> -</td>
                    <td class="w-33 text-right">
                        <span>CNY</span> -
                    </td>
                    <td class="w-33 text-right"><span>{{ $t("exchange.change") }}</span> -</td>
                </tr>
            </tbody>

            <tbody class="buy-orders"  :style="[{'height':symbol!='gitpusdt'?'':'470px!important'}]">
                <!-- 买单 反序数值 -->
                <div class="order-item" v-for="item in reversed" :key="item.id">
                    <el-progress class="progress" type="line" :stroke-width="39" :percentage="getValue(item.amount)" :show-text="false" color="rgba(37, 188, 103, 0.15)">
                    </el-progress>
                    <!-- 卖单 使用弹性盒子倒序排列 -->
                    <tr style="display:block;" class="tb-cells" @click.stop="handleOrder(item.price)">
                        <td class="w-33 green" title="pick this price to buy">{{ item.price|omitTo(priceDecimals) }}</td>
                        <td class="w-33 text-right">{{ item.amount|omitTo(qtyDecimals) }}</td>
                        <td class="w-33 text-right">{{ item.price|multiple(item.amount, priceDecimals) }}</td>
                    </tr>
                </div>

            </tbody>
        </table>
    </div>
    <div class="market-history">
        <ul class="nav nav-pills" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="pill" href="#recent-trades" role="tab" aria-selected="true">
                    {{ $t("exchange.recent-trades") }}
                </a>
            </li>
            <!-- <li class="nav-item">
                <a class="nav-link" data-toggle="pill" href="#market-depth" role="tab" aria-selected="false">Market
                    Depth</a>
            </li> -->
        </ul>
        <div class="tab-content">
            <div class="tab-pane fade show active" id="recent-trades" role="tabpanel">
                <table class="table trade-list">
                    <thead>
                        <tr>
                            <th style="display:block;width:100%">
                                <div class="w-33">
                                    {{ $t("exchange.price") }}({{pair.to}})
                                </div>
                                <div class="w-33 text-right">
                                    {{ $t("exchange.amount") }}({{pair.from}})
                                </div>
                                <div class="w-33 text-right">
                                    {{ $t("exchange.time") }}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="(item, index) in tradeList" :key="index">
                            <td style="display:block;width:100%">
                                <div class="w-33" :style="{color : item.color}">{{ item.price }}</div>
                                <div class="w-33 text-right">{{ item.amount }}</div>
                                <div class="w-33 text-right">{{ item.time }}</div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <!-- <div class="tab-pane fade" id="market-depth" role="tabpanel">
                <div class="depth-chart-container">
                    <div class="depth-chart-inner">
                        <div id="lightDepthChart"></div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</div>
</template>

<script>

import Market from "@/api/market";

export default {

    // props : ["priceDecimals", "qtyDecimals"],
    props:[
        'priceCny'
    ],
    data() {
        return this.$parent;
    },

    computed: {
        langs(){
            return localStorage.getItem('lang')||'en'
        },
        reversed() {
            // 按给定值 倒序排列
            if (this.buyList && this.buyList.length) return this.buyList;
            else return [];

        },

        changeRate() {

            // 开盘价为0时 则返回0值
            if (!this.marketInfo || !this.marketInfo.open) return `+0.00%`;

            let val = Math.division(
                Math.subtr(this.newTrade.price, this.marketInfo.open),
                this.marketInfo.open);

            // 补充+号
            let sign = val >= 0 ? '+' : '';
            let percentage = `${sign}${Math.multiple(val, 100, 2)}%`;

            return percentage;

        },

        tradeList() {

            let count = 0;

            // 处理第1~(n-1)条记录，第一条永远显示绿色
            if (this.trade && this.trade.length) {

                return this.trade.sort((m, n) => {

                    let dm = Number(m.price),
                        dn = Number(n.price);

                    if (dn >= dm) {
                        n.color = "#53b987";
                        n.changeRate = 1;
                    } else {
                        n.color = "#ff231f";
                        n.changeRate = -1;
                    }

                    n.price = Math.omitTo(n.price, this.priceDecimals);
                    n.amount = Math.omitTo(n.amount, this.qtyDecimals);
                    n.time = Date.parseTime(n.ts, false, "{h}:{i}:{s}");

                    // 处理最后一个值
                    if (++count == this.trade.length - 1) {
                        m.color = "#53b987";
                        m.changeRate = 1;
                        m.price = Math.omitTo(m.price, this.priceDecimals);
                        m.amount = Math.omitTo(m.amount, this.qtyDecimals);
                        m.time = Date.parseTime(m.ts, false, "{h}:{i}:{s}");
                    }
                });
            } else {
                return this.trade;
            }
        }

    },

    methods: {

        // 计算深度 当前数量 / 买卖最大值
        getValue(amount) {
            const arr = this.buyList.concat(this.sellList).map(item => item.amount);
            let max = Math.max(...arr);
            return Math.division(amount, max, 2) * 100;
        },

        // 将委托价带入交易控制面板中
        handleOrder(price, ordertype) {
            // 修改父组件的order
            if (this.passOrderPrice) {
                this.buyorder.entrust_price = Math.omitTo(price, this.priceDecimals);
                this.sellorder.entrust_price = Math.omitTo(price, this.priceDecimals);
            }
        },

        // 测试方法 用于progress传入值
        format(item) {
            return function (percentage) {
                return `<span>${Math.omitTo(item.price, this.priceDecimals)}</span>
                        <span>${Math.omitTo(item.qty, this.qtyDecimals)}</span>
                        <span>${Math.multiple(item.price, item.qty, this.priceDecimals)}</span>`;
            }
        },

        bookTrades() {
            Market.getBooks(this.symbol).then(response => {
                // 
                this.sellList = response.sellList.sort((a, b) => b.price - a.price);
                this.buyList = response.buyList;
                this.trade = response.tradeList;

            }).catch(err => {

            });
        }


    },

    mounted() {
        // 在mounted中重置初始化的[]值，如果在created之前的话 []会覆盖ajax查询的值
        this.bookTrades();
    },
    
}
</script>

<style lang="scss">
.w-33 {
    width: 32% !important;
    display: inline-block !important;
    vertical-align: text-top !important;
    box-sizing: border-box !important;
}

.buy-orders {

    height: 235px !important;
    overflow: hidden !important;

    td {
        @include ff(OpenSans-Regular);
    }

}

.sell-orders {

    @extend .buy-orders;

    @include flexible(column-reverse, flex-start, flex-start, wrap);

    // flex-shrink: 0; // 不压缩 
    display: flex !important;
    overflow-x: hidden; // 重要 换行后 隐藏右侧内容

}

.order-item {

    position: relative;
    z-index: 1;
    width: 100%;
    height: 39px;

    .progress {
        height: 100%;
        border-radius: 0;
        background: none;
    }

    .tb-cells {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        z-index: 100;
        cursor: pointer;

        &:hover {
            background: none;

        }
    }

    // 给外边框添加不同的底色
    &:nth-child(even) .progress .el-progress-bar__outer {
        background: #F8F8FF;
        // background: #f6f8f9;

    }

    &:nth-child(odd) .progress .el-progress-bar__outer {
        background: #ffffff;
    }
}

.el-progress {

    .el-progress-bar {

        /**重构progress的背景色 */
        .el-progress-bar__outer {

            // 去除外表框的圆角
            border-radius: 0 !important;
            // background: #fff;

            .el-progress-bar__inner {

                border-radius: 0 !important;

                right: 0; // 将进度容器由左对齐变成右对齐
                left: auto;

                &::after {}
            }

        }
    }
}

.trade-list {
    tbody {
        height: 279px;

        tr {

            // @include flexible();
            // td:nth-last-child {
            //     flex-grow: 1;
            // }
            td {
                cursor: text !important;
            }
        }
    }
}

#darkDepthChart,
#lightDepthChart {
    height: 305px;
}
</style>
<style lang="scss" scoped>
.ob-heading {
    border: 1px solid #333;
    box-shadow: 0 0 5px #555;
}
</style>
