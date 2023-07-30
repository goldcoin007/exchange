<template>
  <div class="edit-sms">
    <div class="form-group">
      <label>{{$t('setting.enterPhone')}}</label>
      <div class="input-group mb-3" v-if="!detail.phone">
        <input
          type="number"
          required
          v-model="form.country_code"
          class="form-control col-4"
          :placeholder="$t('setting.area')"
        />
        <input
          type="number"
          required
          v-model="form.phone"
          class="form-control"
          :placeholder="$t('setting.enterPhone')"
        />
      </div>
    </div>
    <div class="form-group">
      <label>SMS {{$t('setting.smsVer')}}</label>
      <div class="input-group mb-3">
        <input
          type="number"
          required
          v-model="form.sms_code"
          class="form-control"
          :placeholder="$t('setting.enterCode')"
        />
        <div class="input-group-append">
          <get-code
            class="btn btn-outline-primary"
            :data="{phone:form.phone,country_code:form.country_code}"
            :type="2"
            v-if="!detail.phone"
          />
          <get-code v-else class="btn btn-outline-primary" :data="{type:1}" :type="1" />
        </div>
      </div>
    </div>
    <div class="form-group" v-if="detail.email_status==1">
      <label>{{$t('setting.emailVer')}}</label>
      <div class="input-group mb-3">
        <input type="number" v-model="form.email_code" class="form-control" :placeholder="$t('setting.enterCode')" />
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
      <button type="button" class="btn w-25 btn-primary" v-if="!detail.phone" @click="bindPhone">{{$t('setting.bind')}}</button>
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
        phone: "",
        country_code: "",
        sms_code: "",
        email_code: "",
        google_code: ""
      }
    };
  },
  methods: {
    bindPhone() {
      let data = this.form;
      if (utils.validate(".edit-sms")) {
        Setting.bindPhone(data)
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
      if (utils.validate(".edit-sms")) {
        Setting.unbindPhone(data)
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