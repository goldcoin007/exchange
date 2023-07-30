<template>
  <div class="layout-page" :style="themeStyle">
    <v-header :title="$t('help.a1')"></v-header>
    <main class="layout-main">
      <template v-for="parentItem  in list">
        <v-link
          tag="div"
          :to="{path:'/pages/help/sort',query:{id:parentItem.id,title:parentItem.name}}"
          class="p-md color-light fn-20 "
          :key="parentItem.id"
        >{{parentItem.name}}</v-link>
        <div class="m-x-md m-b-md p-md bg-panel-4 rounded box-shadow" :key="parentItem.id+'s'">
          <v-link
            tag="div"
            :to="{path:'/pages/help/detail',query:{id:item.id}}"
            class="item p-y-xs border-b d-flex justify-between"
            v-for="item in parentItem.article"
            :key="item.id"
          >
            <div class="eps-1 color-light">{{item.title}}</div>
            <van-icon name="arrow" />
          </v-link>
        </div>
      </template>
    </main>
  </div>
</template>
<script>
import College from "@/api/college";
import {mapGetters} from 'vuex'
export default {
  name: "help",
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters(['themeStyle'])
  },
  methods: {
    college() {
        let data={
            lang:uni.getStorageSync('language')=='zh-CN'?'zh-CN':'en'
        }
      College.college(data).then((res) => {
        this.list = res.data.categoryList;
      });
    },
  },
  created() {
    this.college();
  },
};
</script>