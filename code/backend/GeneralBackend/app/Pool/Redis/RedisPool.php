<?php

namespace App\Pool\Redis;

use Swoole\Database\RedisPool as Pool;
use Swoole\Database\RedisConfig;
use Illuminate\Foundation\Application;
use PDO;

class RedisPool
{
    protected $app;

    protected $config;

    protected $pool;

    public function __construct(Application $app)
    {
        $this->app = $app;
        $this->config = $app->make("config");
        $this->init();
    }

    public function init()
    {
        $config = (new RedisConfig())
            ->withHost($this->config->get('database.redis.default.host'))
            ->withPort($this->config->get('database.redis.default.port'))
            ->withDbIndex(1)
            ->withAuth($this->config->get('database.redis.default.password'));
        $this->pool = new Pool($config, $this->config->get('database.redis.default.pool.size'));
    }
    public function get()
    {
        return $this->pool->get();
    }
    public function put($redis)
    {
        return $this->pool->put($redis);
    }
}
