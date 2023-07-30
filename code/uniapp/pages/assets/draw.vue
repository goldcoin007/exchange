<template>
    <v-page>
        <v-header>
            <template #title>
                <view>
                    {{ $t("assets.b6") }}
                    <!-- <span class="color-theme-1">{{ coin }}</span> -->
                </view>
            </template>
        </v-header>
        <view class="layout-main">
            <view class="coin border-b p-x-lg p-md d-flex justify-between m-t-md" @click="coinListShow=true">
              <view class="fn-25 color-light">{{coin}}</view>
              <view class="d-flex align-center">
                {{$t('recharge.a0')}}<van-icon name="arrow" />
              </view>
            </view>
            <view class="bg-panel-3" style="height: 100%;">
                <view class="">
                    <view
                      class="d-flex flex-wrap justify-between align-center p-x-lg p-y-ms color-light"
                      v-if="coin=='USDT'"
                    >
                      <!-- <span>{{$t('assets.b7')}}</span> -->
                      <view class="group d-flex fn-12 color-light">
                        <view class="rounded-xs p-x-lg p-y-ms m-r-md"
                          :class="rechargeType==1?'bor-active':'bg-panel-3 border'"
                          size="mini"
                          @click="changeRechargeType(1)"
                        >OMNI</view>
                        <view class="rounded-xs p-x-lg p-y-ms m-r-md"
                          size="mini"
                          @click="changeRechargeType(2)"
                          :class="rechargeType==2?'bor-active':'bg-panel-3 border'"
                        >ERC20</view>
                        <view class="rounded-xs p-x-lg p-y-ms"
                          size="mini"
                          @click="changeRechargeType(3)"
                          :class="rechargeType==3?'bor-active':'bg-panel-3 border'"
                        >TRC20</view>
                      </view>
                    </view>
                    <view class="p-x-lg d-flex justify-between flex-wrap align-center p-y-xs">
                        <view class="color-light d-block w-max m-y-ms color-light fn-15">{{ $t("assets.b8") }}</view>
                        <v-input v-model="form.address" class="bg-form-panel-3 p-sm color-light w-max fn-13 rounded-xs" :placeholder="$t('assets.b9')">
                            <template #right>
                               <!-- #ifdef H5 -->
                                    <v-link tag="span" :to="{path:'/pages/assets/address-list',query:{
                                      from:'draw'
                                    }}" class="color-light fn-20 h-20">
                                                    <van-icon class="color-theme-1" name="orders-o" />
                                                </v-link>
                               <!-- #endif -->
                               <!-- #ifndef H5 -->
                               <van-icon class="color-theme-1" @click="saoma" name="scan" />                          
                               <!-- #endif -->
                            </template>
                        </v-input>
                        <view class="color-sell fn-12 m-t-xs">
                            {{$t('recharge.a5')}}
                        </view>
                    </view>
                </view>
                <view class="form bg-panel-3 p-x-lg">
                    <view class="d-flex align-center p-y-md justify-between color-light fn-15">
                        <span class="color-light">{{ $t("assets.c0") }}</span>
                        <span>{{ $t("assets.c1") }}：{{ withdrawFee.usable_balance }}
                            {{ coin }}</span>
                    </view>
                    <view class="d-flex align-end p-y-xs justify-between bg-form-panel-3 rounded-xs p-sm p-x-ms">
                        <v-input type="number" v-model="form.amount" :min="withdrawFee.withdrawal_min" :max="withdrawFee.withdrawal_max" class=" w-8/12 color-light fn-13" :placeholder="$t('assets.c2')"></v-input>
                        <view class="d-flex align-end">
                            <span class="unit fn-16 flex-shrink">{{ coin }}</span>
                            <view class="all color-theme-1 m-l-md flex-shrink" @click="form.amount = withdrawFee.usable_balance">{{ $t("assets.c3") }}</view>
                        </view>
                    </view>
                    <view class="d-flex align-center p-y-xs justify-between fn-13">
                        <span>{{$t('common.c1')}}：</span>
                        <span class="color-light">{{ withdrawFee.withdrawal_min }} {{coin}}</span>
                    </view>
                    <view class="d-flex align-center p-y-xs m-t-ms justify-between color-light fn-15">
                        <span>{{ $t("assets.c4") }}：</span>
                        <!-- <span class="color-light">{{ withdrawFee.withdrawal_fee }} {{coin}}</span> -->
                    </view>
                    <view class="d-flex align-end p-y-xs justify-between bg-form-panel-3 rounded-xs p-y-sm">
                        <v-input v-model="withdrawFee.withdrawal_fee" disabled class="p-x-ms color-light w-max fn-13 rounded-xs" :placeholder="$t('assets.b9')">
                            <template #right>
                               {{coin}}
                            </template>
                        </v-input>
                    </view>
                </view>
                <view class="form bg-panel-3 p-x-lg p-y-md">
                    <ul class="fn-md rounded-md m-y-xs line-height-2">
                        <li>·{{ $t("assets.c5") }}。</li>
                        <li>·{{ $t("assets.c6") }}。</li>
                        <li>·{{ $t("assets.c7") }}。</li>
                    </ul>
                </view>
                <view class="rounded-md m-b-lg" v-if="list.length">
                    <view class="title d-flex justify-between p-x-md p-y-xs align-center color-light">
                        <span class="fn-lg">{{ $t("assets.c8") }}</span>
                    </view>
                    <view class="p-x-md">
                        <table class="w-max">
                            <thead class="p-x-md">
                                <tr class="fn-sm p-x-md">
                                    <th class="p-b-md fn-left p-l-md">{{ $t("assets.c9") }}</th>
                                    <th class="p-b-md fn-left">{{ $t("assets.d0") }}</th>
                                    <th class="p-b-md fn-right p-r-md">{{ $t("assets.c0") }}</th>
                                    <th class="p-b-md fn-right p-r-md">{{$t('exchange.g3')}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="color-light trChange p-x-md rounded-md" v-for="item in list" :key="item.id">
                                    <td class="p-y-xs p-l-md rounded-tl-sm rounded-bl-sm fn-sm">
                                        {{ item.datetime | parseTime }}
                                    </td>
                                    <td>
                                        <view>{{item.status_text}}</view>
                                    </td>
                                    <td>
                                        {{ item.amount }}
                                        <span class="color-default">({{ item.coin_name }})</span>
                                    </td>
                                    <td class="fn-right p-r-md rounded-tr-sm rounded-br-sm">
                                        <v-button size="mini" v-if="item.status==0" type="danger" @click="cancelWithdraw(item)">{{$t('exchange.g4')}}</v-button>
                                    </td>
                                </tr>
                                <tr v-if="loadMore">
                                    <td colspan="3" class="fn-center p-xs link-active" @click="more">
                                        {{ $t("assets.d4") }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </view>
                </view>
                <view class="bot w-max bg-panel-3 p-lg box-size">
                    <v-button class="w-max m-y-md rounded-xs" block type="yellow" @click="toDraw" ref="btn">{{ $t("assets.b6") }}</v-button>
                </view>
            </view>
        </view>
        
        <coin-list ref="coinList" v-model="coin" @close="coinListShow = false" v-show="coinListShow" />
        <van-popup :show="secondaryShow" @close="secondaryShow=false" closeable close-on-popstate position="bottom" custom-style="height:40%">
            <van-tabs class="m-t-lg p-t-lg" v-if="secondaryShow" :sticky="false" :active="form.code_type" @change="changeTab">
                <van-tab title="Google" v-if="withdrawFee.google_status==1" :name="3">
                    <v-input class="border h-40 m-y-md m-x-lg p-x-md" type="number" :placeholder="$t('common.code')" v-model="form.code"></v-input>
                </van-tab>
                <van-tab :title="$t('login.a8')" v-if="withdrawFee.phone_status==1" :name="1">
                    <v-input class="border h-40 m-y-md m-x-lg p-x-md" type="number" :placeholder="$t('common.code')" v-model="form.code">
                        <template #right>
                            <v-code type="green-plain" url="/user/getCode" :data="{type:1}" ref="mobileCode"></v-code>
                        </template>
                    </v-input>

                </van-tab>
                <van-tab :title="$t('login.a9')" v-if="withdrawFee.email_status==1" :name="2">
                    <v-input class="border h-40 m-y-md m-x-lg p-x-md" type="number" :placeholder="$t('common.code')" v-model="form.code">
                        <template #right>
                            <v-code type="green-plain" url="/user/getCode" :data="{type:2}" ref="emailCode"></v-code>
                        </template>
                    </v-input>
                    <view class="m-md"></view>
                </van-tab>
            </van-tabs>
            <view class="m-md">
                <v-button type="yellow" block class="w-max rounded-md" @click="draw">{{$t('common.confirm')}}</v-button>
            </view>
        </van-popup>
        <van-toast id="van-toast" />
    </v-page>
</template>
<script>
import coinList from "./coin-list";
import Wallet from "@/api/wallet";
import formData from "@/utils/class/date";
export default {
    components: {
        coinList,
    },
    data() {
        return {
            coinListShow: false,
            coin: "",
            rechargeType: 1,
            form: {
                coin_id: "",
                amount: "",
                address: "",
                addressType: "",
                code_type: 1,
                code: ''
            },
            withdrawFee: {},
            list: [],
            page: 1,
			loadMore: true,
			secondaryShow:false
        };
    },
    computed: {
        activeCoin() {
            if (!this.coin) return {};
            return this.$refs.coinList.coinList.find(
                (item) => item.coin_name == this.coin
            );
        },
    },
    watch: {
        coin(n) {
            if (n) {
                this.form.address = "";
                if (this.coin != "USDT") {
                    this.rechargeType = 1;
                }
                this.withdrawalBalance();
            }
        },
    },
    filters: {
        parseTime(val) {
            return formData.parseTime(val);
        },
    },
    mounted() {
        uni.$on('selectAddress', (e) => {
            this.form.address = e
        })
    },
    methods: {
        saoma(){
             let that = this;
             uni.scanCode({
                 success: function(res) {
                     that.form.address = res.result;
                 }
             });
        },
        changeRechargeType(idx) {
            this.rechargeType = idx;
            this.withdrawalBalance();
        },
        // 获取提币地址
        withdrawalBalance() {
            let address_type=1
            let data = {
                coin_name: this.coin,
                address_type:this.rechargeType
            };
            Wallet.withdrawalBalance(data).then((res) => {
                this.withdrawFee = res.data;
            });
        },
        // 发起提币
        toDraw(){
            if(!this.form.address){
                this.$toast(this.$t('assets.b9'))
                return
            }
            if(!this.form.amount){
                this.$toast(this.$t('assets.c2'))
                return
            }
            let data = this.withdrawFee
            if (data.withdraw_switch == 1) {
				this.secondaryShow = true
                if (data.google_status == 1) {
                    this.form.code_type = 3;
                } else if (data.phone_status == 1) {
                    this.form.code_type = 1;
                    this.$nextTick(() => {
                        this.$refs.mobileCode.send();
                    });
                } else if (data.email_status == 1) {
                    this.form.code_type = 2;
                    this.$nextTick(() => {
                        this.$refs.emailCode.send();
                    });
                }
            } else {
                this.draw()
            }
        },
        draw() {
            this.form.addressType = this.rechargeType;
            this.form.coin_id = this.activeCoin.coin_id;
            Wallet.withdraw(this.form, { btn: this.$refs.btn })
                .then((res) => {
                    this.secondaryShow = false
                    this.form.code=''
                    if(res.code=4001){
                        this.$toast(res.message);
                    }else{
                        this.$toast.success(this.$t("assets.d5") + "！");
                        this.form.amount=''
                    }
                })
                .catch(() => { });
        },
        reset() {
            this.loadMore = true;
            this.page = 1;
            this.getWithdrawRecords();
        },
        more() {
            this.page++;
            this.getWithdrawRecords();
        },
        // 获取提币记录
        getWithdrawRecords() {
            let data = {
                page: this.page,
            };
            Wallet.withdrawalRecord(data).then((res) => {
                if (res.data.current_page == 1) this.list = [];
                this.list = [...this.list, ...res.data.data];
                if (res.data.data.length < res.data.per_page) this.loadMore = false;
            });
        },
        // 撤销订单
        cancelWithdraw(item) {
            Wallet.cancelWithdraw({ withdraw_id: item.id }).then(() => {
                this.$toast(this.$t('exchange.g6'))
                this.reset();
            })
        },
        changeTab(ev) {
            this.form.code_type = ev.detail.name
        },
    },
    created() {
        this.getWithdrawRecords();
    },
};
</script>
<style lang="scss" scoped>
.trChange:nth-child(2n-1) {
    box-shadow: $shadow;
    border-radius: $border-radius-xs;
    td {
        background: $panel-3;
        padding-top: $padding-sm;
        padding-bottom: $padding-sm;
    }
}
.bor-active{
    border: 1px solid $theme-1;
    position: relative;
    overflow: hidden;
    color: $theme-1;
}
.bor-active::before{
    content: '';
    position: absolute;
    right: 0;
    bottom:-2px;
    height: 0;
    width: 0;
    border: 10px solid;
    border-color:transparent $theme-1 $theme-1 transparent;
    text-align: center;
}
.bor-active::after{
    content: '√';
    position: absolute;
    right: -4px;
    bottom: -1px;
    height: 15px;
    width: 15px;
    width: 20px;
    transform: scale(0.7);
    text-align: center;
    color: white;
}
.border-b{
    border-bottom: 5px solid $panel-3;
}
.autowidth{
    margin: 0 auto;
}
.bg-lin{
    background: linear-gradient(to right,#f6c769,#f3b644);
}
.color-black{
    color: black;
}
.bot{
    position: fixed;
    bottom: 0;
}
</style>