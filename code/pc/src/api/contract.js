import server from './server'

class Contract {

    /**
     * 下委托单
     * @param {Object} data
    */
    static add(data) {
        return server.post(`/futuresOrders/add`, data);
    }

    static getMarketInfo(data) {
        return server.get(`/contract/getMarketInfo`, {params:data})
    }

    /**
     * 获取合约市场
    */
    static getMarketList(data) {
        return server.get('/contract/getMarketList', {params:data})
    }

    /**
     * 获取合约账户信息
    */
    static contractAccount(data) {
        return server.get('/contract/contractAccount', {params:data,config:{loading:false}})
    }

    /**
     * 获取合约详情
    */
    static getSymbolDetail(data) {
        return server.get('/contract/getSymbolDetail', {params:data})
    }
    /**
     * 可开张数(合约上限)
     * */
    static openNum(data) {
        return server.get('/contract/openNum', {params:data,config:{loading:false}})
    }
    /**
     * 合约开仓
    */
    static openPosition(data, config) {
        return server.post('/contract/openPosition', data, config)
    }

    // 获取合约持仓
    static holdPosition(data, config) {
        return server.get('/contract/holdPosition', {params:data,config} )
    }
    // 合约平仓
    static closePosition(data, config) {
        return server.post('/contract/closePosition', data, config)
    }
    // 一键全平
    static closeAllPosition(data, config) {
        return server.post('/contract/closeAllPosition', data, config)
    }
    // 获取当前合约委托
    static getCurrentEntrust(data, config) {
        return server.get('/contract/getCurrentEntrust', {params:data}, config)
    }
    // 撤单
    static cancelEntrust(data, config) {
        return server.post('/contract/cancelEntrust', data, config)
    }
    // 历史委托
    static getHistoryEntrust(data, config) {
        return server.get('/contract/getHistoryEntrust', {params:data}, config)
    }
    // 获取k线数据
    static getKline(data, config) {
        return server.get('/contract/getKline', {params:data}, config)
    }
    // 获取委托明细
    static getEntrustDealList(data, config) {
        return server.get('/contract/getEntrustDealList', {params:data}, config)
    }
    // 获取开通状态
    static openStatus() {
        return server.get('/contract/openStatus')
    }
    //  开通永续合约
    static opening() {
        return server.post('/contract/opening')
    }
    // 止盈止损
    static setStrategy(data){
        return server.post('/contract/setStrategy',data)
    }
     // 一键全平
    static onekeyAllFlat(data){
        return server.post('/contract/onekeyAllFlat',data,{loading:true})
    }
    // 一键反向
    static onekeyReverse(data){
        return server.post('/contract/onekeyReverse',data,{loading:true})
    }
}

export default Contract;