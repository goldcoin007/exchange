<template>
  <div class="edit-email">
    <div class="form-group" v-if="!detail.email">
      <label>{{$t('setting.email')}}</label>
      <div class="input-group mb-3">
        <input type="text" required v-model="form.email" class="form-control" :placeholder="$t('setting.enterEmail')" />
      </div>
    </div>
    <div class="form-group">
      <label>{{$t('setting.emailVerCode')}}</label>
      <div class="input-group mb-3">
        <input type="number" required v-model="form.email_code" class="form-control" :placeholder="$t('setting.enterEmailVer')" />
        <div class="input-group-append">
          <get-code class="btn btn-outline-primary" v-if="detail.email" :data="{type:2}" :type="1" />
          <get-code class="btn btn-outline-primary" v-else :data="{email:form.email}" :type="3" />
        </div>
      </div>
    </div>
    <div class="form-group"  v-if="detail.phone_status==1">
      <label>SMS {{$t('setting.smsVer')}}</label>
      <div class="input-group mb-3">
        <input type="number" required v-model="form.sms_code"  class="form-control" :placeholder="$t('setting.enterSmsCode')" />
        <div class="input-group-append">
          <get-code class="btn btn-outline-primary" :data="{type:1}" :type="1" />
        </div>
      </div>
    </div>
    <div class="form-group"  v-if="detail.google_status==1">
      <label>Google {{$t('setting.ver')}}</label>
      <div class="input-group mb-3">
        <input type="number" required v-model="form.google_code"  class="form-control" :placeholder="$t('setting.enterNameCode',{name:'Google'})" />
      </div>
    </div>
    <div class="text-center">
      <button type="button" class="btn w-25 btn-secondary" @click="$emit('close')">{{$t('common.cancelBtn')}}</button>
      <button type="button" class="btn w-25 btn-primary" v-if="!detail.email" @click="bindEmail">{{$t('setting.bind')}}</button>
      <button type="button" class="btn w-25 btn-primary" v-else @click="unBind">{{$t('setting.unbind')}}</button>
    </div>
  </div>
</template>

<script>
import Setting from "../../api/setting";
export default {
  props: ["detail"],
  data() {
    return {
      form: {
        email: "",
        email_code: "",
        sms_code: "",
        google_code: ""
      }
    };
  },
  methods: {
    bindEmail() {
      let data = this.form;
      if (utils.validate(".edit-email")) {
        Setting.bindEmail(data)
          .then(res => {
            this.$emit("close");
            this.$emit("change");
            this.$message.success(this.$t('setting.bindSuccess'));
          })
          .catch(res => {});
      }
    },
    unBind() {
      let data = this.form;
      if (utils.validate(".edit-email")) {
        Setting.unbindEmail(data)
          .then(res => {
            this.$emit("close");
            this.$emit("change");
            this.$message.success(this.$t('setting.unbindSuccess'));
          })
          .catch(res => {});
      }
    }
  },
  created() {}
};
</script>

<style>
</style>