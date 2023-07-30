<template>
<div>
    <div class="markets ptb70">
        <div class="container">
            <div class="row">
                <div class="col-md-4" v-for="item in brokenLine" :key="item.pair_name">
                    <div class="markets-container">
                        <div class="markets-content">
                            <h2>{{item.pair_name}}</h2>
                            <p :class="item.increase>=0?'green':'red'">{{item.close}}</p>
                            <span :class="item.increase>=0?'green':'red'">{{item.increaseStr}}</span>
                        </div>
                        <div class="markets-chart">
                            <price-line :line="item.prices" />
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="markets-pair-list">
                        <ul class="nav nav-pills">
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:void(0);" @click="tab='Optional'" :class="{active:tab=='Optional'}">
                                    <h5>{{ $t("common.optional") }}</h5>
                                    <i class="fa fa-stroopwafel"></i>
                                </a>
                            </li>
                            <li class="nav-item" @click="tab=item.coin_name" v-for="item in marketList" :key="item.coin_name">
                                <a class="nav-link" :class="{active:tab==item.coin_name}" href="javascript:void(0);">{{item.coin_name}}</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane fade in show" :class="{active:'Optional'==tab}">
                                <table class="table coin-list table-hover">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th scope="col">{{$t('home.coinType')}}</th>
                                            <th scope="col">{{$t('home.latestPrice')}}</th>
                                            <th scope="col">
                                                {{$t('home.upAndDown')}}
                                                <span class="ti-arrow-down"></span>
                                            </th>
                                            <th scope="col">{{$t('home.heigh')}}</th>
                                            <th scope="col">{{$t('home.low')}}</th>
                                            <th scope="col">{{$t('home.vol')}}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in collect" v-show="isShow(item.pair_name)" :key="item.pair_name">
                                            <td>
                                                <i href="javascript:void(0);" @click="option(item)" :class="{active:isCoolect(item)}" class="el-icon-star-on fn-22"></i>
                                            </td>
                                            <td>{{item.pair_name}}</td>
                                            <td>
                                                <span :class="(item.increase*1)>=0?'increace':'decreace'">{{item.close}}</span>
                                            </td>
                                            <td>
                                                <span :class="(item.increase*1)>=0?'increace':'decreace'">{{item.increaseStr}}</span>
                                            </td>
                                            <td>{{item.high}}</td>
                                            <td>{{item.low}}</td>
                                            <td>{{item.vol}}</td>
                                        </tr>
                                        <tr v-if="!collect.length">
                                            <td colspan="7">
                                                <no-record />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade in show" :class="{active:parentItem.coin_name==tab}" v-for="parentItem in marketList" :key="parentItem.coin_name">
                                <table class="table coin-list table-hover">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th scope="col">{{$t('home.coinType')}}</th>
                                            <th scope="col">{{$t('home.latestPrice')}}</th>
                                            <th scope="col">
                                                {{$t('home.upAndDown')}}
                                                <span class="ti-arrow-down"></span>
                                            </th>
                                            <th scope="col">{{$t('home.heigh')}}</th>
                                            <th scope="col">{{$t('home.low')}}</th>
                                            <th scope="col">{{$t('home.vol')}}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-for="(item) in parentItem.marketInfoList">
                                            <tr v-show="isShow(item.pair_name)" :key="item.pair_name">
                                                <td>
                                                    <i href="javascript:void(0);" @click="option(item)" :class="{active:isCoolect(item)}" class="el-icon-star-on fn-22"></i>
                                                </td>
                                                <td>{{item.pair_name}}</td>
                                                <td>
                                                    <span :class="(item.increase*1)>=0?'increace':'decreace'">{{item.close}}</span>
                                                </td>
                                                <td>
                                                    <span :class="(item.increase*1)>=0?'increace':'decreace'">{{item.increaseStr}}</span>
                                                </td>
                                                <td>{{item.high}}</td>
                                                <td>{{item.low}}</td>
                                                <td>{{item.vol}}</td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                                <!-- coin-list table -->
                            </div>
                        </div>
                        <!-- <div class="text-center">
                            <a href="#" class="load-more btn">
                                Load More
                                <i class="icon ion-md-arrow-down"></i>
                            </a>
              </div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Home from "@/api/home";
import Socket from "@/api/server/Socket.js";
import priceLine from "./price-line";
export default {
    data() {
        return {
            bannerList: [],
            articleList: [],
            homeList: [],
            iconList: [],
            marketList: [],
            tab: "Optional",
            searchTxt: "",
            collect: [],
            ws: null,
            brokenLine: []
        };
    },
    computed: {
        isLogin() {
            return Boolean(localStorage.token);
        }
    },
    components: {
        priceLine
    },
    methods: {
        isShow(str) {
            let reg = new RegExp(this.searchTxt, "ig");
            return reg.test(str);
        },
        filterCode: function (str) {
            return str.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "");
        },
        // 是否为自选
        isCoolect(i) {
            return this.collect.map(item => item.pair_name).includes(i.pair_name);
        },
        indexList() {
            Home.indexList()
                .then(res => {
                    this.bannerList = res.bannerList;
                    this.articleList = res.articleList;
                    this.homeList = res.homeList;
                    this.marketList = res.marketList;
                    this.iconList = res.iconList;
                    this.brokenLine = res.brokenLine;
                    this.tab = this.marketList[0].coin_name;
                })
                .catch(res => {});
        },
        // 获取自选交易列表
        getCollect() {
            Home.getCollect()
                .then(res => {
                    this.collect = res || [];
                })
                .catch(err => {});
        },
        // 添加自选
        option(item) {
            let data = {
                pair_name: item.pair_name
            };
            Home.option(data)
                .then(res => {
                    this.getCollect();
                    if (res) {
                        this.$message.success(this.$t("home.add"));
                    } else {
                        this.$message.success(this.$t("home.cancel"));
                    }
                })
                .catch(err => {});
        },
        // 替换自选数据
        replaceOptional() {
            let collect = this.collect.map(item => item.pair_name);
            this.marketList.forEach(parentItem => {
                parentItem.marketInfoList.forEach(item => {
                    let idx = collect.indexOf(item.pair_name);
                    if (idx != -1) {
                        this.collect.splice(idx, 1, item);
                    }
                });
            });
        },
        // 替换折现数据
        replacePeice() {
            let priceList = this.brokenLine.map(item => item.pair_name);
            this.marketList.forEach(parentItem => {
                parentItem.marketInfoList.forEach(item => {
                    let idx = priceList.indexOf(item.pair_name);
                    if (idx != -1) {
                        this.brokenLine.splice(idx, 1, item);
                    }
                });
            });
        },
        // 链接socket
        indexMarketList() {
            const ws = new Socket(this.Globals.Server.Path.WS);
            ws.on("open", () => {
                this.ws = ws;
                ws.send({
                    cmd: "sub",
                    msg: "indexMarketList"
                });
            });
            ws.on("message", res => {
                let {
                    data,
                    msg,
                    code,
                    sub,
                    type,
                    status
                } = res;
                if (sub == "indexMarketList") {
                    this.marketList = data;
                    this.replaceOptional();
                    this.replacePeice();
                } else if (type == "ping") {
                    ws.send({
                        cmd: "pong"
                    });
                }
            });
        }
    },
    created() {
        this.indexList();
        if (this.isLogin) {
            this.getCollect();
        }
        this.indexMarketList();
    }
};
</script>

<style>
</style>
