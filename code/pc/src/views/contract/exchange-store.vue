<template>
  <div class="markets-pair-list exchange-store bg-plain">
    <div class="nav nav-pills">
      <div class="nav-item">
        <a class="nav-link" :class="{ active: tab == 1 }" @click="tab = 1">{{
          $t("contract.d5")
        }}</a>
      </div>
      <div class="nav-item">
        <a class="nav-link" :class="{ active: tab == 2 }" @click="tab = 2">{{
          $t("contract.d6")
        }}</a>
      </div>
      <div class="flex-fill px-3 justify-content-end d-flex align-items-center">
        <el-popover
          placement="bottom"
          width="100"
          v-model="visible"
          trigger="manual"
        >
          <div
            class="rounded border p-1 bg-white pointer"
            slot="reference"
            @click="visible = !visible"
          >
            {{ $t("contract.b0") }}
            <span class="fn-16"> {{ form.lever_rate }}X </span>
            <i class="el-icon-edit text-primary"></i>
          </div>
          <div class="list">
            <div
              class="el-select-dropdown__item"
              @click="
                selectLever(item);
                visible = false;
              "
              v-for="item in lever_rage"
              :key="item"
            >
              {{ item }}X
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="content-box px-3 ">
      <div v-if="type == 2" class="input-group my-4 input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text">{{ $t("contract.d7") }}</span>
        </div>
        <input type="number" class="form-control" placeholder="" />
        <div class="input-group-append">
          <span class="input-group-text">USDT</span>
        </div>
      </div>
      <div class="d-flex my-4 align-items-center">
        <div class="input-group input-group-sm">
          <div class="input-group-prepend">
            <span class="input-group-text">{{ $t("contract.d8") }}</span>
          </div>
          <template v-if="form.type == 1">
            <input
              type="number"
              v-model="form.entrust_price"
              class="form-control"
              placeholder=""
            />
            <div class="input-group-append">
              <span class="input-group-text">USDT</span>
            </div>
          </template>
          <template v-if="form.type == 2">
            <input
              type="text"
              disabled
              :value="$t('contract.d9')"
              class="form-control"
              :placeholder="$t('contract.d9')"
            />
          </template>
        </div>
        <button
          @click="form.type == 1 ? (form.type = 2) : (form.type = 1)"
          class="btn btn-sm btn-outline-primary ml-2 text-nowrap"
        >
          {{ form.type == 1 ? $t("contract.e0") : $t("contract.d9") }}
        </button>
      </div>
      <div class="input-group mb-4 input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text">{{ $t("contract.e1") }}</span>
        </div>
        <input
          type="number"
          v-model="form.amount"
          class="form-control"
          :placeholder="tips"
        />
        <div class="input-group-append">
          <span class="input-group-text">{{ $t("contract.e2") }}</span>
        </div>
      </div>
      <div class="px-2" v-if="this.tab == 1">
        <el-slider
          :value="activeStep"
          @input="sliderChange"
          :format-tooltip="tooltip"
          :step="25"
          show-stops
        ></el-slider>
      </div>
      <!-- 开仓 -->
      <div v-if="tab == 1">
        <div class="d-flex justify-content-between">
          <div>{{ $t("contract.e3") }}：</div>
          <div>{{ margin }} USDT</div>
        </div>
        <div class="d-flex justify-content-between mb-4">
          <div>{{ $t("contract.a3") }}:</div>
          <div>
            {{ accountInfo.usable_balance }} USDT
            <i
              class="el-icon-sort"
              @click="$router.push('/wallet/assets/exchange')"
            ></i>
          </div>
        </div>
      </div>
      <!-- 平仓 -->
      <div v-if="tab == 2">
        <div class="d-flex justify-content-between">
          <div>{{ $t("contract.e4") }}：</div>
          <div>{{ multiplePositions }} {{ $t("contract.e2") }}</div>
        </div>
        <div class="d-flex justify-content-between mb-4">
          <div>{{ $t("contract.e5") }}:</div>
          <div>{{ shortPosition }} {{ $t("contract.e2") }}</div>
        </div>
      </div>
      <div class="" v-if="tab == 1">
        <div class="px-2 flex-fill mb-4">
          <button
            @click="ifOpenPosition(1)"
            type="button"
            class="sub w-24/24 btn-success btn btn-sm"
          >
            {{ $t("contract.d0") }}
            <span class="fn-12"> （{{ $t("contract.e6") }}） </span>
          </button>
          <div class="text-center">
            {{ $t("contract.e7") }} {{ maxNum }} {{ $t("contract.e2") }}
          </div>
        </div>
        <div class="px-2 flex-fill">
          <button
            @click="ifOpenPosition(2)"
            type="button"
            class="sub w-24/24 btn-danger btn btn-sm"
          >
            {{ $t("contract.d2") }}
            <span class="fn-12"> （{{ $t("contract.e8") }}） </span>
          </button>
          <div class="text-center">
            {{ $t("contract.e7") }} {{ maxNum }} {{ $t("contract.e2") }}
          </div>
        </div>
      </div>
      <div class="" v-if="tab == 2">
        <div class="px-2 flex-fill mb-4">
          <button
            @click="ifOpenPosition(1)"
            type="button"
            class="sub w-24/24 btn-success  btn btn-sm"
          >
            {{ $t("contract.d3") }}
          </button>
          <div class="text-center">
            {{ $t("contract.e9") }} {{ canMore }} {{ $t("contract.e2") }}
          </div>
        </div>
        <div class="px-2 flex-fill">
          <button
            @click="ifOpenPosition(2)"
            type="button"
            class="sub w-24/24 btn-danger btn btn-sm"
          >
            {{ $t("contract.d1") }}
          </button>
          <div class="text-center">
            {{ $t("contract.e9") }} {{ canEmpty }} {{ $t("contract.e2") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Contract from "@/api/contract.js";
import date from "@/utils/class/date.js";
import math from "@/utils/class/math.js";
export default {
  data() {
    return {
      tab: 1,
      type: 1,
      visible: false,
      form: {
        // 1:限价 2:市价
        type: 2,
        entrust_price: undefined,
        amount: "",
        lever_rate: ""
      },
      // 最多可开张数
      maxNum: 0,
      lever_rage: [],
      accountInfo: {},
      _time: null,
      unit_amount:0
    };
  },
  props: {
    symbol: {
      default: "",
      type: String,
      required: false
    },
    holdPositionList: {
      default: () => [],
      type: Array,
      required: false
    },
    defaultPrice: {
      default: "",
      type: String | Number,
      required: false
    },
    newPriceObj: {
      default: () => {},
      type: Object,
      required: false
    },
    contractOpen: {}
  },
  watch: {
    symbol() {
      this.form.entrust_price = undefined;
      this.contractAccount();
      this.getSymbolDetail();
    },
    defaultPrice(n) {
      this.form.entrust_price = n;
    },
    newPriceObj(n) {
      if (n && this.form.entrust_price === undefined) {
        this.form.entrust_price = n.price;
      }
    },
    contractOpen(n, o) {
      if (n != o) {
        this.contractAccount();
      }
    }
  },
  destroyed() {
    clearInterval(this._time);
  },
  mounted() {
    if (this.symbol) {
      this.contractAccount();

      this.getSymbolDetail();
    }
    this._time = setInterval(() => {
      if (this.symbol) {
        // if (this.contractOpen) {
          this.contractAccount(true);
        // }
      }
    }, 3000);
  },
  computed: {
    tips(){
      return this.unit_amount?(`1${this.$t("contract.e2")}≈${this.unit_amount}USDT`):''
    },
    isLogin() {
      return Boolean(localStorage.token);
    },
    // 多仓持仓
    multiplePositions() {
      let item = this.holdPositionList.find(item => item.side == 1);
      if (!item) return 0;
      return item.hold_position;
    },
    // 可平多
    canMore() {
      let item = this.holdPositionList.find(item => item.side == 1);
      if (!item) return 0;
      return item.avail_position;
    },
    // 空仓持仓
    shortPosition() {
      let item = this.holdPositionList.find(item => item.side == 2);
      if (!item) return 0;
      return item.hold_position;
    },
    // 可以平空
    canEmpty() {
      let item = this.holdPositionList.find(item => item.side == 2);
      if (!item) return 0;
      return item.avail_position;
    },
    activeStep() {
      if (!this.form.amount || !this.maxNum) return 0;
      let num = (this.form.amount / this.maxNum) * 100;
      return num;
    },
    // 保证金
    margin() {
      if (!this.form.lever_rate) return 0;
      return math.omitTo(this.form.amount*this.unit_amount / this.form.lever_rate, 4);
    }
  },
  methods: {
    // 获取合约账户信息
    contractAccount(boo) {
      if (!this.isLogin) return;
      // if (!this.contractOpen) return;
      let data = {
        symbol: this.symbol
      };
      Contract.contractAccount(data).then(res => {
        this.accountInfo = res;
        this.$emit("accountInfo", res);
        if (!this.form.lever_rate) {
          this.form.lever_rate = res.lever_rate;
        }
        if (this.form.lever_rate && !boo) {
          this.openNum();
        }
      });
    },
    // 获取可开启张数
    openNum() {
      if (!this.isLogin) return;
      let data = {
        symbol: this.symbol, //ETH
        lever_rate: this.form.lever_rate //10
      };
      Contract.openNum(data).then(res => {
        this.maxNum = res;
      });
    },
    // 获取合约详情
    getSymbolDetail() {
      let data = {
        symbol: this.symbol
      };
      Contract.getSymbolDetail(data).then(res => {
        this.lever_rage = res.lever_rage;
        this.unit_amount = res.unit_amount
        this.$emit('getSymbolDetail',res)
        if (!this.form.lever_rate) {
          this.form.lever_rate = res.default_lever;
        }
      });
    },
    // 设置数量
    sliderChange($ev) {
      this.form.amount = Math.round((this.maxNum * $ev) / 100)||'';
    },
    // 选择杠杆
    selectLever(idx) {
      this.form.lever_rate = idx;
      this.openNum();
    },
    tooltip($ev) {
      return Math.round($ev) + "%";
    },
    // 提示
    ifOpenPosition(side) {
      let typeStr =
        this.form.type == 1
          ? `${this.form.entrust_price}${this.$t("contract.f0")}`
          : this.$t("contract.d9");
      let decStr =
        this.tab == 1
          ? `${this.$t("contract.d5")}${this.form.amount}${this.$t(
              "contract.e2"
            )}${side == 1 ? this.$t("contract.f1") : this.$t("contract.f2")}`
          : `${this.$t("contract.d6")}${this.form.amount}${this.$t(
              "contract.e2"
            )}`;
      this.$confirm(
        `${this.$t("contract.f3")}${typeStr}${this.form.lever_rate}${this.$t(
          "contract.f4"
        )}${decStr}?`
      )
        .then(res => {
          if (this.tab == 1) {
            this.openPosition(side);
          } else {
            this.closePosition(side);
          }
        })
        .catch(res => {});
    },
    // 开仓
    openPosition(side) {
      let data = {
        side,
        symbol: this.symbol,
        ...this.form
      };
      Contract.openPosition(data).then(() => {
        this.contractAccount();
        this.form.amount = "";
        this.$message.success(this.$t("contract.f5"));
        this.$emit("position");
      });
    },
    // 平仓
    closePosition(side) {
      let data = {
        side: side == 1 ? 2 : 1,
        type: this.form.type,
        symbol: this.symbol,
        entrust_price: this.form.entrust_price || 0,
        amount: this.form.amount
      };
      Contract.closePosition(data).then(() => {
        this.form.amount = "";
        this.contractAccount();
        this.$message.success(this.$t("contract.f6"));
        this.$emit("position");
      });
    }
  }
};
</script>
