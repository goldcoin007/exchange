<template>
    <div class="wallet-page">
        <secondary-nav></secondary-nav>
        <div class="container">
            <div class="w-100 d-flex justify-content-between align-items-center mb-3 mt-4">
                <div class="h3">{{$t('wallet.recharge')}}&{{$t('wallet.withdrawal')}}</div>
            </div>

            <div class="row">
                <div class="col-md-12 mt15">
                    <div class="markets-pair-list mb-3">
                        <ul class="nav nav-pills" id="pills-tab" role="tablist">
                            <li class="nav-item fn-16">
                                <a class="nav-link active" data-toggle="pill" href="#deposit" role="tab" aria-selected="false" @click="currentTab = 'deposit'">{{$t('wallet.rechargeRecord')}}</a>
                            </li>
                            <li class="nav-item fn-16">
                                <a class="nav-link " data-toggle="pill" href="#withdrawal" role="tab" aria-selected="false" @click="currentTab = 'withdrawal'">{{$t('wallet.withdrawalRecord')}}</a>
                            </li>
                            <li class="nav-item fn-16">
                                <a class="nav-link " data-toggle="pill" href="#paypal" role="tab" aria-selected="false" @click="currentTab = 'paypal'">Paypal{{$t('wallet.rechargeRecord')}}</a>
                            </li>
                        </ul>
                        <div class="row pt-3">
                            <div class="form-group col-sm-3">
                                <input type="text" v-model="search_coin" class="form-control" :placeholder="$t('wallet.assetsName')" />
                            </div>
                            <div class="form-group col-sm-3">
                                <el-select v-model="submitStatus" :placeholder="$t('wallet.selectStatus')">
                                    <el-option v-for="item in states" :key="item.value" :value="item.value" :label="item.label">
                                        <span>{{item.label}}</span>
                                    </el-option>
                                </el-select>
                            </div>
                            <!-- <div class="form-group col-sm-5">
                            <el-date-picker :value="timeRange" type="daterange" :range-separator="$t('wallet.to')" :start-placeholder="$t('wallet.startTime')" :end-placeholder="$t('wallet.entTIme')" @change="setTimeRange"></el-date-picker>
                        </div> -->
                            <!-- <div class="form-group col-sm-1 px-0">
                            <button class="btn btn-outline-primary mb-2" @click="addCondition">{{$t('wallet.search')}}</button>
                        </div> -->
                        </div>
                        <div class="tab-content">
                            <!-- 充值 -->
                            <div v-infinite-scroll="load1" class="tab-pane funding-table fade show active" id="deposit" role="tabpanel">
                                <table class="table stripe">
                                    <thead>
                                        <tr>
                                            <th>{{$t('wallet.assets')}}</th>
                                            <th>{{$t('wallet.date')}}</th>
                                            <th>{{$t('wallet.address')}}/{{$t('wallet.hash')}}</th>
                                            <th>{{$t('wallet.num')}}</th>
                                            <th>{{$t('wallet.progress')}}</th>
                                            <th class="text-right">{{$t('wallet.status')}}</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in depositHistories" :key="item.id" v-if="seek(item)">
                                            <td>
                                                <img src="../../assets/img/icon/1.png" alt="eth" /> {{item.coin_name}}
                                            </td>
                                            <td>{{item.datetime|parseTime}}</td>
                                            <td>{{item.address}}</td>
                                            <td>{{item.amount}}</td>
                                            <td>-/-</td>
                                            <td class="text-right">
                                                <span class="decreace" v-if="item.status == Globals.Status.Funding.FAIL">{{$t('wallet.error')}}</span>
                                                <span class="increace" v-if="item.status == Globals.Status.Funding.SUCCESS">{{$t('wallet.success')}}</span>
                                                <span class="color-cls-gray" v-if="item.status == Globals.Status.Funding.PENDING">{{$t('wallet.underReview')}}</span>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- 提币 -->
                            <div v-infinite-scroll="load2" class="tab-pane funding-table fade show" id="withdrawal" role="tabpanel">
                                <table class="table stripe">
                                    <thead>
                                        <tr>
                                            <th>{{$t('wallet.assets')}}</th>
                                            <th>{{$t('wallet.date')}}</th>
                                            <th>{{$t('wallet.address')}}/{{$t('wallet.hash')}}</th>
                                            <th>{{$t('wallet.num')}}</th>
                                            <th>{{$t('wallet.handlingFee1')}}</th>
                                            <th class="text-right">{{$t('wallet.status')}}</th>
                                            <th class="text-right">{{$t('contract.c0')}}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in withdrawRecords" :key="item.id" v-if="seek(item)">
                                            <td>
                                                <img src="../../assets/img/icon/1.png" alt="eth" />
                                                {{ item.coin_name }}
                                            </td>
                                            <td>{{ item.datetime|parseTime }}</td>
                                            <td>{{ item.address }}</td>
                                            <td>{{ item.amount }}</td>
                                            <td>{{item.withdrawal_fee}}</td>
                                            <td class="text-right">
                                                {{item.status_text}}
                                            </td>
                                            <td class="text-right">
                                                <button v-if="item.status==0" class="btn btn-danger btn-sm" @click="cancelWithdraw(item)">{{$t('contract.c2')}}</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- paypal充值记录 -->
                            <div v-infinite-scroll="load3" class="tab-pane funding-table fade show" id="paypal" role="tabpanel">
                                <table class="table stripe">
                                    <thead>
                                        <tr>
                                            <th>{{$t('wallet.assets')}}</th>
                                            <th>{{$t('wallet.date')}}</th>
                                            <th>{{$t('wallet.num')}}</th>
                                            <th class="text-right">{{$t('wallet.status')}}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,index) in rechargeManualLogs" :key="index">
                                            <td>
                                                <img src="../../assets/img/Group12@2x.png" alt="eth" />
                                                <!-- {{ item.coin_name }} -->
                                            </td>
                                            <td>{{ item.created_at|parseTime }}</td>
                                            <td>{{ item.num }}</td>
                                            <td v-if="item.status==0" class="text-right">{{$t('wallet.processing')}}</td>
                                            <td v-if="item.status==1" class="text-right">{{$t('wallet.success')}}</td>
                                            <td v-if="item.status==2" class="text-right">{{$t('wallet.error')}}</td>
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
import Wallet from "@/api/wallet";
export default {
    data() {
        return {
            currentTab: null,
            withdrawRecords: [], // 提币记录
            depositHistories: [], // 充值记录
            rechargeManualLogs: [],// paypal充值记录
            search_coin: '', // 搜索币种
            submitStatus: '', // 提交状态
            timeRange: [],
        }
    },

    computed: {
        states() {
            return [{
                label: this.$t('wallet.success'),
                value: this.Globals.Status.Funding.SUCCESS,
            },
            {
                label: this.$t('wallet.error'),
                value: this.Globals.Status.Funding.FAIL,
            },
            {
                label: this.$t('wallet.processing'),
                value: this.Globals.Status.Funding.PENDING,
            }
            ];
        },
    },

    methods: {

        getWithdrawRecords() {
            Wallet.withdrawalRecord().then(data => {
                this.withdrawRecords = data.data;
            }).catch(err => { });
        },

        getDepositHistories() {
            Wallet.depositHistory().then(data => this.depositHistories = data.data).catch(err => { });
        },

        getRechargeManualLog() {
            Wallet.rechargeManualLog().then(data => this.rechargeManualLogs = data.data).catch(err => { });
        },

        update() {
            if (this.currentTab == "deposit") {
                // 获取充值记录
                this.getDepositHistories();
            } else if (this.currentTab == "withdrawal") {
                // 获取提币记录
                this.getWithdrawRecords();
            }else if(this.currentTab == "paypal"){
                // 获取paypal充值记录
                this.getRechargeManualLog();
            }
        },

        setTimeRange(...args) {
            console.log(args);
        },

        addCondition() {

        },

        seek(item) {
            let res1,
                res2,
                res3;
            const reg = new RegExp(this.search_coin, "gi");
            if(this.currentTab!='paypal'){
                res1 = !this.search_coin || item.coin_name.search(reg) >= 0;
            }

            res2 = !this.submitStatus || item.status === this.submitStatus;

            return res1 && res2;

        },
        cancelWithdraw(item) {
            Wallet.cancelWithdraw({ withdraw_id: item.id }).then(res => {
                this.$message.success(this.$t('contract.d4'));
                this.getWithdrawRecords()
            })
        },
        load1() {
            console.log('load1')
        },

        load2() {
            console.log('load2')
        },

        load3() {
            console.log('load3')
        },
    },

    watch: {
        currentTab() {

            this.update();
        }
    },

    created() {
        console.log(this.Funding);
        this.currentTab = "deposit";
    }
};
</script>

<style scoped>
</style>
