<template>
  <div class="container">
    <div class="bg-panel my-4 p-4 rounded">
      <div class="list">
        <router-link :to="`/notice/${item.id}`" class="item d-flex border-bottom p-2 justify-content-between" v-for="item in list" :key="item.id">
          <div class="title text-truncate">
              {{item.title}}
          </div>
          <div class="time">
              {{item.created_at}}
          </div>
        </router-link>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <el-pagination layout="prev, pager, next" :page-size="detail.per_page" @current-change="changePage" :total="detail.total"></el-pagination>
    </div>
  </div>
</template>
<script>
import Member from "@/api/member";
export default {
  name: 'notice',
  data() {
    return {
      detail: {},
      page: 1,
      list: []
    }
  },
  created() {
    this.getList(1)
  },
  methods: {
    changePage(page) {
      this.page = page
      this.getList()
    },
    getList() {
      let data = {
        page: this.page,
        type:'notice'
      }
      Member.article(data).then(res => {
        this.detail = res;
        this.list = res.data;
      })
    },
  }
}
</script>
<style lang="scss" scoped>
    .list{
        .item{
            color: #758696;
            &:hover{
                color: white;
            }
        }
    }
</style>