<template>
<div class="col-md-9">
    <div class="exchange-history order-history market-order mt15">
        <ul class="nav nav-pills" role="tablist">
            <li class="nav-item" @click="toggle('opens')">
                <a class="nav-link active" data-toggle="pill" href="#open-orders" role="tab" aria-selected="true">
                    {{ $t("common.open-orders") }}</a>
            </li>
            <!-- <li class="nav-item" @click="toggle('conditions')">
                <a class="nav-link" data-toggle="pill" href="#stop-orders" role="tab" aria-selected="false">
                    {{ $t("common.condition-orders") }}</a>
            </li> -->
            <li class="nav-item" @click="toggle('histories')">
                <a class="nav-link" data-toggle="pill" href="#order-history" role="tab" aria-selected="false">
                    {{ $t("common.history-orders") }}</a>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane fade show active" id="open-orders" role="tabpanel">
                <table class="table" v-if="ordersOpen.total">
                    <thead>
                        <tr class="text-nowrap">
                            <th>{{ $t("common.created") }}</th>
                            <th>{{ $t("common.pair") }}</th>
                            <th>{{ $t("common.direction") }}</th>
                            <th>{{ $t("common.order-type") }}</th>
                            <th>{{ $t("common.order-price") }}</th>
                            <th>{{ $t("common.order-amount") }}</th>
                            <th>{{ $t("common.executed-amount") }}</th>
                            <th>{{ $t("common.executed-total") }}</th>
                            <th>{{ $t("common.outstanding") }}</th>
                            <th>{{ $t("common.order-total") }}</th>
                            <!-- <th>状态</th> -->
                            <th class="text-right">{{ $t("common.action") }}</th>
                        </tr>
                    </thead>
                    <tbody class="order-tbody">
                        <tr v-for="(item,idx) in ordersOpen.data" :key="item.id" class="text-nowrap">
                            <td>{{item.created_at}}</td>
                            <td>{{item.symbol}}</td>

                            <template v-if="item.entrust_type == 1">
                                <td class="green">{{$t("common.buy-in")}}</td>
                            </template>
                            <template v-else-if="item.entrust_type == 2">
                                <td class="red">{{$t("common.sell-out")}}</td>
                            </template>

                            <td>
                                <template v-if="item.type==1">{{ $t("common.limit-type") }}</template>
                                <template v-if="item.type==2">{{ $t("common.market-type") }}</template>
                            </td>

                            <td>{{item.entrust_price|omitTo(priceDecimals)}}</td>

                            <td>{{item.amount|omitTo(qtyDecimals)}}</td>

                            <td>{{item.traded_amount|omitTo(priceDecimals)}}</td>
                            <td>{{item.traded_money|omitTo(priceDecimals)}}</td>

                            <td>{{item.surplus_amount||omitTo(qtyDecimals)}}</td>

                            <td>{{item.money ? Math.omitTo(item.money, priceDecimals) : '-'}}</td>
                            <!-- <td>完成</td> -->
                            <td class="text-nowrap">
                                <button type="button" class="btn btn-sm btn-outline-danger" @click="delOrder(item,idx)">{{ $t("common.cancel") }}</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="no-data" v-else>
                    <span>
                        <i class="icon ion-md-document"></i>
                        {{ $t("common.notData") }}
                    </span>
                </div>
            </div>

            <div class="tab-pane fade" id="stop-orders" role="tabpanel">
                <ul class="d-flex justify-content-between market-order-item">
                    <li>{{ $t("common.created") }}</li>
                    <li>{{ $t("common.pair") }}</li>
                    <li>{{ $t("common.direction") }}</li>
                    <li>{{ $t("common.order-type") }}</li>
                    <li>{{ $t("common.avg-price") }}</li>
                    <li>{{ $t("common.executed") }}</li>
                    <li>{{ $t("common.order-total") }}</li>
                    <li>{{ $t("common.price-total") }}</li>
                </ul>
                <span class="no-data">
                    <i class="icon ion-md-document"></i>
                    {{ $t("common.notData") }}
                </span>
            </div>

            <div class="tab-pane fade" id="order-history" role="tabpanel">
                <table class="table" v-if="ordersHistory.total">
                    <thead>
                        <tr class="text-nowrap">
                            <th>{{ $t("common.created") }}</th>
                            <th>{{ $t("common.pair") }}</th>
                            <th>{{ $t("common.direction") }}</th>
                            <th>{{ $t("common.order-type") }}</th>
                            <th>{{ $t("common.order-price") }}</th>
                            <th>{{ $t("common.order-amount") }}</th>
                            <th>{{ $t("common.executed-amount") }}</th>
                            <th>{{ $t("common.avg-price") }}</th>

                            <th>{{ $t("common.order-total") }}</th>
                            <th>{{ $t("common.status") }}</th>
                            <th>{{ $t("common.details") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in ordersHistory.data">
                            <tr class="text-nowrap" :key="item.id" :name="item.entrust_type+'_'+item.id+'_'+index" slot="title" @click="handleChange(item)">
                                <td>{{item.created_at}}</td>
                                <td>{{item.symbol}}</td>
                                <template v-if="item.entrust_type == 1">
                                    <td class="green">{{$t("common.buy-in")}}</td>
                                </template>
                                <template v-else-if="item.entrust_type == 2">
                                    <td class="red">{{$t("common.sell-out")}}</td>
                                </template>
                                <td>
                                    <template v-if="item.type==1">{{ $t("common.limit-type") }}</template>
                                    <template v-if="item.type==2">{{ $t("common.market-type") }}</template>
                                </td>
                                <td>{{item.entrust_price ? Math.omitTo(item.entrust_price, priceDecimals) : '-'}}</td>
                                <td>{{item.amount|omitTo(qtyDecimals)}}</td>

                                <td>{{ item.traded_amount|omitTo(qtyDecimals) }}</td>

                                <td v-if="item.status">
                                    {{Math.division(item.traded_money,item.traded_amount,priceDecimals)}}
                                </td>
                                <td v-else>-</td>
                                <td>{{item.traded_money|omitTo(priceDecimals)}}</td>
                                <template v-if="item.status">
                                    <td v-if="item.status == 3">
                                        {{ $t("common.completed") }}
                                    </td>
                                </template>
                                <template v-else>
                                    <td>{{ $t("common.canceled") }}</td>
                                </template>
                                <td>
                                    <i v-if="item.show" class="el-icon-arrow-down"></i>
                                    <i v-else class="el-icon-arrow-right"></i>
                                </td>
                            </tr>
                            <tr :key="item.id+'t'" v-if="item.show">
                                <td colspan="11">
                                    <template v-if="item.children && item.children.length">
                                        <div v-for="rec in item.children" :key="rec.order_id">
                                            <span>
                                                <span class="text-secondary">
                                                    {{ $t("common.id") }}
                                                </span>：{{ rec.order_id}} &emsp;
                                            </span>
                                            <span><span class="text-secondary">
                                                {{ $t("common.created") }}</span>：{{ rec.created_at}} &emsp;</span>
                                            <span><span class="text-secondary">
                                                {{ $t("common.filled-price") }}</span>：{{ rec.unit_price|omitTo(priceDecimals)}} &emsp;</span>
                                            <span><span class="text-secondary">
                                                {{ $t("common.filled-amount") }}</span>：{{ rec.trade_amount|omitTo(qtyDecimals)}} &emsp;</span>
                                            <span><span class="text-secondary">
                                                {{ $t("common.filled-total") }}</span>：{{ rec.trade_money|omitTo(priceDecimals)}} &emsp;</span>
                                            <span><span class="text-secondary">
                                                {{ $t("common.fee") }}</span>：{{ rec.trade_fee|omitTo(priceDecimals)}} &emsp;</span>
                                        </div>
                                    </template>
                                    <div class="text-center text-secondary" v-else>
                                        Loading...
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <span class="no-data" v-else>
                    <i class="icon ion-md-document"></i>
                    {{ $t("common.notData") }}
                </span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Order from "@/api/order";

export default {
    props: [
        "ordersOpen",
        "ordersHistory",
        "conditionOrders",
        "priceDecimals",
        "qtyDecimals",
        "isLogin",
        "pair"
    ],

    data() {
        return {
            currentTab: "opens",
            activeItems: []
        };
    },
    methods: {
        toggle(name) {
            this.currentTab = name;
            // 更新父组件
            this.$emit("change", name);
        },

        update() {
            this.$emit("update");
        },

        // 撤销当前订单
        delOrder(item, idx) {
            let data = {
                entrust_id: item.id,
                entrust_type: item.entrust_type,
                symbol: item.symbol
            };
            this.$confirm(this.$t("order.ifCancel",{
                confirmButtonText:this.$t('common.confirmBtn'),
                cancelButtonText:  this.$t('common.cancelBtn'),
            }))
                .then(res => {
                    Order.cancelEntrust(data)
                        .then(res => {
                            this.$message.success(this.$t("order.cancelSuccess"));
                            this.update();
                        })
                        .catch(() => {});
                })
                .catch(err => {});
        },

        handleChange(item) {
            this.$set(item, "show", !item.show);
            if (item.children) return;
            if (this.isLogin) {
                Order.getEntrustTradeRecord({
                        entrust_type: item.entrust_type,
                        entrust_id: item.id
                    })
                    .then(data => {
                        this.$set(item, "children", data);
                    })
                    .catch(err => {});
            }

        }
    },
    created() {
        console.log(this.ordersHistory);
    }
};
</script>

<style lang="scss">
.exchange-history {
    .nav {
        background: #f5f9fc;
    }

    .nav-link.active {
        color: #007bff;
        background: transparent;
    }
}

.order-tbody {
    display: table-row-group !important;

    tr {
        float: none;
    }
}
</style>
