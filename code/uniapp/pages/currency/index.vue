<template>
    <view class="layout-page" :style="themeStyle">
        <v-header :title="$t('currency.a0')">
            <!-- <template #right>
              <v-link to="/pages/currency/list" class="d-flex align-center">
                <van-icon class="fn-20 m-t-xs" name="todo-list-o" />
              </v-link>
            </template> -->
        </v-header>
        <view class="main">
            <view class="head fn-16">
                <text @click="active=1;money=''" class="m-x-md" :class="active==1?'bor-b fn-bold':''">{{$t("currency.a1")}}</text>
                <text @click="active=2;money=''" class="m-x-md" :class="active==2?'bor-b fn-bold':''">{{$t("currency.a2")}}</text>
            </view>
            <view class="content p-y-lg">
                <text class="color-theme-1 shadow-panel-nei-5 bg-panel-3 rounded p-x-xl p-y-xs">USDT</text>
                <view class="d-flex justify-between align-center">
                    <text v-if="active==1" class="d-block m-t-lg fn-bold color-light fn-16 p-y-md">{{$t("currency.a3")}}</text>
                    <text v-if="active==2" class="d-block m-t-lg fn-bold color-light fn-16 p-y-md">{{$t("currency.a4")}}</text>
                    <text class="m-t-lg color-theme-1 fn-12">
                         <img src="static/img/fill4.png" alt="" class="h-12" />
                         <span class="m-l-xs" v-if="!showPrice&&active==1" @click="showPrice=true">{{$t("currency.a5")}}</span>
                         <span class="m-l-xs" v-if="showPrice&&active==1" @click="showPrice=false">{{$t("currency.a6")}}</span>
                         <span class="m-l-xs" v-if="!showPrice&&active==2" @click="showPrice=true">{{$t("currency.a55")}}</span>
                         <span class="m-l-xs" v-if="showPrice&&active==2" @click="showPrice=false">{{$t("currency.a66")}}</span>
                    </text>
                </view>
                <view v-if="active==1">
                  <v-input
                    :placeholder="showPrice?$t('currency.a7'):$t('currency.a8')"
                    v-model="money"
                    type="number"
                    class="h-30 m-t-lg rounded-xs border-b p-b-ms"
                  >
                    <template #right v-if="showPrice">
                      <span class="fn-bold color-theme-1 fn-16"> USDT </span>
                    </template>
                    <template #left v-if="!showPrice">
                      <span class="fn-bold color-theme-1 fn-16"> {{ $t("currency.b9") }} </span>
                    </template>
                  </v-input>
                </view>
                <view v-else>
                  <v-input
                    :placeholder="showPrice?$t('currency.a9'):$t('currency.b0')"
                    v-model="money"
                    type="number"
                    class="h-30 m-t-lg rounded-xs border-b p-b-ms"
                  >
                    <template #right v-if="showPrice">
                      <span class="fn-bold color-theme-1 fn-16"> USDT </span>
                    </template>
                    <template #left v-if="!showPrice">
                      <span class="fn-bold color-theme-1 fn-16"> {{ $t("currency.b9") }} </span>
                    </template>
                  </v-input>
                </view>
                <view class="d-flex justify-between m-t-lg fn-12 align-center">
                    <text class="w-100">{{$t("currency.b1")}} ≈{{ $t("currency.b9") }}{{price_cny}}</text>
                </view>
            </view>
            <button tag="button" v-if="active==1" @click="buy" class="rounded-xs m-x-lg color-white bg-theme-1">{{$t("currency.b2")}}</button>
            <button v-else @click="sell" class="rounded-xs m-x-lg  color-white bg-theme-1">{{$t("currency.b3")}}</button>
        </view>
        <van-dialog id="van-dialog" />
    </view>
