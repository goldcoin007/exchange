<template >
  <div>
    <secondary-nav></secondary-nav>
    <div class="container">
      <div class="row mt-4">
        <div class="col-12 bg-panel rounded p-3">
          <h5 class="border-bottom pb-3">{{$t('otc.b1')}}</h5>
          <div class="py-3 border-bottom row">
            <div class="form col-md-6">
              <div class="form-group">
                <label for="">{{$t('otc.d8')}}</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="alipay.card_no"
                  :placeholder="$t('otc.i0')"
                />
              </div>
              <div class="form-group">
                <label for="">{{$t('otc.d7')}}</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="alipay.real_name"
                  :placeholder="$t('otc.i1')"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="">{{$t('otc.i2')}}</label>
                <upload-img
                  :allowSize="5000"
                  v-model="alipay.code_img"
                  class="mb-3"
                  required
                  :placeholder="$t('otc.e5')"
                >
                </upload-img>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end pt-3">
            <div>
              <button class="btn btn-sm btn-primary" @click="add(alipay)">
                {{$t('otc.i3')}}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 bg-panel rounded p-3">
          <h5 class="border-bottom pb-3">{{$t('otc.b2')}}</h5>
          <div class="py-3 border-bottom row">
            <div class="form col-md-6">
              <div class="form-group">
                <label for="">{{$t('otc.d8')}}</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="wechat.card_no"
                  :placeholder="$t('otc.i0')"
                />
              </div>
              <div class="form-group">
                <label for="">{{$t('otc.d7')}}</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="wechat.real_name"
                  :placeholder="$t('otc.i1')"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="">{{$t('otc.i2')}}</label>
                <upload-img
                  :allowSize="5000"
                  v-model="wechat.code_img"
                  class="mb-3"
                  required
                  :placeholder="$t('otc.e5')"
                >
                </upload-img>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end pt-3">
            <div>
              <button class="btn btn-sm btn-primary" @click="add(wechat)">
                {{$t('otc.i3')}}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 bg-panel rounded p-3">
          <h5 class="border-bottom pb-3">{{$t('otc.b3')}}</h5>
          <div class="py-3 border-bottom row">
            <div class="form col-md-6">
              <div class="form-group">
                <label for="">{{$t('otc.i4')}}</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="bank_card.bank_name"
                  :placeholder="$t('otc.i5')"
                />
              </div>
              <div class="form-group">
                <label for="">{{$t('otc.e0')}}</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="bank_card.open_bank"
                  :placeholder="$t('otc.i6')"
                />
              </div>
              <div class="form-group">
                <label for="">{{$t('otc.i7')}}</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="bank_card.card_no"
                  :placeholder="$t('otc.i8')"
                />
              </div>
              <div class="form-group">
                <label for="">{{$t('otc.d7')}}</label>
                <input
                  class="form-control"
                  type="text"
                  :placeholder="$t('otc.i1')"
                  v-model="bank_card.real_name"
                />
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end pt-3">
            <div>
              <button class="btn btn-sm btn-primary" @click="add(bank_card)">
                {{$t('otc.i3')}}
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
  name: "pays",
  data() {
    return {
      alipay: {
        pay_type: "alipay",
        real_name: "",
        card_no: "",
        code_img: "",
      },
      bank_card: {
        pay_type: "bank_card",
        real_name: "",
        card_no: "",
        bank_name: "",
        open_bank: "",
      },
      wechat: {
        pay_type: "wechat",
        real_name: "",
        card_no: "",
        code_img: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      Otc.userPayment().then((res) => {
        this.alipay = res.alipay || this.alipay;
        this.bank_card = res.bank_card || this.bank_card;
        this.wechat = res.wechat || this.wechat;
      });
    },
    add(obj) {
      let data = {
        ...obj,
      };
      for (let i in data) {
        if (data[i] == null) delete data[i];
      }
      if (data.id) {
        data._method = "put";
        Otc.editUserPayment(data).then(() => {
          this.$message.success(this.$t('otc.i9'));
          this.getList();
        });
      } else {
        Otc.addUserPayment(data).then((res) => {
          this.$message.success(this.$t('otc.j0'));
          this.getList();
        });
      }
    },
  },
};
</script>