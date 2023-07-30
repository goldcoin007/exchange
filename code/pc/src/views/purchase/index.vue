<template>
  <div class="subscride-page">
    <!-- 表单 -->
    <div class="container panel my-4 p-5 rounded shadow-sm bg-panel">
      <div class="row">
        <div class="col-6">
          <div class="h3 mb-3">{{ detail.coin_name }}</div>
          <div class>{{ $t("purchase.sendPrice") }}</div>
          <div class="price fn-20 blue">
            1 {{ detail.coin_name }} = {{ detail.issue_price }} USDT
          </div>
          <ul>
            <li class="mt-3">
              <div class="label text-secondary">
                {{ $t("purchase.subscriptionCurrency") }}
              </div>
              <div class="txt">{{ detail.subscribe_currency }}</div>
            </li>
            <li class="mt-3">
              <div class="label text-secondary">
                {{ $t("purchase.expected") }}
              </div>
              <div class="txt">
                {{ parseTime(detail.expected_time_online) }}
              </div>
            </li>
            <li class="mt-3">
              <div class="label text-secondary">
                {{ $t("purchase.startTime") }}
              </div>
              <div class="txt">
                {{ parseTime(detail.start_subscription_time) }}
              </div>
            </li>
            <li class="mt-3">
              <div class="label text-secondary">
                {{ $t("purchase.applyForPurchase") }}
              </div>
              <div class="txt">
                {{ parseTime(detail.end_subscription_time) }}
              </div>
            </li>
          </ul>
        </div>
        <div
          class="col-6 d-flex flex-column justify-content-end align-items-start"
        >
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <el-dropdown>
                <span class="input-group-text">
                  {{ activeCoin.coin_name }}
                  <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="item in coinList"
                    @click.native="activeCoin = item"
                    :key="item.coin_name"
                    >{{ item.coin_name }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <input
              type="number"
              class="form-control"
              :placeholder="$t('purchase.enterNum')"
              min="0"
              step="0.0000000001"
              :data-message="$t('nav.b9',{num:10})"
              required
              aria-label="Username"
              v-model="num"
              aria-describedby="basic-addon1"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-primary"
                type="button"
                @click="num = activeCoin.usable_balance"
              >
                {{ $t("purchase.all") }}
              </button>
            </div>
          </div>
          <p v-if="activeCoin.usable_balance">
            {{ $t("wallet.availableBalance") }}：{{ activeCoin.usable_balance }}
          </p>
          <p>
            1 {{ activeCoin.coin_name }} ≈
            {{ activeCoin.proportion_amount | omitTo(5) }}
            {{ detail.coin_name }}
          </p>
          <p>
            {{ num || 0 }} {{ activeCoin.coin_name }} ≈ {{ total }}
            {{ detail.coin_name }}
          </p>
          <button
            type="submit"
            class="btn btn-primary rounded-pill"
            @click="ifSubscribeNow"
          >
            {{ $t("purchase.subscribeNow") }}
          </button>
        </div>
      </div>
    </div>
    <!-- 进度 -->
    <div v-if="activityList[0].amount" class="container panel my-4 px-4 pt-4 pb-5 rounded shadow-sm bg-panel">
      <div class="row">
        <div class="col-12">
          <h5 class="border-bottom pb-3 mb-5">
           {{ $t('nav.c2') }}
          </h5>
          <el-steps :active="activestep+1" align-center>
            <el-step
              :description="$t('nav.c2')"
            ></el-step>
            <el-step
              :description="$t('nav.c1', { amount: activityList[0].amount,name:detail.coin_name,rate:activityList[0].rate*100})"
            ></el-step>
            <el-step
              :description="$t('nav.c1', { amount: activityList[1].amount,name:detail.coin_name,rate:activityList[1].rate*100})"
            ></el-step>
            <el-step
              :description="$t('nav.c1', { amount: activityList[2].amount,name:detail.coin_name,rate:activityList[2].rate*100})"
            ></el-step>
            <el-step
              :description="$t('nav.c1', { amount: activityList[3].amount,name:detail.coin_name,rate:activityList[3].rate*100})"
            ></el-step>
            <el-step
              :description="$t('nav.c1', { amount: activityList[4].amount,name:detail.coin_name,rate:activityList[4].rate*100})"
            ></el-step>
          </el-steps>
        </div>
      </div>
    </div>
    <div class="container panel my-4 px-4 pt-4 pb-5 rounded shadow-sm bg-panel">
            <div class="col-md-12 mt15">
                <div class="markets-pair-list">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="pill" role="tab" aria-selected="false">{{ $t("common.a3") }}</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>{{$t('purchase.subscribe')}}</th>
                                        <th>{{$t('otc.a5')}}</th>
                                        <th>{{$t('wallet.money')}}</th>
                                        <th>{{$t('purchase.subscriptionCurrency')}}</th>
                                        <th>{{$t('contract.b1')}}</th>
                                        <th class="text-right">{{$t('wallet.status')}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in subscribeRecords" :key="item.id" v-if="seek(item)">
                                        <td>
                                            <img src="../../assets/img/icon/1.png" alt="eth" />
                                            {{ item.subscription_currency_name }}
                                        </td>
                                        <td>{{ item.subscription_currency_amount }}</td>
                                        <td>{{ item.payment_amount }}</td>
                                        <td>{{ item.payment_currency }}</td>
                                        <td>{{ item.subscription_time|parseTime }}</td>
                                        <td class="text-right">
                                            <span class="success">{{$t('wallet.success')}}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <!-- 进度 -->
    <div class="container panel my-4 px-4 pt-4 pb-5 rounded shadow-sm bg-panel">
      <div class="row">
        <div class="col-12">
          <h5 class="border-bottom pb-3 mb-5">
            {{ $t("purchase.subscriptionCycle") }}
          </h5>
          <el-steps :active="detail.status" align-center>
            <el-step
              :title="$t('purchase.projectWarmUp')"
              :icon="detail.status >= 1 ? 'el-icon-success' : undefined"
            ></el-step>
            <el-step
              :title="$t('purchase.startSubscription')"
              :icon="detail.status >= 2 ? 'el-icon-success' : undefined"
              :description="parseTime(detail.start_subscription_time)"
            ></el-step>
            <el-step
              :title="$t('purchase.endOfSubscription')"
              :icon="detail.status >= 3 ? 'el-icon-success' : undefined"
              :description="parseTime(detail.end_subscription_time)"
            ></el-step>
            <el-step
              :title="$t('purchase.announceResults')"
              :icon="detail.status >= 4 ? 'el-icon-success' : undefined"
              :description="parseTime(detail.announce_time)"
            ></el-step>
          </el-steps>
        </div>
      </div>
    </div>

    <!-- 详情 -->
    <div class="container panel my-4 px-4 pt-4 pb-5 rounded shadow-sm bg-panel">
      <div class="row">
        <div class="col-12">
          <h5 class="border-bottom pb-3 mb-4">
            {{ $t("purchase.projectCetails") }}
          </h5>
          <div class="edit-content" v-html="detail.project_details"></div>
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
            <h5 class="modal-title" id="exampleModalLabel">
              {{$t("purchase.useOrNot")}}{{activeCoin.coin_name}}{{$t("purchase.subscribe")}}?
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
                <label for="comments" class="col-form-label"
                  >{{$t("contract.k9")}}:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="comments"
                  v-model="code"
                />
              </div>
            </form>
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
              @click="sbumit"
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
import Subscride from "@/api/subscride";
import Wallet from "@/api/wallet";
export default {
  data() {
    return {
      num: "",
      coinList: [],
      detail: {},
      activeCoin: {},
      code:"",
      transferRecords: [],
      coinName:"",
      subscribeRecords:[],
      activityList:[{rate: "", amount: ""},{rate: "", amount: ""},{rate: "", amount: ""},{rate: "", amount: ""},{rate: "", amount: ""}],
      activestep:0
    };
  },
  computed: {
    total() {
      return utils.multiple(
        this.num || 0,
        this.activeCoin.proportion_amount * 1,
        2
      );
    },

    isLogin() {
      return Boolean(this.userAuth);
    },

    userAuth() {
      const auth = localStorage.getItem("auth");
      let ret = "";
      if (auth) {
        let { memberId, accessToken } = JSON.parse(auth);
        ret = `?${accessToken}&${memberId}`;
      }
      return ret;
    },
  },
  methods: {
    // 过滤查找当前币种的记录
        seek(item) {
            return !this.isCondition || item.coin_name === this.coinName;
        },
        getTransferRecords() {
            Wallet.subscribeRecords()
                .then(data => {
                    this.subscribeRecords = data.data;
                })
                .catch(err => {});
        },
        activity() {
            Subscride.activity()
                .then(data => {
                    this.activityList=data.activity.params
                    this.activestep=data.step
                })
                .catch(err => {});
        },
    parseTime(num) {
      if (!num) return;
      return utils.parseTime(num);
    },
    subscribeTokenList() {
      Subscride.subscribeTokenList().then((res) => {
        this.coinList = res;
        this.activeCoin = this.coinList[0];
      });
    },
    getInfo() {
      Subscride.subscribe().then((res) => {
        this.detail = res;
      });
    },

    chkValidate() {
      // 验证登录
      if (!this.isLogin) {
        this.$confirm( this.$t("contract.k8"), {
          confirmButtonText: this.$t("contract.c5"),
          cancelButtonText: this.$t("contract.c4"),
          type: "warning",
        })
          .then(() => {
            this.$router.push(`/sign-in`);
          })
          .catch();
      }
      return utils.validate(".input-group");
    },

    ifSubscribeNow() {
      if (this.chkValidate()) {
        this.$confirm(
        `${this.$t("purchase.useOrNot")}${this.activeCoin.coin_name}${this.$t(
          "purchase.subscribe"
        )}?`,
        this.$t("purchase.prompt"),
        {
          confirmButtonText: this.$t("common.confirmBtn"),
          cancelButtonText: this.$t("common.cancelBtn"),
        }
      )
        .then(() => {
          this.subscribeNow();
        })
        .catch(() => {});
      }
    },
    sbumit(){
      $("#editAddress").modal("hide");
      let data={
        purchase_code:this.code
      }
      Subscride.changePurchaseCode(data)
        .then((res) => {
          this.subscribeNow();
        })
        .catch((err) => {
          $("#editAddress").modal("show");
        });
    },
    subscribeNow() {
      let data = {
        amount: this.num,
        coin_name: this.activeCoin.coin_name,
      };
      Subscride.subscribeNow(data)
        .then((res) => {
          if (res) {
            this.$message.success(this.$t("purchase.subscribeSuccess"));
            this.num = "";
          }
        })
        .catch((err) => {
          if(err==4002){
            $("#editAddress").modal("show");
          }
        });
    },
  },
  created() {
    this.subscribeTokenList();
    this.getInfo();
    this.getTransferRecords()
    this.activity()
  },
};
</script>

<style lang='scss' scoped>
/deep/ {
  .el-step__icon {
    background: #222e3d;
  }
  .el-step__head.is-process {
    color: inherit;
    border-color: inherit;
  }
  .el-step__description.is-process,
  .el-step__title.is-process {
    color: inherit;
  }
  .el-step__description{
    margin-top: 0;
  }
}
</style>
