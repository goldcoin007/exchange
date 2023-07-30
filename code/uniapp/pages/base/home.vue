<template>
  <view class="d-flex flex-col">
    <!-- 头部 -->
    <v-header
      class="nav_bar m-y-xs"
      :left-text="$t('base.a1')"
      :left-arrow="false"
      :left-click="personalCenter"
    >
      <template #left>
        <van-icon name="user-circle-o" class="fn-25 color-theme-1" />
        <view class="d-flex align-center justify-center">
          <text class="p-l-md fn-18 color-light">{{ app.appName }}
            <span class="fn-16 m-l-xs">{{$t('first.a2')}}</span>
          </text>
        </view>
      </template>
      <!-- <template #title>
        
      </template> -->
      <template #right>
        <v-link to="/pages/list/list?isSearch=1" class="d-flex align-center">
          <van-icon class="fn-20" name="search" />
        </v-link>
      </template>
    </v-header>
    <view class="layout-main">
        <scroll-view
          @refresherrefresh="onRefresh"
          :refresher-enabled="refresherEnabled&&scrollTop<50"
          :refresher-triggered="refreshing"
          refresher-background="transparent"
          :refresher-threshold="50"
        >
      <!-- 轮播 -->
      <swiper
        class="my-swipe m-x-md p-b-xs"
        :autoplay="true"
        indicator-dots
        indicator-color="white"
      >
        <swiper-item
          class="my_swipe_item"
          v-for="(item, idx) in home"
          :key="idx"
        >
          <img width="100%" height="100%" class="rounded-sm" fit="cover" :src="item.imgurl" />
        </swiper-item>
      </swiper>
      <!-- 公告 -->
      <v-notice-bar
        v-if="notice.length"
        class="m-t-md m-x-md bg-panel-1 box-shadow rounded-sm"
      >
        <template #left-icon>
          <van-icon
            class="m-r-sm fn-16"
            @click="() => _router.push({ path: '/pages/notice/index' })"
            name="volume-o"
          />
        </template>
        <v-link
          class="fn-13 eps-1"
          :to="{ path: '/pages/notice/detail', query: { id: notice[0].id } }"
          >{{ notice[0].title }}</v-link
        >
        <template #right-icon>
         <view class="m-l-xs" @click="_router.push({ path: '/pages/notice/index' })">
             <van-icon name="wap-nav" />
         </view>
        </template>
      </v-notice-bar>
      <!-- 次一级导航 -->
      <view class="nav2 p-x-md m-t-ms d-flex justify-around fn-center">
        <v-link tag="div" to="/pages/assets/recharge" class="item">
          <view class="icon">
            <img :class="theme == 'light' ? 'bg-box-per' : ''" class="h-33" src="static/img/13.png" />
          </view>
          <view class="fn-13 m-t-xxs">{{ $t("base.b5") }}</view>
        </v-link>
        <v-link tag="div" to="/pages/assets/draw" class="item">
          <view class="icon">
            <img :class="theme == 'light' ? 'bg-box-blue' : ''" class="h-33 " src="static/img/5.png" />
          </view>
          <view class="fn-13 m-t-xxs">{{ $t("base.b6") }}</view>
        </v-link>
        <v-link tag="div" to="/pages/service/index" class="item">
          <view class="icon">
            <img :class="theme == 'light' ? 'bg-box-red' : ''" class="h-33 " src="static/img/ke.png" />
          </view>
          <view class="fn-13 m-t-xxs">{{ $t("common.service") }}</view>
        </v-link>
        <v-link tag="div" to="/pages/invite/index" class="item" >
          <view class="icon">
            <img :class="theme == 'light' ? 'bg-box-yellow' : ''" class="h-33 " src="static/img/4.png" />
          </view>
          <view class="fn-13 m-t-xxs">{{ $t("base.b7") }}</view>
        </v-link>
      </view>
      <!-- 指数 -->
      <view class="stock-swipe d-flex p-x-md m-t-ms">
        <view
          class="swipe_right flex-fill lists"
          v-for="(parentItem,index) in marketList"
          v-if="index==1"
          :key="parentItem.coin_name"
        >
          <view
            v-for="(item,iindex) in parentItem.collect
            ? collect
            : parentItem.marketInfoList"
            :key="iindex"
            class="stock-index item flex-fill p-y-ms rounded-xs box-size  lists-1"
            v-if="item.pair_name=='BTC/USDT'||item.pair_name=='ETH/USDT'||item.pair_name=='ETC/USDT'"
            >
            <v-link
                  :to="{
                    path: '/pages/exchange/index',
                    query: { code: item.pair_name },
                  }">
                <view class="stock-index-img fn-12 color-gray-6 m-b-xs fn-center">
                  <view class="color-light">{{ item.pair_name }}<text class="stock-item-3" :class="item.increase * 1 < 0 ? 'color-sell' : 'color-buy'">{{ item.increaseStr }}</text></view>
                </view>
                <view class="fn-18 color-light fn-center m-b-xs" :class="item.increase * 1 < 0 ? 'color-sell' : 'color-buy'">{{ item.close }}</view>
                <view
                  class="d-flex flex-col align-center fn-sm justify-center"
                  >
                  
                  <view class="color-theme-6">≈{{ $t("currency.b9") }}{{omitTo(item.close*price_cny,2)}}</view>
                </view>
            </v-link>
          </view>
        </view>
      </view>
      <!-- 科创板 -->
      <!-- <view class="head_info m-y-xl">
        <view class=" d-flex justify-between align-center p-x-xs p-t-lg bor5 p-b-xs">
            <view class="d-flex">
                <text class="m-x-xs fn-center" @click="active=0" :class="active==0?'fn-bold fn-15 p-b-xs bor5-active color-light':''">合約指數</text>
                <text class="m-x-xs fn-center" @click="active=1" :class="active==1?'fn-bold fn-15 p-b-xs bor5-active color-light':''">現貨指數</text>
            </view>
        </view>
        <template v-if="active==0" v-for="parentItem in (marketList)">
            <view class="m-xs" :key="parentItem.coin_name" v-if="parentItem.coin_name=='USDT'">
                <view v-for="item in parentItem.marketInfoList"  :key="item.pair_name" class="bg-panel-3m-t-xs">
                    <view class="w-12/12">
                      <view class="fn-center w-max">
                        <v-link
                          :to="{
                            path: '/pages/exchange/index',
                            query: { code: item.pair_name },
                          }"
                          class="m-b-md m-x-xs rounded-sm bg-panel-3 box-shadow link-active d-flex justify-between align-center p-r-md p-y-md box-size p-x-xs"
                          v-for="item in parentItem.collect
                            ? collect
                            : parentItem.marketInfoList"
                          :key="item.pair_name"
                        >
                          <view class="fn-left w-6/12">
                            <view class="d-flex align-center">
                                <text class="fn-bold fn-16 color-light">{{ item.pair_name }}</text>
                                <text class="color-default fn-14 m-l-xs">永续</text>
                            </view>
                            <view class="d-flex align-center fn-12 m-t-xs">
                                24H量 {{ omitTo(item.vol,0) }}
                            </view>
                          </view>
                          <view class="fn-left align-end w-3/12">
                            <view class="d-flex align-end fn-bold fn-16" :class="item.increase * 1 >0?'color-buy':'color-sell'">{{ item.close }}</view>
                            <view class="m-t-xs">
                                {{ $t("currency.b9") }}{{ omitTo(item.close*price_cny,2) }}
                            </view>
                          </view>
                          <view class="fn-right w-3/12">
                            <span
                            class="rounded-xs"
                              :class="
                                item.increase * 1 > 0 ? 'color-buy' : 'color-sell'
                              "
                              >{{ item.increaseStr }}</span
                            >
                          </view>
                        </v-link>
                      </view>
                    </view>
                </view>
            </view>
        </template>
      </view> -->
      <!-- $toast($t('first.b9')) -->
      <view @click="_router.push('/pages/currency/index')" class="otc m-md bg-panel-3 m-t-md box-shadow rounded-lg d-flex justify-between align-center p-r-lg">
          <view class="d-flex align-center">
              <img width="43px" height="43px" src="static/img/b.png"/>
              <view class="color-theme-2 fn-15 m-l-md d-flex align-center">{{ $t("first.b7") }}<span class="color-light fn-12 m-l-xs">{{ $t("first.b6") }}</span></view>
          </view>
          <van-icon name="arrow" class="color-theme-2"/>
      </view>
      
      <!-- <view class="m-x-md ">
          <text @click="infoActive=0" class="m-r-lg" :class="infoActive==0?'fn-bold fn-16 bor5 color-light':''">{{ $t("first.b5") }}</text>
          <text @click="infoActive=1" class="m-l-lg" :class="infoActive==1?'fn-bold fn-16 bor5 color-light':''">{{ $t("first.b4") }}</text>
      </view> -->
      
      <view class="head_info m-y-md ">
        <van-tabs
          v-if="marketList.length"
          :active="infoActive"
          background="transparent"
          :border="false"
          animated
        >
            <van-tab>
              <view class="w-12/12 m-t-xs">
                 <view class="fn-center w-max">
                   <v-link
                     :to="{
                       path: '/pages/exchange/index',
                       query: { code: item.pair_name,contract:1 },
                     }"
                     class="m-b-md m-x-md rounded-xs bg-panel-3 box-shadow link-active d-flex justify-between align-center p-x-md p-y-xs box-size p-x-xs"
                     v-for="(item,index) in marketListHe"
                     :key="index"
                   >
                     <view class="fn-left w-6/12">
                       <view class="d-flex align-center">
                           <text class="fn-bold fn-14 color-light">{{ item.pair_name }}</text>
                           <text class="color-default fn-12 m-l-xs">{{ $t("first.b8") }}</text>
                       </view>
                       <view class="d-flex align-center fn-12 m-t-xs">
                           24H{{ $t("first.b3") }} {{ omitTo(item.vol,0) }}
                       </view>
                     </view>
                     <view class="fn-left align-end w-3/12">
                       <view class="d-flex align-end fn-bold fn-16" :class="item.increase * 1 >0?'color-buy':'color-sell'">{{ item.close }}</view>
                       <view class="m-t-xs">
                           {{ $t("currency.b9") }}{{ omitTo(item.close*price_cny,2) }}
                       </view>
                     </view>
                     <view class="fn-right w-3/12 positions">
                       <span
                       class="rounded-xs posi fn-12"
                         :class="
                           item.increase * 1 > 0 ? 'color-buy' : 'color-sell'
                         "
                         >{{ item.increaseStr }}</span
                       >
                       <view class="charts-box m-t-xs">
                         <qiun-data-charts
                           type="tarea"
                           :chartData="item.kline"
                           background="none"
                           :tapLegend="false"
                           :range="item.increase*1>0?true:false"
                         />
                       </view>
                     </view>
                   </v-link>
                 </view>
              </view>
            </van-tab>
          <van-tab
            v-for="parentItem in marketList"
            :key="parentItem.coin_name"
            v-if="parentItem.coin_name=='USDT'"
          >
            <view class="w-12/12 m-t-xs">
              <view class="fn-center w-max">
                <v-link
                  :to="{
                    path: '/pages/exchange/index',
                    query: { code: item.pair_name },
                  }"
                  class="m-b-md m-x-md rounded-xs bg-panel-3 box-shadow link-active d-flex justify-between align-center p-x-md p-y-xs box-size p-x-xs"
                  v-for="item in parentItem.collect
                    ? collect
                    : parentItem.marketInfoList"
                  :key="item.pair_name"
                >
                  <view class="fn-left w-6/12">
                    <view class="d-flex align-center">
                        <text class="fn-bold fn-14 color-light">{{ item.pair_name }}</text>
                    </view>
                    <view class="d-flex align-center fn-12 m-t-xs">
                        24H{{ $t("first.b3") }} {{ omitTo(item.vol,0) }}
                    </view>
                  </view>
                  <view class="fn-left align-end w-3/12">
                    <view class="d-flex align-end fn-bold fn-16" :class="item.increase * 1 >0?'color-buy':'color-sell'">{{ item.close }}</view>
                    <view class="m-t-xs">
                        {{ $t("currency.b9") }}{{ omitTo(item.close*price_cny,2) }}
                    </view>
                  </view>
                  <view class="fn-right w-3/12 positions">
                    <span
                    class="rounded-xs posi fn-12"
                      :class="
                        item.increase * 1 > 0 ? 'color-buy' : 'color-sell'
                      "
                      >{{ item.increaseStr }}</span
                    >
                    <view class="charts-box m-t-xs">
                      <qiun-data-charts
                        type="tarea"
                        :chartData="item.kline"
                        background="none"
                        :tapLegend="false"
                        :range="item.increase*1>0?true:false"
                      />
                    </view>
                  </view>
                </v-link>
              </view>
            </view>
          </van-tab>
        </van-tabs>
      </view>
      </scroll-view>
    </view>
    <!-- 个人主页弹出层 -->
    <van-popup
      class="personalCenter-main colbg bg-panel-4"
      :show="show"
      @close="show = false"
      position="left"
      custom-style="width:100%;height:100%"
    >
      <view style="height: var(--status-bar-height)"></view>
      <view class="personalCenter-top">
          <view class="theme-switch m-x-md d-flex justify-between">
              <van-icon name="arrow-left" @click="show = false" class="fn-22"/>
              <!-- <view class="v-switch border rounded-xs d-flex" @click="changtTheme">
                <view
                  class="icon border"
                  :class="theme == 'light' ? 'bg-gradient-green active' : 'bg-gradient-green'"
                >
                  <view class="left color-light">{{ $t("common.light") }}</view>
                  <view class="right color-light">{{ $t("common.dark") }}</view>
                </view>
              </view> -->
              <img width="25px" height="25px" @click="changtTheme" :src="theme == 'light' ? 'static/img/moon.png' : 'static/img/sun.png'" />
          </view>
        <view class="information p-l-md m-t-xl">
          <!-- <img :src="logoMap.login_logo" class="h-50 w-50 d-block m-r-xs rounded-max flex-shrink" /> -->
          <view class="inf-rig flex-fill">
            <!-- <span class="fn-lg color-light" v-if="isLogin">{{
              user.account
            }}</span> -->
             <!-- @click="toAccountSettings" -->
            <span v-if="isLogin" class="inf-rig-cent fn-20 color-light">UID：{{ isLogin ? user.user_id : "-" }}
                <!-- #ifdef H5 -->
                <i class="iconfont m-l-lg" @click="copy(user.user_id)">&#xe706;</i>
                <!-- #endif -->
                <!-- #ifndef H5 -->
                <i class="iconfont m-l-lg" @click="$copy(user.user_id+'')">&#xe706;</i>
                <!-- #endif -->
            </span>
            <view v-else class="color-light" @click.stop>
              <view class="fn-bold fn-16">
                  {{ $t("first.b2") }}
              </view>
              <v-link to="/pages/login/index" class="color-theme-1 goLogin rounded m-t-xs fn-xs">
                {{ $t("first.b1") }}
              </v-link>
            </view>
          </view>
          <v-link v-if="false" to="/pages/invite/level" style="padding:3px 4px 6px" class="bg-panel-4 border border-r-0 rounded-tl-lg rounded-bl-lg border-buy" @click.native.stop>
            <span class="fn-xs color-buy">{{ $t("base.e6") }}</span>
          </v-link>
        </view>
      </view>
      <v-link :to="detail.status!=2?'/pages/auth/index':''" tag="div" class="bg-form-panel-3 p-xs m-xs color-theme-1 d-flex justify-between align-center">
          <view class=" d-flex align-center">
              <van-icon name="manager" class="fn-18"/>
              <text class="p-l-md fn-14">{{$t('auth.a1')}}</text>
          </view>
          <text class="bg-theme-1 color-white p-x-xs p-y-xxs rounded" v-if="detail.status!=2">{{$t('first.a0')}}</text>
          <text class="bg-theme-1 color-white p-x-xs p-y-xxs rounded" v-else>{{$t('auth.a3')}}</text>
      </v-link>
      <!-- <view class="personalCenter-center border-b border-gray-5">
        <view class="d-flex justify-around">
          <v-link
            to="/pages/assets/recharge"
            tag="div"
            class="d-flex flex-col align-center"
          >
            <img src="static/img/13.png" alt="" class=" h-44" />
            <span class="fn-md color-light p-y-xs">{{ $t("base.b5") }}</span>
          </v-link>
          <v-link
            to="/pages/assets/draw"
            tag="div"
            class="d-flex flex-col align-center"
          >
            <img src="static/img/5.png" alt="" class="h-44" />
            <span class="fn-md color-light p-y-xs">{{ $t("base.b6") }}</span>
          </v-link>
          <v-link
            to="/pages/purchase/index"
            tag="div"
            class="d-flex flex-col align-center"
          >
            <img src="static/img/8.png" alt="" class="h-44" />
            <span class="fn-md color-light p-y-xs">{{ $t("base.b7") }}</span>
          </v-link>
        </view>
      </view> -->
      <view class="personalCenter-bottom m-t-md">
        <v-link
          to="/pages/commission/index"
          tag="div"
          class="per-bot p-y-md p-x-sm d-flex align-center justify-between"
        >
          <view class="d-flex align-center">
              <img :src="$localImgUrl('Page1.png')" alt="" class="m-r-xs h-17">
              <span class="color-light">{{ $t("base.c1") }}</span>
          </view>
          <van-icon name="arrow" class="fn-18" />
        </v-link>
         <!-- <v-link
          to="/pages/otc/pays"
          tag="div"
          class="per-bot p-y-sm p-l-sm border-b d-flex align-center"
        >
          <img :src="$localImgUrl('Page9.png')" alt="" class="h-20 m-r-xs">
          <span class="color-light">{{$t('otc.j6')}}</span>
        </v-link> -->
        <!-- <v-link
          to="/pages/auth/index"
          tag="div"
          class="per-bot p-y-md p-x-sm d-flex align-center justify-between"
        >
          <view class="d-flex align-center">
              <img :src="$localImgUrl('Page2.png')" alt="" class="h-20 m-r-xs" />
              <span class="color-light">{{ $t("base.c2") }}</span>
          </view>
          <van-icon name="arrow" class="fn-18" />
        </v-link> -->
        <v-link
          to="/pages/safe/index"
          tag="div"
          class="per-bot p-y-md p-x-sm d-flex align-center justify-between"
        >
          <view class="d-flex align-center">
              <img :src="$localImgUrl('Page3.png')" alt="" class="h-20 m-r-xs" />
              <span class="color-light">{{ $t("base.c3") }}</span>
          </view>
          <van-icon name="arrow" class="fn-18" />
        </v-link>
        <v-link
          to="/pages/notice/index"
          tag="div"
          class="per-bot p-y-md p-x-sm d-flex align-center justify-between"
        >
          <view class="d-flex align-center">
              <img :src="$localImgUrl('Page4.png')" alt="" class="h-20 m-r-xs" />
              <span class="color-light">{{ $t("base.c4") }}</span>
          </view>
          <van-icon name="arrow" class="fn-18" />
        </v-link>
        <v-link
          to="/pages/assets/address-list"
          tag="div"
          class="per-bot p-y-md p-x-sm d-flex align-center justify-between"
        >
          <view class="d-flex align-center">
              <img :src="$localImgUrl('Page5.png')" alt="" class="h-20 m-r-xs" />
              <span class="color-light">{{ $t("base.c5") }}</span>
          </view>
          <van-icon name="arrow" class="fn-18" />
        </v-link>
        <!-- <v-link
          to="/pages/purchase/index"
          tag="div"
          class="per-bot p-y-md p-x-sm d-flex align-center justify-between"
        >
          <view class="d-flex align-center">
              <img :src="$localImgUrl('fill5.png')" alt="" class="h-20 m-r-xs" />
              <span class="color-light">{{ $t("exchange.a1") }}</span>
          </view>
          <van-icon name="arrow" class="fn-18" />
        </v-link> -->
        <v-link
          to="/pages/service/service?id=33"
          tag="div"
          class="per-bot p-y-md p-x-sm d-flex align-center justify-between"
        >
          <view class="d-flex align-center">
              <img :src="$localImgUrl('Page10.png')" alt="" class="h-20 m-r-xs" />
              <span class="color-light">{{$t('first.a1')}}</span>
          </view>
          <van-icon name="arrow" class="fn-18" />
        </v-link>
        <v-link
          to="/pages/accountSettings/accountSettings"
          tag="div"
          class="per-bot p-y-md p-x-sm d-flex align-center justify-between"
        >
          <view class="d-flex align-center">
              <img :src="$localImgUrl('Page7.png')" alt="" class="h-20 m-r-xs" />
              <span class="color-light">{{ $t("base.c6") }}</span>
          </view>
          <van-icon name="arrow" class="fn-18" />
        </v-link>
        <!-- <view class="per-bot p-y-md p-x-sm d-flex align-center">
          <img :src="$localImgUrl('Page6.png')" alt="" class="h-20 m-r-xs" />
          <span class="color-light">
            <v-lang
              @change="
                marketList = [];
                indexData();
              "
            ></v-lang>
            <i class="iconfont m-l-xs fn-sm">&#xe6e9;</i>
          </span>
        </view> -->
        <view class="h-100"></view>
        <view v-if="isLogin" class="logout w-max bg-form-panel-4 fn-center color-light p-y-xs rounded-xs" @click="loginOut">
            <text class="w-max rounded-lg border-0">{{ $t("accountSettings.a9") }}</text>
        </view>
      </view>
    </van-popup>
    <van-toast id="van-toast" />
  
  </view>
