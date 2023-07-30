<template>
<div class="course-page">
    <!-- <div class="banner">
        <div class="container pt-3">
            <div class="row py-5">
                <div class="col-5 left">
                    <div class="title h3 text-light">{{$t('college.buy')}}</div>
                    <div>
                        <ul class="list">
                            <li class="d-flex align-items-start my-3">
                                <div class="num text-light">1</div>
                                <div>
                                    <div class="label h5">{{$t('college.register')}} AMATAK</div>
                                    <div class="txt">{{$t('college.visit',{name:'AMATAK'})}}</div>
                                </div>
                            </li>
                            <li class="d-flex align-items-start my-3">
                                <div class="num text-light">2</div>
                                <div>
                                    <div class="label h5">{{$t('college.realName')}}</div>
                                    <div class="txt">{{$t('college.upload')}}</div>
                                </div>
                            </li>
                            <li class="d-flex align-items-start my-3">
                                <div class="num text-light">3</div>
                                <div>
                                    <div class="label h5">{{$t('college.oneClick')}}</div>
                                    <div class="txt">{{$t('college.inAssets')}}</div>
                                </div>
                            </li>
                        </ul>
                        <router-link tag="button" to="/exchange" class="btn btn-primary">{{$t('college.tradeNow')}}</router-link>
                    </div>
                </div>
                <div class="col-7 right" v-if="video">
                    <video class="video" preload controls :src="video.url" :poster="`https://guanli.coin.amatak.net/storage/` + video.poster"></video>
                </div>
            </div>
        </div>

        <div class="banner-tab">
            <div class="container">
                <div class="row">
                    <div class="col-12 d-flex">
                        <div class="w-25 item active" v-for="(banner, index) in bannerList" :key="index" @click="view(banner)">
                            <div class="icon fn-22">
                                <i class="default el-icon-refresh"></i>
                                <i class="iconshow el-icon-coin"></i>
                            </div>
                            <div class="txt">{{ banner.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <!-- 列表 -->
    <div class="container course-list">
        <div class="row mt-3" v-for="(item, index) in categoryList" :key="index">
            <div class="col-12">
                <div class="title h3 my-4 d-flex justify-content-between">
                    <span>
                        {{ item.name }}
                    </span>
                    <router-link :to="`/college/list/${item.id}`" class="fn-14">
                        {{$t('college.seeMore')}}&gt;&gt;
                    </router-link>
                </div>
                <div class="row justify-content-between">
                    <div class="item col-lg-3 col-md-6 mb-4 col-xs-12" v-for="(article, index) in item.article" :key="index">
                        <router-link :to="`/college/detail/${item.id}/${article.id}`">
                            <div class="banner">
                                <img :src="article.full_cover" alt />
                            </div>
                            <div class="txt">
                                {{article.title}}
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- lattest-news-section -->
    <div class="colto-section">
        <div class="container">
            <div class="colto-content-wrap d-flex flex-column align-items-center justify-content-center">
                <div class="colto-content">
                    <div class="title">{{ $t("common.start-trade") }}</div>
                </div>
                <div class="colto-btn-group" v-if="!isLogin">
                    <router-link tag="button" to="/sign-in" class="btn  btn-success rounded-pill callto-btn">{{$t('common.login')}}</router-link>
                    <span>or</span>
                    <router-link tag="button" to="/sign-up" class="btn btn-primary rounded-pill callto-btn">{{$t('common.register')}}</router-link>
                </div>
                <div v-else class="colto-btn-group">
                    <router-link tag="button" to="/exchange" class="btn btn-primary rounded-pill callto-btn">{{$t('common.trading')}}</router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import College from "@/api/college";

export default {
    data() {
        return {
            // 当前播放的视频
            video: null,
            categoryList: [],
            bannerList: [],
        }
    },
    computed: {
        isLogin() {
            return Boolean(localStorage.token);
        },
    },
    methods: {
        view(banner) {
            this.video.url = banner.url;
            this.video.poster = banner.poster;
        },

        initPage() {
            College.college().then(response => {
                ({
                    categoryList: this.categoryList,
                    bannerList: this.bannerList
                } = response);

                this.video = this.bannerList[0];
            }).catch(err => {

            });
        },
        getVideo() {

        }
    },
    created() {
        this.initPage();
    },
};
</script>

<style lang="scss" scoped>
</style>
