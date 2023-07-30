<template>
  <div class="panel-box mb15 bg-panel">
    <div class="heading d-flex justify-content-between align-items-center">
      <div class="h6">{{ $t("wallet.inside") }}</div>
      <div v-if="showHistoryLink">
        <i class="ion ion-md-time h5"></i>
        <router-link to="/wallet/transfer">
          {{ $t("wallet.history") }}
        </router-link>
      </div>
    </div>
    <div class="tab-content">
      <form class="transfer-body">
        <div class="form-row">
          <div class="form-group col-5">
            <label for="fromCoin">{{ $t("wallet.from") }}</label>
            <div>
              <el-cascader
                v-model="fromValue"
                @change="fromChange"
                ref="from"
                v-if="isAccountMap"
                :props="fromProps"
              ></el-cascader>
            </div>
          </div>
          <div
            class="col-2 d-flex justify-content-center align-items-center"
            @click="swap"
          >
            <i class="ion ion-ios-swap h3 mt-3 hover"></i>
          </div>
          <div class="form-group col-5">
            <label for="toCoin">{{ $t("wallet.to") }}</label>
            <div>
              <el-cascader
                v-model="toValue"
                ref="to"
                v-if="isAccountMap"
                @change="toChange"
                :props="toProps"
              ></el-cascader>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="asstes">{{ $t("wallet.assets") }}</label>
          <div>
            <el-select
              v-model="form.coin_name"
              :placeholder="$t('wallet.pleaseSelect')"
            >
              <el-option
                v-for="(item, index) in coinList"
                :key="index"
                :label="item.coin_name"
                :value="item.coin_name"
              >
                <img :src="item.image" alt width="20" />
                <span>{{ item.coin_name }}</span>
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form-group">
          <label class="d-flex justify-content-between">
            <span>{{ $t("wallet.transferQuantity") }}</span>
            <span @click="form.amount = activeCoin.usable_balance">
              <input
                type="checkbox"
                id="allAvalible"
                :checked="form.amount >= activeCoin.usable_balance"
                class="form-check-input"
              />
              <label for="allAvalible">{{ $t("wallet.all") }}</label>
            </span>
          </label>
          <div class="input-group">
            <input
              type="number"
              class="form-control"
              v-model="form.amount"
              step="0.000001"
              min="0"
              :placeholder="$t('wallet.strokes')"
            />
            <div class="input-group-append">
              <span class="input-group-text fn-12">
                {{ $t("wallet.balance") }}：
                <span class="fn-14">{{
                  activeCoin.usable_balance | omitTo(4)
                }}</span>
                &nbsp; {{ form.coin_name }}
              </span>
            </div>
          </div>
        </div>
        <button class="btn btn-primary rounded-pill" @click.prevent="fundsTransfer">
          {{ $t("wallet.confirm") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Wallet from "@/api/wallet";
import lodash from "lodash";
export default {
  props: {
    coinName: {
      type: String,
      default: ""
    },
    showHistoryLink: {
      type: Boolean,
      default: true
    },
    isRestCoin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 交易账户的id
      exID: 1,
      coinList: [],
      // 可转换的资金列表
      initial: [],
      // 可划转账户
      accountMap: {},
      isAccountMap: false,
      // 转换映射列表
      transferList: {},
      // 账户的子账户们
      accountChildren: {},
      // 选中的子账户
      fromChild: {},
      toChild: {},
      form: {
        from_account: "",
        to_account: "",
        amount: "",
        pair_id: "",
        coin_name: "",
        coinListShow: false
      },
      activeCoin: {},
      fromValue: [],
      toValue: [],
      fromProps: {
        lazy: true,
        lazyLoad: (node, resolve) => {
          let { level } = node;
          if (!level) {
            resolve(this.fromList);
          } else {
            this.accountPairList(node.value, list => {
              let arr = list.map(item => {
                return {
                  value: item.contract_id,
                  label: item.label,
                  leaf: true
                };
              });
              resolve(arr);
            });
          }
        }
      },
      toProps: {
        lazy: true,
        lazyLoad: (node, resolve) => {
          let { level } = node;
          if (!level) {
            resolve(this.toList);
          } else {
            this.accountPairList(node.value, list => {
              let arr = list.map(item => {
                return {
                  value: item.contract_id,
                  label: item.label,
                  leaf: true
                };
              });
              resolve(arr);
            });
          }
        }
      }
    };
  },
  computed: {
    fromList() {
      return Object.keys(this.transferList).map(item => {
        return {
          label: this.accountMap[item],
          value: item,
          leaf: !this.initial.find(res => res.id == item).is_need_pair
        };
      });
    },
    toList() {
      return this.transferList[this.form.from_account].map(item => {
        return {
          label: this.accountMap[item],
          value: item,
          leaf: !this.initial.find(res => res.id == item).is_need_pair
        };
      });
    },

    pair_id() {
      return this.form.pair_id;
    }
  },
  components: {},
  watch: {},
  methods: {
    //   from切换
    fromChange($ev) {
      this.form.from_account = this.fromValue[0];
      if (this.fromValue[1]) {
        this.form.pair_id = this.fromValue[1];
      }
      this.$refs.to.$refs.panel.clearCheckedNodes();
      this.$refs.to.$refs.panel.lazyLoad();
    },
    toChange() {
      this.form.to_account = this.toValue[0];
      if (this.toValue[1]) {
        this.form.pair_id = this.toValue[1];
      }
      if (this.form.to_account) {
        this.getUserCoinAssets();
      } else {
        this.form.coin_name = "";
      }
    },
    // 互换位置
    swap() {
      [this.form.from_account, this.form.to_account] = [
        this.form.to_account,
        this.form.from_account
      ];
      [this.fromChild, this.toChild] = [this.toChild, this.fromChild];
      this.form.pair_id = this.toChild.id;
    },

    // 获取划转币种
    getUserCoinAssets: lodash.debounce(function() {
      Wallet.coinList({
        from_account: this.form.from_account,
        to_account: this.form.to_account,
        pair_id: this.pair_id
      })
        .then(res => {
          this.coinList = res;
          if (this.coinList[0]) {
            this.form.coin_name = this.coinList[0].coin_name;
            this.getBalance();
          }
        })
        .catch(() => {});
    }, 300),
    // 划转
    fundsTransfer() {
      let data = {
        ...this.form,
        pair_id: this.pair_id
      
      };
      Wallet.transfer(data)
        .then(() => {
          this.$message.success(this.$t('wallet.successful'));
          this.form.amount = "";
          this.getUserCoinAssets();
          this.$emit('changeAssets')
        })
        .catch(() => {});
    },
    // 获取可划转钱包
    accounts() {
      Wallet.accounts().then(res => {
         this.isAccountMap = true;
        this.initial = res;
        this.accountMap ={};
        res.forEach((item)=>{
           this.accountMap[item.id] = item.name
        })

        // 交易账户的id
        let exID = this.exID;

        // 生成映射列表
        this.transferList = {};
        let ids = res.map(item => {
          return item.id;
        });
        for (let i in this.accountMap) {
          // 交易账户区分
          if (i == exID) {
            this.transferList[i] = ids.filter(item => item != i);
          } else {
            this.transferList[i] = [exID];
          }
        }

        // 填写默认值
        this.form.from_account = exID;
        let first = this.initial.find(item => item.id == exID);
        if (first.is_need_pair) {
          this.accountPairList(this.form.from_account, list => {
            this.formChild = list[0];
          });
        }

        let last = this.initial.filter(item => item.id != exID)[0];
        if (last) {
          this.form.to_account = last.id;
          if (!last.is_need_pair) return;
          this.accountPairList(this.form.to_account, list => {
            this.toChild = list[0];
          });
        }
       
       
      });
    },
    // 获取子账户类别
    accountPairList(id, call) {
      // 缓存
      if (this.accountChildren[id]) {
        call(this.accountChildren[id]);
        return;
      }
      Wallet.accountPairList({
        account: id
      }).then(res => {
        res.forEach(item => {
          item.label = item.coin_name + "/" + item.margin_name;
        });
        this.accountChildren[id] = res;
        call(res);
      });
    },
    // 获取余额
    getBalance: lodash.debounce(function() {
      let data = {
        account: this.form.from_account,
        pair_id: this.pair_id,
        coin_name: this.form.coin_name
      };
      Wallet.getBalance(data).then(res => {
        this.activeCoin = res;
      });
    })
  },
  created() {
    this.accounts();
  }
};
</script>
<style lang="scss" scoped>
</style>
