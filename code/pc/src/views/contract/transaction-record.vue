<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>{{$t('wallet.dateTime')}}</th>
          <th>{{$t('wallet.info')}}</th>
          <th>{{$t('wallet.money')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.created_at }}</td>
          <td>{{ item.log_type_text }}</td>
          <td
            :class="{
              increace: item.amount >= 0,
              decreace: item.amount < 0
            }"
          >
            {{ item.amount >= 0 ? "+" : "" }}{{ item.amount }}
            {{ item.coin_name }}
          </td>
        </tr>
        <tr v-if="!list.length">
          <td colspan="3">
            <no-record />
          </td>
        </tr>
      </tbody>
    </table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="CurrentObj.per_page"
      @current-change="changePageCurrent"
      :total="CurrentObj.total"
    ></el-pagination>
  </div>
</template>
<script>
import wallet from "../../api/wallet.js";
export default {
  props: ["symbol"],
  data() {
    return {
      CurrentObj: {},
      list: []
    };
  },
  mounted() {
    this.getList();
  },
  watch: {
    symbol() {
      this.CurrentObj.page = 1;
      this.getList();
    }
  },
  methods: {
    changePageCurrent(idx) {
      this.CurrentObj.page = idx;
      this.getList();
    },
    getList() {
      let data = {
        page: this.CurrentObj.page,
        symbol: this.symbol
      };
      wallet.accountFlow(data).then(res => {
        this.CurrentObj = res;
        this.list = res.data;
      });
    }
  }
};
</script>