<?php

namespace App\SwooleWebsocket\Swap\Binance\Kline;

use App\SwooleWebsocket\Swap\Binance\Kline;

class Kline1m extends Kline
{
    public static $periods = [
        '1m' => ['period' => '1min', 'seconds' => 60],
    ];
}
