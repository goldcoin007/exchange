<template>
  <v-page>
    <v-header :title="$t('safe.b0')"></v-header>
    <main class="layout-main m-t-md">
      <view class="m-md bg-panel-3 rounded-sm overflow-hidden">
        <view class="form-item border-b p-md">
          <view class="label m-b-xs">{{$t('safe.b1')}}</view>
          <view class="input color-light">
            <v-input v-model="form.account" :placeholder="`${$t('safe.b8')}`" @blur="checkAccount"></v-input>
          </view>
        </view>
        <view class="form-item border-b p-md">
          <view class="label m-b-xs">{{$t('safe.b3')}}</view>
          <view class="input color-light">
            <v-input type="password" v-model="form.password" :placeholder="$t('safe.b4')"></v-input>
          </view>
        </view>
        <view class="form-item border-b p-md">
          <view class="label m-b-xs">{{$t('safe.b5')}}</view>
          <view class="input color-light">
            <v-input type="password" v-model="form.password_confirmation" :placeholder="$t('safe.b6')"></v-input>
          </view>
        </view>
        <view class="form-item border-b p-md" v-if="checkData.phone_status==1&&show">
          <view class="label m-b-xs">SMS{{$t('safe.a7')}}</view>
          <view class="input color-light">
            <v-input v-model="form.sms_code" :placeholder="$t('safe.a6')">
              <template #right>
                <v-code
                  url="/user/sendSmsCodeForgetPassword"
                  :data="{country_code:checkData.country_code,phone:form.account}"
                ></v-code>
              </template>
            </v-input>
          </view>
        </view>
        <view class="form-item border-b p-md" v-if="checkData.email_status==1">
          <view class="label m-b-xs">{{$t('safe.a5')}}</view>
          <view class="input color-light">
            <v-input v-model="form.email_code" :placeholder="$t('safe.a6')">
              <template #right>
                <v-code url="/user/sendEmailCodeForgetPassword" :data="{email:form.account}"></v-code>
              </template>
            </v-input>
          </view>
        </view>
        <view class="form-item border-b p-md" v-if="checkData.google_status==1">
          <view class="label m-b-xs">google{{$t('safe.a7')}}</view>
          <view class="input color-light">
            <v-input v-model="form.google_code" :placeholder="$t('safe.a6')"></v-input>
          </view>
        </view>
      </view>
    </main>
    <view class="p-md">
      <v-button class="w-max rounded-lg" block ref="btn" type="green" @click="submit">{{$t('safe.b7')}}</v-button>
    </view>
    <van-toast id="van-toast" />
  </v-page>
</template>
<script>
import Setting from "@/api/setting";
export default {
  data() {
    return {
      country_id: 1,
      form: {
        account: "",
        sms_code: "",
        email_code: "",
        google_code: "",
        password: "",
        password_confirmation: "",
        show:false
      },
      checkData: {},
    };
  },
  computed: {
  },
  watch:{
      'form.account':{
           handler(newVal){
              if(newVal.indexOf('@')!=-1){
                  this.show=false
              }else{
                  this.show=true
              }
          },
      }
  },
  methods: {
    checkAccount() {
      Setting.forgetPasswordAttempt({ account: this.form.account })
        .then((res) => {
          this.checkData = res.data;
        })
        .catch(() => {
          this.checkData = {};
          if (this.form.account) {
            this.$toast(this.$t('safe.b8'));
          }
        });
    },
    submit() {
        if(this.form.account==''){
            this.$toast(this.$t('safe.b2')+'/'+this.$t('safe.a3'))
            return
        }
        if(this.form.password==''){
            this.$toast(this.$t('safe.b4'))
            return
        }
        if(this.form.password_confirmation==''){
            this.$toast(this.$t('safe.b6'))
            return
        }
      Setting.forgetPassword(this.form, { btn: this.$refs.btn })
        .then(() => {
          this.$back();
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
</style>