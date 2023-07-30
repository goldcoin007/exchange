<template>
  <v-page>
      <view class="d-flex p-x-md fa p-y-md justify-between align-center fn-18 bg-panel-3 color-light flex-wrap border-b">
        <view class="w-max" style="height: var(--status-bar-height)"></view>
        <view @click="$emit('symbol')" class="d-flex align-center">
          <i class="iconfont color-light fn-bold fn-18">&#xe655;</i>
          <text class="fn-bold">{{ symbol }}</text>
          <text class="fn-10 m-l-xs p-y-2" :class="increase.increase < 0 ? 'color-sell bg-sell-transparent' : 'color-buy bg-buy-transparent'">{{increase.increaseStr}}</text>
        </view>
        <view class="d-flex fn-20 color-theme-1">
          <view class="m-r-xs" @click="$emit('option')">
            <van-icon v-if="isCoolect" name="star" />
            <van-icon v-else class="color-default" name="star-o" />
          </view>
          <v-link
            tag="div"
            v-if="symbol"
            :to="{ path: '/pages/exchange/index', query: { code: symbol} }"
          >
            <van-icon name="chart-trending-o" />
          </v-link>
        </view>
      </view>
      <view class="w-max" style="height: var(--status-bar-height)"></view>
      <!-- #ifdef H5 -->
      <view class="h-70 w-max"></view>
      <!-- #endif -->
      <!-- #ifdef APP-PLUS -->
      <view class="h-35"></view>
      <!-- #endif -->
      <view class="layout-main">
          <scroll-view
            @refresherrefresh="onRefresh"
            :refresher-enabled="refresherEnabled&&scrollTop<50"
            :refresher-triggered="refreshing"
            refresher-background="transparent"
            :refresher-threshold="50"
          >
          <view class="d-flex p-x-md p-b-md">
            <!-- 买卖表单 -->
            <view class="w-6/12 box-size" style="position: relative;">
					<view class="tixing1 bg-form-panel-4" :class="{' bg-green': form.direction == 'buy'}"></view>
					<view class="tixing2 bg-form-panel-4 " :class="{'bg-red ': form.direction == 'sell'}"
					 style="position: absolute;right: 0px;top: 0px;"></view>
              <view
                class="d-flex fn-center justify-between rounded-xs overflow-hidden tixingtxt"
              >
                <view
                  class="w-6/12 h-34 d-flex justify-center align-center t-left"
                  :class="{
                    ' color-plain': form.direction == 'buy',
                  }"
                  @click="
                    form.direction = 'buy';
                    getDefaultPrice();
                  "
                  >{{ $t("exchange.c3") }}</view>
                <view
                  class="color-gray w-6/12 h-34 d-flex justify-center align-center"
                  :class="{
                    ' color-plain': form.direction == 'sell',
                  }"
                  @click="
                    form.direction = 'sell';
                    getDefaultPrice();
                  "
                  >{{ $t("exchange.c4") }}</view>
              </view>
              <!-- <v-picker :list="typeList" v-model="form.type" class="p-y-md fn-14">
                {{ activeType.label }}
                <i class="iconfont" style="margin-left: 5px;">&#xe6e9;</i>
              </v-picker> -->
              <v-dropdwon class="w-50 m-r-xs p-y-xxs" :list="typeList" @onClick="dropDownChange">
              </v-dropdwon>
              <template v-if="form.type == 0">
                <view>
                  <van-stepper
                    :min="0"
                    :value="form.entrust_price"
                    @change="form.entrust_price=$event.detail"
                    input-width="61%"
                    step="0.01"
                  />
                  <view class="tips fn-xs  m-t-xs">≈{{ $t("currency.b9") }}{{ omitTo(form.entrust_price*price_cny,2) }}</view>
                </view>
                <view class="m-t-ms">
                  <v-input
                    v-model="form.amount"
                    @input="sliderActive=-1"
                    class="h-30 p-x-sm rounded p-y-xxs color-light bg-form-panel-3"
                    :placeholder="$t('exchange.c5')"
                  >
                    <template #right>
                      <view class="color-default fn-bold color-light">{{
                        activeCoin.coin_name
                      }}</view>
                    </template>
                  </v-input>
                </view>
              </template>
              <template v-else>
                <view>
                  <v-input
                    disabled
                    class="h-30 p-x-sm rounded p-y-xxs fn-center color-light bg-form-panel-3"
                    :placeholder="$t('exchange.c6')"
                  ></v-input>
                </view>
                <!-- <view class="tips fn-xs m-t-xs">{{ targetCoin }}</view> -->
                <view class="m-t-md">
                  <v-input
                    @input="sliderActive=-1"
                    v-model="form.amount"
                    class="h-30 p-x-sm rounded p-y-xxs color-light bg-form-panel-3"
                    :placeholder="
                      form.direction =='buy'?$t('exchange.c7'):$t('exchange.c5')
                    "
                  >
                    <template #right>
                      <view class="color-default fn-bold color-light" v-show="form.direction == 'sell'">{{currentCoin}}</view>
                      <view class="color-default fn-bold color-light" v-show="form.direction == 'buy'">{{targetCoin}}</view>
                    </template>
                  </v-input>
                </view>
              </template>
              <view>
                <view class="tips fn-10 m-y-ms d-flex justify-between">
                    <view class="">
                        {{ $t("exchange.c8") }}：
                    </view>
                    <view class="">
                        {{ usable }}{{ usableUnit }}
                    </view>
                </view>
              </view>
              <view>
               <view class="m-t-xs">
                  <!-- <view class="d-flex justify-between fn-sm">
                    <text>0%</text>
                    <text>100%</text>
                  </view> -->
                  <view class="d-flex justify-between">
                      <view class="borders w-23 rounded-3 fn-center p-y-xs fn-12" v-for="(item,index) in progress" @click="sliderChange(item,index)" :class="sliderActive==index?'color-theme-1 active':''">
                          {{item}}%
                      </view>
                    <!-- <bing-progress activeColor="#60c08c" barBorderRadius="20px" handleWidth="12px" handleHeight="12px" handleColor="#60c08c"  borderRadius="20px" width="150px" :showInfo="false" strokeWidth="2px" noActiveColor="#484859" @dragging="sliderChange" :value="activeStep"/> -->
                  </view>
                </view>
              </view>
              <view class="d-flex fn-sm m-y-ms color-light justify-between">
                <span>{{ $t("exchange.c9") }}：</span>
                <span v-if="form.type == 1 && form.direction == 'sell'"
                  >{{ totalMoney }} {{ currentCoin }}</span
                >
                <span v-else>{{ totalMoney }} {{ targetCoin }}</span>
              </view>
              <template v-if="isLogin">
                <v-button
                  size="small"
                  :type="form.direction == 'buy' ? 'green' : 'red'"
                  class="w-max rounded-md"
                  block
                  @click="storeEntrust"
                  ref="btn"
                  >{{
                    form.direction == "buy"
                      ? this.$t("exchange.c3")
                      : this.$t("exchange.c4")
                  }}
                  {{ activeCoin.coin_name }}</v-button
                >
              </template>
              <template v-else>
                <v-button
                  size="normal"
                  block
                  to="/pages/login/index"
                  :type="form.direction == 'buy' ? 'green' : 'red'"
                  class="w-max rounded-md"
                  >{{ $t("exchange.d0") }} / {{ $t("reg.b9") }}</v-button
                >
              </template>
          
              <v-link
                :to="{ path: '/pages/exchange/index', query: { code: symbol} }"
                class=" d-block m-t-md"
              >
                <view class="fn-10 p-y-xs"
                  >{{ symbol }} {{ $t("exchange.d1") }}</view
                >
                <view class="h-110">
                  <time-sharing
                    :query="query"
                    ref="highChart"
                    :tradeList="tradeList"
                  ></time-sharing>
                </view>
              </v-link>
            </view>
            <!-- 深度列表 -->
            <view class="w-6/12 p-l-md d-flex flex-col dep-list">
              <sell-and-buy :buyList="buyList" :max="symbol=='GITP/USDT'?11:8" :sellList="sellList" :symbol="symbol" v-on:price="getPrice($event)" :contract="0">
                <view
                  class="fn-lg row fn-bold"
                  :class="newPrice.increase < 0 ? 'color-sell' : 'color-buy'"
                >
                  {{ newPrice.price }}
                </view>
                <view class="fn-xs" v-if="newPrice.price">
                  ≈ {{ $t("currency.b9") }}{{ omitTo(newPrice.price * price_cny, 2) }}
                </view>
              </sell-and-buy>
            </view>
          </view>
          <!-- <view class="h-20 "></view> -->
          <!-- <view class="p-md">
            <view class=" fn-lg m-b-md">{{ $t("exchange.d3") }}</view>
            <table class="w-max">
              <thead class="fn-xs">
                <tr>
                  <td class="p-y-xs p-l-md">{{ $t("exchange.d4") }}</td>
                  <td class="p-y-xs ">{{ $t("exchange.d5") }}</td>
                  <td class="p-y-xs fn-right">{{ $t("exchange.d2") }}</td>
                  <td class="p-y-xs fn-right p-r-md">{{ $t("exchange.c5") }}</td>
                </tr>
              </thead>
              <tbody class="color-light trade-list">
                <tr v-for="(item,idx) in tradeList" :key="idx" v-if="symbol=='GITP/USDT' && item.direction == 'buy'">
                  <td class="p-y-xs p-l-md rounded-bl-xs rounded-tl-xs ">
                    {{ parseTime(item.ts, false, "{h}:{i}:{s}") }}
                  </td>
                  <td :class="`color-${item.direction}`">
                    <template v-if="item.direction == 'buy'">{{
                      $t("exchange.b5")
                    }}</template>
                    <template v-else-if="'sell'">{{ $t("exchange.b6") }}</template>
                  </td>
                  <td class="fn-right">{{ item.price }}</td>
                  <td class="p-y-xs fn-right p-r-md rounded-br-xs rounded-tr-xs">{{ omitTo(item.amount, 8) * 1 }}</td>
                </tr>
                
                <tr v-for="(item,idx) in tradeList" :key="idx" v-if="symbol!='GITP/USDT'">
                  <td class="p-y-xs p-l-md rounded-bl-xs rounded-tl-xs ">
                    {{ parseTime(item.ts, false, "{h}:{i}:{s}") }}
                  </td>
                  <td :class="`color-${item.direction}`">
                    <template v-if="item.direction == 'buy'">{{
                      $t("exchange.b5")
                    }}</template>
                    <template v-else-if="'sell'">{{ $t("exchange.b6") }}</template>
                  </td>
                  <td class="fn-right">{{ item.price }}</td>
                  <td class="p-y-xs fn-right p-r-md rounded-br-xs rounded-tr-xs">{{ omitTo(item.amount, 8) * 1 }}</td>
                </tr>
              </tbody>
            </table>
          </view> -->
          <view class="m-t-xs bg-panel-3">
              <view class="border-t-original d-flex justify-between align-center p-x-md p-t-lg">
                  <text class="fn-16 fn-bold color-light">{{$t("exchange.a4")}}</text>
                  <v-link tag="div" to="/pages/exchange/exchangeHis" class="d-flex align-center"><van-icon name="orders-o" class="fn-14"/><span class="fn-12 ">{{$t("purchase.a9")}}</span> </v-link>
              </view>
              <van-empty v-if="!Object.values(list).length" description="" />
              <view v-for="item in (list)" class="item border-b fn-14" :key="item.order_no">
                <view class="p-x-md p-y-xs">
                  <view class="row d-flex m-y-xs">
                      <view class="d-flex w-50 align-end">
                        <view v-if="item.entrust_type==1" class="suatus color-buy fn-14 m-r-xs">{{$t('first.c0')}}</view>
                        <view v-if="item.entrust_type==2" class="suatus color-sell fn-14 m-r-xs">{{$t('first.c1')}}</view>
                        <view class="color-light fn-bold">{{item.symbol}}</view>
                      </view>
                      <view class="d-flex w-50 justify-between">
                        <view>
                            {{$t('assets.d0')}}：<span class="color-light"></span>{{item.status_text}}
                        </view>
                        <img width="15px" height="15px" src="static/img/che.png" @click="ifCancel(item)"/>
                      </view>
                  </view>
                  <view class="row d-flex m-y-xs">
                      <view class="d-flex w-50" v-if="item.type==1">
                          <view class="">
                            {{$t('exchange.b7')}}：<span class="color-light">{{item.entrust_price}}</span>
                          </view>
                      </view>
                      <view class="d-flex w-50" v-else>
                          <view class="">
                            {{$t('contract.a2')}}{{$t('common.total')}}：<span class="fn-12 color-light">{{item.money}}</span>
                          </view>
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
                      <view class="d-flex w-50" v-if="item.type==1">
                        <view class="label">{{$t('first.c4')}}：</view>
                        <view class="color-light fn-bold">{{item.amount}}</view>
                      </view>
                      <view class="d-flex w-50 align-center">
                        <view class="">
                          {{$t('first.c2')}}：<span class="color-light">{{item.created_at}}</span>
                        </view>
                      </view>
                  </view>
                </view>
              </view>
          </view>
          </scroll-view>
      </view>
  </v-page>
