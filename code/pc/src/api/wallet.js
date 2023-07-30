
import server from './server';

class Wallet {
 
    // paypal账号
    static paypal() {
        return server.get(`/user/paypal`);
    }
    // 提币记录
    static withdrawalRecord() {
        return server.post(`/user/withdrawalRecord`);
    }

    // PayPal支付
    static rechargeManualPost(data) {
        return server.post(`/user/rechargeManualPost`, data);
    }
    // PayPal充值记录
    static rechargeManualLog() {
        return server.post(`/user/rechargeManualLog`);
    }

    // 充值记录
    static depositHistory() {
        return server.post(`/user/depositHistory`);
    }

    // 钱包划转记录
    static transferRecord() {
        return server.post(`/user/transferRecord`);
    }
    // 申购记录
    static subscribeRecords() {
        return server.post(`/user/subscribeRecords`);
    }

    // 个人资产管理
    static personalAssets() {
        return server.post(`/user/personalAssets`);
    }

    // 各个币种的资产
    static fundAccount(data) {
        return server.post(`/user/fundAccount`, data);
    }

    // 代币以及对应的余额
    static tokenList(data) {
        return server.post(`/user/tokenList`, data);
    }

    // 资金划转
    static fundsTransfer(data) {
        return server.post(`/user/fundsTransfer`, data);
    }

    // 生成充值地址
    static walletImage(data) {
        return server.post(`/user/walletImage`, data);
    }

    // 提交充值
    static recharge(data) {
        return server.post(`/user/recharge`, data);
    }

    // 提交提币
    static withdraw(data) {
        return server.post(`/user/withdraw`, data);
    }

    // 提币地址管理
    static getUserWithdrawAdress(data) {
        return server.post(`/user/withdrawalAddressManagement`, data);
    }
    
    // 编辑提币地址
    static editUserWithdrawAdress (data) {
        return server.post(`/user/editUserAdress`, data);
    }

    // 删除提币地址
    static delUserWithdrawAdress() {
        return server.post(`/user/withdrawalAddressManagement`, data);
    }

    // 添加提币地址
    static addUserWithdrawAdress(data) {
        return server.post(`/`, data);
    }

    static withdrawalSelectAddress() {
        return server.post(`/user/withdrawalSelectAddress`);
    }

    static addWithdrawAddress(data) {
        return server.post(`/user/withdrawalAddressAdd`, data);
    }


    // 查询币种余额
    static withdrawalBalance(data) {
        return server.post(`/user/withdrawalBalance`, data);
    }

    // 修改用户地址
    static withdrawalAddressModify(data) {
        return server.post(`/user/withdrawalAddressModify`, data);
    }

    // 删除币种地址
    static withdrawalAddressDeleted(data) {
        return server.post(`/user/withdrawalAddressDeleted`, data);
    }
    // 生成钱包地址
    static createWalletAddress() {
        return server.post(`/user/createWalletAddress`);
    }

     // 获取转换列表
     static accounts(data){
        return server.get(`/wallet/accounts`, {params:data})
    }
    // 获取子账户类别
    static accountPairList(data){
        return server.get('/wallet/accountPairList',{params:data})
    }
    // 获取转换币种列表
    static coinList(data){
        return server.get('/wallet/coinList',{params:data})
    }
    // 获取余额
    static getBalance(data){
        return server.get('/wallet/getBalance',{params:data})
    }
    // 资金划转
    static transfer(data){
        return server.post('/wallet/transfer',data)
    }
    // 合约资金列表
    static accountList(data){
        return server.get('/contract/accountList',{params:data})
    }
    // 合约资金流水
    static accountFlow(data){
        return server.get('/contract/accountFlow',{params:data})
    }
    // 撤销订单
    static cancelWithdraw(data){
        return server.post('/user/cancelWithdraw ',data,{loading:true})
    }
}

export default Wallet;