<template>
<div class="col-md-8">

    <!-- 生成K线图 -->
    <k-line :symbol="symbol" :marketId="marketId" :priceDecimals="priceDecimals"></k-line>

    <!-- 交易处理 -->
    <div class="market-trade">
        <ul class="nav nav-pills">
            <li class="nav-item">
                <a href :class="[`nav-link`, {active:!isCondition&&!isMarket}]" @click.prevent="isCondition=false;isMarket=false;">Limit</a>
            </li>
            <li class="nav-item">
                <a href :class="[`nav-link`, {active:!isCondition&&isMarket}]" @click.prevent="isCondition=false;isMarket=true;">Market</a>
            </li>
            <li class="nav-item">
                <a href :class="[`nav-link`, {active:isCondition&&!isMarket}]" @click.prevent="isCondition=true;isMarket=false;">Stop Limit</a>
            </li>
            <li class="nav-item">
                <a href :class="[`nav-link`, {active:isCondition&&isMarket}]" @click.prevent="isCondition=true;isMarket=true;">Stop Market</a>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane fade show active">
                <div class="d-flex justify-content-between">
                    <!------------- Buy Order -------------->
                    <div class="market-trade-buy">

                        <!-- Trigger Price  -->
                        <el-popover popper-class='popover-tips' placement="top-start" trigger="manual" v-model="visibles.buy.trigger">
                            <span class="content">
                                <i class="el-icon-warning-outline"></i>
                                {{ msgList.buy[0] }}
                            </span>
                            <div class="input-group" v-if="isCondition" slot="reference">
                                <input type="number" v-model="buyorder.trigger_price" class="form-control" placeholder="请输入触发价格">
                                <div class="input-group-append">
                                    <span class="input-group-text">{{pair.from}}</span>
                                </div>
                            </div>
                        </el-popover>

                        <template v-if="isMarket">
                            <div class="input-group">
                                <!-- Market Price  -->
                                <input type="text" class="form-control" disabled placeholder="在最佳市场价格成交">
                            </div>
                        </template>
                        <template v-else>
                            <el-popover popper-class='popover-tips' placement="top-start" trigger="manual" v-model="visibles.buy.limitPrice">
                                <span class="content">
                                    <i class="el-icon-warning-outline"></i>
                                    {{ msgList.buy[1] }}
                                </span>
                                <div class="input-group" slot="reference">
                                    <!-- Entrust Price  -->
                                    <input type="number" v-model="buyorder.entrust_price" class="form-control" placeholder="请输入价格">
                                    <div class="input-group-append">
                                        <span class="input-group-text">{{pair.from}}</span>
                                    </div>
                                </div>
                            </el-popover>
                        </template>

                        <!-- Amount/Total  -->
                        <template v-if="isMarket">
                            <el-popover popper-class='popover-tips' placement="top-start" trigger="manual" v-model="visibles.buy.marketTotal">
                                <span class="content">
                                    <i class="el-icon-warning-outline"></i>
                                    {{ msgList.buy[3] }}
                                </span>
                                <div class="input-group" slot="reference">
                                    <input type="number" v-model="buyTotal" class="form-control" min=0 placeholder="请输入总值">
                                    <div class="input-group-append">
                                        <span class="input-group-text">{{pair.to}}</span>
                                    </div>
                                </div>
                            </el-popover>
                        </template>
                        <template v-else>
                            <el-popover popper-class='popover-tips' placement="top-start" trigger="manual" v-model="visibles.buy.limitAmount">
                                <!-- 提示框的内容 -->
                                <span class="content">
                                    <!-- 图标 -->
                                    <i class="el-icon-warning-outline"></i>
                                    <!-- 提示 -->
                                    {{ msgList.buy[2] }}
                                </span>
                                <div class="input-group" slot="reference">
                                    <input type="number" v-model="buyorder.amount" class="form-control" min=0 placeholder="请输入数量">
                                    <div class="input-group-append">
                                        <span class="input-group-text">{{pair.to}}</span>
                                    </div>
                                </div>
                            </el-popover>
                        </template>

                        <!-- Percent -->
                        <ul class="market-trade-list">
                            <li v-for="(item,index) in percentage" :key="index" :class="{buyPercentActive:index == buyPercentIndex}" @click="renderBuyAmount(item.value, index)">
                                <a href="javascript:void 0">{{ item.label }}</a>
                            </li>
                        </ul>

                        <!-- Total -->
                        <el-popover popper-class='popover-tips' placement="top-start" trigger="manual" v-model="visibles.buy.orderTotal">
                            <span class="content">
                                <i class="el-icon-warning-outline"></i>
                                {{ msgList.buy[5] }}
                            </span>
                            <p slot="reference">
                                {{$t('exchange.order-total')}}:
                                <span> <b>{{buyTotal}}</b> {{pair.from}} </span>
                            </p>
                        </el-popover>

                        <!-- Available -->
                        <p>{{$t('otc.j3')}}:
                            <span> {{toBalance}} {{pair.to}}</span><br />
                            <span> {{fromBalance}} {{pair.from}}</span>
                        </p>
                        <button class="btn buy" @click="handleBuyOrder">Buy {{pair.to}}</button>
                    </div>

                    <!------------ Sell Order ----------->
                    <div class="market-trade-sell">
                        <el-popover popper-class='popover-tips' placement="top-start" trigger="manual" v-model="visibles.sell.trigger">
                            <span class="content">
                                <i class="el-icon-warning-outline"></i>
                                {{ msgList.sell[0] }}
                            </span>
                            <!-- Trigger Price  -->
                            <div class="input-group" v-if="isCondition" slot="reference">
                                <input type="number" v-model="sellorder.trigger_price" class="form-control" min=0 placeholder="请输入触发价格">
                                <div class="input-group-append">
                                    <span class="input-group-text">{{pair.from}}</span>
                                </div>
                            </div>
                        </el-popover>

                        <template v-if="isMarket">
                            <div class="input-group">
                                <!-- Market Price  -->
                                <input type="text" class="form-control" disabled placeholder="在最佳市场价格成交">
                            </div>
                        </template>
                        <template v-else>
                            <el-popover popper-class='popover-tips' placement="top-start" trigger="manual" v-model="visibles.sell.limitPrice">
                                <span class="content">
                                    <i class="el-icon-warning-outline"></i>
                                    {{ msgList.sell[1] }}
                                </span>
                                <div class="input-group" slot="reference">
                                    <!-- Entrust Price  -->
                                    <input type="number" v-model="sellorder.entrust_price" class="form-control" min=0 placeholder="请输入价格">
                                    <div class="input-group-append">
                                        <span class="input-group-text">{{pair.from}}</span>
                                    </div>
                                </div>
                            </el-popover>
                        </template>

                        <!-- Amount  -->
                        <el-popover popper-class='popover-tips' placement="top-start" trigger="manual" v-model="visibles.sell.marketAmount">
                            <span class="content">
                                <i class="el-icon-warning-outline"></i>
                                {{ msgList.sell[4] }}
                            </span>
                            <div class="input-group" slot="reference">
                                <input type="number" v-model="sellorder.amount" class="form-control" min=0 placeholder="请输入数量">
                                <div class="input-group-append">
                                    <span class="input-group-text">{{pair.to}}</span>
                                </div>
                            </div>
                        </el-popover>

                        <ul class="market-trade-list">
                            <li v-for="(item,index) in percentage" :key="index" :class="{sellPercentActive:index == sellPercentIndex}" @click="renderSellAmount(item.value, index)">
                                <a href="javascript:void 0">{{ item.label }}</a>
                            </li>
                        </ul>

                        <!-- Total -->
                        <el-popover popper-class='popover-tips' placement="top-start" trigger="manual" v-model="visibles.sell.orderTotal">
                            <span class="content">
                                <i class="el-icon-warning-outline"></i>
                                {{ msgList.sell[5] }}
                            </span>
                            <p slot="reference">
                                {{$t('exchange.order-total')}}:
                                <span>
                                    <b>{{sellTotal}}</b> {{pair.from}} </span>
                            </p>
                        </el-popover>

                        <p>{{$t('otc.j3')}}:
                            <span> {{toBalance}} {{pair.to}} </span><br />
                            <span> {{fromBalance}} {{pair.from}}</span>
                        </p>
                        <button class="btn sell" @click="handleSellOrder">Sell {{pair.to}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import Exchange from "@/api/exchange";

export default {

    props: ["pair", "buyorder", "marketId", "sellorder", "fromBalance", "toBalance", "symbol", "newTrade", "minQty", "minTotal", "priceDecimals", "qtyDecimals"],
    data() {
        return {
            isMarket: false,
            isCondition: false,
            userBanlance: null,

            cacheTotal: 0, // 存放市价单输入的总值
            cachePrice: null, // 存放最新价格

            // 气泡弹框内容和触发
            visibles: {
                "buy": {
                    limitPrice: false, // 限制价格
                    limitAmount: false, // 限制数量
                    marketTotal: false, // 限制总额
                    marketAmount: false, // 市价数量
                    trigger: false, // 触发价格
                    orderTotal: false, // 订单总额
                },
                "sell": {
                    limitPrice: false,
                    limitAmount: false,
                    marketTotal: false,
                    marketAmount: false,
                    trigger: false,
                    orderTotal: false,
                },
            },
            msgList: {
                "buy": Array(6).fill(''), // 5个空字符串的数组
                "sell": Array(6).fill('')
            },
            // 百分比集合
            percentage: [{
                    label: "25%",
                    value: 0.25
                },
                {
                    label: "50%",
                    value: 0.5
                },
                {
                    label: "75%",
                    value: 0.75
                },
                {
                    label: "100%",
                    value: 1
                },
            ],
            // 
            buyPercentIndex: null,
            sellPercentIndex: null,
        }
    },

    computed: {

        // 获取type类型值
        type() {
            if (!this.isCondition) {
                return this.isMarket ? 2 : 1;
            } else {
                return this.isMarket ? 4 : 3;
            }
        },

        theme() {
            return localStorage.theme ? localStorage.theme : "light";
        },

        buyTotal: {
            get() {
                if (!this.isMarket) {
                    return Math.multiple(this.buyorder.entrust_price, this.buyorder.amount);
                } else {
                    return this.cacheTotal;
                }
            },
            set(val) {
                // 根据总值 计算数量
                if (!this.isMarket) {
                    this.buyorder.amount = Math.division(val, this.buyorder.entrust_price);
                } else { // 市价单 缓存总值
                    this.cacheTotal = val;
                }
            }
        },

        sellTotal: {
            get() {
                return Math.multiple(this.sellorder.entrust_price, this.sellorder.amount);
            }
        },

        // 当前语言
        lang() {
            let browser_Lang = navigator.language.includes('zh') ? 'zh' : 'en';
            return localStorage.lang || browser_Lang;
        },

    },

    watch: {
        custom(newVal) {
            console.log(newVal)
        },

        type() {
            // 切换订单类型时 清空价格和数量
            // 数量改变时 触发percentage更新
            this.reset();
        },

        // 有新交易时触发 给限价单设定初始价格
        newTrade(newVal, oldVal) {
            if (!this.isMarket) {

                // 新交易对有trade数据
                if (!oldVal && newVal) { // 没值到初始化值
                    // 修改order里面price的值 
                    this.cachePrice = newVal.price;
                    this.reset();
                }

                // 切换交易对时 清空了数据
                if (oldVal && !newVal) { // 有值到没值的过程
                    this.cachePrice = null;
                    this.reset();
                }
            }
        },
    },

    methods: {

        renderBuyAmount(val, index) {
            if (!this.buyorder.entrust_price) {
                this.visibles.buy.limitPrice = true;
                this.msgList.buy[1] = this.$t('nav.tips');
                this.clearAll();
                return;
            }
            this.buyPercentIndex = index;
            this.buyTotal = Math.multiple(this.fromBalance, val);
        },

        renderSellAmount(val, index) {
            if (!this.sellorder.entrust_price) {
                this.visibles.sell.limitPrice = true;
                this.msgList.sell[1] = this.$t('nav.tips');
                this.clearAll();
                return;
            }
            this.sellPercentIndex = index;
            this.sellorder.amount = Math.multiple(this.toBalance, val);
        },

        handleBuyOrder() {

            // 执行前端的有效性验证
            if (!this.chkValidate(this.buyorder, this.buyTotal, "buy")) return;

            const baseArgs = {
                symbol: this.symbol,
                type: this.type,
            };

            // 区分限价、市价和条件委托单
            // 1、限价单买入时 需要的参数：价格、数量、
            // 2、市价单买入时 需要的参数：总值
            // 3、条件单买入时 需要的参数：触发价、价格数量或者总值
            // 4、卖出时 需要价格和数量 
            Exchange.storeEntrust(Object.assign(this.buyorder, {
                total: this.buyTotal,
            }, baseArgs)).then(data => {
                // 触发父组件的方法 更新余额和订单
                this.$emit('update');
                // 清空表单
                this.reset();
            }).catch(err => {

            });
        },

        handleSellOrder() {
            // 执行前端的有效性验证
            if (!this.chkValidate(this.sellorder, this.sellTotal, "sell")) return;

            const baseArgs = {
                symbol: this.symbol,
                type: this.type,
            };
            Exchange.storeEntrust(Object.assign(this.sellorder, {
                total: this.sellTotal
            }, baseArgs)).then(data => {
                // 触发父组件的方法 更新余额和订单
                this.$emit('update');
                // 清空表单
                this.reset();
            }).catch(err => {

            });
        },

        reset() {

            // 如果没有newTrade时 则没有缓存价格 重置为最小值0
            // 由于输入框去除了精度空值 这里还需要手动设置精度值
            let price = this.cachePrice || 0;

            this.buyorder.entrust_price = Math.omitTo(price, this.priceDecimals);
            this.buyorder.trigger_price = Math.omitTo(price, this.priceDecimals);

            this.sellorder.entrust_price = Math.omitTo(price, this.priceDecimals);
            this.sellorder.trigger_price = Math.omitTo(price, this.priceDecimals);

            // 清空数量
            this.buyorder.amount = 0;
            this.sellorder.amount = 0;

            // total赋值会触发set方法
            // this.buyTotal = 0;
            // this.cacheTotal = 0;

            // 去除百分比样式
            this.buyPercentIndex = -1;
            this.sellPercentIndex = -1;
        },

        clearAll() {
            // 5s后统一清除提示框
            setTimeout(function () {
                Object.keys(this.visibles.buy).forEach(key => this.visibles.buy[key] = false);
                Object.keys(this.visibles.sell).forEach(key => this.visibles.sell[key] = false);
            }.bind(this), 5000);
        },

        empty(val) {
            let ret;
            switch (typeof val) {
                case "number":
                    ret = val == 0;
                    break;
                case "string":
                    ret = val == "0" || /^\s?$/.test(val);
                    break;
                case "boolean":
                    ret = val;
                    break;
                default:
                    ret = Boolean(val);
                    break;
            }
            return ret;
        },

        chkValidate(order, total, orderType) {
            let flag = true;
        
            switch (this.type) {

                case 1: // limit
                    if (this.empty(order.entrust_price)) {
                        flag = false;
                        this.visibles[orderType].limitPrice = true;
                        this.msgList[orderType][1] = this.$t('nav.a1');
                    } else if (this.empty(order.amount)) {
                        flag = false;
                        this.visibles[orderType].limitAmount = true;
                        this.msgList[orderType][2] = this.$t('nav.a2');
                    } else {
                        if (order.amount < this.minQty) {
                            flag = false;
                            this.visibles[orderType].limitAmount = true;
                            this.msgList[orderType][2] = this.$t('nav.a3')+`${this.minQty}`;
                        }

                        if (total < this.minTotal) {
                            flag = false;
                            this.visibles[orderType].orderTotal = true;
                            this.msgList[orderType][5] = this.$t('nav.b8')+`${this.minTotal}`;
                        }
                    }
                    break;

                case 2: // market
                    if (order.direction == "buy") { // 买
                        if (this.empty(total)) {
                            flag = false;
                            this.visibles[orderType].marketTotal = true;
                            this.msgList[orderType][3] = this.$t('nav.a4');
                        } else if (this.total < this.minTotal) {
                            flag = false;
                            this.visibles.marketTotal = true;
                            this.msgList[3] = this.$t('nav.a5')+`${this.minTotal}`;
                        }
                    }

                    if (order.direction == "sell") { // 卖
                        if (this.empty(order.amount)) {
                            flag = false;
                            this.visibles[orderType].marketAmount = true;
                            this.msgList[orderType][4] = this.$t('nav.a6');
                        } else if (order.amount < this.minQty) {
                            flag = false;
                            this.visibles[orderType].marketAmount = true;
                            this.msgList[orderType][4] = this.$t('nav.a7')+` ${this.minQty}`;
                        }
                    }
                    break;

                case 3: // stop-limit

                    if (this.empty(order.trigger_price)) {
                        flag = false;
                        this.visibles[orderType].trigger = true;
                        this.msgList[orderType][0] = this.$t('nav.a8')
                    } else if (this.empty(order.entrust_price)) {
                        flag = false;
                        this.visibles[orderType].limitPrice = true;
                        this.msgList[orderType][1] = this.$t('nav.a9')
                    } else if (this.empty(order.amount)) {
                        flag = false;
                        this.visibles[orderType].limitAmount = true;
                        this.msgList[orderType][2] = this.$t('nav.b1')
                    }
                    break;

                case 4: // stop-market
                    if (this.empty(order.trigger_price)) {
                        flag = false;
                        this.visibles[orderType].trigger = true;
                        this.msgList[orderType][0] = this.$t('nav.b2')
                    } else {

                        if (order.direction == "buy") {
                            if (this.empty(total)) {
                                flag = false;
                                this.visibles[orderType].marketTotal = true;
                                this.msgList[orderType][3] = this.$t('nav.b3')
                            } else if (total < this.minTotal) {
                                flag = false;
                                this.visibles[orderType].marketTotal = true;
                                this.msgList[orderType][3] = this.$t('nav.b5')+` ${this.minTotal}`
                            }
                        }

                        if (order.direction == "sell") {
                            if (this.empty(order.amount)) {
                                flag = false;
                                this.visibles[orderType].marketAmount = true;
                                this.msgList[orderType][4] = this.$t('nav.b6')
                            } else if (order.amount < this.minQty) {
                                flag = false;
                                this.visibles[orderType].marketAmount = true;
                                this.msgList[orderType][4] = this.$t('nav.b7')+` ${this.minQty}`
                            }
                        }

                    }
                    break;
            }

            // 清除所有样式
            this.clearAll();

            // 返回验证结果
            return flag;
        },

        
    },

    created() {

    },
    
}
</script>

<style lang="scss" scoped>
.buyPercentActive {
    a:link {
        font-weight: bold;
        background: #26a69a;
        color: #fff;
    }
}

.sellPercentActive {
    a:link {
        font-weight: bold;
        background: #ef5350;
        color: #fff;
    }
}

.input-group-text {
    width: 68px;
    @include flexible(row, center, center);
}
</style>
