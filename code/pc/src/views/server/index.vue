<template>
<div>
    <secondary-nav></secondary-nav>
    <div class="container">
        <div class="row">
            <div class="edit-content py-4">
                <div v-html="article.body" v-cloak></div>
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
            article: {
                body : ''
            },
        }
    },
    methods: {
        initPage() {
            College.getServiceDetail(this.cid).then(data => {
                this.article = data;
            }).catch(err => {})
        }
    },
    watch: {
        $route() {
            this.cid = this.$route.params.cid;
            this.initPage();
        },
    },
    created() {
        this.initPage();
    }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
    display: none!important;
}
</style>
