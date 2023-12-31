<?php

namespace App\Admin\Controllers;

use App\Models\Agent;
use App\Models\AgentGrade;
use App\Models\ContractEntrust;
use App\Models\Recharge;
use App\Models\SustainableAccount;
use App\Models\UserWallet;
use App\Models\UserWalletLog;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Dcat\Admin\Admin;
use Dcat\Admin\Http\Controllers\AdminController;
use Dcat\Admin\Widgets\Alert;

class ContractAnomalyController extends AdminController
{
    protected $title = '异常检测';

    public function statistics()
    {
        $grades = AgentGrade::getCachedGradeOption();
        $baseAgentIds = Agent::getBaseAgentIds(Admin::user()->id);
        $builder0 = SustainableAccount::query()->whereHas('user', function ($q) use ($baseAgentIds) {
            $q->where('is_system', 0)->whereIn('referrer', $baseAgentIds);
        });
        // 盈亏
        $builder1 = ContractEntrust::query()->whereHas('user', function ($q) use ($baseAgentIds) {
            $q->where('is_system', 0)->whereIn('referrer', $baseAgentIds);
        });
        // 手续费
        $builder2 = UserWalletLog::query()->where('rich_type', 'usable_balance')
            ->where('account_type', UserWallet::sustainable_account)
            ->whereHas('user', function ($q) use ($baseAgentIds) {
                $q->where('is_system', 0)->whereIn('referrer', $baseAgentIds);
            })
            ->whereIn('log_type', ['open_position_fee', 'close_position_fee', 'system_close_position_fee', 'cancel_open_position_fee']);
        // 资金费
        $builder3 = UserWalletLog::query()->where('rich_type', 'usable_balance')
            ->where('account_type', UserWallet::sustainable_account)
            ->whereHas('user', function ($q) use ($baseAgentIds) {
                $q->where('is_system', 0)->whereIn('referrer', $baseAgentIds);
            })
            ->where('log_type', 'position_capital_cost');
        // 转入
        $builder4 = UserWalletLog::query()
            ->where('rich_type', 'usable_balance')
            ->where('account_type', UserWallet::sustainable_account)
            ->where('log_type', 'fund_transfer')
            ->whereHas('user', function ($q) use ($baseAgentIds) {
                $q->where('is_system', 0)->whereIn('referrer', $baseAgentIds);
            })
            ->where('amount', '>', 0);
        // 转出
        $builder5 = UserWalletLog::query()
            ->where('rich_type', 'usable_balance')
            ->where('account_type', UserWallet::sustainable_account)
            ->where('log_type', 'fund_transfer')
            ->whereHas('user', function ($q) use ($baseAgentIds) {
                $q->where('is_system', 0)->whereIn('referrer', $baseAgentIds);
            })
            ->where('amount', '<', 0);
        // 合约扣款
        $builder6 = Recharge::query()
            ->where('type', 2)
            ->whereHas('user', function ($q) use ($baseAgentIds) {
                $q->where('is_system', 0)->whereIn('referrer', $baseAgentIds);
            })
            ->where('account_type', UserWallet::sustainable_account);

        $params = request()->only(array_merge($grades, ['user_id', 'created_at']));

        if (!empty($params)) {
            if (!empty($params['user_id'])) {
                $builder0->where('user_id', $params['user_id']);
                $builder1->where('user_id', $params['user_id']);
                $builder2->where('user_id', $params['user_id']);
                $builder3->where('user_id', $params['user_id']);
                $builder4->where('user_id', $params['user_id']);
                $builder5->where('user_id', $params['user_id']);
                $builder6->where('user_id', $params['user_id']);
            }
            if (!empty($params['created_at']) && !empty($params['created_at']['start'])) {
                $builder0->whereDate('created_at', '>=', $params['created_at']['start'])->whereDate('created_at', '<=', $params['created_at']['end']);
                $builder1->whereDate('created_at', '>=', $params['created_at']['start'])->whereDate('created_at', '<=', $params['created_at']['end']);
                $builder2->whereDate('created_at', '>=', $params['created_at']['start'])->whereDate('created_at', '<=', $params['created_at']['end']);
                $builder3->whereDate('created_at', '>=', $params['created_at']['start'])->whereDate('created_at', '<=', $params['created_at']['end']);
                $builder4->whereDate('created_at', '>=', $params['created_at']['start'])->whereDate('created_at', '<=', $params['created_at']['end']);
                $builder5->whereDate('created_at', '>=', $params['created_at']['start'])->whereDate('created_at', '<=', $params['created_at']['end']);
                $builder6->whereDate('created_at', '>=', $params['created_at']['start'])->whereDate('created_at', '<=', $params['created_at']['end']);
            }

            $lk = last(array_keys($grades));
            foreach ($grades as $k => $v) {
                $key = 'A' . ($k + 1);
                if ($k == $lk && !empty($params[$key])) {
                    $id = $params[$key];
                    $builder0->whereHas('user', function ($q) use ($id) {
                        $q->where('referrer', $id);
                    });
                    $builder1->whereHas('user', function ($q) use ($id) {
                        $q->where('referrer', $id);
                    });
                    $builder2->whereHas('user', function ($q) use ($id) {
                        $q->where('referrer', $id);
                    });
                    $builder3->whereHas('user', function ($q) use ($id) {
                        $q->where('referrer', $id);
                    });
                    $builder4->whereHas('user', function ($q) use ($id) {
                        $q->where('referrer', $id);
                    });
                    $builder5->whereHas('user', function ($q) use ($id) {
                        $q->where('referrer', $id);
                    });
                    $builder6->whereHas('user', function ($q) use ($id) {
                        $q->where('referrer', $id);
                    });
                } elseif (!empty($params[$key])) {
                    $ids = Agent::getBaseAgentIds($params[$key]);
                    $builder0->whereHas('user', function ($q) use ($ids) {
                        $q->whereIn('referrer', $ids);
                    });
                    $builder1->whereHas('user', function ($q) use ($ids) {
                        $q->whereIn('referrer', $ids);
                    });
                    $builder2->whereHas('user', function ($q) use ($ids) {
                        $q->whereIn('referrer', $ids);
                    });
                    $builder3->whereHas('user', function ($q) use ($ids) {
                        $q->whereIn('referrer', $ids);
                    });
                    $builder4->whereHas('user', function ($q) use ($ids) {
                        $q->whereIn('referrer', $ids);
                    });
                    $builder5->whereHas('user', function ($q) use ($ids) {
                        $q->whereIn('referrer', $ids);
                    });
                    $builder6->whereHas('user', function ($q) use ($ids) {
                        $q->whereIn('referrer', $ids);
                    });
                }
            }
        }

        $total_profit = $builder1->where('status', ContractEntrust::status_completed)->sum('profit');
        $total_fee = $builder2->sum('amount');
        $total_cost = $builder3->sum('amount');
        $total_in = $builder4->sum('amount');
        $total_out = $builder5->sum('amount');
        $total_charge = $builder6->sum('amount');

        $net_worth = $total_in + $total_out;
        $total_used_balance = $builder0->sum('used_balance');
        $total_freeze_balance = $builder0->sum('freeze_balance');
        $total_usable_balance = $builder0->sum('usable_balance'); // 实际总余额
        $total_theory_balance = PriceCalculate(($net_worth - abs($total_fee) - abs($total_cost) + $total_profit - $total_used_balance - $total_freeze_balance), '+', $total_charge, 8); // 理论总余额
        $total_anomaly = PriceCalculate($total_theory_balance, '-', $total_usable_balance, 8);

        $con = '<code>总转入：' . (float)abs($total_in) . 'USDT</code> ' . '<code>总转出：' . (float)abs($total_out) . 'USDT</code> ' . '<code>总手续费：' . (float)abs($total_fee) . 'USDT</code> ' . '<code>总资金费：' . (float)abs($total_cost) . 'USDT</code> ' . '<code>总盈亏：' . (float)$total_profit . 'USDT</code> ' . '<code>总异常资金：' . (float)$total_anomaly . 'USDT</code> ' . '<code>总实际余额：' . (float)$total_usable_balance . 'USDT</code> ' . '<code>总理论余额：' . (float)$total_theory_balance . 'USDT</code> ';
        return Alert::make($con, '统计')->info();
    }

