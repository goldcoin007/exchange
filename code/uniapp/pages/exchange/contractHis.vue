<template>
    <v-page>
      <v-header :title="'订单管理'"></v-header>
      <view class="d-flex border-b">
        <view class="d-flex rounded-lg justify-between w-max p-b-xs">
          <view
            @click="active = 0"
            class="p-y-xs p-x-lg fn-center w-50"
            >
                <text :class="{ 'color-theme-1 active p-b-xs': active == 0 }">持有仓位</text>
            </view>
          <view
            @click="active = 1"
            class="p-y-xs p-x-lg fn-center w-50"
            >
                <text :class="{ 'color-theme-1 active p-b-xs': active == 1 }">当前委托</text>
          </view
          >
          <view
            @click="active = 2"
            class="p-y-xs p-x-lg fn-center w-50"
            >
                <text :class="{ 'color-theme-1 active p-b-xs': active == 1 }">历史委托</text>
          </view
          >
          <view
            @click="active = 3"
            class="p-y-xs p-x-lg fn-center w-50"
            >
                <text :class="{ 'color-theme-1 active p-b-xs': active == 1 }">合约流水</text>
          </view
          >
        </view>
      </view>
        <template  v-if="active==0">
          <not-data v-if="!list.length"></not-data>
          <view class="item bg-panel-4 m-md rounded-sm box-shadow" v-for="item in list" :key="item.id">
              <view class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
                  <view class="d-flex">
                      <view>
                          <view class="color-light fn-20">{{ item.pair_name }} </view>
                      </view>
                  </view>
                  <text class="fn-20" :class="item.side == 1 ? 'color-success' : 'color-danger'">
                      {{ item.side == 1 ? $t("contract.e8") : $t("contract.e9") }}
                  </text>
                  <view class="d-flex color-light">
                      <span>{{ item.lever_rate }}X</span>
                  </view>
              </view>
              <view class="p-x-md p-y-xs data-list">
                  <view class="row d-flex m-y-xs">
                      <view class="label fn-sm">{{ $t("contract.a1") }}/{{ $t("contract.g5") }}/{{
                $t("contract.g4")
              }}</view>
                      <view class="color-light fn-right flex-fill">{{ item.hold_position }}/{{ item.freeze_position }}/{{
                item.avail_position
              }}</view>
                  </view>
          
                  <view class="d-flex">
                      <view class="row w-6/12 d-flex m-y-xs justify-between">
                          <view class="label fn-sm">{{ $t("contract.b1") }}</view>
                          <view class="color-light">{{ item.position_margin }}</view>
                      </view>
                      <view class="row w-6/12 d-flex m-y-xs justify-between">
                          <view class="label fn-sm">{{ $t("contract.h1") }}/{{ $t("contract.h2") }}</view>
                          <view class="color-light">
                              {{ item.tpPrice || "--" }}/{{ item.slPrice || "--" }}
                          </view>
                      </view>
                  </view>
                  <view class="d-flex">
                      <view class="row w-6/12 d-flex m-y-xs justify-between">
                          <view class="label fn-sm">{{ $t("contract.g6") }}</view>
                          <view class="color-light">{{ item.avg_price }}</view>
                      </view>
                      <view class="row w-6/12 d-flex m-y-xs justify-between">
                          <view class="label fn-sm">{{ $t("contract.h0") }}</view>
                          <view class="color-light">{{ item.profitRate }}</view>
                      </view>
                  </view>
                  <view class="d-flex">
                      <view class="row w-6/12 d-flex m-y-xs justify-between">
                          <view class="label fn-sm">{{ $t("contract.g8") }}</view>
                          <view class="color-light">{{ item.flatPrice }}</view>
                      </view>
                      <view class="row w-6/12 d-flex m-y-xs justify-between">
                          <view class="label fn-sm">{{ $t("contract.d5") }}</view>
                          <view class="color-light">{{ item.unRealProfit }}</view>
                      </view>
                  </view>
                  <view class="row d-flex m-y-xs justify-between">
          
                      <v-button type="green" size="small" class="opt-btn rounded-xs m-b-xs" @click="closePositionShow(item)">{{ $t("contract.h3") }}</v-button>
          
                      <v-button type="green" size="small" class="opt-btn rounded-xs m-b-xs m-l-xs" @click="onekeyReverse(item)">{{ $t("contract.k8") }}</v-button>
                      <!-- <v-button
                type="danger"
                class="opt-btn m-l-xs m-b-xs"
                plain
                size="small"
                @click="ifCloseAllPosition(item)"
                >{{ $t("contract.h4") }}</v-button
              > -->
                      <v-button type="blue" class="opt-btn m-l-xs m-b-xs rounded-xs" size="small" @click="toStoploss(item)">{{ $t("contract.h5") }}</v-button>
                      <v-button type="green-plain" class="m-l-xs m-b-xs d-inline-block rounded-xs" size="small" plain :to="{
                  path: '/pages/income/index',
                  query: {
                    symbol: item.symbol,
                    side: item.side,
                    profitRate: item.profitRate,
                    lever_rate: item.lever_rate,
                    pair_name: item.pair_name,
                    avg_price: item.avg_price,
                    newPrice: newPrice,
                    position_side: item.side,
                  },
                }">{{ $t("contract.c8") }}</v-button>
                  </view>
              </view>
          </view>
        </template>
      
      <v-paging class="layout-main" :key="2" :ajax="getHistoryEntrust" v-if="active==1">
          <template #box="list">
            <not-data v-if="!$list(list).length"></not-data>
            <div v-for="item in $list(list)" class="item bg-panel-4 m-md rounded-sm box-shadow" :key="item.order_no">
              <div class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
                <div class="d-flex">
                  <div v-if="item.entrust_type==1" class="suatus color-buy fn-20 m-r-xs rounded">{{$t('exchange.b5')}}</div>
                  <div v-if="item.entrust_type==2" class="suatus color-sell fn-20 m-r-xs rounded">{{$t('exchange.b6')}}</div>
                  <div>
                    <div class="color-light fn-20">{{item.symbol}}</div>
                    <div class="fn-10">{{item.created_at}}</div>
                  </div>
                </div>
                <div>{{item.status_text}}</div>
              </div>
              <div class="p-x-md p-y-xs">
                <div class="row d-flex m-y-xs justify-between">
                  <div class="label fn-sm">{{$t('exchange.b7')}}</div>
                  <div class="color-light">{{item.entrust_price}}</div>
                </div>
                <div class="row d-flex m-y-xs justify-between">
                  <div class="label fn-sm">{{$t('exchange.b8')}}</div>
                  <div class="color-light">
                    <template v-if="item.type==1">{{$t('exchange.b9')}}</template>
                    <template v-if="item.type==2">{{$t('exchange.c0')}}</template>
                  </div>
                </div>
                <div class="row d-flex m-y-xs justify-between">
                  <div class="label fn-sm">{{$t('exchange.c1')}}</div>
                  <div class="color-buy">{{item.traded_amount}}</div>
                </div>
                <div class="row d-flex m-y-xs justify-between">
                  <div class="label fn-sm">{{$t('exchange.e2')}}</div>
                  <div class="color-buy">{{(item.traded_money/item.traded_amount).toFixed(4)*1||'--'}}</div>
                </div>
            
                <div class="row d-flex m-y-xs justify-between">
                  <div class="label fn-sm">{{$t('exchange.c2')}}</div>
                  <div class="color-light">{{item.amount}}</div>
                </div>
              </div>
            </div>
          </template>
        </v-paging>
        
        <v-paging class="layout-main" :key="3" :ajax="getHistoryEntrust" v-if="active==2">
            <template #box="list">
              <not-data v-if="!$list(list).length"></not-data>
              <div v-for="item in $list(list)" class="item bg-panel-4 m-md rounded-sm box-shadow" :key="item.order_no">
                <div class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
                  <div class="d-flex">
                    <div v-if="item.entrust_type==1" class="suatus color-buy fn-20 m-r-xs rounded">{{$t('exchange.b5')}}</div>
                    <div v-if="item.entrust_type==2" class="suatus color-sell fn-20 m-r-xs rounded">{{$t('exchange.b6')}}</div>
                    <div>
                      <div class="color-light fn-20">{{item.symbol}}</div>
                      <div class="fn-10">{{item.created_at}}</div>
                    </div>
                  </div>
                  <div>{{item.status_text}}</div>
                </div>
                <div class="p-x-md p-y-xs">
                  <div class="row d-flex m-y-xs justify-between">
                    <div class="label fn-sm">{{$t('exchange.b7')}}</div>
                    <div class="color-light">{{item.entrust_price}}</div>
                  </div>
                  <div class="row d-flex m-y-xs justify-between">
                    <div class="label fn-sm">{{$t('exchange.b8')}}</div>
                    <div class="color-light">
                      <template v-if="item.type==1">{{$t('exchange.b9')}}</template>
                      <template v-if="item.type==2">{{$t('exchange.c0')}}</template>
                    </div>
                  </div>
                  <div class="row d-flex m-y-xs justify-between">
                    <div class="label fn-sm">{{$t('exchange.c1')}}</div>
                    <div class="color-buy">{{item.traded_amount}}</div>
                  </div>
                  <div class="row d-flex m-y-xs justify-between">
                    <div class="label fn-sm">{{$t('exchange.e2')}}</div>
                    <div class="color-buy">{{(item.traded_money/item.traded_amount).toFixed(4)*1||'--'}}</div>
                  </div>
              
                  <div class="row d-flex m-y-xs justify-between">
                    <div class="label fn-sm">{{$t('exchange.c2')}}</div>
                    <div class="color-light">{{item.amount}}</div>
                  </div>
                </div>
              </div>
            </template>
          </v-paging>
    </v-page>
