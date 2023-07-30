<template>
  <v-page>
     <view class="d-flex bg-panel-3 p-md fa justify-between align-center fn-18 color-light flex-wrap">
         <view class="w-max" style="height: var(--status-bar-height)"></view>
       <view @click="$emit('symbol')" class="d-flex align-center">
         <i class="iconfont color-light fn-bold fn-18">&#xe655;</i>
         <text class="fn-bold">{{ symbol }}</text>
         <text class="fn-13 m-l-xs p-y-2" :class="increase.increase < 0 ? 'color-sell bg-sell-transparent' : 'color-buy bg-buy-transparent'">{{increase.increaseStr}}</text>
       </view>
       <view class="d-flex fn-20 color-theme-1">
         <view class="m-r-xs" @click="$emit('option')">
           <van-icon v-if="isCoolect" name="star" />
           <van-icon v-else class="color-light" name="star-o" />
         </view>
         <v-link
           v-if="symbol"
           tag="view"
           class=""
           :to="{
             path: '/pages/exchange/index',
             query: { code: symbol, contract: 1 },
           }"
         >
           <van-icon name="chart-trending-o" />
         </v-link>
       </view>
     </view>
    <view class="h-70"></view>
    <view class="layout-main">
        <view class="w-max" style="height: var(--status-bar-height)"></view>
        <view
          class="m-b-md p-md bg-form-panel-3 fn-sm m-x-md rounded-sm d-flex justify-between"
        >
          <view class="item">
            <view class="label">{{ $t("contract.d4") }}(USDT)</view>
            <view class="num fn-md color-light m-t-md d-flex align-center">{{
              accountInfo.account_equity || "--"
            }}
              <van-icon name="exchange" @click="_router.push('/pages/transfer/index')" class="p-l-xs color-theme-1"/>
            </view>
          </view>
          <view class="item">
            <view class="label">{{ $t("contract.d5") }}(USDT)</view>
            <view class="num fn-md color-light m-t-md">{{
              accountInfo.totalUnrealProfit
            }}</view>
          </view>
          <view class="item fn-right">
            <view class="label">
              {{ $t("contract.d6") }}
              <van-icon class="fn-xs color-theme-1 m-l-xs" name="info-o" />
            </view>
            <view class="num fn-md color-light m-t-md">{{
              accountInfo.riskRate || "0%"
            }}</view>
          </view>
        </view>
        <view class="d-flex">
          <view class="w-6/12 p-l-md box-size">
            <view class="d-flex fn-center m-b-xs h-30 color-light">
              <v-picker
                :list="commissionTypes"
                v-model="form.type"
                class="w-60 m-r-xs d-flex justify-center align-center border-r  bg-form-panel-3 p-y-xxs rounded "
              >
                <text class="fn-bold fn-md p-y-xxs">
                    {{ activeCommission.label }}
                </text>
                <i class="iconfont">&#xe6e9;</i>
              </v-picker>
              <v-picker
                :list="lever_rage"
                v-model="form.lever_rate"
                @change="openNum"
                class="w-30 flex-fill d-flex justify-center align-center bg-form-panel-3 p-y-xxs rounded "
              >
                <text class="fn-bold">{{ form.lever_rate }} X</text>
                <i class="iconfont">&#xe6e9;</i>
              </v-picker>
            </view>
            <view class="m-b-xs">
              <!-- <view class="label fn-sm m-b-xs">{{ $t("contract.d1") }}</view> -->
              <!-- 限价 -->
              <van-stepper
                class="d-flex justify-between"
                :min="0"
                input-width="61%"
                step="0.01"
                :value="form.entrust_price"
                @change="form.entrust_price=$event.detail"
                v-if="form.type == 1"
              />
              <!-- 市价 -->
              <v-input
                v-if="form.type == 2"
                disabled
                :value='$t("first.a4")'
                class="h-30 p-y-xxs rounded fn-center fn-bold color-light bg-form-panel-3"
              ></v-input>
            </view>
            <view>
              <v-input
                :placeholder="$t('contract.d2')"
                v-model="form.amount"
                class="h-30 p-x-xs p-y-xxs rounded bg-form-panel-3"
              >
                <template #right>
                  <span class="color-light fn-bold"> {{ $t("contract.d8") }} </span>
                </template>
              </v-input>
            </view>
            <view class="m-b-xs">
              <view class="m-t-xs">
                <view class="d-flex justify-between fn-sm">
                  <text>0%</text>
                  <text>100%</text>
                </view>
                <view class="d-flex justify-center">
                 <bing-progress
                    activeColor="#60c08c"
                    barBorderRadius="20px"
                    handleWidth="12px"
                    handleHeight="12px"
                    handleColor="#60c08c"
                    borderRadius="20px"
                    width="150px"
                    :showInfo="false"
                    strokeWidth="2px"
                    noActiveColor="#484859"
                    @dragging="sliderChange"
                    :value="activeStep"
                  />
                </view>
                <!-- <el-slider
                  :value="activeStep"
                  @input="sliderChange"
                  :step="20"
                  show-stops
                ></el-slider> -->
                <!-- :format-tooltip="tooltip" -->
              </view>
            </view>
            <!-- <view class="d-flex fn-sm m-b-xs color-light justify-between">
              <span class="color-default">{{ $t("contract.d9") }}</span>
              <span>{{ margin }}</span>
            </view> -->
            <view class="d-flex flex-wrap">
                <view class="fn-12">
                    {{$t('first.a3')}} <text class="color-theme-1">({{$t('reg.b4')}})</text>
                </view>
                <view class="d-flex justify-between m-y-xs">
                    <v-input
                      :placeholder="$t('contract.i4')"
                      v-model="form.tp_trigger_price"
                      class="h-30 p-x-xs rounded bg-form-panel-3"
                    >
                    </v-input>
                    <v-input
                      :placeholder="$t('contract.i7')"
                      v-model="form.sl_trigger_price"
                      class="h-30 p-x-xs m-l-xs rounded bg-form-panel-3"
                    >
                    </v-input>
                </view>
            </view>
            <view class="m-y-xs">
              <v-button
                type="green"
                ref="btn1"
                @click="ifOpenPosition(1)"
                size="small"
                block
                class="w-max rounded"
              >
                {{ $t("contract.c0") }}
                <span class="fn-10">({{ $t("contract.e0") }})</span>
              </v-button>
              <view class="fn-sm m-t-xs d-flex justify-between">
                <view class="">
                    {{ $t("contract.e1") }}
                </view>
                <view class="">
                    {{ maxNum }}{{ $t("contract.d8") }}
                </view>
              </view>
            </view>
            <view class="m-b-xs">
              <v-button
                type="red"
                ref="btn2"
                @click="ifOpenPosition(2)"
                size="small"
                block
                class="w-max rounded"
              >
                {{ $t("contract.c2") }}
                <span class="fn-10">({{ $t("contract.e2") }})</span>
              </v-button>
              <view class="fn-sm m-t-xs d-flex justify-between">
                <view class="">
                    {{ $t("contract.e3") }}
                </view>
                <view class="">
                    {{ maxNum }}{{ $t("contract.d8") }}
                </view>
              </view>
            </view>
            <!-- <view
              class="m-b-xs border-t border-b p-y-xs d-flex justify-between align-center"
            >
              <p class="fn-sm span"
                >
                <span>{{ $t("contract.e4") }}</span>
                <span>{{ accountInfo.usable_balance }}USDT</span>
                </p
              >
              <v-button
                size="mini"
                plain
                type="green"
                class="rounded-xs span-next"
                @click="_router.push('/pages/transfer/index')"
                >{{ $t("contract.e5") }}</v-button
              >
            </view> -->
          </view>
          <view class="w-6/12 p-r-md p-l-md box-size">
            <sell-and-buy
              @price="form.entrust_price = $event"
              :sellList="sellList"
              :buyList="buyList"
              :max="7"
            >
              <view class="fn-lg color-buy">{{ newPrice.price }}</view>
            </sell-and-buy>
          </view>
        </view>
        <view class="h-20"></view>
        <!-- <trade-list :tradeList="tradeList" /> -->
        <view class="p-b-lg">
            <view class=" d-flex justify-between align-center p-x-md p-t-lg bor5 p-b-xs">
                <view class="d-flex w-75">
                    <text class="m-x-xs w-25 fn-center" @click="active=0" :class="active==0?'fn-bold fn-15 p-b-xs bor5-active color-light':''">{{$t('first.a5')}}</text>
                    <text class="m-x-xs w-25 fn-center" @click="active=1" :class="active==1?'fn-bold fn-15 p-b-xs bor5-active color-light':''">{{$t('exchange.a4')}}</text>
                    <text class="m-x-xs w-25 fn-center" @click="active=2" :class="active==2?'fn-bold fn-15 p-b-xs bor5-active color-light':''">{{$t('exchange.a5')}}</text>
                </view>
                <v-link tag="view"
                :to="{
                    path: '/pages/exchange/his',
                    query: { symbol: symbol },
                }" class="d-flex align-center"><van-icon name="orders-o" class="fn-18"/></v-link>
            </view>
            <!-- <not-data v-if="!list.length"></not-data> -->
            <!-- <view v-for="item in (list)" class="item m-md box-shadow bg-panel-3 rounded-md" :key="item.order_no">
              <view class="p-x-md p-y-xs">
                <view class="row d-flex m-y-xs">
                    <view class="d-flex w-50 align-end">
                      <view v-if="item.entrust_type==1" class="suatus color-buy fn-16 m-r-xs">买入</view>
                      <view v-if="item.entrust_type==2" class="suatus color-sell fn-16 m-r-xs">卖出</view>
                      <view class="color-light fn-bold">{{item.symbol}}</view>
                    </view>
                    <view class="d-flex w-50">
                      <view class="label">状态：</view>
                      <view class="color-light">
                          {{item.status_text}}
                      </view>
                    </view>
                </view>
                <view class="row d-flex m-y-xs">
                    <view class="d-flex w-50">
                      <view class="label">{{$t('exchange.b7')}}：</view>
                      <view class="color-light">{{item.entrust_price}}</view>
                    </view>
                    <view class="d-flex w-50">
                      <view class="label">{{$t('exchange.b8')}}：</view>
                      <view class="color-light">
                        <template v-if="item.type==1">{{$t('exchange.b9')}}</template>
                        <template v-if="item.type==2">{{$t('exchange.c0')}}</template>
                      </view>
                    </view>
                </view>
                <view class="row d-flex m-y-xs">
                    <view class="d-flex w-50">
                      <view class="label">数量：</view>
                      <view class="color-light fn-bold">{{item.amount}}</view>
                    </view>
                    <view class="d-flex w-50 align-center">
                      <view class="label">时间：</view>
                      <view class="color-light">
                        <view class="color-light fn-12">{{item.created_at}}</view>
                      </view>
                    </view>
                </view>
              </view>
            </view> -->
            <template v-if="active==0">
                <view
                  class="item border-b bg-panel-3"
                  v-for="item in (list)"
                  :key="item.id"
                >
                  <view class="p-x-md p-y-xs">
                    <view class="row d-flex m-y-xs">
                        <view class="d-flex w-50 align-end">
                          <view v-if="item.side==1" class="suatus color-buy fn-16 m-r-xs">{{$t('contract.c0')}}</view>
                          <view v-if="item.side==2" class="suatus color-sell fn-16 m-r-xs">{{$t('contract.c2')}}</view>
                          <view class="color-light fn-bold">{{item.pair_name}}</view>
                        </view>
                        <view class="d-flex w-50">
                          <view class="label">{{$t('contract.a1')}}：</view>
                          <view class="color-light">
                              {{item.hold_position}}
                          </view>
                        </view>
                    </view>
                    <view class="row d-flex m-y-xs">
                        <view class="d-flex w-50">
                          <view class="label">{{$t('contract.b1')}}：</view>
                          <view class="color-light">{{item.position_margin}}</view>
                        </view>
                        <view class="d-flex w-50">
                          <view class="label">{{$t('first.a9')}}：</view>
                          <view class="color-light">
                              {{item.lever_rate}}X
                          </view>
                        </view>
                    </view>
                    <view class="row d-flex m-y-xs">
                        <view class="d-flex w-50">
                          <view class="label">{{$t('contract.b2')}}：</view>
                          <view class="color-light">{{item.fee}}</view>
                        </view>
                        <view class="d-flex w-50 align-center">
                          <view class="label">{{$t('exchange.d4')}}：</view>
                          <view class="color-light">
                            <view class="color-light fn-12">{{item.created_at}}</view>
                          </view>
                        </view>
                    </view>
                  </view>
                </view>
            </template>
            <van-empty v-if="!list.length&&active==0" description="" />
            
            <template v-if="active==1">
                <view
                  class="item border-b bg-panel-3"
                  v-for="item in (listCurrent)"
                  :key="item.id"
                >
                  <view class="p-x-md p-y-xs">
                    <view class="row d-flex m-y-xs">
                        <view class="d-flex w-50 align-end">
                          <view v-if="item.side==1" class="suatus color-buy fn-16 m-r-xs">{{$t('exchange.c0')}}</view>
                          <view v-if="item.side==2" class="suatus color-sell fn-16 m-r-xs">{{$t('exchange.c2')}}</view>
                          <view class="color-light fn-bold">{{item.symbol}}/USDT</view>
                        </view>
                        <view class="d-flex w-50">
                          <view class="label">{{$t('assets.d0')}}：</view>
                          <view class="color-light">
                              {{item.status_text}}
                          </view>
                        </view>
                    </view>
                    <view class="row d-flex m-y-xs">
                        <view class="d-flex w-50">
                          <view class="label">{{$t('exchange.b7')}}：</view>
                          <view class="color-light">{{item.entrust_price}}</view>
                        </view>
                        <view class="d-flex w-50">
                          <view class="label">{{$t('exchange.b8')}}：</view>
                          <view class="color-light">
                            <template v-if="item.type==1">{{$t('exchange.b9')}}</template>
                            <template v-if="item.type==2">{{$t('exchange.c0')}}</template>
                          </view>
                        </view>
                    </view>
                    <view class="row d-flex m-y-xs">
                        <view class="d-flex w-50">
                          <view class="label">{{$t('contract.d2')}}：</view>
                          <view class="color-light fn-bold">{{item.amount}}</view>
                        </view>
                        <view class="d-flex w-50 align-center">
                          <view class="label">{{$t('exchange.d4')}}：</view>
                          <view class="color-light">
                            <view class="color-light fn-12">{{item.created_at}}</view>
                          </view>
                        </view>
                    </view>
                  </view>
                </view>
            </template>
            <van-empty v-if="!listCurrent.length&&active==1" description="" />
            <template v-if="active==2">
                <view
                  class="item border-b bg-panel-3"
                  v-for="item in (listHistory)"
                  :key="item.id"
                >
                  <view class="p-x-md p-y-xs">
                    <view class="row d-flex m-y-xs">
                        <view class="d-flex w-50 align-center">
                          <view v-if="item.side==1" class="suatus color-buy fn-16 m-r-xs d-flex align-center">{{$t('exchange.c0')}}<text class="color-light fn-bold fn-left">{{item.symbol}}/USDT</text></view>
                          <view v-if="item.side==2" class="suatus color-sell fn-16 m-r-xs">{{$t('exchange.c2')}}<text class="color-light fn-bold fn-left">{{item.symbol}}/USDT</text></view>
                          
                        </view>
                        <view class="d-flex w-50">
                          <view class="label">{{$t('assets.d0')}}：</view>
                          <view class="color-light">
                              {{item.status_text}}
                          </view>
                        </view>
                    </view>
                    <view class="row d-flex m-y-xs">
                        <view class="d-flex w-50">
                          <view class="label">{{$t('exchange.b7')}}：</view>
                          <view class="color-light">{{item.entrust_price}}</view>
                        </view>
                        <view class="d-flex w-50">
                          <view class="label">{{$t('exchange.b8')}}：</view>
                          <view class="color-light">
                            <template v-if="item.type==1">{{$t('exchange.b9')}}</template>
                            <template v-if="item.type==2">{{$t('exchange.c0')}}</template>
                          </view>
                        </view>
                    </view>
                    <view class="row d-flex m-y-xs">
                        <view class="d-flex w-50">
                          <view class="label">{{$t('exchange.c5')}}：</view>
                          <view class="color-light fn-bold">{{item.amount}}</view>
                        </view>
                        <view class="d-flex w-50 align-center">
                          <view class="label">{{$t('exchange.d4')}}：</view>
                          <view class="color-light">
                            <view class="color-light fn-12">{{item.created_at}}</view>
                          </view>
                        </view>
                    </view>
                  </view>
                </view>
            </template>
            <van-empty v-if="!listHistory.length&&active==2" description="" />
        </view>
    </view>
  </v-page>
