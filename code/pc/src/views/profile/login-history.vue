<template>
  <div class="profile-page">
    <secondary-nav></secondary-nav>
    <div class="container">
      <div class="w-100 d-flex justify-content-between mb-3 mt-4">
        <div class="h3">{{$t('profile.bill')}}</div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="markets-pair-list mb-3">
            <ul class="nav nav-pills" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-toggle="pill"
                  href="#tab1"
                  role="tab"
                  aria-selected="false"
                >{{$t('profile.bill')}}</a>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                <table class="table stripe">
                  <thead>
                    <tr>
                      <th>{{$t('profile.date')}}</th>
                      <th>{{$t('profile.address')}}</th>
                      <th>ip</th>
                      <th class="text-right">{{$t('profile.equipment')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in list" :key="item.login_time_text">
                      <td>{{item.login_time_text}}</td>
                      <td>{{item.login_site}}</td>
                      <td>{{filterAddress(item.login_ip,item.login_site)}}</td>
                      <td class="text-right">{{item.login_type}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <el-pagination layout="prev, pager, next" :page-size="per_page" @current-change="changePage" :total="detail.total"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from "@/api/profile";
export default {
  data() {
    return {
      page: 1,
      per_page: 10,
      list: [],
      detail:{}
    };
  },
  methods: {
    changePage(idx) {
      this.page = idx
      this.getLoginLogs()
    },
    getLoginLogs() {
      let data = {
        page: this.page,
        per_page: this.per_page
      };
      Profile.getLoginLogs(data).then(res => {
        this.list = res.data;
        this.detail = res;
      });
    },
    filterAddress(ip,address){
      if(address.indexOf('China')!=-1){
        return ip.replace(/(^\d+\.).*/ig,'$1***.***.***')
      }else{
        return ip
      }
    }
  },
  created() {
    this.getLoginLogs();
  }
};
</script>

<style>
</style>