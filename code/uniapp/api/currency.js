import Serve from '@/api/serve'

class Currency {
    // 获取平台收款方式列表
        static legalPayList() {
            return Serve.post(`/collection/legalPayList`);
        }
        //用户收款地址列表
        static paymentsList() {
            return Serve.post(`/user/paymentsList`);
        }
        //法币交易创建订单
        static legalCurrency(data) {
            return Serve.post(`/user/legalCurrency`,data);
        }
        //法币交易订单列表
        static legalList(data) {
            return Serve.post(`/user/legalList`,data);
        }
        //法币交易订单详情
        static legalInfo(data) {
            return Serve.post(`/user/legalInfo`,data);
        }
        //用户收款地址编辑
        static paymentsSubmit(data) {
            return Serve.post(`/user/paymentsSubmit`,data);
        }
        //订单确认支付/收款/取消
        static legalPay(data) {
            return Serve.post(`/user/legalPay`,data);
        }
        //用户收款方式详情
        static paymentsInfo(data) {
            return Serve.post(`/user/paymentsInfo`,data);
        }
        //用户收款方式开启关闭
        static paymentsStatus(data) {
            return Serve.post(`/user/paymentsStatus`,data);
        }
}

export default Currency;