<?php

$api->group(['namespace' => 'V1'], function ($api) {
    $api->post('user/subscribe','UserWalletController@subscribe');//申购
    $api->post('user/subscribeTokenList','UserWalletController@subscribeToken_list');//申购集合
    $api->any('user/chargeEth','UserWalletController@charge_eth');//测试生成充值eth
    $api->any('user/tradingPairCurrency','UserWalletController@trading_pair_currency');//交易对币种

});




$api->group(['namespace' => 'V1','middleware'=>'auth.api'], function ($api) {
    $api->post('user/recharge','UserWalletController@recharge');//用户充币
    $api->post('user/rechargeDispose','UserWalletController@recharge_dispose');//用户处理
    $api->post('user/depositHistory','UserWalletController@deposit_history');//用户充币记录
    $api->post('user/withdraw','UserWalletController@withdraw')->middleware(['checkTopAuth']);//用户提币
    $api->post('user/withdrawDispose','UserWalletController@withdraw_dispose');//用户提币处理
    $api->post('user/withdrawalRecord','UserWalletController@withdrawal_record');//用户提币记录
    $api->post('user/walletImage','UserWalletController@wallet_image')->middleware(['checkWalletAddress']);//钱包充币二维码
    $api->post('user/transferRecord','UserWalletController@transfer_record');//钱包资金划转记录
    $api->post('user/subscribeRecords','UserWalletController@subscribe_records');//申购记录
    $api->post('user/fundsTransfer','UserWalletController@funds_transfer');//钱包资金划转
    $api->post('user/sustainableAccount','UserWalletController@sustainable_account');//永续资金账户
    $api->post('user/fundAccount','UserWalletController@fund_account')->middleware(['checkUserWallet','checkOtcAccount']);//资金账户
    
    $api->any('user/rechargeManualLog', 'UserWalletController@recharge_manual_log'); //手动充值记录
    $api->post('user/rechargeManualPost', 'UserWalletController@recharge_manual_post'); //手动充值提交
    $api->any('user/paypal', 'UserWalletController@paypal'); //Paypal配置获取

    $api->post('user/personalAssets','UserWalletController@personal_assets')->middleware(['checkUserWallet']);//个人资产
    $api->post('user/tokenList','UserWalletController@token_list');//所有币集合
    $api->post('user/withdrawalBalance','UserWalletController@withdrawal_balance');//币种资产
    $api->post('user/withdrawalAddressManagement','UserWalletController@withdrawal_address_management');//提币地址管理
    $api->post('user/withdrawalAddressDeleted','UserWalletController@withdrawal_address_deleted');//提币地址删除
    $api->post('user/withdrawalAddressAdd','UserWalletController@withdrawal_address_add');//提币地址添加
    $api->post('user/withdrawalAddressModify','UserWalletController@withdrawal_address_modify');//提币地址修改
    $api->post('user/withdrawalSelectAddress','UserWalletController@withdrawal_select_address');//提币选择地址



    $api->post('user/subscribeNow','UserWalletController@subscribe_now');//立即申购
    $api->post('user/subscribeAnnounceResults','UserWalletController@subscribe_announce_results');//申购公布结果

    $api->post('user/applicationForListing','UserWalletController@application_for_listing');//上币申请
    $api->post('user/marketTokenAdd','UserWalletController@market_token_add');//市场币种添加

    $api->post('user/testDemo','UserWalletController@test_demo');//测试生成钱包地址


    $api->post('exchange/orderPlacement','PerpetualContractController@order_placement'); //下单委托
    $api->post('exchange/currentCommission','PerpetualContractController@current_commission'); //当前委托
    $api->post('exchange/contractPosition','PerpetualContractController@contract_position'); //持仓信息
    $api->post('exchange/getCurrentBalance','PerpetualContractController@get_current_balance'); //当前合约币种余额
    $api->post('exchange/historicalCommission','PerpetualContractController@historical_commission'); //历史委托
    $api->post('exchange/cancelOrder','PerpetualContractController@cancel_order'); //撤单
    $api->post('exchange/bulkCancellation','PerpetualContractController@bulk_cancellation'); //批量撤单

    $api->post('user/createWalletAddress','UserWalletController@create_wallet_address');//生成钱包地址
    $api->post('user/appDepositHistory','UserWalletController@app_deposit_history');//app用户充币记录
    $api->post('user/appWithdrawalRecord','UserWalletController@app_withdrawal_record');//app用户提币记录
    $api->post('user/appTransferRecord','UserWalletController@app_transfer_record');//app钱包资金划转记录
    $api->post('user/appFundsTransfer','UserWalletController@app_funds_transfer');//app钱包资金划转
    $api->post('user/appTokenAssets','UserWalletController@app_token_assets');//app当前币种余额总额冻结
    $api->post('user/collectionType','UserWalletController@collection_type');//支付方法
    $api->post('user/legal-buy-sell','UserLegalController@buy_sell')->middleware(['checkTopAuth']);//OTC买和卖
    $api->post('user/legal-order-list','UserLegalController@order_list')->middleware(['checkTopAuth']);//OTC订单列表
    $api->post('user/legal-unit-price','UserLegalController@unit_price')->middleware(['checkTopAuth']);//OTC币种价格
    $api->post('user/legal-order-status','UserLegalController@order_status')->middleware(['checkTopAuth']);//OTC法币订单状态
    
    //矿机
     $api->get('user/machine','Machine@machine_list')->middleware(['checkKuangAccount']);;//矿机列表
     $api->get('user/machine_details','Machine@machine_details');//矿机详情
     $api->post('user/machine_buy','Machine@machine_buy');//购买矿机
});

