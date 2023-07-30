
import ExchangeOrder from '@/views/order/exchange-order'; 
import OptionOrder from '@/views/order/option-order';
import SwapOrder from '@/views/order/swap-order';
import ForexOrder from '@/views/order/forex-order';

export default [
    {
        name: "exchange-order",
        path: "/order/exchange", // 现货委托
        component: ExchangeOrder
    },
    {
        name: "option-order",
        path: "/order/option", // 期权订单
        component: OptionOrder
    }, {
        name: "swap-order",
        path: "/order/contract/swap",   // 永续合约
        component: SwapOrder
    },
    {
        name: "forex-order",
        path: "/order/contract/forex",   // 外汇合约
        component: ForexOrder
    },

]