import Datafeeds from "./Datafees.js";
import Socket from './Socket.js'
import servlet from './servlet.js';
// import { resolveConfig } from "prettier";
// import { resolveConfig } from "prettier";


// import
class Model {

    /**
     * 初始化模型
     * @param {mixed} ws socket请求的url或者一个已经存在的socket对象
     * @param {Object} sub_params socket订阅的参数
     * @param {Object} unsub_params 取消订阅的参数
     */
    constructor(link, view) {

        this.socket = new Socket(link);
        this.view = view;

        // 用于订阅数据
        this.sub_msg; // 订阅标签 用于鉴定返回message 固定格式 'label_id_interval'
        this.marketId;


        // 用于生成图表
        this.symbol;    // 请求商品
        this.interval;  // 请求周期
        this.ticker;    // 商品唯一标识

        this.priceDecimals; // 价格精度

        // 缓存用于K线的历史记录数据
        this.cacheData = []; // 
        this.lastTime = null; // 最后一条数据的创建日期

        this.getBarTimer = null;
        this.isLoading = true;

        this.datafeeds = new Datafeeds(this); // 数据模型的接口
        this.widget; // td实例对象
        this.getHistoryCallback; // ajax取记录的回调函数
        this.onRealtimeCallback;

    }

    /**
     * 生成图表库 支持初始化订阅 也可以手动在外部订阅，但订阅必须先于图标库
     * @param {Object} optionals 图表初始化配置
     * @param {Object|Array} sub_params 初始化订阅参数 可选值
     */
    init(optionals, extenals = null) {
        if (extenals) {
            if (extenals.constructor == Function) { // 获取历史记录
                this.getHistoryCallback = extenals;
            } else if (extenals.constructor == Object) { // 初始化订阅信息
                this.subscribe(extenals);
            }
        }

        // 写入全局
        this.symbol = optionals.symbol;
        // 初始化设置interval 后期从订阅参数中取
        this.interval = optionals.interval;
        this.ticker = this.symbol.concat('_', this.interval);
        this.priceDecimals = optionals.priceDecimals;

        // 写入动态配置 覆盖默认配置
        const settings = {
            datafeed: this.datafeeds // 传入的api对象
        }

        Object.keys(optionals).forEach(key => {
            if (optionals[key]) settings[key] = optionals[key];
        })

        // 接收数据值
        this.socket.on('message', this.handleMessage.bind(this));

        // 创建tv组件
        this.widget = new TradingView.widget(servlet(settings));

    }

    /**
     * 发起订阅新的数据
     * @param {Array|Object} sub_params 所有订阅参数
     */
    subscribe(sub_params) {

        // 将订阅参数 写入全局，别计算分时
        if (sub_params instanceof Array) {
            this.sub_msg = sub_params.find(item => item.cmd == "sub").msg
        } else {
            this.sub_msg = sub_params.msg;
        }

        this.sendMessage(sub_params);
    }

    sendMessage(data) {
        // debugger
        console.log(">>>>>>>>>>" + JSON.stringify(data));

        // 已经open状态
        if (this.socket.checkOpen()) this.socket.send(data);
        else {
            // 先open 再send
            this.socket.on('open', (evt) => {
                this.socket.send(data);
            })
        }
    }

    unSubscribe() {
        this.sendMessage(this.sub_params);
    }

    // 处理历史数据和动态更新的数据
    handleMessage(response) {

        // if (response.sub != "history" && response.sub != "dynamic") return;

        let { data = null, sub = null, type = null } = response;

        // 答复连接 
        if (type == "ping") {
            this.sendMessage({
                cmd: "pong"
            });
            return;
        }

        // 严格匹配返回的订阅内容
        if (sub === this.sub_msg) {

            if (type == "history") {
                // console.log("<<<<<<<<<History");
                let list = [];
                for (let item of data) {
                    list.push({
                        time: item.id * 1000,
                        open: item.open,
                        high: item.high,
                        low: item.low,
                        close: item.close,
                        volume: item.amount
                    })
                }

                // 缓存数据
                this.cacheData[this.ticker] = list;

                // 记录最新时间 1595423640 1595423580
                this.lastTime = list[list.length - 1].time;

            } else if (type == "dynamic") {

                // 最新的数据值
                // console.log('<<<<<<<<<New');
                // 检测是否已经加载历史数据
                if (!this.lastTime) return;
                else {
                    // debugger
                    // console.log(data.id * 1000, data.id * 1000 - this.lastTime, data.close);

                }
                // this.datafeeds.barsUpdater.updateData();
                const barsData = {
                    time: data.id * 1000,
                    open: data.open,
                    high: data.high,
                    low: data.low,
                    close: data.close,
                    volume: data.amount
                };

                // if (barsData.time >= this.lastTime && this.cacheData[this.ticker] && this.cacheData[this.ticker].length) {
                //     // 更新最后一条记录
                //     // this.cacheData[this.ticker][this.cacheData[this.ticker].length - 1] = barsData
                //     this.onRealtimeCallback(barsData);
                // }
                if (barsData.time >= this.lastTime) {
                    // 更新最后一条记录
                    this.lastTime = barsData.time;
                    this.onRealtimeCallback(barsData);
                }
            }
        }

    }

