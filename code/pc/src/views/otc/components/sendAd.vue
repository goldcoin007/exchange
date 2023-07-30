<template>
  <div>
    <div class="content">
      <div class="form">
        <div class="form-group">
          <el-select v-model="form.side" :placeholder="$t('otc.a0')">
            <el-option :label="$t('otc.a1')" :value="1"></el-option>
            <el-option :label="$t('otc.a2')" :value="2"></el-option>
          </el-select>
        </div>
        <div class="form-group">
          <label for="jaige">{{$t('otc.a3')}}</label>
          <el-select v-model="form.virtual_coin" :placeholder="$t('otc.a4')">
            <el-option
              v-for="item in coinList"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>
        </div>
        <div class="form-group">
          <label for="shuliang">{{$t('otc.a5')}}</label>
          <input
            type="number"
            class="form-control"
            :placeholder="$t('otc.a6')"
            id="shuliang"
            v-model="form.amount"
          />
        </div>
        <div class="form-group">
          <label for="jaige">{{$t('otc.a7')}}</label>
          <input
            type="number"
            class="form-control"
            :placeholder="$t('otc.a8')"
            id="jaige"
            v-model="form.price"
          />
        </div>

        <div class="form-row">
          <div class="form-group col-6">
            <label for="zuidi">{{$t('otc.a9')}}</label>
            <input
              type="number"
              class="form-control"
              :placeholder="$t('otc.a6')"
              id="zuidi"
              v-model="form.min_num"
            />
          </div>
          <div class="form-group col-6">
            <label for="zuidi">{{$t('otc.b0')}}</label>
            <input
              type="number"
              class="form-control"
              :placeholder="$t('otc.a6')"
              id="zuidi"
              v-model="form.max_num"
            />
          </div>
        </div>

        <div class="form-group form-check-inline text-light">
          <div class="form-check" v-if="alipay">
            <input
              class="form-check-input"
              type="checkbox"
              name="payType"
              value="alipay"
              v-model="form.pay_type"
              id="zhifubao"
            />
            <label class="form-check-label" for="zhifubao"> {{$t('otc.b1')}} </label>
          </div>
          <div class="form-check" v-if="wechat">
            <input
              class="form-check-input"
              type="checkbox"
              name="payType"
              value="wechat"
              v-model="form.pay_type"
              id="weixin"
            />
            <label class="form-check-label" for="weixin"> {{$t('otc.b2')}} </label>
          </div>
          <div class="form-check" v-if="bank_card">
            <input
              class="form-check-input"
              type="checkbox"
              name="payType"
              value="bank_card"
              v-model="form.pay_type"
              id="yinhangka"
            />
            <label class="form-check-label" for="yinhangka"> {{$t('otc.b3')}} </label>
          </div>
        </div>
        <div class="form-group">
          <label for="beizhu">{{$t('otc.b4')}}</label>
          <input
            type="text"
            class="form-control"
            :placeholder="$t('otc.b5')"
            id="beizhu"
            v-model="form.note"
          />
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">{{$t('common.cancelBtn')}}</el-button>
      <el-button type="primary" @click="storeEntrust">{{$t('common.confirmBtn')}}</el-button>
    </div>
  </div>
</template>
<script>
import Otc from "@/api/otc";
export default {
  name: "sendAd",
  props: ["coinList"],
  data() {
    return {
      form: {
        virtual_coin: "",
        side: 1,
        price: "",
        amount: "",
        pay_type: [],
        note: "",
        min_num: "",
        max_num: "",
      },
      alipay: false,
      bank_card: false,
      wechat: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    storeEntrust() {
      let data = {
        ...this.form,
      };
      data.pay_type = JSON.stringify(data.pay_type);
      Otc.storeEntrust(data).then((res) => {
        this.$emit("success");
        this.$message.success(this.$t('otc.b6'));
        this.form.price = "";
        this.form.amount = "";
        this.form.note = "";
        this.form.min_num = "";
        this.form.max_num = "";
      });
    },
    getList() {
      Otc.userPayment().then((res) => {
        this.alipay = !!res.alipay;
        this.bank_card = !!res.bank_card;
        this.wechat = !!res.wechat;
        if (this.alipay) {
          this.form.pay_type.push("alipay");
        } else if (this.wechat) {
          this.form.pay_type.push("wechat");
        } else if (this.bank_card) {
          this.form.pay_type.push("bank_card");
        }
      });
    },
  },
};
</script>