<template>
	
  <v-page>
    <v-header class="nav-tab" :title="$t('reg.b9')">
        <template #right>
            <view class="per-bot p-y-md p-x-sm d-flex align-center">
              <!-- <img :src="$localImgUrl('Page6.png')" alt="" class="h-20 m-r-xs" /> -->
              <span class="color-light">
                <v-lang
                  @change="
                    marketList = [];
                  "
                ></v-lang>
                <i class="iconfont m-l-xs fn-sm">&#xe6e9;</i>
              </span>
            </view>
        </template>
    </v-header>
    <view class="layout-main">
      <view class="form m-lg bg-panel-3 p-lg rounded-md">
        <view class="d-flex justify-center">
          <view
            class="item transition-3 p-y-sp-r-sm p-x-xs fn-20 "
            :class="{
                'color-light ':form.type==1
              }"
            @click="form.type=1"
          ><!--{{$t('reg.a0')}}-->
		  <view class="w-5 h-5 rounded-max bg-light justify-center mauto m-y-sm"
		  :class="{
		      'disnone':form.type==2
		    }"
			>
		  	
		  </view>
		  </view>
		  
		  
          <view
            class="item transition-3 p-y-sp-r-sm p-x-xs fn-20"
            :class="{
                'color-light':form.type==2
              }"
            @click="form.type=2"
          >{{$t('reg.a1')}}
		  <view class="w-5 h-5 rounded-max bg-light justify-center mauto m-y-sm"
		  :class="{
		      'disnone':form.type==1
		    }"
		  >
		  	
		  </view>
		  </view>
        </view>
        <view class="form-item border-b m-b-md p-b-xs">
          <template v-if="form.type==1">
            <view key="1">
              <view class="label m-b-xs">{{$t('reg.a2')}}</view>
              <v-input v-model="form.account" class="color-light" :placeholder="$t('reg.a3')">
                <template #left>
                  <v-country ref="country" @country_code="country_code=$event" class="m-r-xs" v-model="form.country_id" />
                </template>
              </v-input>
            </view>
          </template>
          <template v-else-if="form.type==2">
            <view key="2">
              <view class="label m-b-xs">{{$t('reg.a4')}}</view>
              <v-input v-model="form.account" class="color-light" :placeholder="$t('reg.a5')"></v-input>
            </view>
          </template>
        </view>
        <view class="form-item border-b m-b-md p-b-xs">
          <view class="label m-b-xs">{{$t('reg.a6')}}</view>
          <v-input class="color-light" v-model="form.code" :placeholder="$t('reg.a7')">
            <template #right>
              <!-- 手机 -->
              <v-code
                v-show="form.type==1"
                url="/register/sendSmsCode"
                :data="{
                phone:form.account,
                country_code:country_code || 86,
                type:1
              }"
              ></v-code>
              <!-- 邮箱 -->
              <v-code
                url="/register/sendEmailCode"
                :data="{
                email:form.account,
                type:1
              }"
                v-show="form.type==2"
              ></v-code>
            </template>
          </v-input>
        </view>
        <view class="form-item border-b m-b-md p-b-xs">
          <view class="label m-b-xs">{{$t('reg.a8')}}</view>
          <v-input class="color-light" v-model="form.password" type="password" :placeholder="$t('reg.a9')"></v-input>
        </view>
        <view class="form-item border-b m-b-md p-b-xs">
          <view class="label m-b-xs">{{$t('reg.b0')}}</view>
          <v-input
            class="color-light"
            v-model="form.password_confirmation"
            type="password"
            :placeholder="$t('reg.b1')"
          ></v-input>
        </view>
        <view class="form-item border-b m-b-md p-b-xs">
          <view class="label m-b-xs">{{$t('reg.b2')}}</view>
          <v-input class="color-light" :disabled="query.invite_code?true:false" v-model="form.invite_code" :placeholder="`${$t('reg.b3')}（${$t('reg.b4')}）`"></v-input>
        </view>
        <view class="tips d-flex m-b-md fn-sm">
          <van-checkbox
            :value="check"
            @change="check=!check"
            class="flex-shrink"
            icon-size="15px"
            checked-color="#f05319"
          ></van-checkbox>
          <view class="m-l-xs">
            {{$t('reg.b5')}}
            <v-link class="color-sell" v-if="agreement.agreement" :to="{path:'/pages/notice/detail',query:{id:agreement.agreement.id}}">《{{agreement.agreement.title}}》</v-link>{{$t('reg.b7')}}
            <v-link class="color-sell" v-if="agreement.clause" :to="{path:'/pages/notice/detail',query:{id:agreement.clause.id}}">《{{agreement.clause.title}}》</v-link>
          </view>
        </view>
        <v-button type="blue"  block class="w-max m-b-md rounded-md" @click="register">{{$t('reg.b9')}}</v-button>
      </view>
    </view>
    <view class="m-x-lg p-x-lg">
      <view class="p-y-md border-t fn-center">
        {{$t('reg.b9')}}，
        <v-link class="color-sell" to="/pages/login/index">{{$t('reg.c1')}}</v-link>
      </view>
    </view>
    <van-toast id="van-toast" />
  </v-page>
</template>
<script>
import Member from "@/api/member";
import app from "app.js";
export default {
  data() {
    return {
      form: {
        type: 2,
        country_code: "",
        country_id: 1,
        account: "",
        code: "",
        password: "",
        password_confirmation: "",
        invite_code: "",
      },
      check: false,
      agreement: {},
      country_code:''
    };
   
  },
  computed: {
  },
  methods: {
    register() {
        if (!this.form.account) {
          this.$toast(this.$t('reg.a3'));
          return;
        }
      if (!this.check) {
        this.$toast(this.$t('reg.c2'));
        return;
      }
      
      if (!this.form.account) {
        if (this.form.type == 1) {
          this.$toast(this.$t('reg.c3'));
        } else if (this.form.type == 2) {
          this.$toast(this.$t('reg.c4'));
        }
        return;
      }
      this.form.type=this.form.type
      this.form.country_code = this.country_code || 86;

      Member.register(this.form).then((res) => {
 
          if(res.code != 200){
              this.$toast(res.message)
              return false
          }
        // #ifdef H5
        this.$dialog.confirm({
           title: this.$t("common.tips"),
           message: this.$t('common.toDwon'),
		   confirmButtonText:  this.$t("common.confirm"), //改变确认按钮上显示的文字
		   cancelButtonText: this.$t("common.cancel"),
           cancel:true
         })
         .then(() => {
           window.open(app.down, "_blank ");
         }).catch(()=>{
           if (this.query.from) {
          this.$back();
          } else {
            this._router.replace("/pages/login/index");
          }
         });
        // #endif
        // #ifdef APP-PLUS
          if (this.query.from) {
            this.$back();
          } else {
            this._router.replace("/pages/login/index");
          }
        // #endif
        this.$toast(this.$t('reg.c5'));
      });
    },
    // 获取协议
    clause() {
      Member.clause().then((res) => {
        this.agreement = res.data;
      });
    },
  },
  mounted() {
      
  },
  onLoad(query){
    this.query = query
    this.form.invite_code = this.query.invite_code||this.form.invite_code
  },
  created() {
    this.clause();
  },
};
</script>
<style lang="scss" scoped>
.nav-tab {
  background: transparent;
  &::after {
    border: none;
  }
}
.transition-3 {
  transition: all 0.2s;
}
.mauto{
	margin: auto;
}
.disnone{
	display: none;
}
</style>