    getConfig() {
        console.log("Model.getConfig");
        return {
            // supports_search: true,
            supports_group_request: true,
            // 支持的周期数组，周期可以是数字或字符串。
            // 如果周期是一个数字，它被视为分钟数。
            supported_resolutions: ['1', '5', '15', '30', '60', 'D', 'W', 'M'],
            supports_marks: true, // 是否在K线上显示标记
            supports_timescale_marks: true,
        };
    }

    // 切换交易对方法
    setSymbol(symbolName) {

        this.symbol = symbolName;
        this.ticker = this.symbol.concat('_', this.interval);
        this.widget.setSymbol(symbolName, this.interval);

    }

    // 切换分时的方法
    setResolution(resolution, callback) {
        
        this.ticker = this.symbol.concat('_', resolution);
        this.widget.chart().setResolution(resolution, callback);
        
    }

    getSymbol(symbolName) {// 小写的交易对名称
        
        // 1、查找已有精度值
        let priceDecimals = this.priceDecimals || this.view.priceDecimals;

        let pms,
            base = {
                'name': symbolName, // 用于请求数据
                // 这个商品的交易所时区
                'timezone': 'Asia/Shanghai',
                // 最小波动
                'minmov': 1,
                'minmov2': 0,
                'pointvalue': 1,
                'fractional': false,
                // 设置周期
                'session': '24x7',
                'has_intraday': true,
                'has_no_volume': false,
                // 设置是否支持周月线
                "has_daily": true,
                // 设置是否支持周月线
                "has_weekly_and_monthly": true,
                "has_empty_bars": true,
                // 唯一标识符，如果您指定此属性，则其值将用于所有数据请求
                'ticker': this.ticker,
                //'supported_resolutions': ['1', '5', '15', '30', '60', '240', '1D', '5D', '1W', '1M']
            };

        // 2、还没获取到价格精度
        if (!priceDecimals && this.view.getSymbol) { 

            pms = this.view.getSymbol().then(data => {
                
                return (Object.assign({
                    // 商品说明 将被打印在图表的标题栏中
                    'description': data.pair_name,
                    // 设置精度 100表示保留两位小数 1000三位 10000四位
                    'pricescale': Math.pow(10, data.price_decimals),
                }, base));
            });

        } else { // 已经获取到价格精度
            pms = Promise.resolve(Object.assign({
                // 商品说明 将被打印在图表的标题栏中
                'description': symbolName.toUpperCase(),
                // 设置精度 100表示保留两位小数 1000三位 10000四位
                'pricescale': Math.pow(10, priceDecimals),
            }, base))
        }

        return pms;

    }


    getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback) {

        console.log("Model.getHistory");

        if (this.getHistoryCallback instanceof Function) { // ajax加载

            // 通过图表动作 切换分时 需要同步数据和分时值
            if (this.interval !== resolution) {
                // 需要转化resolute为实际的订阅interval
                this.interval = resolution;
            }

            this.getHistoryCallback((data, lastTime) => {
                this.lastTime = lastTime;
                // 过滤筛选数据
                const ret = [];
                data.forEach(item => {
                    // 取得该时间内的记录
                    if (item.time >= rangeStartDate * 1000 && item.time <= rangeEndDate * 1000) {
                        ret.push(item);
                    }
                });

                onLoadedCallback(ret);
            })
        } else { // websocket加载 

            // 通过图表动作 切换分时 需要同步数据和分时值
            if (this.interval !== resolution) {

                // 需要转化resolute为实际的订阅interval
                this.interval = resolution;
                let period = this.translateInterval2Period(this.interval);

                // 重新订阅所有数据 在cache缓存中控制过滤
                this.subscribe([{
                    cmd: "unsub",
                    msg: `Kline_${symbolInfo.name}_${period}`
                }, {
                    cmd: "req",
                    msg: `Kline_${symbolInfo.name}_${period}`
                }, {
                    cmd: "sub",
                    msg: `Kline_${symbolInfo.name}_${period}`
                }]);
            }

            if (this.cacheData[this.ticker] && this.cacheData[this.ticker].length) {
                // 已取得数据
                this.isLoading = false;
                const ret = [];
                this.cacheData[this.ticker].forEach(item => {
                    // 取得该时间内的记录
                    if (item.time >= rangeStartDate * 1000 && item.time <= rangeEndDate * 1000) {
                        ret.push(item);
                    }
                });
                onLoadedCallback(ret);

            } else { // 重新加载数据
                this.getBarTimer = setTimeout(() => {
                    this.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback)
                }, 1000)
            }
        }


    }

    // 订阅新的数据
    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
        this.onRealtimeCallback = onRealtimeCallback;
    }

}

export default Model;