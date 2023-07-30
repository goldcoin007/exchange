
import server from './server';

class Subscribe {
    /**
     * 请求数据
    */
    static subscribeTokenList(data){
        return server.post('/user/subscribeTokenList',data)
    }
    static activity(){
        return server.get('/subscribe/activity')
    }
   static subscribe(data){
       return server.post('/user/subscribe',data)
   }
    /**
     * 提交数据
     * @param {object} data
     * @param {string} data.amount
     * @param {string} data.coin_name
    */
   static subscribeNow(data){
        return server.post('/user/subscribeNow',data)
   }
    /**
        * 申购码
        * @param {Object} data 
    */
   static changePurchaseCode(data) {
        return server.post(`/user/changePurchaseCode`, data);
    }
}

export default Subscribe;