import server from './server'

class Exchange {

    // 获取账户余额
    static getUserBalance(symbol) {
        return server.get(`exchange/getUserCoinBalance?symbol=${encodeURIComponent(symbol)}`);
    }

    // 提交订单
    static storeEntrust(data) {
        return server.post(`/exchange/storeEntrust`, data);
    }

    // 获取币种基本信息
    static getSymbolInfo(data) {
        return server.post(`/user/tradingPairCurrency`, data);
    }

    // 查询最新资讯
    static newTrends(limit) {
        return server.get(`/marketDynamics?limit=${limit}`);
    }

    // 获取汇率
    static getCurrencyExCny(data){
        return server.get('/market/getCurrencyExCny',{params:data})
    }
}

export default Exchange;