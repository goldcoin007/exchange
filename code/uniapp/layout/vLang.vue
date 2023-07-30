<template>
   <v-picker class="d-inline-block" :value="lang" :list="langList" @change="selectLang" range-key="label">
     {{label}}
   </v-picker>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "v-lang",
  props: {
    tag: {
      default: "span",
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapState({
      langList: "langList",
      lang: "lang",
    }),
    label() {
      return this.langList.find((item) => item.value == this.lang).label;
    }
  },
  methods: {
    ...mapActions({
      setLang: "setLang",
    }),
    getCurrent(){
        let pages = getCurrentPages();
        let curPage = pages[pages.length - 1];
        return curPage
    },
    selectLang(value) {
	  uni.setStorageSync('_market_getCurrencyExCny', '');
      this.setLang(value)
      this.$emit('change')
      let path = '/'+this.getCurrent().route
    },
  },
};
</script>