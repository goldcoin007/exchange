<template>
  <div>
    <div class="d-flex justify-content-between py-2 px-3">
      <div>
        <button class="btn btn-sm btn-outline-danger" @click="fullFlat">
          {{$t('contract.k2')}}
        </button>
      </div>
      <div
        class="d-flex align-items-center"
        @click="$emit('isall', !holdPositionAll)"
      >
        {{ $t("contract.i6") }}
        <input
          type="checkbox"
          class="ml-1"
          :checked="holdPositionAll"
          style="pointer-events: none"
        />
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>{{ $t("contract.a9") }}</th>
          <th>{{ $t("contract.b0") }}</th>
          <th>{{ $t("contract.g7") }}（{{ $t("contract.e2") }}）</th>
          <th>{{ $t("contract.i3") }}</th>
          <th>{{ $t("contract.g8") }}（{{ $t("contract.e2") }}）</th>
          <th>{{ $t("contract.a5") }}（{{ $t("contract.e2") }}）</th>
          <th>{{ $t("contract.b7") }}</th>
          <th>{{ $t("contract.g9") }}</th>
          <th>{{ $t("contract.g3") }}</th>
          <th>{{ $t("contract.a8") }}</th>
          <th>{{ $t("contract.a6") }}</th>
          <th>{{ $t("contract.h0") }}</th>
          <th>{{ $t("contract.i7") }} /{{ $t("contract.i8") }}</th>
          <th width="18%">{{ $t("contract.c0") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in showList" :key="item.id" @click="getactiveItem(index)">
          <td>{{ item.pair_name }}</td>
          <td>{{ item.lever_rate }}X</td>
          <td>{{ item.hold_position }}</td>
          <td>{{ item.side == 1 ? $t("contract.i4") : $t("contract.i5") }}</td>
          <td>{{ item.avail_position }}</td>
          <td>{{ item.freeze_position }}</td>
          <td>{{ item.position_margin }}</td>
          <td>{{ item.avg_price * 1 }}</td>
          <td>{{ item.realtimePrice }}</td>
          <td>{{ item.flatPrice }}</td>
          <td>{{ item.unRealProfit }}</td>
          <td>{{ item.profitRate }}</td>
          <td>{{ item.tpPrice || "--" }}/{{ item.slPrice || "--" }}</td>
          <td>
            <button
              class="btn btn-sm btn-danger mb-1"
              @click="liquidation(item)"
            >
              {{ $t("contract.d6") }}
            </button>
            <!-- <button
              class="btn btn-sm btn-outline-danger mb-1"
              @click="allLiquidation(item)"
            >
              {{ $t("contract.h1") }}
            </button> -->
            <button
              class="btn btn-sm btn-outline-danger mb-1"
              @click="reverse(item)"
            >
              {{$t('contract.k3')}}
            </button>
            <button
              class="btn btn-sm btn-primary mb-1"
              @click="toStoploss(item)"
            >
              {{ $t("contract.i9") }}
            </button>
          </td>
        </tr>
        <tr v-if="!showList.length">
          <td colspan="13">
            <no-record />
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 平仓 -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ $t("contract.d6") }}
            </h5>
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
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label"
                  >{{ $t("contract.d8") }}:</label
                >
                <div class="input-group">
                  <input
                    type="text"
                    v-model="form.entrust_price"
                    class="form-control"
                    id="recipient-name"
                    v-if="activeItem.closeType == 1"
                  />
                  <input
                    type="text"
                    disabled
                    :value="$t('contract.d9')"
                    class="form-control"
                    id="recipient-name"
                    v-if="activeItem.closeType == 2"
                  />
                  <div class="input-group-append">
                    <button
                      type="button"
                      @click="
                        activeItem.closeType == 1
                          ? (activeItem.closeType = 2)
                          : (activeItem.closeType = 1)
                      "
                      class="btn btn-outline-primary"
                    >
                      {{
                        activeItem.closeType == 1
                          ? $t("contract.e0")
                          : $t("contract.d9")
                      }}
                    </button>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label"
                  >{{ $t("contract.e1") }}:</label
                >
                <input
                  type="number"
                  v-model="form.amount"
                  class="form-control"
                  id="message-text"
                />
              </div>
              <div>
                {{ $t("contract.e9") }}
                {{ activeItem.avail_position }}
              </div>
              <el-slider
                :value="activeStep"
                @input="sliderChange"
                :format-tooltip="tooltip"
                :step="25"
                show-stops
              ></el-slider>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              {{ $t("contract.c4") }}
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="closePosition"
            >
              {{ $t("contract.c5") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 市价平仓 -->
    <div
      class="modal fade"
      id="allLiquidation"
      tabindex="-1"
      role="dialog"
      aria-labelledby="allexampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="allexampleModalLabel">
              {{ $t("contract.d6") }}
            </h5>
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
            {{ $t("contract.h2") }}{{ activeItem.pair_name
            }}{{ $t("contract.a9") }}？
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              {{ $t("contract.c4") }}
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="closeAllPosition"
            >
              {{ $t("contract.c5") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 一键全平 -->
    <div
      class="modal fade"
      id="fullFlat"
      tabindex="-1"
      role="dialog"
      aria-labelledby="fullFlatLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="fullFlatLabel">
              {{ $t("contract.d6") }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">{{$t('contract.k4')}}？</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              {{ $t("contract.c4") }}
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="onekeyAllFlat"
            >
              {{ $t("contract.c5") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 一键反向 -->
    <div
      class="modal fade"
      id="reverse"
      tabindex="-1"
      role="dialog"
      aria-labelledby="reverseLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="reverseLabel">
              {{ activeItem.pair_name }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">{{$t('contract.k5')}}？</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              {{ $t("contract.c4") }}
            </button>
            <button type="button" class="btn btn-primary" @click="onekeyReverse">
              {{ $t("contract.c5") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 止盈止损 -->
    <div
      class="modal fade"
      id="stoploss"
      tabindex="-1"
      role="dialog"
      aria-labelledby="stoplosslabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="stoplosslabel">
              {{ $t("contract.i9") }}
            </h5>
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
            <div class="info border-bottom pb-2">
              <div>
                <span class="h4">
                  {{ activeItem.pair_name }}
                </span>
                <span class="text-warning"> {{ activeItem.lever_rate }}X </span>
                <span class="text-success">{{
                  activeItem.side == 1 ? $t("contract.i4") : $t("contract.i5")
                }}</span>
              </div>
              <div class="d-flex">
                <div class="item d-flex mr-4">
                  <div class="mr-2 text-secondary">{{ $t("contract.j2") }}</div>
                  <div>{{ activeItem.avg_price * 1 }}</div>
                </div>
                <div class="item d-flex">
                  <div class="mr-2 text-secondary">{{ $t("contract.j1") }}</div>
                  <div>{{ activeItem.realtimePrice }}</div>
                </div>
              </div>
            </div>
            <div class="py-2" v-if="false">
              <el-checkbox :value="true">设置止盈</el-checkbox>
              <el-checkbox :value="true">设置止损</el-checkbox>
            </div>
            <form>
              <div class="form-group">
                <label class="col-form-label">{{ $t("contract.j3") }}:</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="strategyForm.tp_trigger_price"
                  />
                </div>
                <small
                  class="form-text text-muted"
                  v-if="strategyForm.tp_trigger_price"
                >
                  {{ $t("contract.j5") }}{{ strategyForm.tp_trigger_price
                  }}{{ $t("contract.j6") }}
                  {{
                    activeItem.side == 1
                      ? many(activeItem, strategyForm.tp_trigger_price)
                      : air(activeItem, strategyForm.tp_trigger_price)
                  }}
                  USDT
                </small>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t("contract.j4") }}:</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="strategyForm.sl_trigger_price"
                  />
                </div>
                <small
                  class="form-text text-muted"
                  v-if="strategyForm.sl_trigger_price"
                >
                  {{ $t("contract.j5") }}{{ strategyForm.sl_trigger_price
                  }}{{ $t("contract.j7") }}
                  {{
                    activeItem.side == 1
                      ? many(activeItem, strategyForm.sl_trigger_price)
                      : air(activeItem, strategyForm.sl_trigger_price)
                  }}
                  USDT
                </small>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              {{ $t("contract.c4") }}
            </button>
            <button type="button" class="btn btn-primary" @click="stoploss">
              {{ $t("contract.c5") }}
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
  name: "hold-position",
  props: {
    symbol: {
      default: "",
      type: String,
      required: false,
    },
    holdPositionList: {
      default: () => [],
      type: Array,
      required: false,
    },
    newPrice: {
      default: 0,
      type: Number,
      required: false,
    },
    holdPositionAll: {
      default: false,
      type: Boolean,
    },
    symbolDetail: {
      default: () => {},
      type: Object,
    },
  },
  computed: {
    showList() {
      return this.holdPositionList.filter((item) => item.hold_position);
    },
    activeStep() {
      if (!this.form.amount || !this.activeItem.avail_position) return 0;
      let num = (this.form.amount / this.activeItem.avail_position) * 100;
      return num;
    },
  },
  data() {
    return {
      list: [],
      activeItem: {},
      form: {
        entrust_price: "",
        amount: "",
      },
      strategyForm: {
        symbol: "",
        position_side: "",
        tp_trigger_price: "",
        sl_trigger_price: "",
      },
    };
  },
  watch: {},
  created() {},
  methods: {
    tooltip($ev) {
      return Math.round($ev) + "%";
    },
    // 设置数量
    sliderChange($ev) {
      this.form.amount = Math.round(
        (this.activeItem.avail_position * $ev) / 100
      );
    },
    // 多仓盈亏
    many(item, newPrice) {
      let face = this.symbolDetail.unit_amount;
      return math.omitTo(
        ((newPrice - item.avg_price) * item.avail_position * face) /
          item.avg_price,
        4
      );
    },
    // 空仓盈亏
    air(item, newPrice) {
      let face = this.symbolDetail.unit_amount;
      return math.omitTo(
        ((item.avg_price - newPrice) * item.avail_position * face) /
          item.avg_price,
        4
      );
    },
    // 平仓弹窗
    liquidation(item) {
      this.activeItem = item;
      this.form.entrust_price = this.newPrice;
      this.$set(this.activeItem, "closeType", 1);
      $("#exampleModal").modal("show");
    },
    closePosition() {
      let data = {
        side: this.activeItem.side == 1 ? 2 : 1,
        type: this.activeItem.closeType,
        symbol: this.activeItem.symbol,
        entrust_price: this.form.entrust_price || 0,
        amount: this.form.amount,
      };
      Contract.closePosition(data).then(() => {
        this.form.entrust_price = "";
        this.form.amount = "";
        this.$message.success(this.$t("contract.f6"));
        this.$emit("position");
        $("#exampleModal").modal("hide");
      });
    },
    // 全平弹窗
    allLiquidation(item) {
      this.activeItem = item;
      $("#allLiquidation").modal("show");
    },
    closeAllPosition() {
      let data = {
        symbol: this.activeItem.symbol,
        side: this.activeItem.side == 1 ? 2 : 1,
      };
      Contract.closeAllPosition(data).then(() => {
        this.$message.success(
          `${this.$t("contract.h3")}${this.activeItem.pair_name}${this.$t(
            "contract.h4"
          )}`
        );
        this.$emit("position");
        $("#allLiquidation").modal("hide");
      });
    },
    // 止盈止损
    toStoploss(item) {
      this.activeItem = item;
      this.strategyForm.symbol = this.activeItem.symbol;
      this.strategyForm.position_side = this.activeItem.side;
      $("#stoploss").modal("show");
    },
    stoploss() {
      Contract.setStrategy(this.strategyForm).then((res) => {
        $("#stoploss").modal("hide");
        this.strategyForm.tp_trigger_price = "";
        this.strategyForm.sl_trigger_price = "";
        this.$message.success(this.$t("contract.k0"));
      });
    },
    // 一键全平
    fullFlat() {
      $("#fullFlat").modal("show");
    },
    onekeyAllFlat() {
      Contract.onekeyAllFlat().then((res) => {
        $("#fullFlat").modal("hide");
        this.$message.success(this.$t('contract.k6'));
        this.$emit("position");
      });
    },
    // 一键反向
    reverse(item) {
      this.activeItem = item;
      $("#reverse").modal("show");
    },
    onekeyReverse() {
      let data = {
        symbol: this.activeItem.symbol,
        position_side: this.activeItem.side,
      };
      Contract.onekeyReverse(data).then((res) => {
        $("#reverse").modal("hide");
        this.$message.success(this.$t('contract.k7'));
        this.$emit("position");
      });
    },
    //点击订单获取订单indexc传回父组件查询该订单详情
    getactiveItem(index){
        this.$emit("setactive",index);       
    }
  },
};
</script>