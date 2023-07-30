<template>
  <div>
    <secondary-nav></secondary-nav>
    <div class="container my-4">
      <ul class="nav nav-pills markets-pair-list">
        <li class="nav-item">
          <a
            href="javascript:void(0)"
            class="nav-link"
            :class="{ active: type == 1 }"
            @click="changeType(1)"
            >{{$t('otc.g7')}}</a
          >
        </li>
        <li class="nav-item">
          <a
            href="javascript:void(0)"
            class="nav-link"
            :class="{ active: type == 2 }"
            @click="changeType(2)"
            >{{$t('otc.g8')}}</a
          >
        </li>
        <li class="nav-item">
          <a
            href="javascript:void(0)"
            class="nav-link"
            :class="{ active: type == 3 }"
            @click="changeType(3)"
            >{{$t('otc.g9')}}</a
          >
        </li>
        <li class="nav-item">
          <a
            href="javascript:void(0)"
            class="nav-link"
            :class="{ active: type == 4 }"
            @click="changeType(4)"
            >{{$t('otc.h0')}}</a
          >
        </li>
        <li class="flex-fill d-flex justify-content-end">
          <el-select :value="status" @input="changeStatus" style="width: 150px">
            <el-option :value="99" :label="$t('otc.h1')"></el-option>
            <el-option :value="0" :label="$t('otc.h2')"></el-option>
            <el-option :value="1" :label="$t('otc.h3')"></el-option>
            <el-option :value="2" :label="$t('otc.h4')"></el-option>
            <el-option :value="3" :label="$t('otc.c1')"></el-option>
            <el-option :value="4" :label="$t('otc.h5')"></el-option>
          </el-select>
        </li>
      </ul>
      <div class="row">
        <div class="col-12 coin-list">
          <table class="w-100">
            <thead>
              <tr>
                <th>{{$t('otc.d5')}}</th>
                <th>{{$t('otc.c3')}}</th>
                <th>{{$t('otc.c4')}}</th>
                <th>{{$t('otc.c5')}}</th>
                <th>{{$t('otc.h6')}}</th>
                <th>{{$t('otc.h7')}}</th>
                <th>{{$t('otc.h8')}}</th>
                <th>{{$t('otc.c9')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list" :key="item.id">
                <td>{{$t('otc.d5')}}：{{ item.order_sn }}</td>
                <td class="text-light">{{ item.status_text }}</td>
                <td class="text-light">{{ item.money }}</td>
                <td class="text-light">{{ item.price }} CNY</td>
                <td>{{ item.amount }}</td>
                <td>{{ item.seller_payments.pay_type_text }}</td>
                <td>{{ item.created_at }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-primary"
                    @click="
                      $router.push({
                        path: '/otc/detail',
                        query: { id: item.id },
                      })
                    "
                  >
                    {{$t('otc.h9')}}
                  </button>
                </td>
              </tr>
              <tr v-if="!list.length">
                <td colspan="8">
                  <no-record />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-center mt-3">
          <el-pagination
            layout="prev, pager, next"
            :page-size="detail.per_page"
            @current-change="changePage"
            :total="detail.total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Otc from "@/api/otc";
export default {
  data() {
    return {
      detail: {},
      page: 1,
      status: 99,
      list: [],
      type: 1,
    };
  },
  computed: {
    trans_type() {
      return this.$route.params.type == "buy" ? 1 : 2;
    },
  },
  created() {
    this.changePage(1);
  },
  methods: {
    changeType(type) {
      this.type = type;
      this.changePage(1);
    },
    changeStatus(status) {
      this.status = status;
      this.changePage(1);
    },
    changePage(idx) {
      this.page = idx;
      this.myOrders();
    },
    myOrders() {
      let data = {
        page: this.page,
        type: this.type,
        status: this.status,
      };
      Otc.myOrders(data).then((res) => {
        this.detail = res;
        this.list = res.data;
      });
    },
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
</style>