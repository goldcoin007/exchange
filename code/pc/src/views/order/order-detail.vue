<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>{{$t('order.tradingPair')}}</th>
          <th>{{$t('order.transactionPrice')}}</th>
          <th>{{$t('order.tradingVolume')}}</th>
          <th>{{$t('order.aTurnover')}}</th>
          <th>{{$t('order.serviceCharge')}}</th>
          <th>{{$t('order.time')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.exchange_coin_id">
          <td>{{item.symbol}}</td>
          <td>{{item.unit_price}}</td>
          <td>{{item.trade_amount}}</td>
          <td>{{item.trade_money}}</td>
          <td>{{item.trade_fee}}</td>
          <td>{{item.created_at}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      defalut: [],
      require: true
    }
  }
};
</script>