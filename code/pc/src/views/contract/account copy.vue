<template>
  <div class="account mr-1">
    <div class="markets-pair-list">
      <div class="nav justify-content-between">
        <div class="nav-item">
          <a class="nav-link">{{$t('contract.a0')}}</a>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <router-link to="/wallet/assets/exchange" class="border border-primary rounded text-primary p-1" >
            {{$t('contract.a1')}}
          </router-link>
        </div>
      </div>
      <div class="">
        <div class="d-flex p-1 justify-content-between">
          <div>{{$t('contract.a2')}}（USDT）</div>
          <div>{{ accountInfo.account_equity || "--" }}</div>
        </div>
        <div class="d-flex p-1 justify-content-between">
          <div>{{$t('contract.a3')}}（USDT）</div>
          <div>{{accountInfo.usable_balance}}</div>
        </div>
        <div class="d-flex p-1 justify-content-between">
          <div>{{$t('contract.a4')}}（USDT）</div>
          <div>{{accountInfo.position_margin}}</div>
        </div>
        <div class="d-flex p-1 justify-content-between">
          <div>{{$t('contract.a5')}}（USDT）</div>
          <div>{{accountInfo.freeze_position}}</div>
        </div>
        <div class="d-flex p-1 justify-content-between">
          <div>{{$t('contract.a6')}}（USDT）</div>
          <div class="increace">{{accountInfo.unRealProfit}}</div>
        </div>
        <div class="d-flex p-1 justify-content-between">
          <div>{{$t('contract.a7')}}（USDT）</div>
          <div class="decreace">{{ accountInfo.riskRate || "0%" }}</div>
        </div>
        <div class="d-flex p-1 justify-content-between" v-if="false">
          <div>{{$t('contract.a8')}}（USDT）</div>
          <div>{{ accountInfo.flatPrice || "--" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'account',
  props:{
    accountInfo:{
      default:()=>{},
      type:Object,
      required:false
    }
  },
  data(){
    return {}
  },
  mounted(){
    console.log(this.accountInfo)
  },
  methods:{

  }
};
</script>