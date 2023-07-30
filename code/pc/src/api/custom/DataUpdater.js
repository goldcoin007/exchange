/**
 * 数据更新器
 * 通过更新器触发datafeeds的getBars实时更新图表数据
 */
class DataUpdater {

    constructor(datafeeds) {
        // 存放所有订阅的新记录
        this.subscribers = {};
        this.requestsPending = 0;
        this.historyProvider = datafeeds;
    }

    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID) {
        // 存入订阅者数据
        this.subscribers[subscriberUID] = {
            lastBarTime: null,
            listener: onRealtimeCallback,
            resolution,
            symbolInfo
        }
    }

    unsubscribeBars(subscriberUID) {
        delete this.subscribers[subscriberUID];
    }

    updateData() {
        
        if (this.requestsPending) return;

        for (let subscriberUID in this.subscribers) {
            this.requestsPending++;
            this.updateDataForSubscriber(subscriberUID).then(() => {
                return this.requestsPending--;
            }).catch(() => {
                return this.requestsPending--;
            });
        }

        // debugger;

    }

    updateDataForSubscriber(subscriberUID) {
        return new Promise((resolve, reject) => {
            var subscriptionRecord = this.subscribers[subscriberUID];
            var rangeEndTime = parseInt((Date.now() / 1000).toString());
            var rangeStartTime = rangeEndTime - this.periodLengthSeconds(subscriptionRecord.resolution, 10);
            this.historyProvider.getBars(subscriptionRecord.symbolInfo, subscriptionRecord.resolution, rangeStartTime, rangeEndTime, (bars) => {
                this.onSubscriberDataReceived(subscriberUID, bars);
                resolve();
            }, () => {
                reject();
            });
        });
    }

    onSubscriberDataReceived(listenerGuid, bars) {
        if (!this.subscribers.hasOwnProperty(listenerGuid)) return;
        if (!bars.length) return;
        var lastBar = bars[bars.length - 1];
        var subscriptionRecord = this.subscribers[listenerGuid];
        if (subscriptionRecord.lastBarTime !== null && lastBar.time < subscriptionRecord.lastBarTime) return;
        var isNewBar = subscriptionRecord.lastBarTime !== null && lastBar.time > subscriptionRecord.lastBarTime;
        if (isNewBar) {
            if (bars.length < 2) {
                throw new Error('Not enough bars in history for proper pulse update. Need at least 2.');
            }

            var previousBar = bars[bars.length - 2];
            subscriptionRecord.listener(previousBar);
        }

        subscriptionRecord.lastBarTime = lastBar.time;
        subscriptionRecord.listener(lastBar);
    }

    // 周期转化成秒
    periodLengthSeconds(resolution, requiredPeriodsCount) {
        let daysCount = 0;
        switch (resolution.toUpperCase()) {
            case 'D' : 
            case '1D' : 
                daysCount = requiredPeriodsCount;
                break;
            case 'M' :
            case '1M' : 
                daysCount = 31 * requiredPeriodsCount;
                break;
            case 'W' :
            case '1W' :
                daysCount = 7 * requiredPeriodsCount;
                break;
            default : 
                daysCount = requiredPeriodsCount * parseInt(resolution) / (24 * 60);
                break;
        }
        return daysCount * 24 * 60 * 60;
    }

}

export default DataUpdater;