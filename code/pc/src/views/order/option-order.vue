<template>
  <div>
    <secondary-nav></secondary-nav>
    <div class="container">
      <div class="w-100 d-flex justify-content-between align-items-center mb-3 mt-4">
        <div class="h3">{{$t('order.optionTransaction')}}</div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="markets-pair-list mb-3">
            <ul class="nav nav-pills" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-toggle="pill"
                  href="#tab1"
                  role="tab"
                  aria-selected="false"
                >{{$t('order.optionTransaction')}}</a>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                <table class="table">
                  <thead>
                    <tr class="text-nowrap">
                      <th>{{$t('order.orderNum')}}</th>
                      <th>{{$t('order.buyTime')}}</th>
                      <th>NSO{{$t('order.timeSharing')}}</th>
                      <th>{{$t('order.type')}}</th>
                      <th>{{$t('order.yield')}}</th>
                      <th>{{$t('order.buyNum')}}</th>
                      <th>{{$t('order.upAndDown')}}</th>
                      <th>{{$t('order.status')}}</th>
                      <th>{{$t('order.settlementQuantity')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in list" :key="item.id">
                      <td>{{item.order_no}}</td>
                      <td>{{item.created_at}}</td>
                      <td>{{item.time_name}}</td>
                      <td>
                        <span class="increace" v-if="item.up_down==1">{{$t('order.buyUp')}} (≥{{item.range}}%)</span>
                        <span class="decreace" v-if="item.up_down==2">{{$t('order.buyDown')}} (≥{{item.range}}%)</span>
                        <span v-if="item.up_down==3">{{$t('order.buyLevel')}} (≥{{item.range}}%)</span>
                      </td>
                      <td>{{item.odds}}</td>
                      <td>{{item.bet_amount}}</td>
                      <td :class="(item.delivery_amount*1)>0?'increace':'decreace'">{{item.range}}%</td>
                      <td>{{item.status_text}}</td>
                      <td
                        :class="(item.delivery_amount*1)>0?'increace':'decreace'"
                      >{{item.delivery_amount}} ({{item.bet_coin_name}})</td>
                    </tr>
                    <tr v-if="!list.length">
                      <td colspan="9">
                        <no-record />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next"
            :page-size="detail.per_page"
            @current-change="changePage"
            :total="detail.total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Order from "@/api/order";
export default {
  data() {
    return {
      page: 1,
      list: [],
      detail: []
    };
  },
  methods: {
    changePage(idx) {
      this.page = idx;
      this.getOptionHistoryOrders();
    },
    getOptionHistoryOrders() {
      let data = {
        page: this.page
      };
      Order.getOptionHistoryOrders(data).then(res => {
        this.detail = res;
        this.list = res.data;
      });
    }
  },
  created() {
    this.getOptionHistoryOrders();
  }
};
</script>

<style>
</style>