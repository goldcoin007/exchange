<template>
  <div class="edit-ver">
    <div class="form-group" v-if="detail.phone_status==1">
      <label>{{$t('setting.smsVer')}}</label>
      <div class="input-group mb-3">
        <input type="number" required v-model="sms_code" class="form-control" :placeholder="$t('setting.enterCode')" />
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
          v-model="email_code"
          required
          class="form-control"
          :placeholder="$t('setting.enterCode')"
        />
        <div class="input-group-append">
          <get-code class="btn btn-outline-primary" :data="{type:2}" :type="1" />
        </div>
      </div>
    </div>
    <div class="form-group" v-if="detail.google_status==1">
      <label>Google {{$t('setting.ver')}}</label>
      <div class="input-group mb-3">
        <input
          type="number"
          v-model="google_code"
          class="form-control"
          required
          :placeholder="$t('setting.enterNameCode',{name:'Google'})"
        />
      </div>
    </div>
    <div class="text-center">
      <button type="button" class="btn w-25 btn-secondary" @click="$emit('close')">{{$t('common.cancelBtn')}}</button>
      <button type="button" class="btn w-25 btn-primary" @click="changeVer">{{$t('common.confirmBtn')}}</button>
    </div>
  </div>
</template>

<script>
import Setting from "../../api/setting";
export default {
  props: ["detail", "changeObj"],
  data() {
    return {
      sms_code: "",
      email_code: "",
      google_code: ""
    };
  },
  methods: {
    changeVer() {
      let data = {
        sms_code: this.sms_code,
        email_code: this.email_code,
        google_code: this.google_code,
        type: this.changeObj.type
      };
      if (utils.validate(".edit-ver")) {
        if (this.changeObj.status) {
          // 启用
          Setting.enableSmsEmailGoogle(data)
            .then(res => {
                this.$emit('close')
                this.$emit('change')
                this.$message.success(this.$t('setting.openSuccess'))
            })
            .catch(res => {});
        } else {
          // 关闭
          Setting.disableSmsEmailGoogle(data)
            .then(res => {
                 this.$emit('close')
                this.$emit('change')
                this.$message.success(this.$t('setting.closeSuccess'))
            })
            .catch(res => {});
        }
      }
    }
  },
  activated() {}
};
</script>

<style>
</style>