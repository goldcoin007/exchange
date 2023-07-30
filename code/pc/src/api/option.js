
import server from './server';

class Option {
    // 交易对
    static getOptionSymbol() {
        return server.get(`/option/getOptionSymbol`);
    }
    /**
     * 获取期权交割记录
     * @param {object} data
     * @param {string} data.pair_id
     * @param {string} data.time_id
    */
    static getSceneResultList(data) {
        return server.get(`/option/getSceneResultList`, {
            params: data
        })
    }
    /**
     * 获取k线数据
     * @param {object} data
     * @param {string} data.symbol
     * @param {string} data.period
     * @param {string} data.size
     * @param {string} data.form
     * @param {string} data.to
    */
    static getKline(data) {
        // let url =  `https://api.hadax.com/market/history/kline`;
        let url = `/option/getKline`; 
        return server.get(url, {
            params: data
        })
    }
    /**
     * 获取可用于期权交易的币种列表
    */
    static getBetCoinList() {
        return server.get(`/option/getBetCoinList`)
    }
    /**
   * 获取指定币种的余额
   * @param {object} data
   * @param {string} data.coin_id
  */
    static getUserCoinBalance(data) {
        return server.get(`/option/getUserCoinBalance`,{params:data})
    }
    /**
     * 获取当前最新期权场景
     * @param {object} data
     * @param {string} data.pair_id
     * @param {string} data.time_id
    */
    static sceneDetail(data) {
        return server.get(`/option/sceneDetail`, {
            params: data
        })
    }
    /**
     * 获取全部期权场景
    */
    static sceneListByPairs() {
        return server.get(`/option/sceneListByPairs`)
    }
    /**
     * 获取当前最新期权场景赔率
     * @param {object} data
     * @param {string} data.pair_id
     * @param {string} data.time_id
    */
    static getOddsList(data) {
        return server.get(`/option/getOddsList`,{
            params:data
        })
    }
    /**
     * 获取用户期权购买记录
     * @param {object} data
     * @param {string} data.status
     * @param {string} data.pair_id
     * @param {string} data.time_id
    */
    static getOptionHistoryOrders(data) {
        return server.get(`/option/getOptionHistoryOrders`,{params:data})
    }
    /**
     * 购买期权
     * @param {object} data
     * @param {string} data.bet_amount
     * @param {string} data.bet_coin_id
     * @param {string} data.odds_id
     * */ 
    static betScene(data){
        return server.post(`/option/betScene`,data)
    }
    /**
     * 获取交易价格组
     * @param {object} data
     * @param {string} data.symbol
     *  
    */ 
   static getNewPriceBook(data){
    return server.get('/option/getNewPriceBook',{
        params:data
    })
}
}

export default Option;