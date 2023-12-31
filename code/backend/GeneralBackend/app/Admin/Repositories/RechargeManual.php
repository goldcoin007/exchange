<?php
/*
 * @Author: your name
 * @Date: 2021-06-03 11:55:37
 * @LastEditTime: 2021-08-09 17:43:58
 * @LastEditors: GuaPi
 * @Description: In User Settings Edit
 * @FilePath: \server\app\Admin\Repositories\RechargeManual.php
 */

namespace App\Admin\Repositories;

use App\Models\RechargeManual as Model;
use Dcat\Admin\Repositories\EloquentRepository;

class RechargeManual extends EloquentRepository
{
    /**
     * Model.
     *
     * @var string
     */
    protected $eloquentClass = Model::class;
}