</template>

<script>
import Home from "@/api/home";
import Wallet from "@/api/wallet";
import Exchange from "@/api/exchange";
import math from "@/utils/class/math.js";
import Member from "@/api/member";
import app from "@/app";
import Profile from "@/api/profile";
import { mapState, mapActions } from "vuex";
import {handleClipboard} from '../../utils/class/copy.js'
import qs from "qs";
export default {
  name: "home",
  props: {
      isShow: {
        default: true,
        type: Boolean,
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
      infoActive: 1, // 详情选中
      marketList: [],
      marketListHe: [],
      home: {},
      notice: [],
      wap: "",
      indexList: [],
      createList: [],
      list: [],
      page: 1,
      tab: "kcb",
      show: false,
      checked: false,
      collect: [],
      app,
      first: true,
      active:0,
      chartDatas:{
        "series": [
                {
                    // "showAllSymbol":true,
                    "data": [10,20,24,24,68,42],
                    "color":"#ff0000"
                },
                // {
                //     "data": [15,2,7,30,51,20],
                //     "color":"#00ff00"
                // }
            ]
      },
      heyue:[],
      price_cny: 0,
      detail:{},
      num:0,
      scrollTop:0,
      refreshing:false
    };
  },
  computed: {
    ...mapState({
      ws: "ws",
      ws1: "ws1",
      user: "user",
      wsState: "wsState",
      logoMap: "logoMap",
      theme: "theme",
    }),
    isLogin() {
      return Boolean(uni.getStorageSync("token"));
    },
  },
  watch: {
    isShow(n) {
      if (n) {
        this.indexData()
        this.ws.send({
          cmd: "sub",
          msg: "indexMarketList",
        });
        this.ws1.send({
          cmd: "sub",
          msg: 'swapMarketList',
        });
      } else {
        this.ws.send({
          cmd: "unsub",
          msg: "indexMarketList",
        });
        this.ws1.send({
          cmd: "unsub",
          msg: 'swapMarketList',
        });
      }
    },
  },
  methods: {
    ...mapActions({
      setTheme: "setTheme",
    }),
    setQuery: qs.stringify,
    omitTo:math.omitTo,
    onRefresh(){
        this.indexData()
        if (this.refreshing) return;
        this.refreshing = true;
        setTimeout(() => {
            this.refreshing = false;
        }, 1000)
    },
    scroll(event){
      this.scrollTop = event.detail.scrollTop
    },
    // 获取汇率
    getCurrencyExCny() {
      Exchange.getCurrencyExCny({
        coin_name: 'USDT', currency: uni.getStorageSync('language')
      }).then((res) => {
        this.price_cny = res.data.price_cny;
      });
    },
    changtTheme() {
      if (this.theme == "light") {
        this.setTheme("dark");
      } else {
        this.setTheme("light");
      }
    },
    // 获取涨跌之前的价格
    getOldPrice(price, rate) {
      return math.multiple(math.division(price, 1 + rate * 1), rate, 2);
    },
    toAccountSettings() {
      this._router.push({ path: "/pages/accountSettings/accountSettings" });
    },
    personalCenter() {
      this.show = true;
    },

    indexData() {
      let data = {};
      let ajax = Home.indexList(data, { loading: true });
      ajax
        .then((res) => {
          this.home = res.data.bannerList;
          this.notice = res.data.noticeList;
          this.indexList = res.data.brokenLine;
          this.marketList = res.data.marketList;
          // this.infoActive = 1;
          this.dunshift();
          this.getCollect();
          setTimeout(() => {
            this.first = false;
          }, 600);
        })
        .catch(() => {});
    },
    dunshift() {
      if (this.marketList.filter((item) => item.collect).length) return;
      this.marketList.unshift({
        coin_name: this.$t("base.c7"),
        collect: true,
        marketInfoList: [],
      });
    },
    // 获取自选交易列表
    getCollect(call) {
      if (!this.isLogin) return;
      Home.getCollect()
        .then((res) => {
          this.collect = res.data || [];
          call && call();
        })
        .catch(() => {});
    },
    // 是否为自选
    isCoolect(i) {
      return this.collect.map((item) => item.pair_name).includes(i.pair_name);
    },
    // 替换自选数据
    replaceOptional() {
      let collect = this.collect.map((item) => item.pair_name);
      this.marketList.forEach((parentItem) => {
        parentItem.marketInfoList.forEach((item) => {
          let idx = collect.indexOf(item.pair_name);
          if (idx != -1) {
            this.collect.splice(idx, 1, item);
          }
        });
      });
    },
    // 添加自选
    option(item) {
      let data = {
        pair_name: item.pair_name,
      };
      Home.option(data)
        .then((res) => {
          this.getCollect();
          if (res.data) {
            this.$toast(this.$t("base.c8"));
          } else {
            this.$toast(this.$t("base.c9"));
          }
        })
        .catch(() => {});
    },
    // 链接socket
    indexMarketList() {
        this.marketList=[]
      this.ws.send({
        cmd: "sub",
        msg: "indexMarketList",
      });
      this.ws.on("message", (res) => {
        let { data, sub } = res;
        if (sub == "indexMarketList") {
          this.marketList = data;
          this.marketList.forEach((item,index)=>{
              item.marketInfoList.forEach((iitem,iindex)=>{
                  iitem.kline =
                  {
                      series:iitem.series
                  }
                  
              })
          })
          this.dunshift();
          this.replaceOptional();
        }
      });
      let msg = "swapMarketList";
      this.ws1.send({
        cmd: "sub",
        msg: msg,
      });
      this.ws1.on("message", (res) => {
        if(!this.isShow) return;
        let { data, sub } = res;
        if (sub == msg) {
            this.marketListHe=data[0].marketInfoList
            this.marketListHe.forEach((item,index)=>{
                // item.kline=item.series
                // chartDatas:{
                //   "series": [
                //           {
                //               // "showAllSymbol":true,
                //               "data": [10,20,24,24,68,42],
                //               "color":"#ff0000"
                //           },
                //           // {
                //           //     "data": [15,2,7,30,51,20],
                //           //     "color":"#00ff00"
                //           // }
                //       ]
                // },
                this.marketListHe[index].kline =
                {
                    series:item.series
                }
                // console.log(this.marketListHe)
                // let a=[]
                // item.kline.forEach((arr)=>{
                //     let max=0
                //     arr.data.forEach((arrs)=>{
                //         if(arrs>max){
                //             max=arrs
                //         }
                //     })
                //     let x;
                //     arr.data.forEach((arrs)=>{
                //         if(max>100){
                //             x=max/100
                //             a=this.omitTo(a.push(arrs / x),0)
                //             // console.log(arrs / x)
                //         }else{
                //             x=100/max
                //             a=this.omitTo(a.push(arrs * x),0)
                //             // console.log(arrs * x)
                //         }
                //     })
                // })
                // console.log(this.marketListHe[0].kline)
            })
        }
      });
    },
    // 创建充币地址
    createWalletAddress() {
      Wallet.createWalletAddress()
        .then(() => {})
        .catch(() => {});
    },
    // 退出登录
    loginOut() {
        this.$dialog
          .confirm({
            // title: '',
            message: this.$t("first.b0"),
            cancelButtonText:this.$t("common.cancel"),
            confirmButtonText:this.$t("common.confirm")
          })
          .then(() => {
            let data = {
              lang:uni.getStorageSync('language')||'zh-CN'
            };
            Member.logout(data, { toast: true })
              .then(() => {
                this.outLogin();
              })
              .catch(() => {});
          })
          .catch(() => {});
    },
    // 切换用户
    outLogin() {
      uni.removeStorageSync("token");
      this._router.replace({
        path: "/pages/login/index",
        query: {
          notLogin: 1,
          from: '/pages/accountSettings/accountSettings',
        },
      });
    },
    copy(data){
      handleClipboard(data, event, () => {
        uni.showToast({
            icon: 'success',
            title: this.$t('common.a1')
        })
      }, () => {
        uni.showToast({
            icon: 'none',
            title: this.$t('common.a2')
        })
      })
    },
    getAuthInfo(){
        Profile.getAuthInfo().then(res=>{
            this.detail = res.data
        })
    },
  },
  mounted() {
    this.indexData();
    this.indexMarketList();
    this.getCurrencyExCny()
    if (this.isLogin) {
      this.createWalletAddress();
      this.getAuthInfo()
    }
  },
  destroyed() {},
};
</script>
<style lang="scss" scoped>
// .colbg {
//   background-color: $bg;
// }
.my-swipe {
  height: 150px;
  .van-image {
    padding: 0 18px;
    box-sizing: border-box;
    ::v-deep img.van-image__img {
      border-radius: 9px !important;
    }
  }
}
.notice-swipe {
  height: 24px;
}

