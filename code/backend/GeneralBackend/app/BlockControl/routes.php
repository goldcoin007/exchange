<?php
/*
 * @Descripttion: 
 * @version: 
 * @Author: GuaPi
 * @Date: 2021-07-29 10:40:49
 * @LastEditors: GuaPi
 * @LastEditTime: 2021-08-09 17:39:40
 */

use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;
use Dcat\Admin\Admin;

Admin::routes();

Route::group([
    'prefix'        => config('block-control.route.prefix'),
    'namespace'     => config('block-control.route.namespace'),
    'middleware'    => config('block-control.route.middleware'),
], function (Router $router) {

    $router->get('/', 'HomeController@index');

    $router->resource('contract-risk', 'ContractRiskController');

    // 控盘行情
    $router->resource('kline-robot', 'KlineRobotController');
    $router->get('generateKline', 'KlineRobotController@generateKline');
    $router->get('kline', 'KlineRobotController@kline');
    $router->get('kline-data', 'KlineRobotController@kline_data');
    $router->post('kline-save', 'KlineRobotController@kline_save');
    $router->get('getKlineConfig', 'KlineRobotController@getKlineConfig');
});
