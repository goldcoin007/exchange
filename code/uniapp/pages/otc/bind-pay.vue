<template>
  <v-page>
    <v-header :title="$t('otc.j6')"></v-header>
    <view class="layout-main">
      <template v-if="query.type=='alipay'">
        <view class="m-md p-md rounded-sm bg-panel-3 box-shadow">
          <view class="form-item m-b-sm">
            <view class="label">{{$t('otc.d7')}}</view>
            <v-input
              :placeholder="$t('otc.d8')"
              class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs"
              type="text"
              v-model="alipay.card_no"
            ></v-input>
          </view>
          <view class="form-item m-b-sm">
            <view class="label">{{$t('otc.d9')}}</view>
            <v-input
              :placeholder="$t('otc.e0')"
              class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs"
              type="text"
              v-model="alipay.real_name"
            ></v-input>
          </view>
          <view class="form-item m-b-sm">
            <view class="label">{{$t('otc.e1')}}</view>
            <view @click="getFile(alipay)"  class="upload-box d-flex justify-center align-center rounded-sm bg-panel-1 box-shadow m-t-xs box-shadow w-100 h-100">
              <van-icon v-if="!alipay.code_img" class="color-light fn-30" name="photograph" />
              <img class="w-max h-max" v-else :src="$imgUrl+'/'+alipay.code_img" alt />
            </view>
          </view>
        </view>
        <view class="m-md">
            <v-button type="green" block class="rounded-lg"  @click="add(alipay)">
                {{$t('otc.e2')}}
            </v-button>
        </view>
      </template>
      <template v-if="query.type=='wechat'">
        <view class="m-md p-md rounded-sm bg-panel-3">
          <view class="form-item m-b-sm">
            <view class="label">{{$t('otc.e3')}}</view>
            <v-input
              :placeholder="$t('otc.d8')"
              class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs"
              type="text"
              v-model="wechat.card_no"
            ></v-input>
          </view>
          <view class="form-item m-b-sm">
            <view class="label">{{$t('otc.d9')}}</view>
            <v-input
              :placeholder="$t('otc.e0')"
              class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs"
              type="text"
              v-model="wechat.real_name"
            ></v-input>
          </view>
          <view class="form-item m-b-sm">
            <view class="label">{{$t('otc.e1')}}</view>
            <view @click="getFile(wechat)"  class="upload-box d-flex justify-center align-center rounded-sm bg-panel-1 box-shadow m-t-xs box-shadow w-100 h-100">
              <van-icon v-if="!wechat.code_img" class="color-light fn-30" name="photograph" />
              <img class="w-max h-max" v-else :src="$imgUrl+'/'+wechat.code_img" alt />
            </view>
          </view>
        </view>
        <view class="m-md">
            <v-button type="green" block class="rounded-lg"  @click="add(wechat)">
                {{$t('otc.e2')}}
            </v-button>
        </view>
      </template>
      <template v-if="query.type=='bank_card'">
        <view class="m-md p-md rounded-sm bg-panel-3">
          <view class="form-item m-b-sm">
            <view class="label">{{$t('otc.e4')}}</view>
            <v-input
              :placeholder="$t('otc.e9')"
              class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs"
              type="text"
                v-model="bank_card.bank_name"
            ></v-input>
          </view>
          <view class="form-item m-b-sm">
            <view class="label">{{$t('otc.e6')}}</view>
            <v-input
              :placeholder="$t('otc.e7')"
              class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs"
              type="text"
                v-model="bank_card.open_bank"
            ></v-input>
          </view>
          <view class="form-item m-b-sm">
            <view class="label">{{$t('otc.e8')}}</view>
            <v-input
              :placeholder="$t('otc.e9')"
              class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs"
              type="text"
              v-model="bank_card.card_no"
            ></v-input>
          </view>
          <view class="form-item m-b-sm">
            <view class="label">{{$t('otc.d9')}}</view>
            <v-input
              :placeholder="$t('otc.e0')"
              class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs"
              type="text"
              v-model="bank_card.real_name"
            ></v-input>
          </view>
        
        </view>
        <view class="m-md">
            <v-button type="green" block class="rounded-lg" @click="add(bank_card)">
                {{$t('otc.e2')}}
            </v-button>
        </view>
      </template>
    </view>
  </v-page>
</template>
<script>
import Otc from "@/api/otc";
import Member from "@/api/member";
export default {
  name:"bindPay",
  data(){
    return {
      query:{},
      alipay: {
        pay_type: "alipay",
        real_name: "",
        card_no: "",
        code_img: "",
      },
      bank_card: {
        pay_type: "bank_card",
        real_name: "",
        card_no: "",
        bank_name: "",
        open_bank: "",
      },
      wechat: {
        pay_type: "wechat",
        real_name: "",
        card_no: "",
        code_img: "",
      },
    }
  },
  onLoad(query) {
    this.query = query
    console.log(this.query)
    this.getList();
  },
  methods: {
     getList() {
      Otc.userPayment().then((res) => {
        this.alipay = res.data.alipay || this.alipay;
        this.bank_card = res.data.bank_card || this.bank_card;
        this.wechat = res.data.wechat || this.wechat;
      });
    },
    add(obj) {
      let data = {
        ...obj,
      };
      for (let i in data) {
        if (data[i] == null) delete data[i];
      }
      if (data.id) {
        data._method = "put";
        Otc.editUserPayment(data).then(() => {
          this.$toast.success(this.$t('otc.f0'));
          this.$back()
        });
      } else {
        Otc.addUserPayment(data).then((res) => {
          this.$toast.success(this.$t('otc.f1'));
          this.$back()
        });
      }
    },
     // 上传图片
    getFile(obj) {
      this.$getFile({ count: 1 }).then((res) => {
        this.upLoadImg(res,obj);
      });
    },
    // 上传图片
    upLoadImg(chooseImageRes,obj) {
      Member.uploadImage(chooseImageRes).then((res) => {
        obj.code_img = res.data.path;
        this.$toast.success(this.$t("auth.c1"));
      });
    },
  },
};
</script>