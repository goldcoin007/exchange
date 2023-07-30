import server from './server';
class Otc {
    static userPayment(data) {
        return server.get(`/userPayment`,{params:data},{loading:true});
    }
    static editUserPayment(data) {
        return server.post(`/userPayment/${data.id}`,data,{loading:true});
    }
    static getUserPayment(data) {
        return server.post(`/userPayment/${data.id}`,{},{loading:true});
    }
    static addUserPayment(data) {
        return server.post(`/userPayment`,data,{loading:true});
    }
    static otcTicker(){
        return server.get(`/otc/otcTicker`,{});
    }
    static tradingEntrusts(data){
        return server.get(`/otc/tradingEntrusts`,{params:data},{loading:true})
    }
    static storeEntrust(data){
        return server.post(`/otc/storeEntrust`,data,{loading:true})
    }
    static storeOrder(data){
        return server.post(`/otc/storeOrder`,data,{loading:true})
    }
    static myEntrusts(data){
        return server.get(`/otc/myEntrusts`,{params:data},{loading:true})
    }
    static myOrders(data){
        return server.get(`/otc/myOrders`,{params:data},{loading:true})
    }
    static cancelEntrust(data){
        return server.post(`/otc/cancelEntrust`,data,{loading:true})
    }
    static cancelOrder(data){
        return server.post(`/otc/cancelOrder`,data,{loading:true})
    }
    static confirmPaidOrder(data){
        return server.post(`/otc/confirmPaidOrder`,data,{loading:true})
    }
    static confirmOrder(data){
        return server.post(`/otc/confirmOrder`,data,{loading:true})
    }
    static notConfirmOrder(data){
        return server.post(`/otc/notConfirmOrder`,data,{loading:true})
    }
    static orderDetail(data){
        return server.get(`/otc/orderDetail`,{params:data},{loading:true})
    }
    static otcAccount(data){
        return server.get(`/otc/otcAccount`,{params:data},{loading:true})
    }

    static legalBuy(data){
        return server.post(`/user/legal-buy-sell`,data)
    }
    static legalPrice(data){
        return server.post(`/user/legal-unit-price`,data)
    }
}

export default Otc;