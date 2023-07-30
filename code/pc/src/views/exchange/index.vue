<template>
<div>
    <div class="container-fluid mtb15 no-fluid">
        <div class="row sm-gutters">

            <!-- symbols -->
            <symbols :marketList="marketList" :marketId="marketId" :isLogin="isLogin" :symbol.sync="symbol"></symbols>

            <!-- kline  -->
            <make-deal :isLogin="isLogin" :pair="pair" :socket="ws.socket" :symbol="symbol" :buyorder="buyorder" :sellorder="sellorder" :fromBalance="fromBalance" :toBalance="toBalance" :newTrade="newTrade" :minQty="minQty" :minTotal="minTotal" :priceDecimals="priceDecimals" :qtyDecimals="qtyDecimals" @update="update"></make-deal>

            <!-- order book -->
            <book-trades :priceCny="price_cny"></book-trades>

            <!-- market news  -->
            <market-news></market-news>

            <!-- order list  -->
            <order-list ref="Order" :ordersOpen="ordersOpen" :conditionOrders="conditionOrders" :ordersHistory="ordersHistory" :priceDecimals="priceDecimals" :qtyDecimals="qtyDecimals" :isLogin="isLogin" :pair="pair" @change="currentTab = $event" @update="update"></order-list>

        </div>
    </div>
</div>
</template>

<script>
import Socket from '@/api/server/Socket.js';
import Market from '@/api/market.js';
import Exchange from "@/api/exchange";
import Order from "@/api/order"

