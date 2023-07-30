<template>
  <div class="markets-pair-list">
    <ul class="nav nav-pills" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          data-toggle="pill"
          href="#tabBottom1"
          role="tab"
          aria-selected="false"
        >{{$t('option.waitFor')}}</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          data-toggle="pill"
          href="#tabBottom2"
          role="tab"
          aria-selected="false"
        >{{$t('option.history')}}</a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane fade show active" id="tabBottom1" role="tabpanel">
        <table class="table">
          <thead>
            <tr class="text-nowrap">
              <th>{{$t('option.orderNum')}}</th>
              <th>{{$t('option.option')}}</th>
              <th>{{$t('option.buyTime')}}</th>
              <th>{{$t('option.buyAmount')}}</th>
              <th>{{$t('option.buyType')}}</th>
              <th>{{$t('option.yield')}}</th>
              <th>{{$t('option.state')}}</th>
              <th>{{$t('option.deliverytime')}}</th>
              <th>{{$t('option.countDown')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list1" :key="item.order_no">
              <td>{{item.order_no}}</td>
              <td>{{item.pair_name}}-{{item.time_name}}</td>
              <td>{{item.created_at}}</td>
              <td>{{item.bet_amount}}  ({{item.bet_coin_name}})</td>
              <td>
                <span class="increace" v-if="item.up_down==1">{{$t('option.buyingUp')}} (≥{{item.range}}%)</span>
                <span class="decreace" v-if="item.up_down==2">{{$t('option.buyDwon')}} (≥{{item.range}}%)</span>
                <span v-if="item.up_down==3">{{$t('option.buyEven')}} (≥{{item.range}}%)</span>
                
              </td>
              <td>{{item.odds}}</td>
              <td>{{item.status_text}}</td>
              <td>{{item.scene.end_time_text}}</td>
              <td>
                <time-count @end="TimeOutLoad" :isAuto="true" :startTime="item.lottery_time" />
              </td>
            </tr>
            <tr v-if="!list1.length">
              <td colspan="9">
                <no-record/>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-center mt-3">
          <el-pagination
            layout="prev, pager, next"
            :page-size="detail1.per_page"
            @current-change="changePage1"
            :total="detail1.total"
          ></el-pagination>
        </div>
      </div>
      <div class="tab-pane fade show" id="tabBottom2" role="tabpanel">
        <table class="table">
          <thead>
            <tr class="text-nowrap">
              <th>{{$t('option.orderNum')}}</th>
              <th>{{$t('option.option')}}</th>
              <th>{{$t('option.buyTime')}}</th>
              <th>{{$t('option.buyAmount')}}</th>
              <th>{{$t('option.buyType')}}</th>
              <th>{{$t('option.yield')}}</th>
              <th>{{$t('option.state')}}</th>
              <th>{{$t('option.result')}}</th>
              <th>{{$t('option.settlementQuantity')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list2" :key="item.order_no">
              <td>{{item.order_no}}</td>
              <td>{{item.pair_name}}-{{item.time_name}}</td>
              <td>{{item.created_at}}</td>
              <td>{{item.bet_amount}}  ({{item.bet_coin_name}})</td>
              <td>
                <span class="increace" v-if="item.up_down==1">{{$t('option.buyingUp')}}  (≥{{item.range}}%)</span>
                <span class="decreace" v-if="item.up_down==2">{{$t('option.buyDwon')}}  (≥{{item.range}}%)</span>
                <span v-if="item.up_down==3">{{$t('option.buyEven')}}  (≥{{item.range}}%)</span>
               
              </td>
              <td>{{item.odds}}</td>
              <td>{{item.status_text}}</td>
              <td>
                {{item.scene.delivery_range}}%
                (
                <span
                  class="increace"
                  v-if="item.scene.delivery_up_down==1"
                >{{$t('option.up')}}</span>
                <span class="decreace" v-if="item.scene.delivery_up_down==2">{{$t('option.down')}}</span>
                <span v-if="item.scene.delivery_up_down==3">平</span>)
              </td>
              <td :class="(item.delivery_amount*1)>0?'increace':'decreace'">{{item.delivery_amount}} ({{item.bet_coin_name}})</td>
            </tr>
            <tr v-if="!list2.length">
              <td colspan="9">
                <no-record/>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-center mt-3">
          <el-pagination
            layout="prev, pager, next"
            :page-size="detail2.per_page"
            @current-change="changePage2"
            :total="detail2.total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Option from "@/api/option";
export default {
  props: {
    activeCoin: {
      default: {},
      required: false,
      type: Object
    }
  },
  data() {
    return {
      status: 1,
      //
      page1: 1,
      detail1: {},
      list1: [],
      //
      page2: 1,
      list2: [],
      detail2: {}
    };
  },
 computed: {
    isLogin() {
      return Boolean(localStorage.token);
    }
  },
  watch: {
    activeCoin(n, o) {
      // console.log(n.pair_time_name,o.pair_time_name)
      if (n.pair_time_name != o.pair_time_name) {
        this.isLogin&&this.reloadData();
      }
    }
  },
  methods: {
    reloadData() {
      this.resLoad1();
      this.resLoad2();
    },
    TimeOutLoad(){
      setTimeout(()=>{
        this.load1()
      },3000)
    },
    // --
    changePage1(idx) {
      this.page1 = idx;
      this.load1();
    },
    resLoad1() {
      this.page1 = 1;
      this.load1();
    },
    load1() {
      this.getOptionHistoryOrders(1, this.page1, res => {
        this.list1 = res.data;
        this.detail1 = res;
      });
    },
    // --
    changePage2(idx) {
      this.page2 = idx;
      this.load1();
    },
    resLoad2() {
      this.page2 = 1;
      this.load2();
    },
    load2() {
      this.getOptionHistoryOrders(2, this.page2, res => {
        this.list2 = res.data;
        this.detail2 = res;
      });
    },
    // --
    getOptionHistoryOrders(status, page, call) {
      let data = {
        page: page,
        status: status,
        pair_id: this.activeCoin.pair_id,
        time_id: this.activeCoin.time_id
      };
      Option.getOptionHistoryOrders(data)
        .then(res => {
          call && call(res);
        })
        .catch(err => {});
    }
  },
  created() {}
};
</script>