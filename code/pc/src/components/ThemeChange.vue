<template>
  <div class="theme-switch mr-2 border rounded-sm" @click="change" :class="{active:isCheck}">
    <div class="theme-switch-button">
      <i class="el-icon-table-lamp"></i>
      <div class="left">{{$t('common.dark')}}</div>
      <div class="right">{{$t('common.light')}}</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "theme-change",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      theme: "theme"
    }),
    isCheck() {
      return this.theme == "dark";
    }
  },
  methods: {
    ...mapActions({
      setTheme: "setTheme"
    }),
    change() {
      if (this.theme == "light") {
        this.setTheme("dark");
      } else {
        this.setTheme("light");
      }
      localStorage.removeItem("tradingview.chartproperties");
      window.location.reload();
    }
  },
  created() {}
};
</script>