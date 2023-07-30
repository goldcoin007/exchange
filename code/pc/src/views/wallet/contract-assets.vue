<template>
  <div>
    <secondary-nav></secondary-nav>
    <div class="container">
      <div
        class="w-100 d-flex justify-content-between align-items-center mb-3 mt-4"
      >
        <div class="h3">{{ $t("wallet.ContractAccount") }}</div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="markets-pair-list mb-3">
            <ul class="nav nav-pills" id="pills-tab" role="tablist">
              <li class="nav-item fn-16">
                <a
                  class="nav-link active"
                  data-toggle="pill"
                  role="tab"
                  aria-selected="false"
                  >{{ $t("wallet.contractFlow") }}</a
                >
              </li>
            </ul>

            <div class="tab-content">
              <div class="tab-pane funding-table fade show active">
                <table class="table stripe">
                  <thead>
                    <tr>
                      <th>{{ $t("wallet.dateTime") }}</th>
                      <th>{{ $t("wallet.info") }}</th>
                      <th>{{ $t("wallet.money") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in list" :key="item.id">
                      <td>{{ item.created_at }}</td>
                      <td>{{ item.log_type_text }}</td>
                      <td
                        :class="{
                          increace: item.amount >= 0,
                          decreace: item.amount < 0
                        }"
                      >
                        {{ item.amount >= 0 ? "+" : "" }}{{ item.amount }}
                        {{ item.coin_name }}
                      </td>
                    </tr>
                    <tr v-if="!list.length">
                      <td colspan="3">
                        <no-record />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <el-pagination
                  layout="prev, pager, next"
                  :page-size="CurrentObj.per_page"
                  @current-change="changePageCurrent"
                  :total="CurrentObj.total"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wallet from "../../api/wallet.js";
export default {
  name: "contract-assets",
  data() {
    return {
      CurrentObj: {},
      list: []
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
        page: this.CurrentObj.page
      };
      wallet.accountFlow(data).then(res => {
        this.CurrentObj = res;
        this.list = res.data;
      });
    }
  }
};
</script>

<style>
</style>