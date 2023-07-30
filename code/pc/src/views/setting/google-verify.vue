<template>
  <div class="edit-google">
    <!-- 绑定 -->
    <div>
      <div class="form-group"  v-if="!detail.google_token">
        <label>{{$t('setting.scanQrCode')}}</label>
        <div class="d-flex">
          <vue-qr
            v-if="googleToken.qrcode_url"
            class="mr-2"
            :text="googleToken.qrcode_url"
            :margin="0"
            :size="100"
          ></vue-qr>
          <div class="tip fn-12">
            <div>{{$t('setting.howToOpen',{name:'Google'})}}?</div>
            <a href="#" class>{{$t('setting.read')}}。</a>
          </div>
        </div>
      </div>
      <div class="form-group"  v-if="!detail.google_token">
        <label>Google {{$t('setting.verKey')}}</label>
        <div class="input-group mb-3">
          <input type="text" :value="googleToken.secret" disabled class="form-control" placeholder />
          <div class="input-group-append">
            <button class="btn btn-outline-primary" type="button" @click="copy(googleToken.secret)">
              <i class="el-icon-document-copy"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="form-group" v-if="detail.phone_status==1">
        <label>{{$t('setting.smsVer')}}</label>
        <div class="input-group mb-3">
          <input
            type="number"
            v-model="form.sms_code"
            required
            class="form-control"
            :placeholder="$t('setting.enterCode')"
          />
          <div class="input-group-append">
           <get-code class="btn btn-outline-primary" :data="{type:1}" :type="1" />
          </div>
        </div>
      </div>
      <div class="form-group" v-if="detail.email_status==1">
        <label>{{$t('setting.emailVer')}}</label>
        <div class="input-group mb-3">
          <input
            type="number"
            v-model="form.email_code"
            required
            class="form-control"
            :placeholder="$t('setting.enterEmailVer')"
          />
          <div class="input-group-append">
            <get-code class="btn btn-outline-primary" :data="{type:2}" :type="1" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Google {{$t('setting.ver')}}</label>
        <div class="input-group mb-3">
          <input
            type="number"
            v-model="form.google_code"
            class="form-control"
            required
            :placeholder="$t('setting.enterNameCode',{name:'Google'})"
          />
        </div>
      </div>
    </div>
   
    <div class="text-center">
      <button type="button" class="btn w-25 btn-secondary" @click="$emit('close')">{{$t('common.cancelBtn')}}</button>
      <button type="button" class="btn w-25 btn-primary"  v-if="!detail.google_token" @click="bindGoogleToken">{{$t('setting.bind')}}</button>
      <button type="button" class="btn w-25 btn-primary" v-else @click="unBindGoogle">{{$t('setting.unbind')}}</button>
    </div>
  </div>
</template>

<script>
import vueQr from "vue-qr";
import Setting from "@/api/setting";
export default {
  components: {
    vueQr
  },
  props: ["detail"],
  data() {
    return {
      googleToken: {},
      form: {
        google_token: "",
        google_code: "",
        sms_code: "",
        email_code: ""
      }
    };
  },
  watch: {
    ["detail.google_token"]() {
      this.getToken();
    }
  },
  methods: {
    getToken() {
      Setting.getGoogleToken()
        .then(res => {
          this.googleToken = res;
        })
        .catch(err => {});
    },
    // 绑定谷歌验证码
    bindGoogleToken() {
      let data = this.form;
      data.google_token = this.googleToken.secret;
      if (utils.validate(".edit-google")) {
        Setting.bindGoogleToken(data)
          .then(res => {
            this.$emit("close");
            this.$emit("change");
            this.$message.success(this.$t('setting.bindSuccess'));
          })
          .catch(err => {});
      }
    },
    // 解绑谷歌验证
    unBindGoogle() {
      let data = this.form;
      if (utils.validate(".edit-google")) {
        Setting.unbindGoogleToken(data)
          .then(res => {
            this.$emit("close");
            this.$emit("change");
            this.$message.success(this.$t('setting.unbindSuccess'));
          })
          .catch(err => {});
      }
    },
    copy(txt) {
      utils.copy(txt);
      // copy(txt)
    }
  },
  created() {
    if (!this.detail.google_token) {
      this.getToken();
    }
  }
};
</script>

<style>
</style>