import server from './server'

console.dir(server);
class Assets {
    /**
     * 数字货币提现
     * @param {Object} data 
    */
    static cryptocurrenciesWithdrawal(data) {

        return server.post(`/withdraw/cryptocurrenciesWithdrawal`, data);
        
    }



    /**
     * assets页面
     * @param {Object} data 
    */
    static assets(data) {

        return server.post(`/userCoin/assets`, data);

    }


    /**
     * assets页面
     * @param {Object} data 
    */
    static getAllList(data) {

        return server.get(`coin/getAllList`, data);

    }

    /**
     * 币币用户历史委托
     * @param {Object} data 
    */
    static history(data) {

        return server.post(`/coin/orders/history`, data);

    }

    /**
     * 资金划转记录
     * @param {Object} data 
    */
    static fundsTransferRecordPageList(data) {

        return server.post(`/fundsTransferRecord/pageList`, data);

    }

    /**
     * 资金划转
     * @param {Object} data 
    */
    static transfer(data) {

        return server.post(`/userCoin/transfer`, data);

    }

    /**
     * 数字货币充值
     * @param {int} params 
    */
    static cryptocurrenciesRecharge(coinId) {

        return server.get(`/recharge/cryptocurrenciesRecharge/${coinId}`);

    }

    /**
     * 数字货币充值记录
     * @param {Object} data 
    */
    static cryptocurrenciesRechargeRecords(data) {

        return server.post(`/recharge/cryptocurrenciesRechargeRecords`, data);

    }


    /**
     * 用户数字货币提现记录
     * @param {Object} data 
    */
    static cryptocurrenciesWithdrawRecords(data) {

        return server.post(`/withdraw/cryptocurrenciesWithdrawRecords`, data);

    }

    /**
     * 删除提现地址
     * @param {Object} data 
    */
    static deleteById(data) {

        return server.post(`/withdrawAddress/deleteById`, data);

    }

    /**
     * 编辑提现地址
     * @param {Object} data 
    */
    static editById(data) {

        return server.post(`/withdrawAddress/editById`, data);

    }

    /**
    * 移除添加地址
    * @param {Object} data 
   */
    static addRemove(data) {

        return server.post(`/withdrawAddress/addOrRemoveWhiteList`, data);

    }


    /**
     * 提现地址分页列表
     * @param {Object} data 
    */
    static pageList(data) {

        return server.post(`/withdrawAddress/pageList`, data);

    }


    /**
     * 添加提现地址
     * @param {Object} data 
    */
    static save(data) {

        return server.post(`/withdrawAddress/save`, data);

    }


    /**
     * 费率列表(手续费)
     * @param {Object} data 
    */
    static getList(data) {

        return server.get(`/transferFee/getList`, data);

    }

    /**
     * 用户合约资金
     * @param {Object} data 
    */
    static contractsAccount(data) {

        return server.get(`/futuresUserCoin/contractsAccount`, data);

    }
    /**
     * 用户合约资金(详情)
     * @param {number} accountId 
    */
    static contractsAccountDetail(accountId) {

        return server.get(`/futuresUserCoin/contractsAccountDetail/${accountId}`);

    }

    /**
     * 用户资金历史记录
     * @param {Object} data 
    */
    static transactionHistory(data) {

        return server.post(`/futuresUserCoin/transactionHistory`, data);

    }
    /**
         * 确认是否白名单地址
         * @param {Object} data 
        */
    static checkIsWhiteList(data) {

        return server.post(`/withdrawAddress/checkIsWhiteList`, data);

    }

    /**
         * 用户已实现盈亏列表
         * @param {Object} data 
        */
    static realisedPnlLog(data) {

        return server.post(`/realisedPnlLog/list`, data);

    }

    /**
        * 定期宝列表
        * @param {Object} data 
    */
    static financeList(data) {

        return server.post(`/finance/list`, data);

    }
    /**
        * 理财订单列表
        * @param {Object} data 
    */
    static financeOrderList(data) {

        return server.post(`/finance/order/list`, data);

    }
    /**
        * 定期宝列表
        * @param {Object} data 
    */
    static financeApply(data) {

        return server.post(`/finance/apply`, data);

    }
    /**
        * 定期理财账户资产
        * @param {Object} data 
    */
    static financeAccount(data) {

        return server.post(`/finance/account`, data);

    }



}

export default Assets;