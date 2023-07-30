
import Serve from '@/api/serve'

class Wallet {
 
    // 提币记录
    static withdrawalRecord() {
        return Serve.post(`/user/withdrawalRecord`);
    }
    // PayPal支付
    static rechargeManualPost(data) {
        return Serve.post(`/user/rechargeManualPost`, data);
    }
    // PayPal账号
    static paypal() {
        return Serve.get(`/user/paypal`);
    }
    // PayPal支付记录
    static rechargeManualLog(data) {
        return Serve.post(`/user/rechargeManualLog`,data);
    }
    // 充值记录
    static depositHistory(data) {
        return Serve.post(`/user/depositHistory`,data);
    }

    // 钱包划转记录
    static transferRecord() {
        return Serve.post(`/user/transferRecord`);
    }
    // 申购记录
    static subscribeRecords() {
        return Serve.post(`/user/subscribeRecords`);
    }
    // 个人资产管理
    static personalAssets() {
        return Serve.post(`/user/personalAssets`);
    }

    // 各个币种的资产
    static fundAccount(data) {
        return Serve.post(`/user/fundAccount`, data);
    }

    // 代币以及对应的余额
    static tokenList(data) {
        return Serve.post(`/user/tokenList`, data);
    }

    // 资金划转
    static fundsTransfer(data) {
        return Serve.post(`/user/appFundsTransfer`, data);
    }

    // 生成充值地址
    static walletImage(data) {
        return Serve.post(`/user/walletImage`, data);
    }

    // 提交充值
    static recharge(data) {
        return Serve.post(`/user/recharge`, data);
    }

    // 提交提币
    static withdraw(data) {
        return Serve.post(`/user/withdraw`, data);
    }

    // 提币地址管理
    static getUserWithdrawAdress(data) {
        return Serve.post(`/user/withdrawalAddressManagement`, data);
    }
    
    // 编辑提币地址
    static editUserWithdrawAdress (data) {
        return Serve.post(`/user/editUserAdress`, data);
    }

    // 删除提币地址
    static delUserWithdrawAdress(data) {
        return Serve.post(`/user/withdrawalAddressManagement`, data);
    }

    // 添加提币地址
    static addUserWithdrawAdress(data) {
        return Serve.post(`/`, data);
    }

    static withdrawalSelectAddress() {
        return Serve.post(`/user/withdrawalSelectAddress`);
    }

    static addWithdrawAddress(data) {
        return Serve.post(`/user/withdrawalAddressAdd`, data);
    }


    // 查询币种余额
    static withdrawalBalance(data) {
        return Serve.post(`/user/withdrawalBalance`, data);
    }

    // 修改用户地址
    static withdrawalAddressModify(data) {
        return Serve.post(`/user/withdrawalAddressModify`, data);
    }

    // 删除币种地址
    static withdrawalAddressDeleted(data) {
        return Serve.post(`/user/withdrawalAddressDeleted`, data);
    }
    // 资金余额
    static appTokenAssets(data){
        return Serve.post(`/user/appTokenAssets`,data)
    }
    // 指定币种划转记录
    static appTransferRecord(data){
        return Serve.post(`/user/appTransferRecord`,data)
    }
    // 指定币种提币记录
    static appWithdrawalRecord(data){
        return Serve.post(`/user/appWithdrawalRecord`,data)
    }
    // 指定币种提币记录
    static appDepositHistory(data){
        return Serve.post(`/user/appDepositHistory`,data)
    }
    // 指定币种币币记录
    static getWalletLogs(data){
        return Serve.get(`/user/getWalletLogs`,data)
    }
     // 生成钱包地址
     static createWalletAddress() {
        return Serve.post(`/user/createWalletAddress`);
    }
     // 获取充币地址
    static collectionType(data) {
        return Serve.post(`/user/collectionType`, data)
    }
     // 获取转换列表
     static accounts(data){
        return Serve.get(`/wallet/accounts`, data)
    }
    // 获取子账户类别
    static accountPairList(data){
        return Serve.get('/wallet/accountPairList',data)
    }
    // 获取转换币种列表
    static coinList(data){
        return Serve.get('/wallet/coinList',data)
    }
    // 获取余额
    static getBalance(data){
        return Serve.get('/wallet/getBalance',data)
    }
    // 资金划转
    static transfer(data){
        return Serve.post('/wallet/transfer',data)
    }
    // 合约资金列表
    static accountList(data){
        return Serve.get('/contract/accountList',data)
    }
    // 合约资金流水
    static accountFlow(data){
        return Serve.get('/contract/accountFlow',data)
    }
    // 合约资金流水
    static cancelWithdraw(data){
        return Serve.post('/user/cancelWithdraw',data,{loading:true})
    }
}

export default Wallet;