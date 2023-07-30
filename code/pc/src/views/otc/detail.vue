<template>
  <div>
    <secondary-nav></secondary-nav>
    <div class="container">
      <div class="row">
        <div class="col-12 panel my-4 px-4 pt-4 pb-5 rounded shadow-sm bg-panel">
          <h5 class="border-bottom pb-3 mb-2">
            {{ detail.cur_user_role == "seller" ? $t('otc.a2') : $t('otc.a1') }}{{$t('otc.d4')}}
          </h5>
          <div class="p-3">
            <div class="d-flex justify-content-between mb-2">
              <div>{{$t('otc.d5')}}：{{ detail.order_sn }}</div>
              <div>{{$t('otc.c3')}}：{{ detail.status_text }}</div>
            </div>
            <div class="mb-2" v-if="seller_payments.pay_type == 'bank_card'">
              {{$t('otc.d6')}}：<span class="text-primary">{{
                seller_payments.pay_type_text
              }}</span>
              <div class="row my-2">
                <div class="col-md-4">
                  {{$t('otc.d7')}}：{{ seller_payments.real_name }}
                </div>
                <div class="col-md-4">{{$t('otc.d8')}}：{{ seller_payments.card_no }}</div>
                <div class="col-md-4">
                  {{$t('otc.d9')}}：{{ seller_payments.bank_name }}
                </div>
                <div class="col-md-4">
                  {{$t('otc.e0')}}：{{ seller_payments.open_bank }}
                </div>
              </div>
            </div>
            <div class="mb-2" v-if="seller_payments.pay_type == 'alipay'">
              {{$t('otc.d6')}}：<span class="text-primary">{{
                seller_payments.pay_type_text
              }}</span>
              <div class="row my-2">
                <div class="col-md-4">
                  {{$t('otc.d7')}}：{{ seller_payments.real_name }}
                </div>
                <div class="col-md-4">{{$t('otc.d8')}}：{{ seller_payments.card_no }}</div>
              </div>
              <div class="paycode-box">
                <img :src="seller_payments.full_code_img" alt="" />
              </div>
            </div>
            <div class="mb-2" v-if="seller_payments.pay_type == 'wechat'">
              {{$t('otc.d6')}}：<span class="text-primary">{{
                seller_payments.pay_type_text
              }}</span>
              <div class="row my-2">
                <div class="col-md-4">
                  {{$t('otc.d7')}}：{{ seller_payments.real_name }}
                </div>
                <div class="col-md-4">{{$t('otc.d8')}}：{{ seller_payments.card_no }}</div>
              </div>
              <div class="paycode-box">
                <img :src="seller_payments.full_code_img" alt="" />
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-4">{{$t('otc.c5')}}：{{ detail.price }}</div>
            <div class="col-4">{{$t('otc.a5')}}：{{ detail.amount }}</div>
            <div class="col-4">{{$t('otc.c4')}}：{{ detail.money }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-4">
              {{$t('otc.e1')}}：<span class="text-danger">{{ getTime(overed_time).m }}</span>{{$t('otc.e2')}}<span class="text-danger">{{ getTime(overed_time).s }}</span>{{$t('otc.e3')}}
            </div>
          </div>
          <div class="row" v-if="false">
            <div class="col-12">{{$t('otc.b4')}}：{{ detail.note }}</div>
          </div>
          <div class="mb-2">
            <label>{{$t('otc.e4')}}：</label>
            <div class="paycode-box" v-if="detail.paid_img">
              <img :src="detail.paid_img" alt="" />
            </div>
            <upload-img :allowSize="5000" v-model="paid_img" class="mb-3" required :placeholder="$t('otc.e5')" v-else-if="detail.confirm_button == 'buyer'">
              <template #text>
                <div class="text-primary">{{$t('otc.e6')}}</div>
              </template>
            </upload-img>
            <div class="text-warning" v-else>{{$t('otc.e7')}}</div>
          </div>
          <div class="border-top pt-3 d-flex justify-content-end">
            <div class="" v-if="detail.confirm_button == 'buyer'">
              <button class="btn btn-danger" @click="ifCancelOrder">
                {{$t('otc.e8')}}
              </button>
              <button class="btn btn-primary" @click="ifConfirmPaidOrder">
                {{$t('otc.e9')}}
              </button>
            </div>
            <div class="" v-if="detail.confirm_button == 'seller'">
              <button class="btn btn-danger" @click="ifNotConfirmOrder">
                {{$t('otc.f0')}}
              </button>
              <button class="btn btn-primary" @click="ifConfirmOrder">
                {{$t('otc.f1')}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Otc from "@/api/otc";
export default {
  name: "detail",
  data() {
    return {
      detail: {},
      seller_payments: {},
      overed_time: 0,
      dTime: undefined,
      paid_img: "",
    };
  },
  created() {
    this.orderDetail();
  },
  computed: {
    payTypeMap() {
      return {
        alipay: this.$t('otc.b1'),
        wechat: this.$t('otc.b2'),
        bank_card: this.$t('otc.b3'),
      };
    },
  },
  methods: {
    getTime(s){
      return {
        m:Math.floor(s/60),
        s:s%60
      }
    },
    orderDetail() {
      let data = {
        order_id: this.$route.query.id,
      };
      Otc.orderDetail(data).then((res) => {
        this.detail = res;
        this.seller_payments = res.seller_payments;
        this.overed_time = res.overed_time;
        if (this.overed_time) {
          this.lastTime();
        }
      });
    },
    // 倒计时
    lastTime() {
      this.dTime = setInterval(() => {
        this.overed_time--;
        if (!this.overed_time) {
          clearInterval(this.dTime);
        }
      }, 1000);
    },
    // 撤销订单
    ifCancelOrder() {
      this.$confirm(this.$t('otc.f2')+"?", this.$t('otc.d2'), {
        confirmButtonText:this.$t('common.confirmBtn'),
        cancelButtonText:  this.$t('common.cancelBtn'),
        type: "warning",
      }).then(() => {
        this.cancelOrder();
      });
    },
    cancelOrder() {
      let data = {
        order_id: this.$route.query.id,
      };
      Otc.cancelOrder(data).then((res) => {
        this.$router.back();
        this.$message.success(this.$t('otc.f5'));
      });
    },
    // 确认付款
    ifConfirmPaidOrder() {
      this.$confirm(this.$t('otc.f6')+"?", this.$t('otc.d2'), {
        confirmButtonText: this.$t('common.confirmBtn'),
        cancelButtonText:  this.$t('common.cancelBtn'),
        type: "warning",
      }).then(() => {
        this.confirmPaidOrder();
      });
    },
    confirmPaidOrder() {
      let data = {
        order_id: this.$route.query.id,
        paid_img: this.paid_img,
      };
      Otc.confirmPaidOrder(data).then((res) => {
        this.orderDetail();
        this.$message.success(this.$t('otc.f7'));
      });
    },
    // 确认收款
    ifConfirmOrder() {
      this.$confirm(this.$t('otc.f8'),this.$t('otc.d2'), {
       confirmButtonText: this.$t('common.confirmBtn'),
        cancelButtonText:  this.$t('common.cancelBtn'),
        type: "warning",
      }).then(() => {
        this.confirmOrder();
      });
    },
    confirmOrder() {
      let data = {
        order_id: this.$route.query.id,
      };
      Otc.confirmOrder(data).then((res) => {
        this.orderDetail();
        this.$message.success(this.$t('otc.f7'));
      });
    },
    // 未到账
    ifNotConfirmOrder() {
      this.$confirm(this.$t('otc.f9'), this.$t('otc.d2'), {
        confirmButtonText: this.$t('common.confirmBtn'),
        cancelButtonText:  this.$t('common.cancelBtn'),
        type: "warning",
      }).then(() => {
        this.notConfirmOrder();
      });
    },
    notConfirmOrder() {
      let data = {
        order_id: this.$route.query.id,
      };
      Otc.notConfirmOrder(data).then((res) => {
        this.orderDetail();
        this.$message.success(this.$t('otc.f7'));
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.paycode-box {
  width: 250px;
  img {
    width: 100%;
  }
}
</style>