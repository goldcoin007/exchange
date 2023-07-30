<template>
  <view>
     <view class="d-flex p-x-md p-0 fa p-t-md justify-between align-center fn-18 bg-panel-3 color-light flex-wrap">
       <view class="w-max" style="height: var(--status-bar-height)"></view>
       <view @click="$emit('symbol')" class="d-flex align-center">
         <i class="iconfont color-light fn-bold fn-18">&#xe655;</i>
         <text class="fn-bold" style="margin-right: 5px;">{{ symbol }}</text>{{ $t("first.b8") }}
         <text class="fn-10 m-l-xs p-y-2" :class="increase.increase < 0 ? 'color-sell bg-sell-transparent' : 'color-buy bg-buy-transparent'">{{increase.increaseStr}}</text>
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
       <view  class="p-ms bg-form-panel-3 fn-sm m-t-xs rounded-sm d-flex justify-between w-max fn-13" >
         <view class="item w-33 t-no positions">
           <view class="label">{{ $t("contract.d4") }}(USDT)</view>
           <view class="num color-light d-flex align-center" style="margin-top:8px;">         
             <text>{{accountInfo.account_equity || "--"}}</text>
             <van-icon name="exchange bg-form-panel-3" @click="_router.push('/pages/transfer/index')" class="p-l-xs color-theme-1 icon"/>
           </view>
         </view>
         <view class="item p-x-xs t-no w-33 fn-center">
           <view class="label">{{ $t("contract.d5") }}(USDT)</view>
           <view class="num color-light " style="margin-top:8px;">{{
             accountInfo.totalUnrealProfit
           }}</view>
         </view>
         <view class="item fn-right w-33">
           <view class="label">
             {{ $t("contract.d6") }}
             <van-icon @click="popshow=true" class="color-theme-1 m-l-xs" name="info-o" />
           </view>
           <view class="num color-light fn-right" style="margin-top:8px;">{{
             accountInfo.riskRate || "0%"
           }}</view>
         </view>
       </view>
     </view>
    <view class="w-max" style="height: var(--status-bar-height)"></view>
    <view class="h-120"></view>
    <scroll-view
      @refresherrefresh="onRefresh"
      :refresher-enabled="refresherEnabled&&scrollTop<50"
      :refresher-triggered="refreshing"
      refresher-background="transparent"
      :refresher-threshold="50"
    >
    <view class="layout-main">
        <view class="d-flex">
          <view class="w-6/12 p-l-md box-size">
			<!-- <view class="m-b-xs" style="position: relative;">
				<view class="tixing1  " style="background-color: #2eba89;"></view>
				<view class="tixing2 back_f" style="position: absolute;right: 0px;top: 0px;"></view>
				<view class="tixingtxt">
					<text style="width: 50%;display: inline-block;color: #fff;">开仓</text>
					<text style="width: 50%;display: inline-block;">平仓</text>
				</view>
			</view> -->
            <view class="d-flex fn-center m-b-ms h-30 color-light">
              <!-- <v-picker
                :list="commissionTypes"
                v-model="form.type"
                class="w-60 m-r-xs d-flex justify-center align-center border-r bg-form-panel-3 p-y-xxs rounded "
              >
                <text class="fn-bold fn-md">
                    {{ activeCommission.label }}
                </text>
                <i class="iconfont">&#xe6e9;</i>
              </v-picker> -->
              <v-dropdwon class="w-60 m-r-xs bg-form-panel-3 p-y-xxs rounded posi" :list="commissionTypes" @onClick="dropDownChange">
              </v-dropdwon>
              <!-- <v-picker
                :list="lever_rage"
                v-model="form.lever_rate"
                @change="openNum"
                class="w-30 flex-fill d-flex justify-center align-center bg-form-panel-3 p-y-xxs rounded "
              >
                <text class="fn-bold">{{ form.lever_rate }} X</text>
                <i class="iconfont fn-13">&#xe6e9;</i>
              </v-picker> -->
              <v-dropdwon v-if="lever_rage.length>0" class="w-40 m-r-xs posi bg-form-panel-3 p-y-xxs rounded" :contract="contract" :list="lever_rage" @onClick="openNum">
              </v-dropdwon>
            </view>
            <view class="m-b-ms">
              <!-- <view class="label fn-sm m-b-xs">{{ $t("contract.d1") }}</view> -->
              <!-- 限价 -->
              <van-stepper
                class="d-flex justify-between"
                :min="0"
                input-width="61%"
                step="0.01"
                :value="form.entrust_price"
                @change="form.entrust_price=$event.detail"
                v-if="form.type == 0"
              />
              <!-- 市价 -->
              <v-input
                v-if="form.type == 1"
                disabled
                :value='$t("first.a4")'
                class="h-30 p-y-xxs rounded fn-center fn-bold color-light bg-form-panel-3 p-x-xs"
              ></v-input>
            </view>
            <view>
              <v-input
                :placeholder="$t('contract.d2')"
                v-model="form.amount"
                @input="sliderActive=-1"
                class="h-30 p-x-sm p-y-xxs rounded bg-form-panel-3"
              >
                <template #right>
                  <span class="color-light fn-bold"> {{ $t("contract.d8") }} </span>
                </template>
              </v-input>
            </view>
            <view class="m-b-xs">
              <view class="m-t-xs">
                <!-- <view class="d-flex justify-between fn-sm">
                  <text>0%</text>
                  <text>100%</text>
                </view> -->
                <view class="d-flex justify-between">
                    <view class="borders w-23 rounded-3 fn-center p-y-xs fn-12" v-for="(item,index) in progress" @click="sliderChange(item,index)" :class="sliderActive==index?'color-theme-1 active':''">
                        {{item}}%
                    </view>
                 <!-- <bing-progress
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
                  /> -->
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
                <view class="d-flex justify-between m-y-xs align-center">
                    <v-input
                      :placeholder="$t('contract.i4')"
                      v-model="form.tp_trigger_price"
                      class="h-30 p-x-ms rounded bg-form-panel-3 fn-12 fn-center"
                    >
                    </v-input>
                    <v-input
                      :placeholder="$t('contract.i7')"
                      v-model="form.sl_trigger_price"
                      class="h-30 p-x-ms m-l-xs rounded fn-12 bg-form-panel-3"
                    >
                    </v-input>
                </view>
            </view>
            <view class="m-b-sm m-t-xs">
              <template v-if="isLogin">
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
              </template>
              <template v-else>
                <v-button
                  size="small"
                  block
                  to="/pages/login/index"
                  :type="'green'"
                  class="w-max rounded"
                  >{{ $t("exchange.d0") }}</v-button
                >
              </template>
              <!-- <view class="fn-sm m-t-xs d-flex justify-between">
                <view class="">
                    {{ $t("contract.e1") }}
                </view>
                <view class="">
                    {{ maxNum }}{{ $t("contract.d8") }}
                </view>
              </view> -->
            </view>
            <view class="m-b-xs">
              <template v-if="isLogin">
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
              </template>
              <template v-else>
                <v-button
                  size="small"
                  block
                  to="/pages/reg/index"
                  :type="'red'"
                  class="w-max rounded"
                  >{{ $t("reg.b9") }}</v-button
                >
              </template>
              <view class="fn-sm m-t-xs d-flex justify-between">
                <view class="">
                    {{ $t("common.c3") }}
                </view>
                <view class="">
                    {{ maxNum }}{{ $t("contract.d8") }}
                </view>
              </view>
              <view class="fn-sm m-t-xs d-flex justify-between">
                <view class="">
                    {{ $t("common.c4") }}
                </view>
                <view class="">
                    {{ margin }} USDT
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
              :max="6"
              :contract="1"
            >
              <view class="fn-lg color-buy">{{ newPrice.price }}</view>
            </sell-and-buy>
          </view>
        </view>
        <!-- <view class="h-20"></view> -->
        <!-- <trade-list :tradeList="tradeList" /> -->
        <view class="p-b-lg">
            <view class=" d-flex justify-between align-center p-x-md p-t-md bor5">
                <view class="d-flex w-75 align-center">
                    <text class="m-x-ms" @click="active=0" :class="active==0?'fn-bold fn-15 p-b-xs bor5-active color-light':''">{{$t('first.a5')}}({{list.length}})</text>
                    <text class="m-x-ms" @click="active=1" :class="active==1?'fn-bold fn-15 p-b-xs bor5-active color-light':''">{{$t('exchange.a4')}}({{listCurrent.length}})</text>
                    <!-- <text class="m-x-ms" @click="active=2" :class="active==2?'fn-bold fn-15 p-b-xs bor5-active color-light':''">{{$t('exchange.a5')}}({{listHistory.length}})</text> -->
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
                <view class="p-x-md bg-panel-3 p-b-xs p-t-md fn-right d-flex justify-between">
                    <view class="d-flex align-center" @click="
                  checked = !checked;
                  holdPosition();
                ">
                        {{ $t("contract.g3") }}
                        <van-checkbox class="m-l-xs" :value="checked"></van-checkbox>
                    </view>
                    <view>
                        <v-button type="green" size="small" class="rounded-lg opt-btn m-b-xs" @click="onekeyAllFlat">{{ $t("contract.k7") }}</v-button>
                    </view>
                </view>
                <view
                  class="item border-b bg-panel-3"
                  v-for="item in (list)"
                  :key="item.id"
                >
                  <view class="p-x-md p-y-xs">
                    <view class="row d-flex m-y-xs">
                        <view class="d-flex w-max align-end justify-between">
                          <view v-if="item.side==1" class="suatus color-buy m-r-xs">{{ $t("contract.c0") }} {{item.lever_rate}}X <span class="fn-light m-l-xs">{{item.symbol}}/USDT</span></view>
                          <view v-if="item.side==2" class="suatus color-sell m-r-xs">{{ $t("contract.c2") }} {{item.lever_rate}}X <span class="fn-light m-l-xs">{{item.symbol}}/USDT</span></view>
                          <!-- <view class="m-l-ms">
                              {{item.created_at}}
                          </view> -->
                        </view>
                        <view class="d-flex w-25 justify-end">
                            <img @click="canvasImage(item)" width="15px" height="15px" src="static/img/share.png"/>
                            <!-- <v-link :to="{
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
                            }">
                                <img width="15px" height="15px" src="static/img/share.png"/>
                            </v-link> -->
                        </view>
                    </view>
                    <view class="row d-flex m-y-xs justify-between fn-14 p-t-xs">
                        <view class="w-33 fn-left">
                          <view class="label">{{ $t("contract.g6") }}</view>
                          <view class="color-light">{{item.avg_price}}</view>
                        </view>
                        <view class="w-33 fn-center">
                          <view class="label">{{ $t("first.c5") }}</view>
                          <view class="color-light">
                            <template>{{item.realtimePrice}}</template>
                          </view>
                        </view>
                        <view class="w-33 fn-right">
                          <view class="label">{{ $t("contract.b1") }}</view>
                          <view class="color-light">{{item.position_margin}}</view>
                        </view>
                    </view>
                    <view class="row d-flex m-y-xs justify-between fn-14 p-t-xs">
                        <view class="w-33 fn-left">
                          <view class="label">{{ $t("contract.i4") }}</view>
                          <view class="color-light">{{item.tpPrice || "--"}}</view>
                        </view>
                        <view class="w-33 fn-center">
                          <view class="label">{{ $t("contract.i7") }}</view>
                          <view class="color-light">
                            <template>{{item.slPrice || "--"}}</template>
                          </view>
                        </view>
                        <view class="w-33 fn-right">
                          <view class="label">{{ $t("contract.a1") }}({{ $t("contract.d8") }})</view>
                          <view class="color-light">
                            {{item.avail_position}}
                          </view>
                        </view>
                    </view>
                    <view class="row d-flex m-y-xs justify-between fn-14 p-t-xs">
                        <view class="w-50 fn-left">
                          <view class="label">{{ $t("option.b6") }}</view>
                          <view class="color-light">{{item.unRealProfit}}</view>
                        </view>
                        <view class="w-50 fn-center">
                          <view class="label">{{ $t("contract.g8") }}</view>
                          <view class="color-light">{{item.flatPrice}}</view>
                        </view>
                        <view class="w-50 fn-right">
                          <view class="label">{{ $t("contract.h0") }}</view>
                          <view class="color-light" :class="item.unRealProfit>0?'color-buy':'color-sell'">{{item.profitRate}}</view>
                        </view>
                    </view>
                    <view class="row d-flex m-y-xs align-center justify-between fn-13 p-t-xs">
                        <text class="bg-form-panel-4 box-shadow rounded-xs p-y-ms w-33 p-x-ms fn-center color-theme-1" @click="toStoploss(item)">{{ $t("contract.h5") }}</text>
                        <text class="bg-form-panel-4 box-shadow rounded-xs p-y-ms w-33 p-x-ms fn-center color-theme-1" @click="onekeyReverse(item)">{{ $t("contract.k8") }}</text>
                        <text class="bg-form-panel-4 box-shadow rounded-xs p-y-ms w-33 p-x-ms fn-center color-theme-1" @click="closePositionShow(item)">{{ $t("contract.h3") }}</text>
                        <!-- <v-button type="default" size="small" class="opt-btn rounded-xs m-b-xs" @click="closePositionShow(item)">{{ $t("contract.h3") }}</v-button>
                        
                                <v-button type="default" size="small" class="opt-btn rounded-xs m-b-xs m-l-xs" @click="onekeyReverse(item)">{{ $t("contract.k8") }}</v-button>
                                <v-button type="default" class="opt-btn m-l-xs m-b-xs rounded-xs" size="small" @click="toStoploss(item)">{{ $t("contract.h5") }}</v-button> -->
                    </view>
                  </view>
                </view>
            </template>
            <van-empty class="bg-panel-3" v-if="!list.length&&active==0" description="" />
            
            <template v-if="active==1">
                <view
                  class="item border-b bg-panel-3"
                  v-for="item in (listCurrent)"
                  :key="item.id"
                >
                  <view class="p-x-md p-y-xs">
                    <view class="row d-flex m-y-xs">
                        <view class="d-flex w-max align-end justify-between">
                          <view class="suatus m-r-xs" :class="item.side==2?'color-buy':'color-sell'">{{cals(item.side,item.order_type)}} {{item.lever_rate}}X</view>
                          <view class="color-light fn-bold">{{item.symbol}}/USDT</view>
                          <view class="m-l-ms">
                              {{item.created_at}}
                          </view>
                        </view>
                        <view class="d-flex w-25 justify-end align-center">
                          <!-- <view class="label">{{$t('assets.d0')}}：</view>
                          <view class="color-light">
                              {{item.status_text}}
                          </view> -->
                          <img width="15px" height="15px" src="static/img/che.png" @click="ifCancelEntrust(item)"/>
                        </view>
                    </view>
                    <view class="row d-flex m-y-xs justify-between fn-10 p-t-xs">
                        <view class="w-33 fn-left">
                          <view class="label">{{ $t("contract.a8") }}({{ $t("contract.d8") }})</view>
                          <view class="color-light">{{item.amount}}</view>
                        </view>
                        <view class="w-33 fn-center">
                          <view class="label">{{ $t("exchange.b7") }}(USDT)</view>
                          <view class="color-light">
                            {{item.entrust_price}}
                          </view>
                        </view>
                        <view class="w-33 fn-right">
                          <view class="label">{{ $t("first.c6") }}</view>
                          <view class="color-light">
                            <template>{{omitTo(item.margin,2)}}</template>
                          </view>
                        </view>
                    </view>
                    <view class="row d-flex m-y-xs justify-between fn-10 p-t-xs">
                        <view class="w-33 fn-left">
                          <view class="label">{{ $t("first.c7") }}({{ $t("contract.d8") }})</view>
                          <view class="color-light">{{item.traded_amount}}</view>
                        </view>
                        <view class="w-33 fn-center">
                          <view class="label">{{ $t("contract.a9") }}(USDT)</view>
                          <view class="color-light">
                            {{item.avg_price}}
                          </view>
                        </view>
                        <view class="w-33 fn-right">
                          <!-- <view class="label">担保资产</view>
                          <view class="color-light">
                            <template>{{omitTo(item.margin,2)}}</template>
                          </view> -->
                        </view>
                    </view>
                  </view>
                </view>
            </template>
            <van-empty v-if="!listCurrent.length&&active==1" description="" />
            
        </view>
        <van-popup :show="stoplossShow" @close="stoplossShow = false" closeable custom-style="height:auto;width:90%;overflow:auto;padding-bottom:20px;border-radius:5px">
            <view>
                <view class="p-y-xs p-x-md border-b d-flex align-center">
                    <view class="p-xs rounded-sm fn-bold" :class="
              activeItem.side == 2
                ? 'bg-danger-transparent color-danger'
                : 'bg-success-transparent color-success'
            ">
                        {{ activeItem.side == 1 ? $t("contract.e8") : $t("contract.e9") }}
                    </view>
                    <view class="fn-bold m-x-sm">{{ activeItem.pair_name }}</view>
                    <view>{{ activeItem.lever_rate }}X</view>
                </view>
                <view class="p-x-md p-t-md d-flex">
                    <view class="m-r-md">
                        <span>{{ $t("contract.e9") }}：</span><span class="color-light">{{ activeItem.avg_price * 1 }}</span>
                    </view>
                    <view>
                        <span>{{ $t("contract.i2") }}：</span><span class="color-light">{{ activeItem.realtimePrice }}</span>
                    </view>
                </view>
                <view class="p-x-md p-t-0">
                    <v-input class="p-sm rounded border m-t-sm" :placeholder="$t('contract.i3')" type="number" v-model="strategyForm.tp_trigger_price">
                        <template #left>
                            <span class="color-default">{{ $t("contract.i4") }}：</span>
                        </template>
                    </v-input>
                    <!-- <view class="p-t-xs fn-sm color-tips" v-if="strategyForm.tp_trigger_price">
                        {{ $t("contract.i5") }}{{ strategyForm.tp_trigger_price
            }}{{ $t("contract.i6") }}
                        {{
              activeItem.side == 1
                ? many(activeItem, strategyForm.tp_trigger_price)
                : air(activeItem, strategyForm.tp_trigger_price)
            }}
                        USDT
                    </view> -->
                    <v-input class="p-sm rounded border m-t-sm" :placeholder="$t('contract.i3')" type="number" v-model="strategyForm.sl_trigger_price">
                        <template #left>
                            <span class="color-default">{{ $t("contract.i7") }}：</span>
                        </template>
                    </v-input>
                    <!-- <view class="p-t-xs fn-sm color-tips" v-if="strategyForm.sl_trigger_price">
                        {{ $t("contract.i5") }}{{ strategyForm.sl_trigger_price
            }}{{ $t("contract.i8") }}
                        {{
              activeItem.side == 1
                ? many(activeItem, strategyForm.sl_trigger_price)
                : air(activeItem, strategyForm.sl_trigger_price)
            }}
                        USDT
                    </view> -->
                    <view class="h-10"></view>
                    <view class="d-flex justify-between">
                        <v-button class="m-t-md rounded-lg w-40" type="green" block @click="stoploss(0)" ref="strateBtn">
                            {{ $t("contract.i9") }}
                        </v-button>
                        <v-button class="m-t-md rounded-lg w-40" type="red" block @click="stoploss(1)" ref="strateBtn">
                            {{ $t("exchange.g4") }}
                        </v-button>
                    </view>
                    
        			<!-- <view class="h-55"></view> -->
                </view>
            </view>
        </van-popup>
        
        <van-popup :show="showPing" @close="showPing = false" closeable custom-style="height:auto;width:90%;overflow:hidden;padding-bottom:20px;border-radius:5px">
            <view>
                <view class="p-y-xs p-x-md border-b d-flex align-center">
                    <view class="p-xs rounded-xs fn-bold" :class="
              activeItem.side == 1
                ? 'bg-danger-transparent color-danger'
                : 'bg-success-transparent color-success'
            ">
                        {{ $t("contract.h6")
            }}{{ activeItem.side == 1 ? $t("contract.e8") : $t("contract.e9") }}
                    </view>
                    <view class="fn-bold m-x-sm">{{ activeItem.pair_name }}</view>
                    <view>{{ activeItem.lever_rate }}X</view>
                </view>
                <view class="p-md p-b-0">
                    <v-input class="p-sm rounded-xd border" :placeholder="$t('contract.h7')" type="number" v-model="activeItem.realtimePrice" v-if="activeItem.closeType == 1">
                        <template #right>
                            <!-- <v-button size="mini" type="theme" @click="activeItem.closeType = 2">{{ $t("contract.d7") }}</v-button> -->
                            <v-dropdwon class="w-30 m-r-xs bg-form-panel-3 p-y-xxs rounded posi" :list="shixian" @onClick="dropDownxian">
                            </v-dropdwon>
                        </template>
                    </v-input>
                    <v-input class="p-sm rounded border bg-panel-1 fn-center color-sell" disabled :value="$t('contract.d7')" v-else>
                        <template #right>
                            <!-- <v-button size="mini" type="theme" @click="activeItem.closeType = 1">{{ $t("contract.h8") }}</v-button> -->
                            <v-dropdwon class="w-30 m-r-xs bg-form-panel-3 p-y-xxs rounded posi" :list="shixian" @onClick="dropDownxian">
                            </v-dropdwon>
                        </template>
                    </v-input>
                    <v-input class="p-sm rounded border m-t-sm" :placeholder="$t('contract.h9')" type="number" v-model="pingAmount">
                        <template #right>
                            <span class="color-default">{{ $t("contract.d8") }}</span>
                        </template>
                    </v-input>
                    <view class="fn-sm m-y-xs">
                        {{ $t("contract.i0") }} {{ activeItem.avail_position }}
                        {{ $t("contract.d8") }}
                    </view>
                    <view class="d-flex justify-between m-y-md">
                        <view class="borders w-23 rounded fn-center p-y-xs fn-12" v-for="(item,index) in progressPing" @click="pingChange(item,index)" :class="pingActive==index?'color-theme-1 active':''">
                            {{item}}%
                        </view>
                    </view>
                    <v-button type="blue" class="rounded-lg" block @click="closePosition" ref="btn">
                        {{ $t("contract.h3") }}
                    </v-button>
        			<!-- <view class="h-55"></view> -->
                </view>
            </view>
        </van-popup>
        <van-popup
        custom-style="width:70%;height:auto;padding:20px;border-radius:5px" 
        :show="popshow"
        @close="popshow = false">
            <view class="rounded-xs color-default">
                <text class="fn-20 d-block fn-center fn-bold">{{$t('exchange.a2')}}{{$t('invite.c8')}}</text>
                <text class="d-block m-y-lg" v-html="contractInstruction"></text>
                <v-button
                  type="theme"
                  size="lg"
                  block
                  class="w-max rounded-xs "
                  @click="popshow=false"
                >
                  {{$t('contract.i9')}}
                </v-button>
            </view>
        </van-popup>
    </view>
    </scroll-view>
    <van-popup
    class="share"
    custom-style="width:100%;height:100%;background-color:transparent;padding-top:5%" 
    :show="canvasShow"
    @close="canvasShow = false">
        <view class="canvas" >
            <canvas canvas-id="mycanvas" style="width: 80%;height: 1120rpx;border-radius: 10px;overflow: hidden;"></canvas>
        </view>
        <view class="foot" :style="[{'bottom':android=='iOS'?'60px':'0px'}]">
            <view @click="saveImage" class="bg-lin w-8/12 rounded-xs autowidth fn-center p-y-ms m-t-lg">
                {{$t('common.save')}}
            </view>
            <view @click="cancel" class="autowidth fn-center p-y-ms m-y-lg border-bb">
                {{$t('common.cancel')}}
            </view>
        </view>
    </van-popup>
  </view>
