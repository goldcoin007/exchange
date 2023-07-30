<template>
  <div class="order-page">
    <secondary-nav></secondary-nav>
    <div class="container">
      <div
        class="w-100 d-flex justify-content-between align-items-center mb-3 mt-4"
      >
        <div class="h3">{{ $t("order.spotConsignment") }}</div>
      </div>
      <div class="row mb-4">
        <div class="col-12">
          <div class="panel-box bg-panel">
            <div class="heading d-flex">
              <div
                class="tab-item mr-3"
                @click="delegateType = 'current'"
                :class="{ active: delegateType == 'current' }"
              >
                {{ $t("order.surrentCommission") }}
              </div>
              <div
                class="tab-item"
                @click="delegateType = 'old'"
                :class="{ active: delegateType == 'old' }"
              >
                {{ $t("order.commissionRecord") }}
              </div>
            </div>
            <!-- 当前委托筛选 -->
            <div class="tab-content row" v-show="delegateType == 'current'">
              <div class="form-group col-sm-2">
                <label>{{ $t("order.tradingPair") }}</label>
                <el-select
                  :placeholder="$t('order.select')"
                  v-model="Current.symbol"
                >
                  <el-option
                    v-for="item in symbolList"
                    :key="item.pair_name"
                    :label="item.pair_name"
                    :value="item.pair_name"
                  ></el-option>
                </el-select>
              </div>
              <div class="form-group col-sm-2">
                <label>{{ $t("order.direction") }}</label>
                <el-select
                  :placeholder="$t('order.select')"
                  v-model="Current.direction"
                >
                  <el-option
                    v-for="item in direction"
                    :key="item.value"
                    v-bind="{ ...item }"
                  ></el-option>
                </el-select>
              </div>
              <div class="form-group col-sm-2">
                <label>{{ $t("order.entrustType") }}</label>
                <el-select
                  :placeholder="$t('order.select')"
                  v-model="Current.type"
                >
                  <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    v-bind="{ ...item }"
                  ></el-option>
                </el-select>
              </div>
              <div class="form-group col-sm-2">
                <label class="d-block">&nbsp;</label>
                <button
                  type="submit"
                  class="btn btn-sm mt-1 btn-outline-primary mb-2"
                  @click="changePageCurrent(1)"
                >
                  {{ $t("order.search") }}
                </button>
                <button
                  type="submit"
                  class="btn btn-sm mt-1 btn-outline-secondary mb-2"
                  @click="
                    Current = $options.data().Current;
                    changePageCurrent(1);
                  "
                >
                  <i class="el-icon-refresh-right"></i>
                  {{ $t("order.reset") }}
                </button>
              </div>
            </div>
            <!-- 委托记录筛选 -->
            <div class="tab-content row" v-show="delegateType == 'old'">
              <!-- <div class="form-group col-md-4 col-sm-12">
                            <label>{{$t('order.time')}}</label>
                            <el-date-picker type="daterange" :range-separator="$t('order.to')" :start-placeholder="$t('order.startTime')" :end-placeholder="$t('order.endTime')" v-model="Histor.date"></el-date-picker>
                        </div> -->
              <div class="form-group col-md-2 col-sm-4">
                <label>{{ $t("order.tradingPair") }}</label>
                <el-select
                  :placeholder="$t('order.select')"
                  v-model="Histor.symbol"
                >
                  <el-option
                    v-for="item in symbolList"
                    :key="item.pair_name"
                    :label="item.pair_name"
                    :value="item.pair_name"
                  ></el-option>
                </el-select>
              </div>
              <div class="form-group col-md-2 col-sm-4">
                <label>{{ $t("order.direction") }}</label>
                <el-select
                  :placeholder="$t('order.select')"
                  v-model="Histor.direction"
                >
                  <el-option
                    v-for="item in direction"
                    :key="item.value"
                    v-bind="{ ...item }"
                  ></el-option>
                </el-select>
              </div>
              <div class="form-group col-md-2 col-sm-4">
                <label>{{ $t("order.entrustType") }}</label>
                <el-select
                  :placeholder="$t('order.select')"
                  v-model="Histor.type"
                >
                  <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    v-bind="{ ...item }"
                  ></el-option>
                </el-select>
              </div>
              <div class="form-group col-md-2 col-sm-4">
                <label class="d-block">&nbsp;</label>
                <button
                  type="submit"
                  class="btn btn-sm mt-1 btn-outline-primary mb-2"
                  @click="changePageHistor(1)"
                >
                  {{ $t("order.search") }}
                </button>
                <button
                  type="submit"
                  class="btn btn-sm mt-1 btn-outline-secondary mb-2"
                  @click="
                    Histor = $options.data().Histor;
                    changePageHistor(1);
                  "
                >
                  <i class="el-icon-refresh-right"></i>
                  {{ $t("order.reset") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <!-- 当期委托 -->
        <div class="col-12" v-show="delegateType == 'current'">
          <div class="markets-pair-list mb-3">
            <ul class="nav nav-pills" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-toggle="pill"
                  href="#tab1"
                  role="tab"
                  aria-selected="false"
                  >{{ $t("order.surrentCommission") }}</a
                >
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                <table class="table stripe">
                  <thead>
                    <tr class="text-nowrap">
                      <th>{{ $t("order.time") }}</th>
                      <th>{{ $t("order.tradingPair") }}</th>
                      <th>{{ $t("order.direction") }}</th>
                      <th>{{ $t("order.type") }}</th>
                      <th>{{ $t("order.price") }}</th>
                      <th>{{ $t("order.matched") }}</th>
                      <th>{{ $t("order.toMatch") }}</th>
                      <th>{{ $t("order.total") }}</th>
                      <th class="text-right">{{ $t("order.opt") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, idx) in CurrentList" :key="item.id">
                      <td>{{ item.created_at }}</td>
                      <td>{{ item.symbol }}</td>
                      <td>{{ item.entrust_type_text }}</td>
                      <td>
                        <template v-if="item.type == 1">{{
                          $t("order.fixedPrice")
                        }}</template>
                        <template v-if="item.type == 2">{{
                          $t("order.marketPrice")
                        }}</template>
                      </td>
                      <td>{{ item.entrust_price }}</td>
                      <td>{{ item.traded_amount }}</td>
                      <td>{{ item.surplus_amount }}</td>
                      <td>{{ item.money || "-" }}</td>
                      <td class="text-nowrap">
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-danger"
                          @click="delOrder(item, idx)"
                        >
                          {{ $t("order.cancel") }}
                        </button>
                      </td>
                    </tr>
                    <tr v-if="!CurrentList.length">
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
            :page-size="CurrentObj.per_page"
            @current-change="changePageCurrent"
            :total="CurrentObj.total"
          ></el-pagination>
        </div>
        <!-- 委托记录 -->
        <div class="col-12" v-show="delegateType == 'old'">
          <div class="markets-pair-list mb-3">
            <ul class="nav nav-pills" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-toggle="pill"
                  href="#tab1"
                  role="tab"
                  aria-selected="false"
                  >{{ $t("order.commissionRecord") }}</a
                >
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                <table class="table stripe">
                  <thead>
                    <tr class="text-nowrap">
                      <th>{{ $t("order.time") }}</th>
                      <th>{{ $t("order.tradingPair") }}</th>
                      <th>{{ $t("order.direction") }}</th>
                      <th>{{ $t("order.type") }}</th>
                      <th>{{ $t("order.averagePrice") }}</th>
                      <th>{{ $t("order.price") }}</th>
                      <th>{{ $t("order.matched") }}</th>
                      <th>{{ $t("order.totalAmountEntrusted") }}</th>
                      <th>{{ $t("order.total") }}</th>
                      <th>{{ $t("order.status") }}</th>
                      <th class="text-right">{{ $t("order.opt") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in HistorList" :key="item.id">
                      <td>{{ item.created_at }}</td>
                      <td>{{ item.symbol }}</td>
                      <td>{{ item.entrust_type_text }}</td>
                      <td>
                        <template v-if="item.type == 1">{{
                          $t("order.fixedPrice")
                        }}</template>
                        <template v-if="item.type == 2">{{
                          $t("order.marketPrice")
                        }}</template>
                      </td>
                      <td>
                        {{ division(item.traded_money, item.traded_amount) }}
                      </td>
                      <td>{{ item.entrust_price || "-" }}</td>
                      <td>{{ item.traded_money }}</td>
                      <td>{{ item.amount }}</td>
                      <td>{{ item.money }}</td>
                      <td>{{ item.status_text }}</td>
                      <td class="text-nowrap">
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-primary"
                          @click="getEntrustTradeRecord(item)"
                        >
                          {{ $t("order.see") }}
                        </button>
                      </td>
                    </tr>
                    <tr v-if="!HistorList.length">
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
            :page-size="HistorObj.per_page"
            @current-change="changePageHistor"
            :total="HistorObj.total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <v-box
      :value="!!activeItem.length"
      @input="activeItem = []"
      :title="$t('order.exchangeRecord')"
      :width="700"
    >
      <order-detail :list="activeItem" />
    </v-box>
  </div>
</template>

<script>
import Order from "@/api/order";
import utils from "../../utils";
import orderDetail from "./order-detail";
export default {
  components: {
    orderDetail
  },
  data() {
    return {
      delegateType: "current",
      Histor: {
        page: 1,
        direction: undefined,
        type: undefined,
        symbol: undefined,
        date: undefined
      },
      HistorList: [],
      HistorObj: {},
      Current: {
        direction: undefined,
        type: undefined,
        symbol: undefined,
        page: 1
      },
      CurrentList: [],
      CurrentObj: {},
      symbolList: [],
      activeItem: []
    };
  },
  computed: {
    direction: function() {
      return [
        {
          label: this.$t("order.buy"),
          value: "buy"
        },
        {
          label: this.$t("order.sell"),
          value: "sell"
        }
      ];
    },
    typeList: function() {
      return [
        {
          label: this.$t("order.fixedPrice"),
          value: 1
        },
        {
          label: this.$t("order.marketPrice"),
          value: 2
        }
      ];
    }
  },
  methods: {
    // 计算品均价
    division(num1, num2) {
      if (!(num1 * 1) || !(num2 * 1)) return "-";
      return utils.division(num1, num2);
    },
    changePageHistor(idx) {
      this.HistorObj.page = idx;
      this.getHistoryEntrust();
    },
    // 获取历史委托
    getHistoryEntrust() {
      let data = this.Histor;
      if (this.Histor.date) {
        data.start_time = utils.parseTime(this.Histor.date[0]);
        data.end_time = utils.parseTime(this.Histor.date[1]);
      }
      Order.getHistoryEntrust(data)
        .then(res => {
          this.HistorList = res.data;
          this.HistorObj = res;
        })
        .catch(err => {});
    },
    changePageCurrent(idx) {
      this.CurrentObj.page = idx;
      this.getCurrentEntrust();
    },
    // 获取当前委托
    getCurrentEntrust() {
      let data = this.Current;
      Order.getCurrentEntrust(data)
        .then(res => {
          this.CurrentList = res.data;
          this.CurrentObj = res;
        })
        .catch(err => {});
    },
    // 撤销当前订单
    delOrder(item, idx) {
      let data = {
        entrust_id: item.id,
        entrust_type: item.entrust_type,
        symbol: item.symbol
      };
      this.$confirm(this.$t("order.ifCancel") + "？",{
        confirmButtonText:this.$t('common.confirmBtn'),
        cancelButtonText:  this.$t('common.cancelBtn')
      })
        .then(res => {
          Order.cancelEntrust(data)
            .then(res => {
              this.$message.success(this.$t("order.cancelSuccess"));
              this.CurrentList.splice(idx, 1);
            })
            .catch(() => {});
        })
        .catch(err => {});
    },
    // 获取交易对
    getExchangeSymbol() {
      Order.getExchangeSymbol().then(res => {
        this.symbolList = res;
      });
    },
    // 获取交易详情
    getEntrustTradeRecord(item) {
      let data = {
        entrust_id: item.id,
        entrust_type: item.entrust_type,
        symbol: item.symbol
      };
      Order.getEntrustTradeRecord(data).then(res => {
        this.activeItem = res;
        if (!res.length) this.$message(this.$t("order.noData"));
      });
    }
  },
  created() {
    this.getHistoryEntrust();
    this.getCurrentEntrust();
    this.getExchangeSymbol();
  }
};
</script>

<style>
</style>
