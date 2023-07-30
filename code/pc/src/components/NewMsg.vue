<template>
  <li class="nav-item dropdown header-custom-icon">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i class="icon ion-md-notifications"></i>
      <span class="circle-pulse" v-if="notReadTotal"></span>
    </a>
    <div class="dropdown-menu">
      <div
        class="dropdown-header d-flex align-items-center justify-content-between"
      >
        <p class="mb-0 font-weight-medium">
          {{ notReadTotal }} {{ $t("common.newMessage") }}
        </p>
        <!-- <a href class="text-muted">清除所有</a> -->
      </div>

      <div class="dropdown-body" v-infinite-scroll="load">
        <a
          href="javascript:void(0);"
          class="dropdown-item"
          v-for="(item, index) in list"
          :key="index"
          @click="readNotifiable(item)"
        >
          <div class="icon position-relative">
            <!-- <i :class="[`icon`, item.icon]"></i> -->
            <i class="icon ion-md-notifications"></i>
            <span
              class="circle-pulse circle-pulse-news-msg"
              v-if="!item.read_at"
            ></span>
          </div>
          <div class="content">
            <p>{{ item.data.title }}</p>
            <p class="sub-text text-muted">{{ item.created_at }}</p>
          </div>
        </a>
        <div class="text-center sub-text text-muted" v-if="!more">
          {{ $t("common.notMore") }}
        </div>
      </div>

      <div
        class="dropdown-footer d-flex align-items-center justify-content-center"
      >
        <a href="javascript:void(0);" @click="batchReadNotifiables">{{
          $t("common.allRead")
        }}</a>
      </div>
    </div>
    <v-box v-model="showMsg" :title="msgDetail.data && msgDetail.data.title">
      <p class="sub-text text-muted">{{ msgDetail.created_at }}</p>
      {{ msgDetail.data && msgDetail.data.content }}
    </v-box>
  </li>
</template>
<script>
import Member from "@/api/member";
export default {
  name: "new-msg",
  data() {
    return {
      page: 1,
      list: [],
      more: true,
      showMsg: false,
      notReadTotal: 0,
      msgDetail: {}
    };
  },
  watch: {
    ["$route.path"]() {
      this.reset();
    }
  },
  methods: {
    reset() {
      this.page = 1;
      this.list = [];
      this.more = true;
      this.myNotifiables();
    },
    load() {
      if (!this.more) return;
      this.page++;
      this.myNotifiables();
    },
    //   获取消息列表
    myNotifiables() {
      let data = {
        page: this.page
      };
      Member.myNotifiables(data).then(res => {
        if (res.current_page == 1) {
          this.list = [];
        }
        this.list = [...this.list, ...res.data];
        if (res.data.length < res.per_page) {
          this.more = false;
        } else {
          this.more = true;
        }
      });
    },
    // 获取未读消息数
    myNotifiablesCount() {
      Member.myNotifiablesCount().then(res => {
        this.notReadTotal = res.total;
      });
    },
    // 获取消息详情
    readNotifiable({ id }) {
      let data = {
        id
      };
      Member.readNotifiable(data).then(res => {
        this.msgDetail = res;
        this.showMsg = true;
      });
    },
    // 一键已读
    batchReadNotifiables() {
      Member.batchReadNotifiables().then(res => {
        this.reset();
      });
    }
  },
  created() {
    this.myNotifiables();
  }
};
</script>
<style lang="scss" scoped>
.circle-pulse-news-msg {
  right: 0;
  top: 0;
}
</style>