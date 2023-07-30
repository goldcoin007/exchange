<?php
/*
 * @Descripttion: 
 * @version: 
 * @Author: GuaPi
 * @Date: 2021-07-29 10:40:49
 * @LastEditors: GuaPi
 * @LastEditTime: 2021-08-07 00:06:14
 */

return [
    // HTTP 请求的超时时间（秒）
    'timeout' => 5.0,

    // 默认发送配置
    'default' => [
        // 网关调用策略，默认：顺序调用
        'strategy' => \Overtrue\EasySms\Strategies\OrderStrategy::class,

        // 默认可用的发送网关
        'gateways' => [
            'smsbao',
        ],
    ],
    // 可用的网关配置
    'gateways' => [
        'errorlog' => [
            'file' => '/tmp/easy-sms.log',
        ],
        'chuanglan' => [
            'account' => env('MSG_ACCOUNT'),
            'password' => env('MSG_PASSWORD'),
            'intel_account' => env('INTEL_MSG_ACCOUNT', ''),
            'intel_password' => env('INTEL_MSG_PASSWORD', ''),
            'channel'  => \Overtrue\EasySms\Gateways\ChuanglanGateway::CHANNEL_VALIDATE_CODE,

            // 会员营销通道 特定参数。创蓝规定：api提交营销短信的时候，需要自己加短信的签名及退订信息
            'sign' => env('MSG_SIGN'),
            'unsubscribe' => '回TD退订',
        ],
        'smsbao' => [
            'user' => env('MSG_ACCOUNT'),
            'password' => env('MSG_PASSWORD'),
        ]
    ],
];
