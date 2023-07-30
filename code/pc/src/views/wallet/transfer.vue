<template>
<div class="wallet-page">
    <secondary-nav></secondary-nav>
    <div class="container">
        <div class="w-100 d-flex justify-content-between align-items-center mb-3 mt-4">
            <div class="h3">{{$t('wallet.transfer')}}</div>
        </div>
        <div class="row">
            <div class="col-md-5">
                <inner-transfer :coinName.sync="coinName" :showHistoryLink="false" :isRestCoin="true"></inner-transfer>
            </div>
            <div class="col-md-7">
                <div class="panel-box bg-panel">
                    <div class="heading d-flex justify-content-between align-items-center">
                        <div class="h6">{{$t('wallet.transferDescription')}}</div>
                    </div>
                    <div class="tab-content">
                        <ul>
                            <li class="mb-2">1.{{$t('wallet.handlingFee')}}。</li>
                            <!-- <li class="mb-2">2.{{$t('wallet.onlyForeignExchange',{name:'USDT'})}}。</li>
                            <li class="mb-2">3.{{$t('wallet.onlySustainable',{name:'BTC'})}}。</li>
                            <li class="mb-2">4.{{$t('wallet.inCase1',{name:'USDT'})}}。</li> -->
                            <li class="mb-2">2.{{$t('wallet.inCase2',{name:'USDT'})}}。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mt15">
                <div class="markets-pair-list">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item" v-if="coinName">
                            <a class="nav-link active" data-toggle="pill" href @click.prevent="isCondition=true" role="tab" aria-selected="false">{{coinName}} {{$("transfer.transferRecord")}}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="pill" href @click.prevent="isCondition=false" role="tab" aria-selected="false">{{ $t("wallet.allTransfer") }}</a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                            <table class="table stripe">
                                <thead>
                                    <tr>
                                        <th>{{$t('wallet.assets')}}</th>
                                        <th>{{$t('wallet.transferQuantity')}}</th>
                                        <th>{{$t('wallet.direction')}}</th>
                                        <th>{{$t('wallet.date')}}</th>
                                        <th class="text-right">{{$t('wallet.status')}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in transferRecords" :key="item.id" v-if="seek(item)">
                                        <td>
                                            <img src="../../assets/img/icon/1.png" alt="eth" />
                                            {{ item.coin_name }}
                                        </td>
                                        <td>{{ item.amount }}</td>
                                        <td>{{ $t(`wallet.${item.draw_out_direction}`) }} -> {{ $t(`wallet.${item.into_direction}`) }}</td>
                                        <td>{{ item.datetime|parseTime }}</td>
                                        <td class="text-right">
                                            <!--1 成功 2 失败 -->
                                            <span class="fail" v-if="item.status == Globals.Status.Transfer.FAIL">{{$t('wallet.error')}}</span>
                                            <span class="success"  v-else-if="item.status == Globals.Status.Transfer.SUCCESS">{{$t('wallet.success')}}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import InnerTransfer from "../components/inner-transfer.vue";
import Wallet from "@/api/wallet";
export default {
    components: {
        InnerTransfer
    },
    data() {
        return {
            transferRecords: [],
            isCondition: false, // 用于tab切换 默认不条件切换
            coinName: '',
        };
    },

    watch: {

        coinName(val, oldVal) {
            // 第一次选择币种 手动添加条件
            if (val && !oldVal) this.isCondition = true;

            // 清空币种时 默认查询所有
            if (!val && oldVal) this.isCondition = false;
        },

        isCondition(val) {
            console.log(val)
        }

    },
    computed: {

    },
    methods: {

        // 过滤查找当前币种的记录
        seek(item) {
            return !this.isCondition || item.coin_name === this.coinName;
        },

        getTransferRecords() {
            Wallet.transferRecord()
                .then(data => {
                    this.transferRecords = data.data;
                })
                .catch(err => {});
        }
    },
    created() {
        this.getTransferRecords();
    }
};
</script>

<style lang="scss" scoped>
.table {
    tr {
        td {
            cursor: default !important;
        }
    }

}
</style>
