<template>
<div class="col-md-3">
    <div class="market-news mt15">
        
        <h2 class="heading">{{ $t("common.news") }}</h2>
        <ul>
            <li v-for="item in records" :key="item.id">

                <router-link :to="`/college/detail/${item.category_id}/${item.id}`">
                    <strong>{{ truncate(item.title, 25) }}</strong>
                    {{ truncate(item.excerpt, 50) }}
                    <span>{{ item.updated_at }}</span>
                </router-link>

            </li>
        </ul>
    </div>
</div>
</template>

<script>
import Exchange from "@/api/exchange";

export default {
    data() {
        return {
            records: [], // 所有新动态
        }
    },

    methods: {
        getDynamic() {
            Exchange.newTrends(10).then(data => {
                this.records = data;
            }).catch(err => {

            });
        },
        truncate(str, length) {
            return _.truncate(str, {
                length
            });
        }
    },

    created() {
        this.getDynamic();
    },
}
</script>

<style>

</style>
