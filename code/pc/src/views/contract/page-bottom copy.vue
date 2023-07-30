<template>
  <div class="d-flex pb-2 mt-2">
    <div class="markets-pair-list page-bottom bg-plain flex-fill">
      <div class="nav nav-pills">
        <div class="nav-item">
          <a class="nav-link" :class="{ active: tab == 1 }" @click="tab = 1;$emit('position')">{{$t('contract.i0')}}</a>
        </div>
        <div class="nav-item">
          <a class="nav-link" :class="{ active: tab == 2 }" @click="tab = 2">{{$t('contract.i1')}}</a>
        </div>
        <div class="nav-item">
          <a class="nav-link" :class="{ active: tab == 3 }" @click="tab = 3">{{$t('contract.i2')}}</a>
        </div>
        <div class="nav-item">
          <a class="nav-link" :class="{ active: tab == 4 }" @click="tab = 4">{{$t('wallet.contractFlow')}}（{{symbol}}）</a>
        </div>
      </div>
      <div class="body">
        <!-- 持有仓位 -->
        <hold-position @isall="$emit('isall',$event)" :symbolDetail="symbolDetail" :holdPositionAll="holdPositionAll" @position="$emit('position')" @setactive="setactive" :newPrice="newPriceObj.price" :holdPositionList="holdPositionList" :symbol="symbol" v-if="tab == 1" />
        <!-- 当前委托 -->
        <current-commission :symbol="symbol" v-if="tab == 2" />
        <!-- 历史记录 -->
        <history-commission :symbol="symbol" v-if="tab == 3" />
        <!-- 合约流水 -->
        <transaction-record :symbol="symbol" v-if="tab == 4" />
        <!-- 划转记录 -->
        <transfer-record :symbol="symbol" v-if="tab == 5" />
      </div>
    </div>
    <div class="ml-2">
      <!-- <account class="bg-plain" :accountInfo="accountInfo"/> -->
    </div>
  </div>
</template>
<script>
import holdPosition from "./hold-position.vue";
import currentCommission from "./current-commission.vue";
import historyCommission from "./history-commission.vue";
import transactionRecord from "./transaction-record.vue";
import transferRecord from "./transfer-record.vue";
import account from "./account.vue";
import Contract from "@/api/contract";
export default {
  name: "page-bottom",
  props: {
    symbol: {
      default: "",
      type: String,
      required: false
    },
    holdPositionList:{
      default:()=>[],
      type:Array,
      required:false
    },
    newPriceObj:{
        default:()=>{},
        type:Object,
        required:false
    },
    accountInfo:{
      default:()=>{},
      type:Object,
      required:false
    },
    holdPositionAll:{
      default:false,
      type:Boolean
    },
    symbolDetail:{
      default:()=>{},
      type:Object
    }
  },
  components: {
    holdPosition,
    currentCommission,
    historyCommission,
    transactionRecord,
    transferRecord,
    account
  },
  watch: {
    symbol() {}
  },
  created() {
    if (this.symbol) {
    }
  },
  data() {
    return {
      tab: 1
    };
  },
  methods: {
    setactive(index){
        this.$emit("setactiveItem",index);       
    }
  }
};
</script>