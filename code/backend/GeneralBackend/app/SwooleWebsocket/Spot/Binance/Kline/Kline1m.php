<?php

namespace App\SwooleWebsocket\Spot\Binance\Kline;

use App\SwooleWebsocket\Spot\Binance\Kline;

class Kline1m extends Kline
{
    public static $periods = [
        '1m' => ['period' => '1min', 'seconds' => 60],
    ];
}
