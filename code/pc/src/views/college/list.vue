<template>
<div>
    <secondary-nav />
    <!-- 列表 -->
    <div class="container course-list">
        <div class="row mt-3">
            <div class="col-12">
                <div class="title h3 my-4">{{title}}</div>
                <div class="row justify-content-between">
                    <router-link :to="`/college/detail/${cid}/${item.id}`" class="item col-lg-3 col-md-6 mb-4 col-xs-12" v-for="(item,index) in articleList" :key="index">
                        <div class="banner">
                            <!-- <img src="http://iph.href.lu/260x150" alt /> -->
                            <img :src="item.full_cover" alt />
                        </div>
                        <div class="txt">
                            {{item.title}}
                        </div>
                    </router-link>
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
            cid: this.$route.params.cid,
            articleList: [],
        }
    },
    computed: {
        title() {
            let key = this.cid;
            switch (key) {
                case 'novice':
                    return this.$t('college.noviceTutorial')
                case 'strategy':
                    return this.$t('college.TradingStrategy')
                case 'research':
                    return this.$t('college.industryResearch')
                case 'dictionary':
                    return this.$t('college.dictionary')
                case 'report':
                    return this.$t('college.media')
                case 'OkChain':
                    return 'OkChain'
            }
        }
    },
    methods: {
        getArticleList() {
            College.getArticleList(this.cid).then(data => {
                this.articleList = data;

            }).catch();
        }
    },
    watch: {
        $route() {
            this.cid = this.$route.params.cid;
            this.getArticleList();
        }
    },
    created() {
        this.getArticleList();
    },
};
</script>

<style>
</style>
