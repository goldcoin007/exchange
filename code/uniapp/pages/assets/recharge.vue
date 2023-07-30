<template>
  <view class="layout-page bg-panel-1" :style="themeStyle">
    <v-header>
      <template #title>
        {{$t('assets.e5')}}
        <!-- <span class="color-theme-1">{{coin}}</span> -->
      </template>
      <!-- <template #right>
        <v-link to="/pages/assets/paypal">
          PayPal
        </v-link>
      </template> -->
    </v-header>
    <view class="layout-main">
      <view class="coin border-b p-x-lg p-md d-flex justify-between m-t-md" @click="coinListShow=true">
        <view class="fn-25 color-light">{{coin}}</view>
        <view class="d-flex align-center">
          {{$t('recharge.a0')}}<van-icon name="arrow" />
        </view>
      </view>
      <view class="bg-panel-3">
            <view class="rounded-md">
              <view
                class="d-flex flex-wrap justify-between align-center p-x-lg p-y-md color-light"
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
              <view class="color-sell fn-12 p-x-lg">{{$t('recharge.a1')}}<span v-if="coin=='USDT'">{{text}}</span> {{coin}}{{$t('recharge.a2')}}</view>
              <view class="p-t-md  p-b-md ">
                <view class="fn-center">
                  <v-qr v-if="form.address" class="qr-box" :text="form.address||' '"></v-qr>
                </view>
                <!-- <view class="tips fn-center color-light m-y-xs">{{$t('assets.e6')}}</view> -->
                <view class="tips fn-center color-theme-1 m-t-md">{{$t('recharge.a3')}}</view>
              </view>
            </view>
            <view class="info p-b-md rounded-md">
              <view class="address p-t-xs">
                <!-- <view class="label w-100">{{$t('assets.e7')}}</view> -->
                <view class="border-r w-max autowidth p-x-md0 p-y-ms address-txt p-x-xs0 flex-fill color-light fn-center bg-form-panel-3 rounded-xs">{{form.address}}</view>
                <!-- #ifndef H5 -->
                <view class="w-10/12 bg-lin p-y-ms rounded-xs m-t-md autowidth color-black p-x-xs fn-16 fn-center" @click="$copy(form.address)">
                  {{$t('recharge.a4')}}<i class="iconfont color-black m-l-xs">&#xe706;</i>
                </view>
                <!-- #endif -->
                <!-- #ifdef H5 -->
                <view class="w-10/12 bg-lin p-y-ms rounded-xs m-t-md autowidth color-black p-x-xs fn-16 fn-center" @click="copy(form.address)">
                  {{$t('recharge.a4')}}<i class="iconfont color-black m-l-xs">&#xe706;</i>
                </view>
                <!-- #endif -->
              </view>
               <!--<view class="address d-flex align-center justify-between p-t-xs m-b-md">
                <view class="label w-100">{{$t('assets.e8')}}</view>
                <v-input
                  type="number"
                  class="border-b flex-fill fn-right p-y-xs color-light"
                  v-model="form.amount"
                />
              </view>-->
			  <!--updated-->
			  <view class="p-x-lg d-flex justify-between flex-wrap align-center p-y-xs">
			      <view class="color-light d-block w-max m-y-ms color-light fn-15">{{ $t("assets.e8") }}</view>
			      <v-input type="number" v-model="form.amount" class="bg-form-panel-3 p-sm color-light w-max fn-13 rounded-xs" :placeholder="$t('assets.e9')">
			  	  </v-input>
			  </view>
			  <!--updated-->
			  <view class="bot w-max bg-panel-3 p-lg0 box-size sbmbtn">
			      <v-button class="w-max m-y-md rounded-xs" block type="yellow" @click="recharge" ref="btn">{{ $t("common.submit") }}</v-button>
			  </view>
            </view>
			
            <view class="m-y-md rounded-md">
              <ul class="p-md0 fn-sm rounded-md m-y-xs p-x-lg">
                <li>·
                    <span v-if="coin=='USDT'">{{$t('common.c0',{num:'10  '+coin})}}</span>
                    <span v-if="coin=='BTC'">{{$t('common.c0',{num:'0.0005 '+coin})}}</span>
                    <span v-if="coin=='ETH'">{{$t('common.c0',{num:'0.01 '+coin})}}</span>。
                </li>
                <li>·{{$t('assets.f0')}}。{{$t('assets.f1',{num:10,name:coin})}}。</li>
                <li>·{{$t('assets.f3',{name:coin})}}。</li>
              </ul>
            </view>
          </view>
          <view class="m-b-lg" v-if="list.length">
            <view class="title d-flex justify-between p-x-md p-y-xs align-center color-light">
              <span class="fn-lg">{{$t('assets.f4')}}</span>
            </view>
            <view class="">
              <table class="w-max">
                <thead class="p-x-md">
                  <tr class="fn-sm p-x-md " >
                    <th class=" p-b-md fn-left p-l-md">{{$t('assets.c9')}}</th>
                    <th class=" p-b-md fn-left">{{$t('assets.d0')}}</th>
                    <th class=" p-b-md fn-right p-r-md">{{$t('assets.c0')}}</th>
                  </tr>
                </thead>
                <tbody class="">
                  <tr class="color-light trChange p-x-md"  v-for="(item) in list" :key="item.id">
                    <td class="p-y-xs p-l-md rounded-tl-sm rounded-bl-sm">{{item.datetime|parseTime}}</td>
                    <td >
                      <view v-if="item.status==0">{{$t('assets.d1')}}</view>
                      <view v-if="item.status==1" class="color-buy">{{$t('assets.d2')}}</view>
                      <view v-if="item.status==2" class="color-sell">{{$t('assets.d3')}}</view>
                    </td>
                    <td class="fn-right p-r-md rounded-tr-sm rounded-br-sm">
                      {{item.amount}}
                      <span class="color-default">({{item.coin_name}})</span>
                    </td>
                  </tr>
                  <tr v-if="loadMore">
                    <td colspan="3" class="fn-center p-xs link-active" @click="more">{{$t('assets.d4')}}</td>
                  </tr>
                </tbody>
              </table>
            </view>
      </view>
    </view>
    <coin-list @imgs="change" ref="coinList" v-model="coin" @close="coinListShow=false" v-show="coinListShow" />
    <van-toast id="van-toast" />
  </view>
