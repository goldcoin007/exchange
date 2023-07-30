<template>
    <view class="layout-page bg-panel-1 layout-main" :style="themeStyle">
      <v-header>
        <template #title>
          PayPal
        </template>
      </v-header>
      <main class="m-lg bg-panel-3 rounded-md p-x-md box-shadow ">
        <view class="form-item border-b p-md m-b-md">
          <view class="label m-b-xs">PayPal{{$t('common.a6')}}</view>
          <view class="input color-light d-flex justify-between">
            <v-input disabled v-model="form.number"></v-input>
            <!-- #ifdef H5 -->
            <view class="color-theme-1 p-x-xs fn-18" @click="copy(form.number)">
              <i class="iconfont">&#xe706;</i>
            </view>
            <!-- #endif -->
            <!-- #ifndef H5 -->
            <view class="color-theme-1 p-x-xs fn-18" @click="$copy(form.number)">
              <i class="iconfont">&#xe706;</i>
            </view>
            <!-- #endif -->
          </view>
        </view>
        <view class="form-item border-b p-md m-b-md">
          <view class="label m-b-xs">{{$t('common.a7')}}</view>
          <view class="input color-light">
            <v-input v-model="form.amount" :placeholder="$t('common.a9')"></v-input>
          </view>
        </view>
        <div class="form-item  p-md ">
          <div class="label m-b-xs">{{$t('common.a8')}}</div>
          <div class="d-flex justify-between m-t-md ">
            <div
              @click="getFile('images')"
              class="upload-box d-flex justify-center align-center rounded-sm  bg-panel-3 box-shadow"
            >
              <van-icon v-if="!form.images" class="color-light fn-30" name="photograph" />
              <img v-else :src="form.images" alt />
            </div>
          </div>
        </div>
        <view class="p-md ">
          <v-button block type="blue" class="w-max rounded-md" ref="btn" @click="submit">{{$t('auth.b3')}}</v-button>
        </view>
      </main>
      
      <view class="m-b-lg p-x-lg" v-if="list.length">
        <view class="title d-flex justify-between  p-y-xs align-center color-light">
          <span class="fn-lg">{{$t('assets.f4')}}</span>
        </view>
        <view class="">
          <table class="w-max">
            <thead class="p-x-md">
              <tr class="fn-sm p-x-md " >
                <th class=" p-b-md fn-left p-l-md">{{$t('assets.c9')}}</th>
                <th class=" p-b-md fn-left">{{$t('assets.d0')}}</th>
                <th class=" p-b-md fn-right p-r-md">{{$t('assets.c0')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="color-light trChange p-x-md"  v-for="(item,index) in list" :key="index">
                <td class="p-y-xs p-l-md rounded-tl-sm rounded-bl-sm">{{item.created_at|parseTime}}</td>
                <td>
                  <view v-if="item.status==0">{{$t('assets.d1')}}</view>
                  <view v-if="item.status==1" class="color-buy">{{$t('assets.d2')}}</view>
                  <view v-if="item.status==2" class="color-sell">{{$t('assets.d3')}}</view>
                </td>
                <td class="fn-right p-r-md rounded-tr-sm rounded-br-sm">
                  {{item.num}}
                  <!-- <span class="color-default">(USDT)</span> -->
                </td>
              </tr>
              <tr v-if="loadMore">
                <td colspan="3" class="fn-center p-xs link-active" @click="more">{{$t('assets.d4')}}</td>
              </tr>
            </tbody>
          </table>
        </view>
      </view>
    </view>
</template>
<script>
    import Profile from "@/api/profile";
    import Member from "@/api/member";
    import Wallet from "@/api/wallet";
    import formData from "@/utils/class/date";
    import {mapGetters} from 'vuex'
    import {handleClipboard} from '../../utils/class/copy.js'
    export default{
        data(){
            return{
                form:{
                    number:"",
                    amount:"",
                    images:""
                },
                list: [],
                page: 1,
                loadMore: true,
            }
        },
        computed: {
          ...mapGetters(['themeStyle'])
        },
        filters: {
          parseTime(val) {
            return formData.parseTime(val);
          },
        },
        methods:{
            copy(data){
              handleClipboard(data, event, () => {
                this.$toast.success(this.$t('common.a1'));
              }, () => {
                this.$toast(this.$t('common.a2'));
              })
            },
            getFile(name) {
              this.$getFile({count:9}).then((res) => {
                this.upLoadImg(res, name);
              })
            },
            // 上传图片
            upLoadImg(chooseImageRes, name) {
              Member.uploadImage(chooseImageRes).then((res) => {
                this.form[name] = res.data.url;
                this.$toast.success(this.$t('auth.c1'));
              });
            },
            submit(){
                if(!this.form.amount){
                    this.$toast(this.$t('common.a9'));
                    return
                }
                if(!this.form.images){
                    this.$toast(this.$t('common.b0'));
                    return
                }
                let data = {
                  account:this.form.number,
                  amount:this.form.amount,
                  image:this.form.images
                };
                Wallet.rechargeManualPost(data).then((res) => {
                  this.$toast.success(res.message);
                  this.reset();
                  this.form.images=''
                  this.form.amount=''
                });
            },
            reset() {
              this.loadMore = true;
              this.page = 1;
              this.rechargeManualLog();
            },
            more() {
              this.page++;
              this.rechargeManualLog();
            },
            // 获取充值记录
            rechargeManualLog() {
              let data = {
                page: this.page,
              };
              Wallet.rechargeManualLog(data).then((res) => {
                  // this.list=res.data
                if (res.data.current_page == 1) this.list = [];
                this.list = [...this.list, ...res.data.data];
                if (res.data.data.length < res.data.per_page) this.loadMore = false;
              });
            },
            // 获取充值记录
            getPaypal() {
              Wallet.paypal().then((res) => {
                this.form.number=res.data.paypal_account
              });
            },
        },
        created() {
          this.rechargeManualLog();
          this.getPaypal()
        },
    }
</script>

<style lang="scss" scoped>
    .upload-box {
      width: 150px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .trChange:nth-child(2n-1){
       box-shadow: $shadow;
        border-radius: $border-radius-xs;
    	td{
    		background: $panel-3;
    		padding-top: $padding-sm;
    		padding-bottom: $padding-sm;
    	}
    }
</style>
