<template>
  <div class="edit-password">
    <div class="form-group">
      <label>{{$t('setting.newPassword')}}</label>
      <input
        type="password"
        required
        v-model="form.password"
        class="form-control"
        :placeholder="$t('setting.enterNewPassword')"
      />
    </div>
    <div class="form-group">
      <label>{{$t('setting.confirmPassword')}}</label>
      <input
        type="password"
        v-model="form.password_confirmation"
        required
        class="form-control"
        :placeholder="$t('setting.pleaseConfirmPassword')"
      />
    </div>
    <div class="form-group" v-if="detail.phone_status==1">
      <label>{{$t('setting.smsVer')}}</label>
      <div class="input-group mb-3">
        <input
          type="number"
          required
          v-model="form.sms_code"
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
    <div class="form-group" v-if="detail.google_status==1">
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
    <div class="text-center">
      <button type="button" class="btn w-25 btn-secondary" @click="$emit('close')">{{$t('common.cancelBtn')}}</button>
      <button type="button" class="btn w-25 btn-primary" @click="setPassword">{{$t('common.confirmBtn')}}</button>
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
        password: "",
        password_confirmation: "",
        sms_code: "",
        email_code: "",
        google_code: ""
      }
    };
  },
  methods: {
    setPassword() {
      let data = this.form;
      if (utils.validate(".edit-password")) {
        Setting.updatePassword(data)
          .then(res => {
            this.$message.success(this.$t('common.changeSuccess'));
            this.$emit("close");
          })
          .catch(err => {});
      }
    }
  },
  activated() {}
};
</script>

<style>
</style>