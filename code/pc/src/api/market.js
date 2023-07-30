import server from './server'

class Market {

    /**
     * 轮播图列表
     * @param {Object} data 
     * @param {int} type  请求类型 1是pc(默认) 2是app
     * @param {int} position  位置 1(币币首页) 2(预留扩展)
    */
    static cryptocurrenciesWithdrawal(type, position) {

        return server.post(`/market/banner/${type}/${position}`, data);

    }

    /**
     * 用户收藏交易对信息 需要先登录
     */
    static userFavList() {

        return server.get(`/coin/market/collection/list`);

    }


    static blogCategoryList() {
        return server.get(`/blogCategory/list`);
    }

    static blogDetailList(categoryId, params) {
        return server.get(`/blog/list/${categoryId}`, { params });
    }

    static blogDetailContent(id) {
        return server.get(`/blog/detail/${id}`);
    }

    // 初始化查询市场行情
    static getMarketList() {
        return server.get(`/exchange/getMarketList`);
    }

    // 初始化买卖盘数据
    static getBooks(symbol) {
        return server.get(`/exchange/getMarketInfo?symbol=${symbol}`);
    }

    // 币种信息
    static getCoinInfo(params) {
        return server.get(`/exchange/getCoinInfo`,{ params });
    }

}

export default Market;