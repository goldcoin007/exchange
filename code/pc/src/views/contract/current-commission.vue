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
          <td>{{ status(item.status) }}</td>
          <td>
            <button class="btn btn-sm btn-danger" @click="ifCancelEntrust(item)">{{$t('contract.c1')}}</button>
          </td>
          
        </tr>
         <tr v-if="!list.length">
          <td colspan="10">
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
      id="backmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="backClose"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="backClose">{{$t('contract.c1')}}</h5>
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
            {{$t('contract.c3')}}？
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              {{$t('contract.c4')}}
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="cancelEntrust"
            >
              {{$t('contract.c5')}}
            </button>
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
  name: "current-commission",
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
      activeItem:{}
    };
  },
  computed: {},
  created() {
    this.getCurrentEntrust();
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
      this.getCurrentEntrust();
    },
    getCurrentEntrust() {
      let data = {
        page: this.CurrentObj.page
      };
      Contract.getCurrentEntrust(data).then(res => {
        this.list = res.data;
        this.CurrentObj = res;
      });
    },
     // 撤单
    ifCancelEntrust(item){
      this.activeItem = item
      console.log(this.activeItem)
      $('#backmodal').modal('show')
    },
    cancelEntrust(){
      let data = {
        symbol:this.activeItem.symbol,
        entrust_id:this.activeItem.id
      }
      Contract.cancelEntrust(data).then(()=>{
        this.getCurrentEntrust()
        this.$message.success(this.$t('contract.d4'))
        $('#backmodal').modal('hide')
      })
    }
  }
};
</script>