<template>
  <component
    :type="type"
    :loading="inSend"
    class="d-inline-block rounded-xs"
    :size="size"
    :plain="plain"
    :is="tag"
    @click="send"
  >{{load?(num+'S'):text}}</component>
</template>
<script>
import vButton from './vButton.vue'
import serve from "@/api/serve";
export default {
  name: "vCode",
  props: {
    url: {
      default: "",
      type: String,
      required: true,
    },
    data: {
      default: undefined,
      required: false,
    },
    tag: {
      default: "v-button",
      type: String,
      require: false,
    },
    plain: {
      default: true,
      type: Boolean,
      require: false,
    },
    size: {
      default: 'mini',
      type: String,
      require: false,
    },
    type: {
      default: 'green-plain',
      type: String,
      require: false,
    },
  },
  components:{
  	  vButton
  },
  data() {
    return {
      load: false,
      inSend: false,
      num: 60,
      Interval: null,
    };
  },
  computed: {
    text(){
      return ` ${this.$t('common.getCode')} `
    }
  },
  methods: {
    // 发送验证码
    send() {
        if(this.data.phone==''){
            this.$toast(this.$t('reg.a3'))
            return
        }
        if(this.data.email==''){
            this.$toast(this.$t('reg.a5'))
            return
        }
      if (this.load) return;
      this.inSend = true;
      serve.post(this.url, this.data)
        .then(() => {
          this.inSend = false;
          this.load = true;
          this.countDown();
          this.$toast(this.$t('common.sendSuccess'));
        })
        .catch(() => {
          this.inSend = false;
        });
    },
    countDown() {
      clearInterval(this.Interval);
      this.Interval = setInterval(() => {
        if (this.num <= 0) {
          this.num = 60;
          this.load = false;
          clearInterval(this.Interval);
          return;
        }
        this.num--;
      }, 1000);
    },
  },
};
</script>