</template>
<script>
import Order from "@/api/order";
import Contract from "@/api/contract";
import { mapState } from "vuex";
import math from '@/utils/class/math'
export default {
    props: {
        symbolLeft: {
            default: "",
            type: String,
            required: false,
        },
        symbolDetail: {
            default: () => { },
            type: Object,
        },
        isShow: {
            default: false,
            type: Boolean,
            required: false,
        },
    },
    data(){
        return {
            active: 0,
            list: [],
            checked: false,
            show: false,
            activeItem: {},
            newPrice: 0,
            form: {
                entrust_price: "",
                amount: "",
            },
            strategyForm: {
                symbol: "",
                position_side: "",
                tp_trigger_price: "",
                sl_trigger_price: "",
            },
            stoplossShow: false,
            dtime: null,
        }
    },
    watch: {
        symbolLeft(n) {
            if (n) this.holdPosition();
        },
        isShow(n) {
            if (n) {
                this.holdPosition();
            } else {
                this.ws.send({
                    cmd: "unsub",
                    msg: `swapTradeList_${this.symbolLeft}`,
                });
            }
        },
    },
    computed: {
        ...mapState({
            ws: "ws1",
        }),
    },
    methods:{
      division:math.division,
      // 多仓盈亏
      many(item, newPrice) {
          let face = this.symbolDetail.unit_amount;
          return math.omitTo(
              ((newPrice - item.avg_price) * item.avail_position * face) / 
              item.avg_price,
              4
          );
      },
      // 空仓盈亏
      air(item, newPrice) {
          let face = this.symbolDetail.unit_amount;
          return math.omitTo(
              ((item.avg_price - newPrice) * item.avail_position * face) /
              item.avg_price,
              4
          );
      },
      holdPosition(boo) {
          console.log(this.checked,this.symbolLeft,boo)
          let data = {
              symbol: (this.checked && this.symbolLeft) || "",
          };
          Contract.holdPosition(data, { loading: !boo }).then((res) => {
              this.list = res.data.filter((item) => item.hold_position);
              if (!boo) {
                  this.sendPrice();
              }
          });
      },
      // 限价平仓
      closePositionShow(item) {
          this.activeItem = item;
          this.$set(this.activeItem, "closeType", 1);
          this.show = true;
      },
      // 获取买卖盘
      getMarketInfo() {
          let data = {
              symbol: this.symbolLeft,
          };
          Contract.getMarketInfo(data).then((res) => {
              this.newPrice = res.data.swapTradeList[0].price;
          });
      },
      closePosition() {
          let data = {
              side: this.activeItem.side == 1 ? 2 : 1,
              type: this.activeItem.closeType,
              symbol: this.activeItem.symbol,
              entrust_price: this.form.entrust_price || 0,
              amount: this.form.amount,
          };
          Contract.closePosition(data, { btn: this.$refs.btn }).then(() => {
              this.show = false;
              this.form.entrust_price = "";
              this.form.amount = "";
              this.holdPosition();
              this.$toast(this.$t("contract.j0"));
          });
      },
      // 一键平仓
      ifCloseAllPosition(item) {
          this.$dialog
              .confirm({
                  title: this.$t("contract.c4"),
                  message: `${this.$t("contract.j1")}${item.pair_name}?`,
                  confirmButtonText:  this.$t("common.confirm"), 
                  cancelButtonText: this.$t("common.cancel")
              })
              .then(() => {
                  this.closeAllPosition(item);
              });
      },
      closeAllPosition(item) {
          let data = {
              symbol: item.symbol,
              side: item.side == 1 ? 2 : 1,
          };
          Contract.closeAllPosition(data, {
              loading: true,
          }).then(() => {
              this.$toast(
                  `${this.$t("contract.j2")}${item.pair_name}${this.$t("contract.j3")}`
              );
              this.holdPosition();
          });
      },
      // 获取最新价格
      sendPrice() {
          this.ws.send({
              cmd: "sub",
              msg: `swapTradeList_${this.symbolLeft}`,
          });
      },
      socketMessage() {
          this.ws.on("message", (res) => {
              let symbol = this.symbolLeft;
              let { data, sub } = res;
              switch (sub) {
                  case `swapTradeList_${symbol}`:
                      this.newPrice = data.price;
                      break;
              }
          });
      },
      // 止盈止损
      toStoploss(item) {
          this.activeItem = item;
          this.strategyForm.symbol = this.activeItem.symbol;
          this.strategyForm.position_side = this.activeItem.side;
          this.stoplossShow = true;
      },
      stoploss() {
          Contract.setStrategy(this.strategyForm, {
              btn: this.$refs.strateBtn,
          }).then(() => {
              this.strategyForm.tp_trigger_price = "";
              this.strategyForm.sl_trigger_price = "";
              this.stoplossShow = false;
              this.$toast(this.$t("contract.j4"));
          });
      },
      // 一键全平
      onekeyAllFlat() {
          this.$dialog
              .confirm({
                  title: this.$t("contract.c4"),
                  message: this.$t("contract.k9") + `?`,
                  confirmButtonText:  this.$t("common.confirm"),
                  cancelButtonText: this.$t("common.cancel")
              })
              .then(() => {
                  Contract.onekeyAllFlat({}).then(() => {
                      this.holdPosition(true);
                      this.$toast(this.$t("contract.l0"));
                  });
              });
      },
      // 一键反向
      onekeyReverse(item) {
          this.$dialog
              .confirm({
                  title: this.$t("contract.c4"),
                  message: this.$t("contract.l1") + `?`,
                  confirmButtonText:  this.$t("common.confirm"),
                  cancelButtonText: this.$t("common.cancel")
              })
              .then(() => {
                  Contract.onekeyReverse({
                      symbol: item.symbol,
                      position_side: item.side,
                  }).then(() => {
                      this.holdPosition(true);
                      this.$toast(this.$t("contract.l2"));
                  });
              });
              
      },
    },
    mounted() {
        if (this.symbolLeft) {
            this.getMarketInfo();
            this.holdPosition();
        }
        this.dtime = setInterval(() => {
            if (this.symbolLeft) {
                this.holdPosition(true);
            }
        }, 3000);
    },
    beforeDestroy() {
        clearInterval(this.dtime);
        this.ws.send({
            cmd: "unsub",
            msg: `swapTradeList_${this.symbolLeft}`,
        });
    },
}
</script>
<style lang="scss" scoped>
    .active{
        position: relative;
        // border-bottom: 1px solid $theme-1;
    }
    .active:after{
        position: absolute;
        content: "";
        width: 20px;
        height: 1px;
        background-color: $theme-1;
        bottom: 0;
        left: 30%;
        
    }
    .w-50{
        width: 50%;
    }
    .data-list {
        .row:first-of-type {
            margin-right: $padding-sm;
        }
    }
</style>