</template>
<script>
import Profile from "@/api/profile";
import sellAndBuy from "@/pages/exchange/sell-and-buy";
import tradeList from "@/pages/exchange/trade-list";
import Contract from "@/api/contract";
import math from "@/utils/class/math";
import { mapState } from "vuex";
import lodash from "lodash";
// import bingProgress from "@/components/bing-progress/bing-progress.vue";
export default {
  name: "open-position",
  components: {
    sellAndBuy,
    tradeList,
    // bingProgress,
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
    },
    symbolDetail: {
        default: () => { },
        type: Object,
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
        type: 1,
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
      active:0,
      activeItem: {},
      strategyForm: {
          symbol: "",
          position_side: "",
          tp_trigger_price: "",
          sl_trigger_price: "",
      },
      stoplossShow: false,
      showPing:false,
      checked: false,
      progress:[25,50,75,100],
      progressPing:[25,50,75,100],
      sliderActive:-1,
      pingActive:3,
      contract:"1",
      popshow:false,
      contractInstruction:'',
      commissionTypes:[
          { label: this.$t("contract.f6"), value: 1 },
          { label: this.$t("exchange.d6")+this.$t("contract.g5"), value: 0 }
        ],
      shixian:[
        { label: this.$t("contract.h8"), value: 1 },
        { label: this.$t("contract.d7"), value: 2 }
      ],
      canvasShow:false,
      myCanvas:'',
      detail: '',
      scrollTop:0,
      refreshing:false,
      pingAmount:'',
      imgurl:'',
      bao:0
    };
  },
  computed: {
    ...mapState({
      ws: "ws1",
    }),
    symbol() {
      return this.query.symbol;
    },
    symbolLeft() {
      if (!this.symbol) return;
      return this.symbol.split("/")[0];
    },
    // 是否为自选
    isCoolect() {
      return this.collect.map((item) => item.pair_name).includes(this.symbol);
    },
    // 选中的委托类型
    // activeCommission() {
    //   return this.commissionTypes.find((item) => this.form.type == item.value);
    // },
    // 保证金
    margin() {
      return math.omitTo(
        (this.form.amount * this.unit_amount) / this.form.lever_rate,
        0
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
    android(){
        // #ifdef APP-PLUS
        return plus.os.name
        // #endif
    }
  },
  watch: {
    symbol() {
      this.$emit("symbols",this.symbol)
      if (this.unSymbol) {
        this.unLink(this.unSymbol);
      }
      if (this.isLogin) {
        this.holdPosition();
        this.getCurrentEntrust()
      }
      this.getMarketInfo();
      this.contractAccount();
      this.getSymbolDetail();
    },
    // 当前页面显示就订阅
    isShow(n) {
        this.$emit("symbols",this.symbol)
        this.commissionTypes=[
          { label: this.$t("contract.f6"), value: 1 },
          { label: this.$t("contract.f5"), value: 0 }
        ]
      if (n&&this.isLogin) {
        this.generalizeInfo()
        this.getMarketInfo();
        this.openNum();
        this.dtime = setInterval(() => {
            this.holdPosition(true)
            this.contractAccount(true)
        }, 1000);
      } else if(!n&&this.isLogin){
          clearInterval(this.dtime);
        if (this.unSymbol) {
          this.unLink(this.unSymbol);
        }
      }
    },
    active(e){
        if(e==0&&this.isLogin){
            this.dtime = setInterval(() => {
                this.holdPosition(true)
                this.contractAccount(true)
            }, 1000);
        }else if(e==1&&this.isLogin){
            clearInterval(this.dtime);
            this.getCurrentEntrust()
        }
    },
    tabs(e){
        // if(e=='contract'&&this.isLogin){
        //     this.dtime = setInterval(() => {
        //         this.holdPosition(true)
        //         this.contractAccount(true)
        //     }, 1000);
        // }else if(e!='contract'&&this.isLogin){
        //     console.log(1)
        //     clearInterval(this.dtime);
        // }
    },
    canvasShow(n){
        if(n==false){
            let windowHeight,windowWidth
            uni.getSystemInfo({
                success: function (res) {
                    windowHeight=res.windowHeight
                    windowWidth=res.windowWidth
                }
            });
            // let myCanvas = uni.createCanvasContext('mycanvas'); 
            // this.myCanvas.clearRect(0,0,1000,1000)
            // this.myCanvas.fillRect(0,0,c.width,c.height);  
            // console.log(this.myCanvas)
            // this.myCanvas.draw(false)
        }
    }
  },
  methods: {
      onRefresh(){
          if (this.refreshing) return;
          this.refreshing = true;
          setTimeout(() => {
              this.holdPosition(true)
              this.contractAccount(true)
              this.refreshing = false;
          }, 1000)
      },
      positionShare() {
        Contract.positionShare({
          symbol: this.query.symbol,
          position_side: this.query.position_side,
          lang:uni.getStorageSync('language')||'zh-CN'
        }).then((res) => {
          this.data = res.data;
          this.imgList = res.data.share_imgs;
      	this.imgTitleTip=res.data.tip;
        });
      },
      canvasImage(i){
          this.canvasShow=true
          Contract.positionShare({
            symbol: i.symbol,
            position_side: i.side,
            lang:uni.getStorageSync('language')||'zh-CN'
          }).then((ress) => {
                if(ress.code==200){
                    this.sha(ress,i)
                }
          });
      },
      sha(ress,i){
          let arr=[];
          ress.data.share_imgs.forEach((res)=>{
              if(i.unRealProfit>0&&res.type==1){
                  arr.push(res)
              }else if(i.unRealProfit<0&&res.type==2){
                  arr.push(res)
              }
          })
          var share_imgs=arr[Math.round(Math.random()*arr.length)];
          if(!share_imgs){
              this.$toast(this.$t('recharge.a6'))
              this.canvasShow=false
              return
          }
          let windowHeight,windowWidth
          uni.getSystemInfo({
              success: function (res) {
                  windowHeight=res.windowHeight
                  windowWidth=res.windowWidth
              }
          });
          let myCanvas = uni.createCanvasContext('mycanvas', this); 
          //画布背景
          //参数：图片，左偏移，上偏移，宽，高
          myCanvas.drawImage(share_imgs.bg_img,0,0,windowWidth,windowHeight);
          myCanvas.drawImage(share_imgs.peri_img,-40,0,windowWidth,windowHeight*0.3);
          myCanvas.drawImage('../../static/img/logo.png',25,windowHeight*0.6,50,50);
          myCanvas.drawImage(this.detail,windowWidth*0.58,windowHeight*0.59,65,65);
          
          myCanvas.textAlign = 'left';
          myCanvas.setFillStyle('#000000')
          myCanvas.font = '12px Arial';//绘制文字
          myCanvas.fillText('全球合约领跑者',88,windowHeight*0.653);
          myCanvas.font = '16px Arial';
          myCanvas.fillText('AMATAK',88,windowHeight*0.63);
          myCanvas.font = '14px Arial';
          myCanvas.setFillStyle('#717171')
          myCanvas.fillText(i.pair_name,25,windowHeight*0.53);
          myCanvas.fillText(this.$t("contract.k0"),uni.getStorageSync('language')=='zh-CN'?windowWidth*0.34:windowWidth*0.29,windowHeight*0.53);
          myCanvas.fillText(this.$t("contract.k1"),uni.getStorageSync('language')=='zh-CN'?windowWidth*0.6:windowWidth*0.56,windowHeight*0.53);
          
          myCanvas.setFillStyle('#000000')
          myCanvas.fillText(i.side==1?this.$t("contract.g0"):this.$t("contract.g1"),25,windowHeight*0.555);
          myCanvas.fillText(ress.data.price1>1?this.omitTo(ress.data.price1,2):this.omitTo(ress.data.price1,4),uni.getStorageSync('language')=='zh-CN'?windowWidth*0.345:windowWidth*0.33,windowHeight*0.555);
          myCanvas.fillText(ress.data.price2>1?this.omitTo(ress.data.price2,2):this.omitTo(ress.data.price2,4),uni.getStorageSync('language')=='zh-CN'?windowWidth*0.605:windowWidth*0.6,windowHeight*0.555);
          
          myCanvas.textAlign = 'center';
          myCanvas.setFillStyle('#000000')
          myCanvas.font = '25px Arial';
          this.drawText(myCanvas, share_imgs.title, windowWidth/2.5, windowHeight*0.34, 30, 265);// 调用行文本换行函数
          // myCanvas.fillText(share_imgs.title,windowWidth/2.5,windowHeight*0.35);
          
          myCanvas.textAlign = 'center';
          myCanvas.font = '12px Arial';
          myCanvas.fillText(this.$t('option.a4'),windowWidth/2.5,windowHeight*0.42);
          myCanvas.setFillStyle(i.unRealProfit>0?'#60c08c':'#ea3131')
          myCanvas.font = 'bold 50px Arial';
          myCanvas.fillText(ress.data.profitRate,windowWidth/2.5,windowHeight*0.48);
          myCanvas.draw(true,()=>{
              uni.canvasToTempFilePath({
                  canvasId: 'mycanvas',
                  // destWidth: windowWidth, //分享图片尺寸=画布尺寸1*缩放比0.5*像素比2
                  // destHeight: windowHeight*0.9,
                  success: (res) => {
                      // 在H5平台下，tempFilePath 为 base64
                      this.imgurl = res.tempFilePath;
                      // this.canvasShow = false;
                      uni.setStorageSync('person-card',this.imgurl);
                    },
                  fail: () => {
                      
                  }
              });
          });
      },
      drawText (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
          let lineWidth = 0;
          let lastSubStrIndex = 0; //每次开始截取的字符串的索引
          for (let i = 0; i < str.length; i++) {
              lineWidth += ctx.measureText(str[i]).width;
              if (lineWidth > canvasWidth) {
                  ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
                  initHeight += 22; //22为 文字大小20 + 2
                  lineWidth = 0;
                  lastSubStrIndex = i;
                  titleHeight += 22;
              }
              if (i == str.length - 1) { //绘制剩余部分
                  ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
              }
          }
          // 标题border-bottom 线距顶部距离
          titleHeight = titleHeight + 10;
          return titleHeight;
      },
      saveImage(){
          // uni.showActionSheet({
          //     itemList: [this.$t('common.save')], 
          //     success: (res) => {
          //         if(res.tapIndex == 0){
                      
          //         }
          //     },
          //     fail: function (res) {
          //         console.log(res.errMsg);
          //     }
          // });
          uni.saveImageToPhotosAlbum({
              filePath: this.imgurl,//    图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
              fileType: 'jpg', //图片的质量，目前仅对 jpg 有效。取值范围为 (0, 1]，不在范围内时当作 1.0 处理。
              quality: 1,
              success: () => {
                  this.canvasShow = false;
                  uni.showToast({
                      title: this.$t('common.b3'),
                      duration: 2000
                  });
              },
              fail: () => {
                  uni.showToast({
                      title: this.$t('common.b4'),
                      duration: 2000 
                  });
              }
          });
      },
      generalizeInfo() {
        Profile.qrcode().then((res) => {
          this.detail = res.data;
        });
      },
      cancel(){
          let windowHeight,windowWidth
          uni.getSystemInfo({
              success: function (res) {
                  windowHeight=res.windowHeight
                  windowWidth=res.windowWidth
              }
          });
          this.canvasShow=false
          let myCanvas = uni.createCanvasContext('mycanvas', this);
          myCanvas.width=0
          myCanvas.height=0
      },
      // 设置数量
      // sliderChange($ev) {
      //   this.form.amount = Math.round((this.maxNum * $ev) / 100)||'';
      // },
      // tooltip($ev) {
      //   return Math.round($ev) + "%";
      // },
      omitTo:math.omitTo,
    Instruction(){
        Contract.instruction().then((res) => {
            this.contractInstruction=res.data
        });
    },
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
    holdPosition(boo) {
        let data = {
            symbol: (this.checked && this.symbolLeft) || "",
        };
        // var market=this.symbol.split('/')[0]
        // let data = {
        //     symbol: market||"",
        // };
        Contract.holdPosition(data, { loading: !boo }).then((res) => {
            this.list = res.data.filter((item) => item.hold_position);
            if (!boo) {
                this.sendPrice();
            }
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
        this.$toast(this.$t('contract.c6'))
        // this.$refs.vPag.resetData()
        this.getCurrentEntrust()
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
          // this.form.lever_rate = res.data.lever_rate;
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
          this.form.lever_rate = this.lever_rage[2].value;
          let e=this.lever_rage[2]
          this.openNum(e);
        }
        this.$emit("getSymbolDetail", res.data);
        if (!this.form.lever_rate) {
          this.form.lever_rate = this.lever_rage[2].value;
          this.openNum(e);
        }
      });
    },
    // 获取可开启张数
    openNum(e) {
      if(e){
          this.form.lever_rate=e.value
      }
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
            this.form.type == 0
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
      data.type=this.form.type==0?1:2
      let btn;
      if (side == 1) {
        //开多
        btn = this.$refs.btn1;
      } else {
        // 开空
        btn = this.$refs.btn2;
      }
      Contract.openPosition(data, { btn }).then(() => {
          this.$toast(this.$t("contract.g2"));
          if(this.form.type==1){
              this.holdPosition()
          }else{
              this.getCurrentEntrust()
          }
        this.contractAccount();
      });
    },
    sliderChange(n,i) {
      this.form.amount = Math.round((this.maxNum * n) / 100);
      this.sliderActive=i
    },
    pingChange(n,i) {
        console.log(n)
      this.pingAmount = Math.round((this.activeItem.avail_position * n) / 100);
      this.pingActive=i
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
        
    },
    toStoploss(item) {
        this.strategyForm.tp_trigger_price=item.tpPrice
        this.strategyForm.sl_trigger_price=item.slPrice
        this.activeItem = item;
        this.strategyForm.symbol = this.activeItem.symbol;
        this.strategyForm.position_side = this.activeItem.side;
        this.stoplossShow = true;
        
    },
    stoploss(i) {
        this.strategyForm.iscanel=i
        Contract.setStrategy(this.strategyForm, {
            btn: this.$refs.strateBtn
        }).then((res) => {
            this.strategyForm.tp_trigger_price = "";
            this.strategyForm.sl_trigger_price = "";
            this.stoplossShow = false;
            this.$toast(res.message);
        });
    },
    // 限价平仓
    closePositionShow(item) {
        this.activeItem = item;
        this.pingActive=3
        this.$set(this.activeItem, "closeType", 1);
        this.pingAmount = Math.round((this.activeItem.avail_position * 100) / 100);
        this.showPing = true;
    },
    closePosition() {
        let data = {
            side: this.activeItem.side == 1 ? 2 : 1,
            type: this.activeItem.closeType,
            symbol: this.activeItem.symbol,
            entrust_price: this.activeItem.realtimePrice || 0,
            amount: this.pingAmount,
        };
        Contract.closePosition(data, { btn: this.$refs.btn }).then((res) => {
            this.showPing = false;
            this.pingActive=3
            this.activeItem.realtimePrice = "";
            this.pingAmount = "";
            this.holdPosition();
            this.$toast(res.message);
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
    dropDownChange(e){
        this.form.type=e.value
    },
    dropDownxian(e){
        this.activeItem.closeType=e.value
    }
  },
  mounted() {
      this.Instruction()
    if (this.symbol) {
      this.getHistoryEntrust()
      this.getMarketInfo();
      this.contractAccount();
      this.getSymbolDetail();
    }
    this.socketMessage();
    if(this.isLogin){
        this.generalizeInfo()
        this.holdPosition()
        this.getCurrentEntrust()
        this.dtime = setInterval(() => {
          this.holdPosition(true);
          this.contractAccount(true)
        }, 1000);
    }
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
.back_f{
	background-color: #f4f3f8;
}
.tixing1{
	 width: 49.5%;
	 		height: 36px;/* 宽高 */
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
		width: 49.5%;
		height: 36px;/* 宽高 */
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
	width: 100%;
	z-index: 1;
	text-align: center;
	line-height: 35px;
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
.w-40{
    width: 40%;
}
.w-20{
    width: 20%;
}
.p-y-xxs{
    padding: 3px 0;
}
.p-y-2{
    padding: 2px 6px;
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
    border-bottom: 4px solid $border-color;
}
.bor5-active{
    border-bottom: 4px solid $theme-2;
    position: relative;
    top: 4px;
}
::v-deep .van-stepper{
    background-color: $form-panel-3;
    border-radius: 50px;
    overflow: hidden;
    padding: 3px;
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
.w-23{
    width: 22%;
}
.w-25{
    width: 25%;
}
.w-75{
    width: 75%;
}
.w-33{
    width: 27%;
}
.w-50{
    width: 50%;
}
.t-no{
   overflow:hidden;
   	text-overflow:ellipsis;
   	white-space:nowrap
}
.h-120{
    height: 120px;
}
.borders{
    // border-color: $form-panel-4!important;
    border: 1px solid $form-panel-4!important;
}
.active{
    // border:1px solid $theme-1!important;
    border-color: $theme-1!important;
}
.icon{
    position: absolute;
    right: 0;
}
.positions{
    position: relative;
}
.canvas{
    canvas{
        margin: 50px auto 0 auto;
        transform: scale(0.8);
    }
}
.foot{
    width:100%;
    position:fixed;
    z-index: 100;
    /* #ifdef H5 */
    bottom: 0;
    /* #endif */
    background-color: #2c2f3a;
    color: black;
}
.autowidth{
    margin: 0 auto;
}
.bg-lin{
    background: linear-gradient(to right,#f6c769,#f3b644);
}
.border-bb{
    border-top: 3px solid #000;
    color: #969696;
}
/deep/ .share.vant-popup-index{
    z-index: 100;
}
.footer{
    z-index: 0;
}
.posi{
    position: relative;
}
.w-40{
    width: 45%;
}
</style>