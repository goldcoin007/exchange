<template>
  <div>
    <secondary-nav></secondary-nav>
    <div class="container my-4">
      <div class="row">
        <div class="col-12 coin-list">
          <ul class="nav nav-pills markets-pair-list">
            <li class="nav-item">
              <a href="javascript:void(0)" class="nav-link" :class="{ active: side == 1 }" @click="changeSide(1)">{{$t('otc.b7')}}</a>
            </li>
            <li class="nav-item">
              <a href="javascript:void(0)" class="nav-link" :class="{ active: side == 2 }" @click="changeSide(2)">{{$t('otc.b8')}}</a>
            </li>
            <li class="flex-fill d-flex justify-content-end">
              <el-select
                :value="status"
                @input="changeStatus"
                style="width: 150px"
              >
                <el-option :value="0" :label="$t('otc.b9')"></el-option>
                <el-option :value="1" :label="$t('otc.c0')"></el-option>
                <el-option :value="2" :label="$t('otc.c1')"></el-option>
              </el-select>
            </li>
          </ul>
          <table class="w-100">
            <thead>
              <tr>
                <th>{{$t('otc.c2')}}</th>
                <th>{{$t('otc.c3')}}</th>
                <th>{{$t('otc.c4')}}</th>
                <th>{{$t('otc.c5')}}</th>
                <th>{{$t('otc.a5')}}</th>
                <th>{{$t('otc.c6')}}</th>
                <th>{{$t('otc.c7')}}</th>
                <th>{{$t('otc.c8')}}</th>
                <th>{{$t('otc.c9')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list" :key="item.id">
                <td>{{item.order_sn}}</td>
                <td class="text-light">{{item.status_text}}</td>
                <td class="text-light">{{item.money}}</td>
                <td>{{item.price}}</td>
                <td>{{item.amount}}</td>
                <td>{{item.cur_amount}}</td>
                <td>{{item.created_at}}</td>
                <td>
                  <template v-for="minItem in item.pay_type">
                    {{ payTypeMap[minItem] }}，
                  </template>
                </td>
                <td>
                  <button class="btn btn-sm btn-danger" v-if="item.status==1" @click="ifCancelEntrust(item)">{{$t('otc.d0')}}</button>
                </td>
              </tr>
               <tr v-if="!list.length">
                <td colspan="9">
                  <no-record />
                </td>
              </tr>
            </tbody>
          </table>
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
  </div>
</template>
<script>
import Otc from "@/api/otc";
export default {
  data() {
    return {
      side: 1,
      status: 1,
      detail:{},
      page:1,
      list:[]
    };
  },
   computed: {
    payTypeMap() {
      return {
        alipay: this.$t('otc.b1'),
        wechat: this.$t('otc.b2'),
        bank_card: this.$t('otc.b3'),
      };
    },
  },
  created(){
    this.changePage(1)
  },
  methods: {
    
    changeSide(type) {
      this.side = type;
      this.changePage(1);
    },
    changeStatus(status) {
      this.status = status;
      this.changePage(1);
    },
    changePage(idx) {
      this.page = idx;
      this.myEntrusts();
    },
    myEntrusts() {
      let data = {
        page: this.page,
        side: this.side,
        status: this.status,
      };
      Otc.myEntrusts(data).then((res) => {
        this.detail = res;
        this.list = res.data;
      });
    },
    // 下架
    ifCancelEntrust(item){
       this.$confirm(this.$t('otc.d1')+'？', this.$t('otc.d2'), {
          confirmButtonText: this.$t('common.confirmBtn'),
          cancelButtonText: this.$t('common.cancelBtn'),
          type: 'warning'
        }).then(() => {
            this.cancelEntrust(item)
        })
    },
    cancelEntrust(item){
      let data = {
        entrust_id:item.id
      }
      Otc.cancelEntrust(data).then(res=>{
        this.$message.success(this.$t('otc.d3'))
        this.changePage();
      })
    },
    // 上架

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