<template>
  <div>
    <!-- <secondary-nav></secondary-nav> -->
    <div class="container my-4">
      <div class="row">
        <div class="col-12 my-2">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <div class="btn-group">
                <button
                  class="btn"
                  :class="side == 0 ? 'btn-info' : 'btn-light'"
                  @click="changeSide(0)"
                >
                  {{$t('otc.j9')}}
                </button>
                <button
                  class="btn"
                  :class="side == 1 ? 'btn-info' : 'btn-light'"
                  @click="changeSide(1)"
                >
                  {{$t('otc.k0')}}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 p-3 bg-panel mt-3">
          <div class="fn-20 fn-bold orange pb-1">USDT</div>
          <div class="col-12 mt-3 p-0 fn-16">
            <div class="form col-12 pl-0 mt-3">
              <div class="form-group col-12 px-0">
                <label v-if="side==0&&!showPrice">{{$t('otc.k1')}}</label>
                <label v-if="side==0&&showPrice">{{$t('otc.k2')}}</label>
                <label v-if="side==1&&!showPrice">{{$t('otc.k3')}}</label>
                <label v-if="side==1&&showPrice">{{$t('otc.k4')}}</label>
                <div class="input-group col-12 px-0">
                  <input
                    class="form-control"
                    type="text"
                    v-model="money"
                    :placeholder="!showPrice?$t('otc.k5'):$t('otc.k6')"
                    v-if="side==0"
                  />
                  <input
                    v-else
                    class="form-control"
                    type="text"
                    v-model="money"
                    :placeholder="!showPrice?$t('otc.k7'):$t('otc.k8')"
                  />
                  <div class="input-group-append">
                    <span class="input-group-text fn-12" v-if="!showPrice">CNY</span>
                    <span class="input-group-text fn-12" v-else>USDT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 pl-0 d-flex justify-content-between">
            <p>{{$t('otc.c5')}}：{{price_cny}} CNY/USDT</p>
            <div
              class="d-flex justify-content-center align-items-center"
              @click="showPrice=!showPrice"
            >
              <i class="ion ion-ios-swap fn-20"></i>
              <span class="ml-1" v-if="!showPrice">{{$t('otc.k9')}}</span>
              <span class="ml-1" v-else>{{$t('otc.k99')}}</span>
            </div>
          </div>
          <button class="btn btn-primary rounded-pill mt-3" @click.prevent="submit">
            <span v-if="side==0">{{$t('otc.j9')}}</span>
            <span v-else>{{$t('otc.k0')}}</span>
          </button>
        </div>
        <div class="col-md-6 mt-3">
          <div class="panel-box bg-panel h-100">
              <div class="heading d-flex justify-content-between align-items-center">
                  <div class="h6">{{$t('otc.l0')}}</div>
              </div>
              <div class="tab-content pl-3 pr-3">
                  <ul>
                      <!-- <li class="mb-2">1.{{$t('otc.l1')}}100 USDT。</li> -->
                      <!-- <li class="mb-2">2.。</li> -->
                  </ul>
              </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="editAddress"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-panel">
          <div class="modal-header">
            <h5 v-if="side==0" class="modal-title" id="exampleModalLabel">
              {{$t('otc.l2')}}
            </h5>
            <h5 v-else class="modal-title" id="exampleModalLabel">
              {{$t('otc.l3')}}
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
            <div class="d-flex justify-content-between">
              <p>{{$t('otc.a5')}}（USDT）</p>
              <p>≈{{showPrice?money:money/price_cny | omitTo(6)}}CNY</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>{{$t('otc.c5')}}（CNY/USDT）</p>
              <p>≈{{price_cny}}</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>{{$t('otc.c4')}}（CNY）</p>
              <p>≈{{showPrice?money*price_cny:money | omitTo(2)}}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary rounded-pill"
              data-dismiss="modal"
            >
              {{ $t("common.cancelBtn") }}
            </button>
            <button
              type="button"
              class="btn btn-primary rounded-pill"
              @click="sure"
            >
              {{ $t("common.confirmBtn") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="editAuth"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-panel">
          <div class="modal-header">
            <h5 v-if="side==0" class="modal-title" id="exampleModalLabel">
              {{$t('otc.l2')}}
            </h5>
            <h5 v-else class="modal-title" id="exampleModalLabel">
              {{$t('otc.l3')}}
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
            <div class="d-flex justify-content-between">
              <p>{{$t('otc.a5')}}（USDT）</p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary rounded-pill"
              data-dismiss="modal"
            >
              {{ $t("common.cancelBtn") }}
            </button>
            <button
              type="button"
              class="btn btn-primary rounded-pill"
              @click="goAuth"
            >
              {{ $t("common.confirmBtn") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Otc from "@/api/otc";
import Profile from "@/api/profile";
import Wallet from "@/api/wallet";
export default {
  data() {
    return {
      side: 0,
      money:"",
      showPrice:false,
      price_cny:'',
      usdt_balance:'',
      detail: {},
    };
  },
  components: {
  },
  computed: {
  },
  created() {
    this.getCurrencyExCny()
    this.fundAccount()
    this.getAuthInfo()
  },
  methods: {
    changeSide(idx) {
      this.side = idx;
      this.money=''
    },
    // 获取实名信息
    getAuthInfo() {
      Profile.getAuthInfo()
        .then(res => {
          this.detail = res;
        })
        .catch(res => {});
    },
    goAuth(){
      
    },
    //获取u余额
    fundAccount() {
      Wallet.fundAccount().then((res) => {
        this.usdt_balance = res.list[0].usable_balance;
      });
    },
    // 获取汇率
    getCurrencyExCny() {
      let data={
        coin_name:'USDT',
        type:this.side==0?'buy':'sell'
      }
      Otc.legalPrice(data).then(res=>{
        this.price_cny = res.price
      }).catch((err) => {
        setTimeout(() => {
          this.$router.push(`/profile/certification`);
        }, 2000);
      });
    },
    submit(){
      if(!this.money&&!this.showPrice&&this.side==0){
        this.$message.error(this.$t('otc.k5'));
        return
      }
      if(!this.money&&this.showPrice&&this.side==0){
        this.$message.error(this.$t('otc.k6'));
        return
      }
      if(!this.money&&!this.showPrice&&this.side==1){
        this.$message.error(this.$t('otc.k7'));
        return
      }
      if(!this.money&&this.showPrice&&this.side==1){
        this.$message.error(this.$t('otc.k8'));
        return
      }
      var money=!this.showPrice?this.money/this.price_cny:this.money
      if(this.usdt_balance<money&&this.side==1){
        this.$message.error(this.$t('otc.l4'))
        return
      }
      if(this.detail.status!=2){
        $("#editAuth").modal("show");
        return
      }
      $("#editAddress").modal("show");
    },
    sure(){
      let data={
        currency:'USDT',
        type:this.side==0?'buy':'sell',
        amount:this.money,
        number:this.money,
        unitPrice:this.price_cny,
        pay_type:this.showPrice?0:1
      }
      Otc.legalBuy(data).then(res=>{
        $("#editAddress").modal("hide");
        window.open(res)
      }).catch((err) => {

      });
    }
  },
};
</script>
<style lang="scss" scoped>
.user-head {
  $size: 50px;
  height: $size;
  width: $size;
  border: 3px solid white;
  border-radius: 50%;
  overflow: hidden;
  color: white;
  font-size: 20px;
  font-weight: bold;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #6d9ef9, #1f5df4);
}
/deep/ .el-dialog {
  background-color: #222e3d;
  color: #fff;
  &__title {
    color: #fff;
  }
}
.orange{
  border-bottom: 1px solid #dbab40;
  color: #dbab40;
  width: fit-content;
}
.h-100{
  height: 100%;
}
.el-radio{
  color: white;
}
</style>