</template>
<script>
import timeSharing from "@/pages/exchange/time-sharing";
import Exchange from "@/api/exchange";
import Market from "@/api/market";
import Order from "@/api/order";
import date from "@/utils/class/date";
import math from "@/utils/class/math";
import { mapState } from "vuex";
import sellAndBuy from "@/pages/exchange/sell-and-buy";
// import bingProgress from '@/components/bing-progress/bing-progress.vue'
// import dropdown from '@/components/dt-dropdown/dt-dropDown.vue' 
export default {
  props: {
    collect: {
      default() {
        return [];
      },
      type: Array,
      required: false,
    },
    marketList: {
      defalut() {
        return [];
      },
      type: Array,
      required: false,
    },
    query: {
      default: {},
      type: Object,
      required: false,
    },
    isShow: {
      default: true,
      type: Boolean,
      required: false,
    },
    increase:{
        default: {},
        type: Object,
        required: false,
    },
    tabs: {
      default: '',
      type: String,
      required: false,
    },
    refresherEnabled:{
      default:true,
      required:false,
      type:Boolean
    },
  },
  components: {
    timeSharing,
    sellAndBuy,
    // bingProgress
  },
  name: "exchange-transaction",
  data() {
    return {
      buyList: [],
      sellList: [],
      tradeList: [],
      form: {
        direction: "buy",
        type: 0,
        symbol: this.symbol,
        entrust_price: "",
        amount: "",
        trigger_price: undefined,
        total: "",
      },
      balanceMap: {},
      unSymbol: "",
      newPrice: {},
      price_cny: 0,
      list:[],
      progress:[25,50,75,100],
      sliderActive:-1,
      dtime: null,
      scrollTop:0,
      refreshing:false
    };
  },
  computed: {
    ...mapState({
      ws: "ws",
    }),
    isLogin() {
      return Boolean(uni.getStorageSync("token"));
    },
    symbol() {
      return this.query.symbol;
    },
    // 是否为自选
    isCoolect() {
      return this.collect.map((item) => item.pair_name).includes(this.symbol);
    },
    typeList() {
      return [
        {
          value: 0,
          label: this.$t("exchange.d6"),
        },
        {
          value: 1,
          label: this.$t("exchange.d7"),
        },
      ];
    },
    // activeType() {
    //   return this.typeList.find((item) => item.value == this.form.type);
    // },
    // 当前选中的coin
    activeCoin() {
      if (!this.marketList.length) return {};
      let list = [];
      this.marketList.forEach((parentItem) => {
        parentItem.marketInfoList.forEach((item) => {
          list.push(item);
        });
      });
      return list.find((item) => item.pair_name == this.symbol);
    },
    // 当前币种
    currentCoin() {
      if (!this.symbol) return "";
      return this.symbol.split("/")[0];
    },
    // 目标币种
    targetCoin() {
      if (!this.symbol) return "";
      return this.symbol.split("/")[1];
    },
    // 当前余额
    currentBalance() {
      return this.balanceMap[this.currentCoin] || {};
    },
    // 目标余额
    targetBalance() {
      return this.balanceMap[this.targetCoin] || {};
    },
    // 计算交易额
    totalMoney() {
      // todo
      let totalMoney = 0;
      if (this.form.type == 0) {
        totalMoney = math.multiple(this.form.amount, this.form.entrust_price);
      } else {
        totalMoney = this.form.amount;
      }
      return totalMoney;
    },
    // 显示百分比
    activeStep() {
      let num = 0;
      if (this.form.direction == "buy") {
        if (!this.targetBalance.usable_balance) return 0;
        num = this.totalMoney / this.targetBalance.usable_balance;
      } else if (this.form.direction == "sell") {
        if (!this.currentBalance.usable_balance) return 0;
        num = this.form.amount / this.currentBalance.usable_balance;
      }
      if (!isNaN(num)) {
        num = num.toFixed(3);
      }
      return num*100
    },
    // 可用数量
    usable() {
      if (this.form.direction == "buy") {
        if (!this.targetBalance.usable_balance) return 0;
        return this.omitTo(
          this.targetBalance.usable_balance,
          this.activeCoin.price_decimals
        );
      } else {
        if (!this.currentBalance.usable_balance) return 0;
        return this.omitTo(
          this.currentBalance.usable_balance,
          this.activeCoin.qty_decimals
        );
      }
    },

    // 可用单位
    usableUnit() {
      if (this.form.direction == "buy") {
        return this.targetCoin;
      } else {
        return this.currentCoin;
      }
    },
  },
  watch: {
    symbol(n, o) {
      this.getBooks();
      this.getUserBalance();
      if (o) {
        this.unLink(o.replace("/", "").toLocaleLowerCase());
      }
    },
    isShow(n) {
      if (n&&this.isLogin) {
        this.getCurrentEntrust()
        this.getUserBalance();
        this.linkSocket(this.activeCoin.symbol);
      } else if(!n&&this.isLogin){
        this.unLink(this.activeCoin.symbol);
        clearInterval(this.dtime);
      }
      
    },
    tabs(e){
        if(e=='exchange-operation'&&this.isLogin){
            this.dtime = setInterval(() => {
                this.getCurrentEntrust(true)
            }, 1000);
        }else if(e!='exchange-operation'&&this.isLogin){
            clearInterval(this.dtime);
        }
    },
    list(e){
        if(e.length<=0){
            clearInterval(this.dtime);
        }
    }
  },
  methods: {
    parseTime: date.parseTime,
    omitTo: math.omitTo,
    onRefresh(){
        this.unLink(this.activeCoin.symbol);
        if (this.refreshing) return;
        this.refreshing = true;
        setTimeout(() => {
            this.getCurrentEntrust()
            this.getUserBalance();
            this.linkSocket(this.activeCoin.symbol);
            this.refreshing = false;
        }, 1000)
    },
    scroll(event){
      this.scrollTop = event.detail.scrollTop
    },
    getPrice(e){
       this.form.entrust_price=e
    },
    getCurrentEntrust(){
        Order.getCurrentEntrust().then((res) => {
          this.list=res.data.data
        });
    },
    ifCancel(item) {
      this.$dialog
        .confirm({
          title: this.$t('common.tips'),
          message: this.$t('exchange.g5')+'?',
          confirmButtonText:  this.$t("common.confirm"),
          cancelButtonText: this.$t("common.cancel")
        })
        .then(() => {
          this.cancelEntrust(item);
        })
        .catch(() => {});
    },
    // 撤销委托
    cancelEntrust(item) {
      let data = {
        entrust_id: item.id,
        entrust_type: item.entrust_type,
        symbol: item.symbol,
      };
      Order.cancelEntrust(data).then(() => {
        this.$toast.success(this.$t('exchange.g6'));
        this.list.forEach((ele, idx) => {
          if (item.id == ele.id) {
            this.list.splice(idx, 1);
          }
        });
      });
    },
    // 计算滑动出来的金额
    sliderChange(n,i) {
      let num = n/100;
      this.sliderActive=i
      if (this.form.direction == "buy") {
        if (!this.targetBalance.usable_balance) return;
        if (this.form.type == 0) {
          this.form.amount = math.multiple(
            this.targetBalance.usable_balance / this.form.entrust_price,
            num,
            4
          );
        } else if (this.form.type == 1) {
          this.form.amount = this.form.amount = math.multiple(
            this.targetBalance.usable_balance,
            num,
            4
          );
        }
      } else if (this.form.direction == "sell") {
        if (!this.currentBalance.usable_balance) return;
        this.form.amount = math.multiple(
          this.currentBalance.usable_balance,
          num,
          4
        );
      }
    },
    // 提交订单
    storeEntrust() {
        clearInterval(this.dtime);
      // let data = this.form;
      if (this.form.type == 0) {
        //限价
        if (!this.form.entrust_price) {
          this.$toast(this.$t("exchange.d8"));
          return;
        }
        if (!this.form.amount) {
          this.$toast(this.$t("exchange.d9"));
          return;
        }
      } else if (this.form.type == 1) {
        //市价
        this.form.total = this.form.amount;
        if (!this.form.total) {
          if (this.form.direction == "buy") {
            this.$toast(this.$t("exchange.e0"));
          } else {
            this.$toast(this.$t("exchange.d9"));
          }
          return;
        }
      }
      let data={
          direction: this.form.direction,
          type: this.form.type==0?1:2,
          symbol: this.symbol,
          entrust_price: this.form.entrust_price,
          amount: this.form.amount,
          trigger_price: this.form.trigger_price,
          total:this.form.type==0?this.form.total:this.form.amount,
      }
      Exchange.storeEntrust(data, {
        btn: this.$refs.btn,
      })
        .then((res) => {
          this.form.amount = "";
          this.form.total = "";
          this.$toast.success(this.$t("exchange.e1"));
          this.getUserBalance();
          this.dtime = setInterval(() => {
              this.getCurrentEntrust(true)
          }, 1000);
          // this.getCurrentEntrust()
        })
        .catch(() => {});
    },
    // 获取列表
    getBooks() {
      if (!this.symbol) return;
      Market.getBooks({
        symbol: this.symbol,
      }).then((res) => {
        this.buyList = res.data.buyList;
        this.sellList = res.data.sellList;
        this.tradeList = res.data.tradeList;
        this.linkSocket(this.activeCoin.symbol);
        this.setChartData(this.tradeList);
        this.getDefaultPrice();
        this.newPrice = this.tradeList[0]||{};
      });
    },
    // 获取默认价格
    getDefaultPrice() {
      if (this.form.direction == "buy") {
        this.form.entrust_price = Math.min(
          ...this.tradeList.map((item) => item.price)
        );
      } else {
        this.form.entrust_price = Math.max(
          ...this.buyList.map((item) => item.price)
        );
      }
    },
    // 计算深度
    getValue(amount) {
      const arr = this.buyList.concat(this.sellList).map((item) => item.amount);
      let max = Math.max(...arr);
      return math.division(amount, max, 2) * 100;
    },
    // selectType() {
    //   this.$picker(this.typeList, { value: this.form.type }).then((res) => {
    //     this.form.type = res;
    //   });
    // },
    // 获取余额
    getUserBalance() {
      if (!this.symbol || !this.isLogin) return;
      Exchange.getUserBalance({
        symbol: this.symbol,
      }).then((res) => {
        this.balanceMap = { ...this.balanceMap, ...res.data };
      });
      this.getCurrencyExCny();
    },
    // 获取汇率
    getCurrencyExCny() {
      Exchange.getCurrencyExCny({
        coin_name: this.targetCoin, currency: uni.getStorageSync('language')
      }).then((res) => {
        this.price_cny = res.data.price_cny;
      });
    },
    // 链接socket
    linkSocket(symbol) {
      this.unSymbol = symbol;
      // 订阅买线
      this.ws.send({
        cmd: "sub",
        msg: `buyList_${symbol}`,
      });
      // 订阅卖线
      this.ws.send({
        cmd: "sub",
        msg: `sellList_${symbol}`,
      });
      // 订阅成交
      this.ws.send({
        cmd: "sub",
        msg: `tradeList_${symbol}`,
      });
    },
    // 取消订阅
    unLink(symbol) {
      // 取消买线
      this.ws.send({
        cmd: "unsub",
        msg: `buyList_${symbol}`,
      });
      // 取消卖线
      this.ws.send({
        cmd: "unsub",
        msg: `sellList_${symbol}`,
      });
      // 取消成交
      this.ws.send({
        cmd: "unsub",
        msg: `tradeList_${symbol}`,
      });
    },
    socketMessage() {
      this.ws.on("message", (res) => {
        let symbol = this.activeCoin && this.activeCoin.symbol;
        let { data, sub } = res;

        switch (sub) {
          case `buyList_${symbol}`:
            this.buyList = data;
            break;
          case `sellList_${symbol}`:
            this.sellList = data.sort((a, b) => b.price - a.price);
            break;
          case `tradeList_${symbol}`:
            if(this.tradeList.length>20){
              this.tradeList.unshift(data);
              this.tradeList.pop();
            }else{
              this.tradeList.unshift(data)
            }
            this.addChartPoint(data);
            this.newPrice = data;
            break;
        }
      });
    },

    // 设置highChart
    setChartData(arr) {
      if (!this.$refs.highChart) return;
      let list = arr.map((item) => {
        return [item.ts, item.price];
      });
      this.$nextTick(() => {
        this.$refs.highChart.resetData(list);
      });
    },
    // 添加highChart点
    addChartPoint(obj) {
      if (!this.$refs.highChart) return;
      this.$refs.highChart.addPoint([obj.ts, obj.price]);
    },
    dropDownChange(e){
        this.form.type=e.value
        this.form.amount=''
        this.sliderActive=-1
    }
  },
  mounted() {
    this.getBooks();
    this.getUserBalance();
    this.socketMessage();
    if (this.query.direction) {
      this.form.direction = this.query.direction;
    }
    if(this.isLogin){
        this.getCurrentEntrust()
    }
  },
  destroyed() {
    // this.unLink(this.unSymbol);
    clearInterval(this.dtime);
  },
};
</script>
<style lang="scss" scoped>
.custom-button {
  min-width: 26px;
  color: #fff;
  line-height: 18px;
  text-align: center;
  border-radius: 100px;
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
.dep-list {
  // height: 440px;
  .row {
    position: relative;
    .proagess {
      position: absolute;
      right: 0;
      top: 0;
      transition: width 0.3s;
    }
  }
}
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
      &::after{
        content: '';
        display: block;
        font-size: 0;
        width: 8px;
        height: 8px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: $green;
        border-radius: 20px;
      }
    }
  }
  .van-step__line {
    bottom: 8px;
  }
}
.trade-list{
  tr:nth-of-type(2n-1){
    box-shadow: $shadow;
    border-radius: $border-radius-xs;
    td{
      background: $panel-3;
    }
  }
}
::v-deep .van-stepper{
    background-color: $form-panel-3;
    border-radius: 50px;
    overflow: hidden;
    padding: 4px;
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
.p-y-xxs{
    padding: 4px 0;
}
.p-y-2{
    padding: 2px 6px;
    border-radius: 3px;
}
.p-y-7{
    padding: 7px 0;
}
.bg-green{
    background-color: $green;
}
.bg-red{
    background-color: $red;
}
.bor5{
    border-top: 5px solid $border-color;
}
.w-50{
    width: 48%;
}
.w-23{
    width: 22%;
}
.fa{
    position: fixed;
    top: 0px;
    z-index:2;
    width: 100%;
    box-sizing: border-box;
}
.tixing1{
	 width: 49%;
	 		height: 35px;/* 宽高 */
	 		// background-color: brown;/* 颜色 */
	 		border-radius: 6px;/* 设置圆角 */
	 		transform: perspective(12px)scale(1.1, 1.3) rotateX(-5deg);
	 		/* 镜头距离元素表面的位置为8px，x轴为1.1倍y轴为1.3倍，绕x轴旋转-5度 */
	 		transform-origin: top left;
	 		/* top left = left top = 0 0中心点偏移量*/
	 		// border: 1px solid #ff9900;
			box-shadow:inset -2px -3px 6px -4px #000;
}
.tixing2{
		width: 49%;
		height: 35px;/* 宽高 */
		// background-color: brown;/* 颜色 */
		border-radius: 6px;/* 设置圆角 */
		transform: perspective(12px)scale(1.1, 1.3) rotateX(5deg);
		/* 镜头距离元素表面的位置为8px，x轴为1.1倍y轴为1.3倍，绕x轴旋转5度 */
		 transform-origin:bottom right; 
		/* bottom left = left bottom = 0 100% 中心点偏移量*/
		/* 边框 */
		box-shadow:inset 2px 2px 5px -4px #000;
	}
.tixingtxt{
	position: absolute;
	right: 0px;
	top: 0px;
	z-index: 1;
	width: 100%;
}
.borders{
    // border-color: $form-panel-4!important;
    border: 1px solid $form-panel-4!important;
}
.active{
    // border:1px solid $theme-1!important;
    border-color: $theme-1!important;
}
.h-110{
    height: 110px;
}
.h-25{
    height: 25px;
}
</style>