    /**
     * 异常检测
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $baseAgentIds = Agent::getBaseAgentIds(Admin::user()->id);
        $sql = SustainableAccount::with(['user'])->whereHas("user", function ($q) use ($baseAgentIds) {
            $q->whereIn('referrer', $baseAgentIds);
        });
        return Grid::make($sql, function (Grid $grid) {
            $grid->model()->orderByDesc('user_id');

            #统计
            $grid->header(function ($query) {
                return $this->statistics();
            });

            $grid->column('id')->sortable();

            $grid->disableActions();
            $grid->disableCreateButton();
            $grid->disableRowSelector();

            $grid->column('user.referrer', 'A5')->display(function ($referrer) {
                $agent = Agent::query()->where('is_agency', 1)->where("id", $referrer)->first();
                if (blank($agent)) {
                    return '--';
                } else {
                    $parent = $agent->parent->parent->parent->parent;
                    return blank($parent) ? "--" : $parent['name'];
                }
            });
            $grid->column('user_id', 'UID');
            //            $grid->column('margin_name');

            $grid->column('contract_in', '转入')->display(function () {
                return UserWalletLog::query()
                    ->where('user_id', $this->user_id)
                    ->where('rich_type', 'usable_balance')
                    ->where('account_type', UserWallet::sustainable_account)
                    ->where('log_type', 'fund_transfer')
                    ->where('amount', '>', 0)
                    ->sum('amount');
            });
            $grid->column('contract_out', '转出')->display(function () {
                return UserWalletLog::query()
                    ->where('user_id', $this->user_id)
                    ->where('rich_type', 'usable_balance')
                    ->where('account_type', UserWallet::sustainable_account)
                    ->where('log_type', 'fund_transfer')
                    ->where('amount', '<', 0)
                    ->sum('amount');
            });
            $grid->column('contract_charge', '合约扣款')->display(function () {
                return Recharge::query()
                    ->where('user_id', $this->user_id)
                    ->where('type', 2)
                    ->where('account_type', UserWallet::sustainable_account)
                    ->sum('amount');
            });
            $grid->column('contract_fee', '手续费')->display(function () {
                return UserWalletLog::query()
                    ->where('user_id', $this->user_id)
                    ->where('rich_type', 'usable_balance')
                    ->where('account_type', UserWallet::sustainable_account)
                    ->whereIn('log_type', ['open_position_fee', 'close_position_fee', 'system_close_position_fee', 'cancel_open_position_fee'])
                    ->sum('amount');
            });
            $grid->column('contract_cost', '资金费')->display(function () {
                return UserWalletLog::query()
                    ->where('user_id', $this->user_id)
                    ->where('rich_type', 'usable_balance')
                    ->where('account_type', UserWallet::sustainable_account)
                    ->where('log_type', 'position_capital_cost')
                    ->sum('amount');
            });
            $grid->column('contract_profit', '盈亏')->display(function () {
                return ContractEntrust::query()
                    ->where('user_id', $this->user_id)
                    ->where('status', ContractEntrust::status_completed)
                    ->sum('profit');
            });

            $grid->column('used_balance', '持仓保证金');
            $grid->column('freeze_balance', '委托冻结');

            $grid->column('theory_balance', '理论余额')->display(function () {
                $net_worth = UserWalletLog::query()
                    ->where('user_id', $this->user_id)
                    ->where('rich_type', 'usable_balance')
                    ->where('account_type', UserWallet::sustainable_account)
                    ->where('log_type', 'fund_transfer')
                    ->sum('amount');
                $fee = UserWalletLog::query()
                    ->where('user_id', $this->user_id)
                    ->where('rich_type', 'usable_balance')
                    ->where('account_type', UserWallet::sustainable_account)
                    ->whereIn('log_type', ['open_position_fee', 'close_position_fee', 'system_close_position_fee', 'cancel_open_position_fee'])
                    ->sum('amount');
                $cost = UserWalletLog::query()
                    ->where('user_id', $this->user_id)
                    ->where('rich_type', 'usable_balance')
                    ->where('account_type', UserWallet::sustainable_account)
                    ->where('log_type', 'position_capital_cost')
                    ->sum('amount');
                $profit = ContractEntrust::query()
                    ->where('user_id', $this->user_id)
                    ->where('status', ContractEntrust::status_completed)
                    ->sum('profit');
                $charge = Recharge::query()
                    ->where('user_id', $this->user_id)
                    ->where('type', 2)
                    ->where('account_type', UserWallet::sustainable_account)
                    ->sum('amount');
                return PriceCalculate(($net_worth - abs($fee) - abs($cost) + $profit - $this->used_balance - $this->freeze_balance), '+', $charge, 8);
            });
            $grid->column('usable_balance', '实际余额')->sortable();

            $grid->column('anomaly_balance', '异常资金')->display(function () {
                $net_worth = UserWalletLog::query()
                    ->where('user_id', $this->user_id)
                    ->where('rich_type', 'usable_balance')
                    ->where('account_type', UserWallet::sustainable_account)
                    ->where('log_type', 'fund_transfer')
                    ->sum('amount');
                $fee = UserWalletLog::query()
                    ->where('user_id', $this->user_id)
                    ->where('rich_type', 'usable_balance')
                    ->where('account_type', UserWallet::sustainable_account)
                    ->whereIn('log_type', ['open_position_fee', 'close_position_fee', 'system_close_position_fee', 'cancel_open_position_fee'])
                    ->sum('amount');
                $cost = UserWalletLog::query()
                    ->where('user_id', $this->user_id)
                    ->where('rich_type', 'usable_balance')
                    ->where('account_type', UserWallet::sustainable_account)
                    ->where('log_type', 'position_capital_cost')
                    ->sum('amount');
                $profit = ContractEntrust::query()
                    ->where('user_id', $this->user_id)
                    ->where('status', ContractEntrust::status_completed)
                    ->sum('profit');
                $charge = Recharge::query()
                    ->where('user_id', $this->user_id)
                    ->where('type', 2)
                    ->where('account_type', UserWallet::sustainable_account)
                    ->sum('amount');
                return PriceCalculate(PriceCalculate(($net_worth - abs($fee) - abs($cost) + $profit - $this->used_balance - $this->freeze_balance), '+', $charge, 8), '-', $this->usable_balance, 8);
            });

            $grid->filter(function (Grid\Filter $filter) {
                $grades = AgentGrade::getCachedGradeOption();
                $lk = last(array_keys($grades));
                foreach ($grades as $k => $v) {
                    $key = 'A' . ($k + 1);
                    $next_key = 'A' . ($k + 2);

                    $agent_user = Admin::user();
                    $deep = $agent_user->deep + 1;
                    if ($k < $deep) continue;

                    if ($k == $deep) {
                        $options1 = Agent::query()->where(['deep' => $deep, 'is_agency' => 1, 'pid' => $agent_user->user_id])->pluck('username', 'id');
                        $filter->where($key, function ($q) {
                            $ids = Agent::getBaseAgentIds($this->input);
                            $q->whereHas('user', function ($q) use ($ids) {
                                $q->whereIn('referrer', $ids);
                            });
                        }, $v)->select($options1)->load($next_key, 'api/agents')->placeholder('请选择')->width(2);
                    } elseif ($k == $lk) {
                        $filter->where($key, function ($q) {
                            $id = $this->input;
                            $q->whereHas('user', function ($q) use ($id) {
                                $q->where('referrer', $id);
                            });
                        }, $v)->select()->placeholder('请选择')->width(2);
                    } else {
                        $filter->where($key, function ($q) {
                            $ids = Agent::getBaseAgentIds($this->input);
                            $q->whereHas('user', function ($q) use ($ids) {
                                $q->whereIn('referrer', $ids);
                            });
                        }, $v)->select()->load($next_key, 'api/agents')->placeholder('请选择')->width(2);
                    }
                }

                $filter->equal('user_id', 'UID')->width(2);
                $filter->whereBetween('created_at', function ($q) {
                }, "时间")->date()->width(4);
                $filter->where('is_anomaly', function ($q) {
                    $is_anomaly = $this->input == 1 ? 1 : 0;
                    $q->whereHas('user', function ($q) use ($is_anomaly) {
                        $q->where('is_anomaly', $is_anomaly);
                    });
                }, '异常')->select([0 => '正常', 1 => '异常'])->width(2);
            });
        });
    }
}
