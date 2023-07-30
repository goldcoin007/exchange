<template>
  <view class="coin-list">
    <view class="main layout-page">
        <view :style="{height:taskHeight+'px'}"></view>
        <view>
          <van-search background="transparent" v-model="filterName" show-action @cancel="$emit('close')" @change="filterName=$event.detail" :placeholder="$t('assets.b5')" />
        </view>
        <view class="layout-main">
            <template v-for="item in showList">
              <view
                v-if="item.coin_name=='USDT'||item.coin_name=='BTC'||item.coin_name=='ETH'"
                class="p-y-md p-x-xs align-center justify-between d-flex link-active m-x-md border-b"
                @click="$emit('input',item.coin_name);$emit('close');$emit('imgs',item)"
              >
                
                    <view class="d-flex align-center">
                        <img :src="item.image" class="h-25 m-r-xs"/>
                        {{item.coin_name}}
                    </view>
                    <view class="color-light">{{item.usable_balance}}</view>
              </view>
            </template>
        </view>
    </view>
  </view>
</template>
<script>
import Wallet from "@/api/wallet";
export default {
  props: {
    value: {
      default: "",
      type: String,
      required: false,
    },
  },
  data() {
    return {
      filterName: "",
      coinList: [],
      taskHeight:0
    };
  },
  computed: {
    showList() {
      return this.coinList.filter((item) => this.isShow(item.coin_name));
    },
  },
  methods: {
    getCoinList() {
      Wallet.fundAccount()
        .then((res) => {
          this.coinList = res.data.list;
          if (!this.value) {
            this.$emit("input", this.coinList[0].coin_name);
          }
        })
        .catch(() => {});
    },
    isShow(str) {
      return (
        str.toLocaleLowerCase().indexOf(this.filterName.toLocaleLowerCase()) !=
        -1
      );
    },
    getTaskHeight(){
      uni.getSystemInfo({
        success:(obj)=>{
          this.taskHeight = obj.statusBarHeight
        }
      })
    }
  },
  created() {
    this.getTaskHeight()
    this.getCoinList();
  },
};
</script>
<style lang="scss" scoped>
.coin-list {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  animation: coinList 0.3s;
  background: rgba(0,0,0,0.5);
}
.main{
  position: fixed;
  top: 50%;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 20px 20px 0 0;
}
@keyframes coinList {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>