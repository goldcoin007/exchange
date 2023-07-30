<template>
<div class="subscride-page border-top border-bottom">
    <!-- 表单 -->
    <div class="container panel my-4 p-5 rounded shadow-sm bg-white">
        <div class="row">
            <div class="col-6">
                <div class="h3 mb-3">{{detail.coin_name}}</div>
                <div class>{{$t('subscride.sendPrice')}}</div>
                <div class="price fn-20 blue">1 {{detail.coin_name}} = {{detail.issue_price}} USDT</div>
                <ul>
                    <li class="mt-3">
                        <div class="label">{{$t('subscride.subscriptionCurrency')}}</div>
                        <div class="txt text-secondary">{{detail.subscribe_currency}}</div>
                    </li>
                    <li class="mt-3">
                        <div class="label">{{$t('subscride.expected')}}</div>
                        <div class="txt text-secondary">{{parseTime(detail.expected_time_online)}}</div>
                    </li>
                    <li class="mt-3">
                        <div class="label">{{$t('subscride.startTime')}}</div>
                        <div class="txt text-secondary">{{parseTime(detail.start_subscription_time)}}</div>
                    </li>
                    <li class="mt-3">
                        <div class="label">{{$t('subscride.applyForPurchase')}}</div>
                        <div class="txt text-secondary">{{parseTime(detail.end_subscription_time)}}</div>
                    </li>
                </ul>
            </div>
            <div class="col-6 d-flex flex-column justify-content-end align-items-start">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <el-dropdown>
                            <span class="input-group-text">
                                {{activeCoin.coin_name}}
                                <i class="el-icon-caret-bottom"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in coinList" @click.native="activeCoin=item" :key="item.coin_name">{{item.coin_name}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <input type="number" class="form-control" :placeholder="$t('subscride.enterNum')" required aria-label="Username" v-model="num" aria-describedby="basic-addon1" />
                    <div class="input-group-append" v-if="false">
                        <button class="btn btn-outline-primary" type="button">{{$t('subscride.all')}}</button>
                    </div>
                </div>
                <p>1 {{activeCoin.coin_name}} = {{activeCoin.proportion_amount}} {{detail.coin_name}}</p>
                <p>{{num||0}} {{activeCoin.coin_name}} = {{total}} {{detail.coin_name}}</p>
                <button type="submit" class="btn btn-primary" @click="ifSubscribeNow">{{$t('subscride.subscribeNow')}}</button>
            </div>
        </div>
    </div>
    <!-- 进度 -->
    <div class="container panel my-4 px-4 pt-4 pb-5 rounded shadow-sm bg-white">
        <div class="row">
            <div class="col-12">
                <h5 class="border-bottom pb-3 mb-5">{{$t('subscride.subscriptionCycle')}}</h5>
                <el-steps :active="detail.status" align-center>
                    <el-step :title="$t('subscride.projectWarmUp')" :icon="detail.status>=1?'el-icon-success':undefined"></el-step>
                    <el-step :title="$t('subscride.startSubscription')" :icon="detail.status>=2?'el-icon-success':undefined" :description="parseTime(detail.start_subscription_time)"></el-step>
                    <el-step :title="$t('subscride.endOfSubscription')" :icon="detail.status>=3?'el-icon-success':undefined" :description="parseTime(detail.end_subscription_time)"></el-step>
                    <el-step :title="$t('subscride.announceResults')" :icon="detail.status>=4?'el-icon-success':undefined" :description="parseTime(detail.announce_time)"></el-step>
                </el-steps>
            </div>
        </div>
    </div>
    <!-- 详情 -->
    <div class="container panel my-4 px-4 pt-4 pb-5 rounded shadow-sm bg-white">
        <div class="row">
            <div class="col-12">
                <h5 class="border-bottom pb-3 mb-4">{{$t('subscride.projectCetails')}}</h5>
                <div class="edit-content" v-html="detail.project_details"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Subscride from "@/api/subscride";
export default {
    data() {
        return {
            num: "",
            coinList: [],
            detail: {},
            activeCoin: {}
        };
    },
    computed: {
        total() {
            return utils.multiple(
                this.num || 0,
                this.activeCoin.proportion_amount * 1
            );
        },

        isLogin() {
            return Boolean(this.userAuth);
        },

        userAuth() {
            const auth = localStorage.getItem("auth");
            let ret = "";
            if (auth) {
                let {
                    memberId,
                    accessToken
                } = JSON.parse(auth);
                ret = `?${accessToken}&${memberId}`;
            }
            return ret;
        },
    },
    methods: {
        parseTime(num) {
            if (!num) return;
            return utils.parseTime(num);
        },
        subscribeTokenList() {
            Subscride.subscribeTokenList().then(res => {
                this.coinList = res;
                this.activeCoin = this.coinList[0];
            });
        },
        getInfo() {
            Subscride.subscribe().then(res => {
                this.detail = res;
            });
        },

        chkValidate() {
            // 验证登录
            if (!this.isLogin) {
                this.$confirm(this.$t('contract.k8'), {
                    confirmButtonText: this.$t('contract.c5'),
                    cancelButtonText: this.$t('contract.c4'),
                    type: 'warning'
                }).then(() => {
                    this.$router.push(`/sign-in`);
                }).catch();
            }
            return utils.validate(".input-group");
        },

        ifSubscribeNow() {
            if (this.chkValidate()) {
                this.$confirm(`${this.$t('subscride.useOrNot')}${this.activeCoin.coin_name}${this.$t('subscride.subscribe')}?`, this.$t('subscride.prompt'), {
                        confirmButtonText: this.$t('commom.confirmBtn'),
                        cancelButtonText: this.$t('commom.cancelBtn')
                    })
                    .then(() => {
                        this.subscribeNow();
                    })
                    .catch(() => {});
            }
        },

        subscribeNow() {
            let data = {
                amount: this.num,
                coin_name: this.activeCoin.coin_name
            };
            Subscride.subscribeNow(data)
                .then(res => {
                    if (res) {
                        this.$message.success(this.$t('subscride.subscribeSuccess'));
                        this.num = "";
                    }
                })
                .catch(err => {});
        }
    },
    created() {

        this.subscribeTokenList();
        this.getInfo();
        
    }
};
</script>

<style lang='scss' scoped>
</style>
