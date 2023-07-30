<template>
  <table class="w-max">
    <thead>
      <tr class="fn-sm">
        <th class="p-l-md p-y-xs fn-left">{{$t('exchange.d4')}}</th>
        <th class="fn-left">{{$t('exchange.d5')}}</th>
        <th class="fn-right">{{$t('exchange.d2')}}</th>
        <th class="p-r-md p-y-xs fn-right">{{$t('exchange.c5')}}</th>
      </tr>
    </thead>
    <tbody class="color-light">
      <tr v-for="(item,idx) in tradeList" :key="idx">
        <td class="p-l-md p-y-xs">{{parseTime(item.ts,false,'{h}:{i}:{s}')}}</td>
        <td>
          <span class="color-buy" v-if="item.direction=='buy'">
            {{$t('exchange.b5')}}
          </span>
          <span class="color-sell" v-else>
            {{$t('exchange.b6')}}
          </span>
        </td>
        <td class="fn-right">{{item.price}}</td>
        <td class="p-r-md p-y-xs fn-right">{{omitTo(item.amount,8)*1}}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import math from "@/utils/class/math";
import date from "@/utils/class/date";
export default {
  props: {
    tradeList: {
      default() {
        return [];
      },
      type: Array,
      required: false,
    },
  },
  methods:{
    parseTime:date.parseTime,
    omitTo:math.omitTo,
  }
};
</script>