// function _interopRequireDefault(obj) {
//     return obj && obj.__esModule ? obj : {
//         default: obj
//     }
// }

// function _classCallCheck(instance, Constructor) {
//     if (!(instance instanceof Constructor)) {
//         throw new TypeError("Cannot call a class as a function");
//     }
// }

import DataUpdater from './DataUpdater.js'

class Datafeeds {
    /**
     * JS API 传入一个datafeeds对象
     * @param {*Object} vue vue实例
     */
    constructor(model) {

        this.self = model;

        this.barsUpdater = new DataUpdater(this);

    }

    /**
     * @param {*Function} callback  回调函数
     * `onReady` should return result asynchronously.
     */
    onReady(callback) {
        return new Promise((resolve, reject) => {
            let configuration = {};
            // 在模型中配置
            if (this.self.getConfig)
                Object.assign(configuration, this.self.getConfig());

            resolve(configuration);

        }).then(configuration => callback(configuration));
    }

    /**
     * @param {*String} symbolName  商品名称或ticker 取得商品数据的唯一标识符
     * @param {*Function} onSymbolResolvedCallback 成功回调
     * @param {*Function} onResolveErrorCallback   失败回调
     * `resolveSymbol` should return result asynchronously.
     */
    resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
        
        return this.self.getSymbol(symbolName).then((symbolInfo) => {
            
            return onSymbolResolvedCallback(symbolInfo);
        }).catch((err) => {
            return onResolveErrorCallback(err);
        });

    }

    /**
     * 此方法在更新symbol和interval时会触发两次，第一次取历史数据，第二次取新数据 新数据钩子函数会返回执行
     * symbol和interval的更新方式分别如下：
     * + 图表动作setSymbol()主动设置，或者图表内搜索时反馈symbol
     * + 点击分时按钮或者下拉时反馈interval 通过该方法也可以获取
     * @param {Object} symbolInfo  商品信息对象
     * @param {String} resolution  分辨率
     * @param {Number} rangeStartDate  时间戳、最左边请求的K线时间
     * @param {Number} rangeEndDate    时间戳、最右边请求的K线时间
     * @param {Function} onHistoryCallback 回调函数
     * @param {Function} onErrorCallback   回调函数
     */
    getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onHistoryCallback, 
        onErrorCallback, firstDataRequest) {
        // debugger;
        if (firstDataRequest) { // 第一次取历史记录
            // model的getBars方法返回结果 包含两个值 bars和meta
            this.self.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, function (data) {
                if (data.length) {
                    const bars = data;
                    onHistoryCallback(bars);
                } else {
                    const meta = {
                        noData: true, // 没有数据
                        nextTime: Date.now(), // 下一个K线柱的时间
                    };
                    onHistoryCallback(null, meta);
                }
            });
        } else { // 取新数据
            this.subscribeBars();
        }

    }

    /**
     * 订阅K线数据。图表库将调用onRealtimeCallback方法以更新实时数据
     * @param {Object} symbolInfo 商品信息
     * @param {String} resolution 分辨率
     * @param {Function} onRealtimeCallback 回调函数
     * @param {String} subscriberUID 监听的唯一标识符
     * @param {Function} onResetCacheNeededCallback
     * (从1.7开始): 将在bars数据发生变化时执行
     */
    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
        // debugger;
        this.self.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback);
    }

    /**
     * 取消订阅K线数据
     * @param {*String} subscriberUID 监听的唯一标识符
     */
    unsubscribeBars(subscriberUID) {
        this.barsUpdater.unsubscribeBars(subscriberUID);
    }
}

export default Datafeeds;