</template>
<script>
import sellAndBuy from "@/pages/exchange/sell-and-buy";
import tradeList from "@/pages/exchange/trade-list";
import Contract from "@/api/contract";
import math from "@/utils/class/math";
import { mapState } from "vuex";
import lodash from "lodash";
import bingProgress from "@/components/bing-progress/bing-progress.vue";
export default {
  name: "open-position",
  components: {
    sellAndBuy,
    tradeList,
    bingProgress,
  },
  props: {
    query: {
      default: () => {},
      type: Object,
      required: false,
    },
    collect: {
      default: () => [],
      type: Array,
      required: false,
    },
    isShow: {
      default: false,
      type: Boolean,
      required: false,
    },
    increase:{
        default: {},
        type: Object,
        required: false,
    }
  },
  data() {
    return {
      sellList: [],
      buyList: [],
      tradeList: [],
      show: false,
      accountInfo: {},
      // 杠杆倍数
      lever_rage: [],
      // 最多可开张数
      maxNum: 0,
      form: {
        type: 2,
        entrust_price: "",
        amount: "",
        lever_rate: "",
        tp_trigger_price: "",
        sl_trigger_price: "",
      },
      unSymbol: "",
      newPrice: {},
      dtime: null,
      unit_amount: 1,
      value:0,
      list:[],
      listCurrent:[],
      listHistory:[],
      active:0
    };
  },
  computed: {
    commissionTypes() {
      return [
        { label: this.$t("contract.f5"), value: 1 },
        { label: this.$t("contract.f6"), value: 2 },
      ];
    },
    ...mapState({
      ws: "ws1",
    }),
    symbol() {
      return this.query.symbol;
    },
    symbolLeft() {
      if (!this.symbol) return "";
      return this.symbol.split("/")[0];
    },
    // 是否为自选
    isCoolect() {
      return this.collect.map((item) => item.pair_name).includes(this.symbol);
    },
    // 选中的委托类型
    activeCommission() {
      return this.commissionTypes.find((item) => this.form.type == item.value);
    },
    // 保证金
    margin() {
      return math.omitTo(
        (this.form.amount * this.unit_amount) / this.form.lever_rate,
        4
      );
    },
    // 所占百分比
    activeStep() {
      return (this.form.amount / this.maxNum) * 100;
    },
    isLogin() {
      return Boolean(uni.getStorageSync("token"));
    },
    activeStep() {
      if (!this.form.amount || !this.maxNum) return 0;
      let num = (this.form.amount / this.maxNum) * 100;
      return num;
    },
  },
  watch: {
    symbol() {
      if (this.unSymbol) {
        this.unLink(this.unSymbol);
      }
      this.getMarketInfo();
      this.contractAccount();
      this.getSymbolDetail();
      this.holdPosition();
    },
    // 当前页面显示就订阅
    isShow(n) {
      if (n) {
        this.getMarketInfo();
        this.openNum();
      } else {
        if (this.unSymbol) {
          this.unLink(this.unSymbol);
        }
      }
    },
    active(e){
        if(e==0){
            this.holdPosition()
        }else if(e==1){
            this.getCurrentEntrust()
        }else{
            this.getHistoryEntrust()
        }
    }
  },
  methods: {
      // 设置数量
      // sliderChange($ev) {
      //   this.form.amount = Math.round((this.maxNum * $ev) / 100)||'';
      // },
      // tooltip($ev) {
      //   return Math.round($ev) + "%";
      // },
    status(status) {
      switch (status) {
        case 0:
          return this.$t('contract.b6');
        case 1:
          return this.$t('contract.b7');
        case 2:
          return this.$t('contract.b8');
        case 3:
          return this.$t('contract.b9');
      }
    },
    //持仓
    holdPosition() {
        console.log(1)
        var market=this.symbol.split('/')[0]
        let data = {
            symbol: market,
        };
        Contract.holdPosition(data).then((res) => {
            this.list = res.data.filter((item) => item.hold_position);
        });
    },
    //当前委托
    getCurrentEntrust(){
        Contract.getCurrentEntrust().then((res) => {
          this.listCurrent=res.data.data
        });
    },
    // 历史委托
    getHistoryEntrust(){
        Contract.getHistoryEntrust().then((res) => {
          this.listHistory=res.data.data
        });
    },
    cals(side, order_type) {
      // order_type - side
      let map = {
        "1-1": this.$t('contract.c0'),
        "1-2": this.$t('contract.c1'),
        "2-1": this.$t('contract.c2'),
        "2-2": this.$t('contract.c3'),
      };
      return map[`${side}-${order_type}`];
    },
    // 撤单
    ifCancelEntrust(item){
      this.$dialog.confirm({
        title:this.$t('contract.c4'),
        message:this.$t('contract.c5')+'？',
    	confirmButtonText:  this.$t("common.confirm"), //改变确认按钮上显示的文字
    	cancelButtonText: this.$t("common.cancel")
      }).then(()=>{
      this.cancelEntrust(item)    
      })
    },
    cancelEntrust(item){
      let data = {
        symbol:item.symbol,
        entrust_id:item.id
      }
      Contract.cancelEntrust(data).then(()=>{
        this.$refs.vPag.resetData()
        this.$toast(this.$t('contract.c6'))
      })
    },
    // 获取买卖盘
    getMarketInfo() {
      let data = {
        symbol: this.symbolLeft,
      };
      Contract.getMarketInfo(data,{loading:true}).then((res) => {
        this.sellList = res.data.swapSellList;
        this.buyList = res.data.swapBuyList;
        this.tradeList = res.data.swapTradeList;
        this.newPrice = this.tradeList[0] || {};
        this.form.entrust_price = this.newPrice.price;
        this.linkSocket(data.symbol);
      });
    },
    // 获取合约账户信息
    contractAccount(boo) {
      if (!this.isLogin) return;
      if (!this.isShow) return;
      let data = {
        symbol: this.symbolLeft,
      };
      Contract.contractAccount(data, { loading: !boo,toast:false }).then((res) => {
        this.accountInfo = res.data;
        if (!boo) {
          this.form.lever_rate = res.data.lever_rate;
          if (this.form.lever_rate) {
            this.openNum();
          }
        }
      });
    },
    // 获取合约详情
    getSymbolDetail() {
      if (!this.symbolLeft) return;
      let data = {
        symbol: this.symbolLeft,
      };
      Contract.getSymbolDetail(data).then((res) => {
        this.unit_amount = res.data.unit_amount;
        if (!this.lever_rage.length) {
          this.lever_rage = res.data.lever_rage.map((item) => ({
            label: item,
            value: item,
          }));
        }
        this.$emit("getSymbolDetail", res.data);
        if (!this.form.lever_rate) {
          this.form.lever_rate = this.lever_rage[0].value;
          this.openNum();
        }
      });
    },
    // 获取可开启张数
    openNum() {
      if (!this.isLogin) return;
      let data = {
        symbol: this.symbolLeft, //ETH
        lever_rate: this.form.lever_rate, //10
      };
      Contract.openNum(data,{toast:false}).then((res) => {
        this.maxNum = res.data;
      });
    },
    // 开仓提示
    ifOpenPosition(side) {
      this.$dialog
        .confirm({
          title: this.$t("contract.c4"),
          message: `${this.$t("contract.f7")}${
            this.form.type == 1
              ? this.form.entrust_price
              : this.$t("contract.d7")
          }${this.$t("contract.f8")}${this.form.lever_rate}${this.$t(
            "contract.f9"
          )}${this.form.amount}${this.$t("contract.d8")}${
            side == 1 ? this.$t("contract.g0") : this.$t("contract.g1")
          }?`,
		  confirmButtonText:  this.$t("common.confirm"), //改变确认按钮上显示的文字
		  cancelButtonText: this.$t("common.cancel")
        })
        .then(() => {
          this.openPosition(side);
        });
    },
    // 开仓
    openPosition(side) {
      let data = {
        side,
        symbol: this.symbolLeft,
        ...this.form,
      };
      let btn;
      if (side == 1) {
        //开多
        btn = this.$refs.btn1;
      } else {
        // 开空
        btn = this.$refs.btn2;
      }
      Contract.openPosition(data, { btn }).then(() => {
        this.contractAccount();
        this.getCurrentEntrust()
        this.$toast(this.$t("contract.g2"));
      });
    },
    sliderChange($ev) {
      this.form.amount = Math.round((this.maxNum * $ev.value) / 100);
    },
    // 链接socket
    linkSocket(symbol) {
      this.unSymbol = symbol;
      // 订阅买线
      this.ws.send({
        cmd: "sub",
        msg: `swapBuyList_${symbol}`,
      });
      // 订阅卖线
      this.ws.send({
        cmd: "sub",
        msg: `swapSellList_${symbol}`,
      });
      // 订阅成交
      this.ws.send({
        cmd: "sub",
        msg: `swapTradeList_${symbol}`,
      });
    },
    // 取消订阅
    unLink(symbol) {
      // 取消买线
      this.ws.send({
        cmd: "unsub",
        msg: `swapBuyList_${symbol}`,
      });
      // 取消卖线
      this.ws.send({
        cmd: "unsub",
        msg: `swapSellList_${symbol}`,
      });
      // 取消成交
      this.ws.send({
        cmd: "unsub",
        msg: `swapTradeList_${symbol}`,
      });
    },
    socketMessage() {
      // 节流防抖
      let buyFun = lodash.throttle((data) => {
        this.buyList = data;
      }, 500);
      let sellFun = lodash.throttle((data) => {
        this.sellList = data.sort((a, b) => b.price - a.price);
      }, 500);
      this.ws.on("message", (res) => {
        if (!this.isShow) return;
        let symbol = this.symbolLeft;
        let { data, sub } = res;
        switch (sub) {
          case `swapBuyList_${symbol}`:
            buyFun(data);
            break;
          case `swapSellList_${symbol}`:
            sellFun(data);
            break;
          case `swapTradeList_${symbol}`:
            this.tradeList.unshift(data);
            this.tradeList.pop();
            this.newPrice = data;
            break;
        }
      });
    },
    personalCenter(){
        
    }
  },
  mounted() {
      console.log(1)
    if (this.symbol) {
      this.holdPosition()
      this.getMarketInfo();
      this.contractAccount();
      this.getSymbolDetail();
      console.log(4)
    }
    this.socketMessage();
    this.dtime = setInterval(() => {
      this.contractAccount(true);
    }, 3000);
  },

  destroyed() {
    clearInterval(this.dtime);
    this.unLink(this.unSymbol);
  },
};
</script>
<style lang="scss" scoped>
::v-deep .van-step--horizontal {
  .van-step__circle-container {
    background-color: transparent;
    .van-icon-checked {
      width: 14px;
      height: 14px;
      position: relative;
      background: rgba($green, 0.7);
      font-size: 0;
      display: block;
      border-radius: 20px;
      bottom: 9px;
      &::after {
        content: "";
        display: block;
        font-size: 0;
        width: 8px;
        height: 8px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: $green;
        border-radius: 20px;
      }
    }
  }
  .van-step__line {
    bottom: 8px;
  }
}
/deep/ .van-stepper {
  display: flex;
  justify-content: space-between;
  .minus-class,
  .input-class,
  .plus-class {
    background: $form-panel-4;
  }
}
.span{
    display: block;
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    span{
        width: 100%;
        display: block;
    }
}
.span-next{
    width: 30%;
}
.w-60{
    width: 60%;
}
.w-30{
    width: 30%;
}
.p-y-xxs{
    padding: 5px 0;
}
.p-y-2{
    padding: 2px 5px;
    border-radius: 3px;
}
/deep/ .el-slider__stop{
    width: 5px;
    height: 10px;
    border-radius: 0;
    top: -2px;
    background-color: $form-panel-4;
}
.w-50{
    width: 48%;
}
.h-100{
    height: 100%;
}
.bor5{
    border-bottom: 5px solid $border-color;
}
.bor5-active{
    border-bottom: 5px solid $theme-2;
}
::v-deep .van-stepper{
    background-color: $form-panel-3;
    border-radius: 50px;
    overflow: hidden;
    padding: 7px;
    font-weight: bold;
}
::v-deep .plus-class{
    background-color: $panel-4!important;
    border-radius: 50%;
}
::v-deep .minus-class{
    background-color: $panel-4!important;
    border-radius: 50%;
}
::v-deep .van-stepper__input{
    background-color: $form-panel-3!important;
}
.fa{
    position: fixed;
    top: 0px;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
}
.w-25{
    width: 25%;
}
.w-75{
    width: 75%;
}
</style>