export default {

    components: {
        "Symbols": () => import( /* webpackChunkName:"symbols" */ "./symbols"),
        "MakeDeal": () => import( /* webpackChunkName:"chart-deal" */ "./make-deal"),
        "BookTrades": () => import( /* webpackChunkName:"order-book" */ "./book-trades"),
        "MarketNews": () => import( /* webpackChunkName:"market-news" */ "./market-news"),
        "OrderList": () => import( /* webpackChunkName:"order-list" */ "./order-list")
    },

    beforeCreate() {

        this.ws = new Socket(`${this.Globals.Server.Path.WS}`);

    },

    data() {

        return {

            // `btcusdt` 不含`/`的小写
            symbol: this.$route.params.symbol || null,
            marketId: null,
            marketInfo: null, // 交易对基本信息
            pair: {
                from: '-',
                to: '-',
            },
            marketList: [], // 在symbol组件中 需要遍历 因此默认数组避免出错
            trade: [],
            newTrade: null,

            // 所有的数据 都统一按照价格从小到大排序
            buyList: [],
            sellList: [],

            // 初始化精度值和交易
            priceDecimals: 0,
            qtyDecimals: 0,
            minQty: 0,
            minTotal: 0,

            now: null,

            // 下单情况 可由orderbook跨页面定制
            buyorder: {
                trigger_price: '', // 触发价
                entrust_price: '', // 委托价
                amount: 0, // 数量
                direction: "buy", // 方向
            },

            sellorder: {
                entrust_price: '',
                trigger_price: '',
                amount: 0,
                direction: "sell",
            },

            // 从order传递price
            passOrderPrice: true,

            // 各种委托单
            ordersOpen: {
                total: 0,
            },

            ordersHistory: {
                total: 0,
            },

            conditionOrders: {
                total: 0,
            },

            // 用户钱包余额
            fromBalance: 0,
            toBalance: 0,

            // 当前页面socket
            // ws: null,

            // 是否开启交易密码
            transPwdEnabled: false,

            currentTab: "opens", // orders显示的tab
            price_cny:0
        }

    },

    computed: {

        // 当前语言
        lang() {
            let browser_Lang = navigator.language.includes('zh') ? 'cn' : 'en',
                lang = localStorage.lang || browser_Lang;
            return lang;
        },

        isLogin() {
            return Boolean(this.userAuth);
        },

        userAuth() {
            const auth = localStorage.getItem("auth");
            let ret = "";
            if (auth) {
                let {
                    memberId,
                    accessToken
                } = JSON.parse(auth);
                ret = `?${accessToken}&${memberId}`;
            }
            return ret;
        },

        userInfo() {
            if (this.isLogin) {
                return JSON.parse(localStorage.getItem("auth"));
            } else {
                return {
                    user_id : 0,
                };
            }
        }
    },

    watch: {
        // 切换symbol时更新路由 
        symbol(newVal, oldVal) {

            // 取消订阅 或者关闭连接 防止干扰下次值
            if (oldVal) this.unsub(oldVal);

            // 还原页面状态 避免造成数据值紊乱
            this.trade = [];
            this.sellList = [];
            this.buyList = [];
            this.newTrade = null;

            // 买卖单数据结构
            this.buyorder = {
                trigger_price: '',
                entrust_price: '',
                amount: 0,
                direction: "buy",
            };
            this.sellorder = {
                trigger_price: '',
                entrust_price: '',
                amount: 0,
                direction: "sell",
            };

            // 请求新的页面数据
            if (newVal) this.$router.push(`/exchange/${newVal}`);
        },

        marketInfo(newVal, oldVal) {
            if (newVal && !oldVal) { // 第一次取得marketInfo时 更新接口 主要针对刷新页面
                this.update();
            }
        },

        // 加载新页面 重新订阅所有数据
        $route( /*newRouter, oldRouter*/ ) {

            this.addSub();

            // 初始化market信息
            this.findMarketBySymbol();

            // 更新所有接口数据
            this.update();

        },

        currentTab() {
            // tab切换时自动更新
            this.getOrders();
        }
    },

    methods: {
        initMarket() {
            // 初始化订阅marketList数据
            this.ws.send({
                "cmd": "sub",
                "msg": 'exchangeMarketList',
            })
        },

        // 订阅当前的symbol
        addSub() {

            this.ws.send([{
                cmd: 'sub',
                msg: `sellList_${this.symbol}`
            }, {
                cmd: 'sub',
                msg: `buyList_${this.symbol}`
            }, {
                cmd: 'req',
                msg: `tradeList_${this.symbol}`
            }, {
                cmd: 'sub',
                msg: `tradeList_${this.symbol}`
            }]);

        },

        // 取消指定的symbol
        unsub(symbol) {

            this.ws.send([{
                cmd: 'unsub',
                msg: `sellList_${symbol}`
            }, {
                cmd: 'unsub',
                msg: `buyList_${symbol}`
            }, {
                cmd: 'unsub',
                msg: `tradeList_${symbol}`
            }]);

        },

        // 在交易列表中 查找当前id记录 并将行情信息写入全局
        // 以便在其他组件中 直接使用
        findMarketBySymbol() {

            let isKeep = true; // 退出外层循环的标识符

            for (let coin of this.marketList) {

                for (let market of coin.marketInfoList) {

                    // 查询交易对名称
                    if (market.symbol === this.symbol) {

                        // 转化pair为集合 便于提取
                        this.pair = {
                            to: market.coin_name, // 右币
                            from: coin.coin_name // 左币
                        };

                        // 创建marketId
                        this.marketId = market.pair_id;

                        // 写入market信息
                        this.marketInfo = market;

                        // 未有选定Tab时 默认一个now 后期从子组件中取
                        if (!this.now) this.now = coin.coin_name;

                        // 写入数据值精度 用来显示截取长度
                        this.priceDecimals = market.price_decimals;
                        this.qtyDecimals = market.qty_decimals;

                        // 下单时 需要验证最小数量和最小总值
                        this.minTotal = market.min_total;
                        this.minQty = market.min_qty;

                        isKeep = false;

                        // 终止内部循环
                        break;
                    }
                }

                // 终止外部循环
                if (!isKeep) break;
            }
        },

        getBalance() {
            
            if (this.isLogin) {

                Exchange.getUserBalance(this.marketInfo.pair_name).then(data => {

                    this.fromBalance = data[this.pair.from.toUpperCase()].usable_balance;
                    this.toBalance = data[this.pair.to.toUpperCase()].usable_balance;

                }).catch(err => {

                });
            }

        },

        // 更新接口数据
        update() {
            this.getBalance();
            this.getOrders();
            this.getCurrencyExCny();
        },
        // 获取汇率
        getCurrencyExCny(){
            if(!this.pair.from||this.pair.from=='-') return;
            Exchange.getCurrencyExCny({
                coin_name:this.pair.from
            }).then(res=>{
                this.price_cny = res.price_cny
            })
        },
        getOrders() {

            if (this.currentTab == "opens") { // 当前委托

                this.getOpens();

            } else if (this.currentTab == "conditions") { // 条件委托

                this.getConditions();

            } else if (this.currentTab == "histories") { // 历史委托

                this.getHistories();

            }

            // console.log("---订单更新成功---");

        },

        getOpens() {
            if (this.isLogin) {
                Order.getCurrentEntrust({
                    symbol: this.marketInfo.pair_name,
                }).then(data => {
                    this.ordersOpen = data
                }).catch(err => {
                    console.log(err)
                })
            }
        },

        getConditions() {
            if (this.isLogin) {
                Order.getConditionEntrust({
                    symbol: this.marketInfo.pair_name,
                }).then(data => {
                    this.conditionOrders = data;
                }).catch(err => {
                    console.log(err)
                })
            }
        },

        getHistories() {
            if (this.isLogin) {
                Order.getHistoryEntrust({
                        symbol: this.marketInfo.pair_name,
                    })
                    .then(data => {
                        this.ordersHistory = data;
                    })
                    .catch(err => {})
            }
        },
    },

    created() {

        this.ws.on("open", () => {
            // 连接成功后 初始化订阅市场信息
            this.initMarket();
            // 如果指定了id 订阅该行情的所有其他信息
            if (this.symbol) this.addSub();
        })

        this.ws.on("message", (response) => {

            let {
                data, // 返回数据
                sub, // 订阅标签
                type, // 返回类型
                msg, // 提示信息
                code, // 错误代号
            } = response;

            // 答复心跳 保持连接
            if (type == "ping") this.ws.send({
                type: "pong"
            });

            switch (sub) {

                case "exchangeMarketList":

                    this.marketList = data;

                    if (!this.symbol) { // 默认symbol 重新请求数据
                        this.symbol = _.nth(data).marketInfoList[0].symbol;
                    } else { // 找出该symbol对应的记录并更新页面
                        this.findMarketBySymbol();
                    }

                    break;

                case `buyList_${this.symbol}`:

                    this.buyList = data;
                    break;

                case `sellList_${this.symbol}`:

                    this.sellList = data;
                    break;

                case `tradeList_${this.symbol}`:
                    if (type == "history") { // 历史记录
                        this.trade = this.trade.concat(data);
                    } else if (type == "dynamic") { // 有更新就推送
                        this.trade.unshift(data);
                    }
                    // 最新交易 更新用于余额和订单记录
                    this.newTrade = _.nth(this.trade);
                    if (this.newTrade && this.newTrade.buy_user_id === this.userInfo.user_id || this.newTrade.sell_user_id == this.userInfo.user_id) this.update();
                    break;
            }
        });

        this.ws.on("close", () => {
            this.$message({
                type: "error",
                message: this.$t("nav.b8"),
                duration: 2000,
            });
        });
        if (this.symbol) this.getCurrencyExCny();
        // this.update();
    },

    mounted() {
        // if (this.symbol) this.update();
    },
}
</script>

<style>

</style>
