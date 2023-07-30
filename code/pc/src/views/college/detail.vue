<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col-12 my-4" v-if="article">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/college' }">{{$t('college.college')}}</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: `/college/list/${cid}`}">{{article.category_name}}</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path:`/college/detail/${cid}/${aid}`}">{{$t('college.article')}}</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title h2 mt-4">{{article.title}}</div>
                <div class="single-subtitle d-flex justify-content-between border-bottom pb-2">
                    <div class="text-muted">{{article.created_at}}</div>
                </div>
                <div class="edit-content py-4">
                    <div v-html="article.body"></div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <div class="title h3 my-4">{{$t('college.recommendedCourse')}}</div>
                        <div class="row justify-content-between">
                            <div class="item col-lg-3 col-md-6 mb-4 col-xs-12" v-for="(item,index) in recommend" :key="index">
                                <router-link :to="`/college/detail/${item.category_id}/${item.id}`">
                                    <div class="banner">
                                        <!-- <img src="http://iph.href.lu/260x150" alt /> -->
                                        <img :src="item.full_cover" alt />
                                    </div>
                                    <div class="txt">{{item.title}}</div>
                                </router-link>
                            </div>
                        </div>
                    </div>
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
            aid: this.$route.params.aid,
            article: null,
            recommend: null,
        }
    },
    watch: {
        $route() {
            this.cid = this.$route.params.cid;
            this.aid = this.$route.params.aid;
            this.initPage();
        },
    },
    methods: {
        initPage() {
            this.getArticleDetail();
            this.getRecommend();
        },
        getArticleDetail() {
            College.getArticleDetail(this.aid).then(data => {
                this.article = data;
            }).catch(err => {});
        },
        getRecommend() {
            College.getRecommend().then(data => {
                this.recommend = data;
            }).catch(err => {})
        }
    },
    created() {
        this.initPage();
    },
};
</script>

<style lang="scss" scoped>
/deep/ {
    .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
        color: #606266;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner{
        color: white;
    }
}
</style>