</template>
<script>
    import Otc from "@/api/otc";
    import Exchange from "@/api/exchange";
    import Wallet from "@/api/wallet";
    import Profile from "@/api/profile";
    import { mapGetters } from "vuex";
    export default{
        data(){
           return{
               active:1,
               money:"",
               showPrice:false,
               price_cny:'',
               usdt_balance:'',
               detail:{}
           }
        },
        computed: {
          ...mapGetters(['themeStyle']),
          isLogin() {
            return Boolean(uni.getStorageSync("token"));
          },
        },
        watch:{
            active(){
                this.getCurrencyExCny()
            }
        },
        methods:{
            getAuthInfo(){
                Profile.getAuthInfo().then(res=>{
                    this.detail = res.data
                })
            },
            // 获取汇率
            getCurrencyExCny() {
              Otc.legalPrice({
                coin_name: 'USDT',
                type:this.active==1?'buy':'sell'
              }).then((res) => {
                this.price_cny = res.data.price;
              }).catch((err)=>{
                setTimeout(()=>{
                    this._router.push('/pages/auth/index')
                },2000)
              })
            },
            //获取u余额
            fundAccount() {
              Wallet.fundAccount().then((res) => {
                this.usdt_balance = res.data.otc_account_usd;
              });
            },
            buy(){
                if(this.showPrice&&this.money==''){
                    this.$toast(this.$t("currency.a7"))
                    return
                }
                if(!this.showPrice&&this.money==''){
                    this.$toast(this.$t("currency.a8"))
                    return
                }
                this.submit()
            },
            sell(){
                if(this.showPrice&&this.money==''){
                    this.$toast(this.$t("currency.a9"))
                    return
                }
                if(!this.showPrice&&this.money==''){
                    this.$toast(this.$t("currency.b0"))
                    return
                }
                let money=!this.showPrice?this.money/this.price_cny:this.money
                if(money>this.usdt_balance){
                    this.$toast(this.$t("currency.b4"))
                    return
                }
                this.submit()
            },
            submit(){
                let that=this
                if(that.detail.status!=2){
                    that.$dialog
                    .confirm({
                        message:that.$t("currency.b5"),
                        confirmButtonText:  that.$t("currency.b6"),
                        cancelButtonText: that.$t("common.cancel")
                    })
                    .then(() => {
                        that._router.push('/pages/auth/index')
                    });
                    return
                }
                let data={
                    currency:'USDT',
                    type:this.active==1?'buy':'sell',
                    amount:this.money,
                    number:this.money,
                    unitPrice:this.price_cny,
                    pay_type:this.showPrice?0:1
                }
                that.$dialog
                    .confirm({
                        message: that.active==1?that.$t("currency.b7")+'？':that.$t("currency.b8")+'？',
                        confirmButtonText:  that.$t("common.confirm"),
                        cancelButtonText: that.$t("common.cancel")
                    })
                    .then(() => {
                        Otc.legalBuy(data).then((res) => {
                            uni.setStorageSync('otc',res.data)
                            that._router.push('/pages/service/otc')
                        });
                    });
            }
        },
        mounted() {
            this.getCurrencyExCny()
            this.fundAccount()
            this.getAuthInfo()
        },
    }
</script>

<style lang="scss" scoped>
    .main{
        position: relative;
        .head{
            padding:20px 0 80px 0;
        }
        .content{
            position: relative;
            width: 92%;
            left: 4%;
            top: -50px;
            box-sizing: border-box;
            .border-b1{
                border-bottom:2px solid #ff9a22;
            }
        }
    }
    .w-100{
        width: 100%;
    }
    .bg-lin{
        background: linear-gradient(to right,#f6c769,#f3b644);
    }
    /deep/ uni-button:after{
        border: 0;
    }
    /deep/ uni-button{
        font-size: 16px;
    }
    .bor-b{
        position: relative;
        font-size: 18px;
        color: $light;
    }
    .bor-b:after{
        content: "";
        position: absolute;
        left: 30%;
        bottom: -5px;
        width: 40%;
        height: 2px;
        background-color: $theme-1;
        border-radius: 5px;
    }
    .p-x-xl{
        padding: 8px 40px!important;
    }
</style>