</template>
<script>
import coinList from "./coin-list";
import Wallet from "@/api/wallet";
import formData from "@/utils/class/date";
import {mapGetters} from 'vuex'
import {handleClipboard} from '../../utils/class/copy.js'
export default {
  components: {
    coinList,
  },
  data() {
    return {
      coinListShow: false,
      coin: "",
      rechargeType: 1,
      address: "",
      form: {
        coin_id: "",
        amount: "",
        address: "",
      },
      list: [],
      page: 1,
      loadMore: true,
      text:'OMIN_'
    };
  },
  computed: {
    activeCoin() {
      if (!this.coin) return {};
      return this.$refs.coinList.coinList.find(
        (item) => item.coin_name == this.coin
      );
    },
    ...mapGetters(['themeStyle'])
  },
  filters: {
    parseTime(val) {
      return formData.parseTime(val);
    },
  },
  watch: {
    coin(n) {
      if (n) {
        this.form.address = "";
        if (this.coin != "USDT") {
          this.rechargeType = 1;
        }
        this.walletImage();
      }
    },
    rechargeType(e){
        if(e==1){
            this.text='OMIN_'
        }else if(e==2){
            this.text='ERC20_'
        }else{
            this.text='TRC20_'
        }
    }
  },
  methods: {
      copy(data){
        handleClipboard(data, event, () => {
          this.$toast.success(this.$t('common.a1'));
        }, () => {
          this.$toast.error(this.$t('common.a2'));
        })
      },
    changeRechargeType(idx) {
      this.rechargeType = idx;
      this.form.address = "";
      this.walletImage();
    },
    // 获取充币地址
    walletImage() {
      let data = {
        coin_id: this.activeCoin.coin_id,
        address_type: this.rechargeType,
      };
      Wallet.walletImage(data).then((res) => {
        this.form.address = res.data.address;
      });
    },
    // 充值
    recharge() {
      this.form.coin_id = this.activeCoin.coin_id;
      Wallet.recharge(this.form, { btn: this.$refs.btn })
        .then(() => {
		  this.form.amount = ""
          //this.$toast.success(this.$t('assets.d5')+"！");
		  uni.showToast({
		  title: this.$t('assets.d5')+"！",
		  icon:'none',
		  mask:true,
		  duration: 3000
		  });
          this.reset();
		  this.back()
		  
        })
        .catch(() => {});
    },
    reset() {
      this.loadMore = true;
      this.page = 1;
      this.depositHistory();
    },
    more() {
      this.page++;
      this.depositHistory();
    },
    // 获取充值记录
    depositHistory() {
      let data = {
        page: this.page,
      };
      Wallet.depositHistory(data).then((res) => {
        if (res.data.current_page == 1) this.list = [];
        this.list = [...this.list, ...res.data.data];
        if (res.data.data.length < res.data.per_page) this.loadMore = false;
      });
    },
    change(e){
        console.log(e)
    }
  },
  created() {
    this.depositHistory();
  },
};
</script>
<style lang="scss" scoped>
.sbmbtn{padding: 20px 20px 0 20px;}
.address {
  .label {
    white-space: nowrap;
  }
  .address-txt {
    word-break: break-all;
  }
}
.qr-box {
  height: 150px;
  width: 150px;
  margin: 0 auto;
  border: 4px solid $white;
}
.trChange:nth-child(2n-1){
   box-shadow: $shadow;
    border-radius: $border-radius-xs;
	td{
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
</style>