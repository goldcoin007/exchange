<template>
  <div>
    <secondary-nav></secondary-nav>
    <div class="container">
      <div
        class="w-100 d-flex justify-content-between align-items-center mb-3 mt-4"
      >
        <div class="h3">{{$t('otc.j1')}}</div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tab-content">
            <div class="tab-pane funding-table fade show active">
              <table class="table stripe">
                <thead>
                  <tr>
                    <th>{{$t('otc.j2')}}</th>
                    <th>{{$t('otc.j3')}}</th>
                    <th>{{$t('otc.j4')}}</th>
                    <th>{{$t('otc.c9')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in list" :key="item.id">
                    <td>{{ item.created_at }}</td>
                    <td>
                      {{ item.usable_balance }}
                      {{ item.coin_name }}
                    </td>
                    <td>
                      {{ item.freeze_balance }}
                      {{ item.coin_name }}
                    </td>
                    <td>
                      <button class="btn btn-primary btn-sm" @click="$router.push({path:'/otc/index'})">{{$t('otc.b7')}}</button>
                    </td>
                  </tr>
                  <tr v-if="!list.length">
                    <td colspan="4">
                      <no-record />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Otc from "@/api/otc";
export default {
  name: "contract-assets",
  data() {
    return {
      CurrentObj: {},
      list: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    changePageCurrent(idx) {
      this.CurrentObj.page = idx;
      this.getList();
    },
    getList() {
      let data = {
        page: this.CurrentObj.page,
      };
      Otc.otcAccount(data).then((res) => {
        this.CurrentObj = res;
        this.list = res;
      });
    },
  },
};
</script>

<style>
</style>