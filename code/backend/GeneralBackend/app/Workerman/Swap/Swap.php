<?php
/*
 * @Descripttion: 
 * @version: 
 * @Author: GuaPi
 * @Date: 2021-07-29 10:40:49
 * @LastEditors: GuaPi
 * @LastEditTime: 2021-08-02 22:52:59
 */


namespace App\Workerman\Swap;

use GatewayWorker\BusinessWorker;
use GatewayWorker\Gateway;
use GatewayWorker\Register;
use Workerman\Worker;

class Swap
{
    protected $serviceName = 'swap';

    public function start()
    {
        Worker::$pidFile = base_path() . '/storage/framework/workerman/swap.pid';

        $this->startGateWay();
        $this->startBusinessWorker();
        $this->startRegister();

        Worker::runAll();
    }

    private function startBusinessWorker()
    {
        $worker                  = new BusinessWorker();
        $worker->name            = $this->serviceName . 'BusinessWorker';
        $worker->count           = 4;
        $worker->registerAddress = '127.0.0.1:1238';
        $worker->eventHandler    = config("workerman.{$this->serviceName}.eventHandler");
    }

    private function startGateWay()
    {
        $context = array(
            // 更多ssl选项请参考手册 http://php.net/manual/zh/context.ssl.php
            'ssl' => array(
                // 请使用绝对路径
                'local_cert'                 => env('SSL_CERT', null), // 也可以是crt文件
                'local_pk'                   => env('SSL_PK', null),
                'verify_peer'                => false,
                // 'allow_self_signed' => true, //如果是自签名证书需要开启此选项
            )
        );
        $gateway = new Gateway("websocket://0.0.0.0:2348", $context);
        if (!empty(env('SSL_CERT')) && !empty(env('SSL_PK'))) {
            $gateway->transport = 'ssl';
        }
        // $gateway = new Gateway("websocket://0.0.0.0:2348");
        $gateway->name                 = $this->serviceName . 'Gateway';
        $gateway->count                = 2;
        $gateway->lanIp                = '127.0.0.1';
        $gateway->startPort            = 2308;
        $gateway->pingInterval         = 30;
        $gateway->pingNotResponseLimit = 1;
        $gateway->pingData             = '{"cmd":"ping"}';
        $gateway->registerAddress      = '127.0.0.1:1238';
    }

    private function startRegister()
    {
        new Register('text://0.0.0.0:1238');
    }
}