// #ff4d5c
.nav2 {
  .color-gray-6 {
    color: #f8a12e;
  }
}
.stock-swipe {
  .stock-index {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .stock-item-3 {
      padding: 3px 0;
    }
  }
}

.personalCenter-main {
  .personalCenter-top {
    box-sizing: border-box;
    .theme-switch {
      padding: 5% 0;
      .v-switch {
        $width: 50px;
        $icon-width: 20px;
        display: block;
        position: relative;
        height: 20px;
        width: $width;
        background: rgba($green, 0.2);
        overflow: hidden;
        .icon {
          position: absolute;
          top: 0;
          width: $icon-width;
          height: 20px;
          border-radius: inherit;
          transition: left 0.3s;

          .left,
          .right {
            position: absolute;
            width: $width;
            height: 100%;
            top: 0;
            box-sizing: border-box;
            text-align: center;
            &.left {
              right: 0;
              padding-right: $icon-width;
            }
            &.right {
              padding-left: $icon-width;
              left: 0;
            }
          }
        }
        .icon {
          left: 0;
        }
        .active.icon {
          left: $width - $icon-width;
        }
      }
    }
    .information {
      display: flex;
      align-items: flex-start;
      .inf-head-img {
        border-radius: 50%;
        margin-right: 4%;
      }
      .inf-rig {
        display: flex;
        flex-direction: column;
        letter-spacing: 1px;
        flex: 1;
        span:first-child {
          font-weight: 600;
          margin-bottom: 2px;
        }
        .inf-rig-cent {
          padding: 0 0 4px;
        }
        .vip-grade {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .progress-bar {
            width: 50%;
          }
          .progress-img {
            padding: 0 5px;
          }
        }
      }
    }
  }
  .personalCenter-center {
    padding: 20px 10px 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .personalCenter-bom {
      padding-top: 30px;
      .available-money {
        margin: 10px 0 0;
        height: 60%;
        background: rgba(100, 101, 102, 0.2);
        border-radius: 0 7px 7px 7px;
        align-items: center;
        padding: 6px 5px;
      }
    }
  }
}
.user-icon {
  font-size: 50px;
}
.epss-1 {
  overflow: hidden;
  text-overflow: ellipsis;
}
.lists{
    display: flex;
    .lists-1{
        margin: 0 5px;
    }
}
.logout{
    width: 80%;
    margin: 0 auto;
    ::v-deep .van-button--default{
        border: none;
        background-color: $panel-3;
    }
}
.goLogin{
    padding: 5px 15px;
    border: 1px solid $theme-1;
}
.p-y-xxs{
    padding: 3px 0;
}
.m-t-xxs{
    margin-top: 5px;
}
.bg-box-per{
    box-shadow: 0 5px 10px #c6c0dc;
    border-radius: 50%;
}
.bg-box-blue{
    box-shadow: 0 5px 10px #aed6e2;
    border-radius: 50%;
}
.bg-box-red{
    box-shadow: 0 5px 10px #d7aec0;
    border-radius: 50%;
}
.bg-box-yellow{
    box-shadow: 0 5px 10px #e1d2a3;
    border-radius: 50%;
}
.color-white{
    color: white;
}
.bor5-active{
    border-bottom: 5px solid $theme-2;
}
.w-40{
    width: 40%;
}
::v-deep .van-tabs__line{
    display: none;
}
::v-deep .custom-class.van-sticky{
    display: none;
}
.bor5{
    position: relative;
}
.bor5:before{
    position: absolute;
    content: "";
    bottom: -10px;
    left: 20%;
    width: 60%;
    height: 2px;
    border-radius: 10px;
    background-color: $theme-2;
    // border-bottom: 5px solid $border-color;
}
/deep/ .uni-swiper-dot{
    width: 15px!important;
    height: 3px!important;
    border-radius: 5px;
    background: $light!important;
    opacity: 0.2;
}
/deep/ .uni-swiper-dots{
    bottom: -12px!important;
}
/deep/ uni-swiper .uni-swiper-slides{
    overflow: hidden;
}
/deep/ uni-swiper .uni-swiper-wrapper{
    overflow: inherit;
}
/deep/ .uni-swiper-dot-active{
    background: #f0c947!important;
    width: 30px!important;
    opacity: 1;
}
.charts-box{
  width: 100%;
  height:50px;
}
/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
.chartsview{
    height: 100%;
}
.positions{
    position: relative;
}
.posi{
    position: absolute;
    right: 0;
    top: 6px;
}
.posil{
    position: absolute;
    left: 0;
    top: 0px;
}
.scale{
    transform: scale(0.8);
}
.fn-9{
    font-size: 9px;
}
</style>