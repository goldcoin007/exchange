<template>
  <view class="symbol-list">
    <view class="w-max" style="height: var(--status-bar-height)"></view>
    <view class="title fn-18 p-md color-light">{{ title||$t("exchange.f5") }}</view>
    <van-search
          background="transparent"
          :value="filterText"
          @change="filterText = $event.detail"
          :placeholder="$t('exchange.f6')"
        />
    <van-tabs :active="active">
      <van-tab
        :title="heyue==1&&parentItem.coin_name=='USDT'?$t('first.b8'):parentItem.coin_name"
        v-for="parentItem in showMarketList"
        :key="parentItem.coin_name"
      >
        
        <view class="p-x-xs m-t-md">
          <table class="w-max">
            <thead v-if="heyue==0">
              <tr class="fn-sm">
                <th class="p-l-md p-y-xs fn-left">{{ $t("exchange.f7") }}</th>
                <th class="fn-left">{{ $t("exchange.f8") }}</th>
                <th class="p-r-md p-y-xs fn-right">{{ $t("exchange.f9") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="p-y-md"
                :class="symbols==item.coin_name&&heyue==1?'bg-panel':''"
                v-for="item in parentItem.marketInfoList"
                :key="item.symbol"
                v-show="isShow(item.pair_name)"
                @click="$emit('check-symbol', item)"
              >
                <td class="p-l-md p-y-md w-40">
                  <template v-if="parentItem.isCollect">
                    <span class="color-light">{{ item.pair_name }}</span>
                  </template>
                  <template v-else>
                    <span class="color-light">{{ item.coin_name||item.symbol }}/{{ parentItem.coin_name }}</span>
                  </template>
                </td>
                <td class="w-30 fn-center">
                    <template v-if="heyue==0" :class="item.increase < 0 ? 'color-sell' : 'color-buy'">
                      {{ item.price }}
                    </template>
                    <template v-else>
                      {{$t('first.b8')}}
                    </template>
                </td>
                <td
                 v-if="heyue==0"
                  :class="item.increase < 0 ? 'color-sell' : 'color-buy'"
                  class="p-r-md p-y-xs fn-right w-30"
                >
                  {{ item.increaseStr }}
                </td>
                <td
                 v-if="heyue==1"
                  :class="item.increase < 0 ? 'color-sell' : 'color-buy'"
                  class="p-r-md p-y-xs fn-right"
                >
                  {{ item.price }}
                </td>
              </tr>
            </tbody>
          </table>
        </view>
      </van-tab>
    </van-tabs>
  </view>
</template>
<script>
export default {
  props: {
    marketList: {
      default() {
        return [];
      },
      type: Array,
      required: false,
    },
    collect: {
      default() {
        return [];
      },
      type: Array,
      required: false,
    },
      title:{
      default:''
    },
    heyue:{
        default: 1,
        type: Number,
        required: false,
    },
    symbols:{
        default: '',
        type: String,
        required: false,
    }
  },
  computed: {
    showMarketList() {
      let collect = this.collect.map((item) => item.pair_name);
      let collects = [];
      this.marketList.forEach((parentItem) => {
          // if(this.contract==1&&parentItem.coin_name=='USDT'){
          //     parentItem.coin_name=this.$t('first.b8')
          // }
          // console.log(parentItem.coin_name,this.contract)
        parentItem.marketInfoList.forEach((item) => {
          if (collect.includes(item.pair_name)) {
            collects.push(item);
          }
        });
      });
      let arr = [
        {
          coin_name: this.$t("exchange.g0"),
          isCollect: true,
          marketInfoList: collects,
        },
        ...this.marketList,
      ];
      return arr;
    },
  },
  data() {
    return {
      active: 0,
      filterText: "",
    };
  },
  methods: {
    isShow(str) {
      return (
        str.toLocaleLowerCase().indexOf(this.filterText.toLocaleLowerCase()) !=
        -1
      );
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.table-list {
  tr:nth-of-type(2n-1) {
    td {
      background: $panel-3;
    }
  }
}
/deep/ .van-tabs__line::before{
    width: 35px;
    height: 2px;
    border-radius:5px;
    background-color: $theme-1;
}
table{
border-collapse:collapse

}
.w-40{
    width: 40%;
}
.w-30{
    width: 30%;
}
.w-30{
    width: 30%;
}
</style>