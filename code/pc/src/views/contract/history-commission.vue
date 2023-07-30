<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>{{$t('contract.a9')}}</th>
          <th>{{$t('contract.b0')}}</th>
          <th>{{$t('contract.b1')}}</th>
          <th>{{$t('contract.b2')}}</th>
          <th>{{$t('contract.b3')}}/{{$t('contract.b4')}}</th>
          <th>{{$t('contract.b5')}}/{{$t('contract.b6')}}</th>
          <th>{{$t('contract.b7')}}</th>
          <th>{{$t('contract.b8')}}</th>
          <th>{{$t('contract.j0')}}</th>
          <th>{{$t('contract.k1')}}</th>
          <th>{{$t('contract.b9')}}</th>
          <th>{{$t('contract.c0')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.symbol }}/USDT</td>
          <td>{{ item.lever_rate }}X</td>
          <td>{{ item.created_at }}</td>
          <td>{{ cals(item.side, item.order_type) }}</td>
          <td>{{ item.traded_amount }}/{{ item.amount }}</td>
          <td>{{item.avg_price||'--'}}/{{ item.entrust_price || "--" }}</td>
          <td>{{ item.margin * 1 }}</td>
          <td>{{ item.fee * 1 }}</td>
          <td>
            {{item.profit||'--'}}
          </td>
          <td>
            {{item.settle_profit||'--'}}
          </td>
          <td>{{ status(item.status) }}</td>
          <td>
            <button class="btn btn-sm btn-primary" @click="showDetail(item)">
              {{$t('contract.g4')}}
            </button>
          </td>
        </tr>
        <tr v-if="!list.length">
          <td colspan="12">
            <no-record />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="p-2">
      <el-pagination
        layout="prev, pager, next"
        :page-size="CurrentObj.per_page"
        @current-change="changePageCurrent"
        :total="CurrentObj.total"
      ></el-pagination>
    </div>
    <!-- 撤销 -->
    <div
      class="modal fade"
      id="history"
      tabindex="-1"
      role="dialog"
      aria-labelledby="backClose"
      aria-hidden="true"
    >
      <div
        class="modal-dialog  modal-lg modal-dialog-centered modal-dialog-scrollable"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="backClose">{{$t('contract.g5')}}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="markets-pair-list">
              <table class="table">
                <thead>
                  <tr>
                    <th>{{$t('contract.d8')}}</th>
                    <th>{{$t('contract.e1')}}</th>
                    <th>{{$t('contract.b8')}}</th>
                    <th>{{$t('contract.g6')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order_details" :key="item.id">
                    <td>{{ item.unit_price }}</td>
                    <td>{{ item.trade_amount }}</td>
                    <td>{{ item.trade_buy_fee }}</td>
                    <td>{{ item.created_at }}</td>
                  </tr>
                  <tr v-if="!order_details.length">
                    <td colspan="4">
                      <no-record />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Contract from "@/api/contract";
import math from "@/utils/class/math";
export default {
  name: "history-commission",
  props: {
    symbol: {
      default: "",
      type: String,
      required: false
    }
  },
  data() {
    return {
      CurrentObj: {
        page: 1
      },
      list: [],
      order_details: []
    };
  },
  computed: {},
  created() {
    this.getHistoryEntrust();
  },
  methods: {
    status(status) {
      switch (status) {
        case 0:
          return this.$t('contract.c6');
        case 1:
          return this.$t('contract.c7');
        case 2:
          return this.$t('contract.c8');
        case 3:
          return this.$t('contract.c9');
      }
    },
    cals(side, order_type) {
      // order_type - side
      let map = {
        "1-1": this.$t('contract.d0'),
        "1-2": this.$t('contract.d1'),
        "2-1": this.$t('contract.d2'),
        "2-2": this.$t('contract.d3')
      };
      return map[`${side}-${order_type}`];
    },
    changePageCurrent(idx) {
      this.CurrentObj.page = idx;
      this.getHistoryEntrust();
    },
    getHistoryEntrust() {
      let data = {
        page: this.CurrentObj.page
      };
      Contract.getHistoryEntrust(data).then(res => {
        this.list = res.data;
        this.CurrentObj = res;
      });
    },
    showDetail(item) {
      Contract.getEntrustDealList({
        entrust_id: item.id,
        symbol: item.symbol
      }).then(res => {
        this.order_details = res;
        $("#history").modal("show");
      });
    }
  }
};
</script>