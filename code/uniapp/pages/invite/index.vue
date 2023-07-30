<template>
  <v-page>
    <v-header class="nav-head" :border="false" :title="$t('invite.a0')"></v-header>
    <view class="layout-main">
      <view class="top color-plain">
        <view :style="{height:taskHeight+'px'}"></view>
       <!-- <view class="fn-center fn-30 title">{{app.appName}} {{$t('invite.a1')}}</view>
        <view class="fn-center fn-18">{{$t('invite.a2')}}</view> -->
        <view class="leveup m-md p-md bg-light rounded-lg color-black">
          <view class="d-flex align-center m-t-md m-b-lg justify-between fn-center">
            <view>
              <view class="fn-lg">{{$t('invite.a3')}}</view>
              <view>{{$t('invite.a4')}}</view>
            </view>
            <view class="fn-30 color-yellows ">
              <img src="static/img/rbox.png" alt="" class="w-30" >
            </view>
            <view>
              <view class="fn-lg">{{app.appName}}{{$t('invite.a1')}}</view>
              <view>
                <van-icon name="diamond-o" />
                {{$t('invite.a5')}}
              </view>
            </view>
          </view>
          <view class="fn-center">
            <v-qr :text="detail.invite_url" class="search-code"></v-qr>
          </view>
        </view>
      </view>
      <!-- 邀请码 -->
      <view class="invite-code m-x-md m-b-md bg-panel-4 rounded bg-inv p-y-xl p-x-md">
        <view class="  ">
          <view class="d-flex justify-center fn-16">{{$t('invite.a6')}}</view>
          <view class="fn-22 color-theme-1 d-flex justify-center m-y-lg">
            {{detail.invite_code}}
            <!-- #ifdef H5 -->
            <i class="iconfont" @click="copy(detail.invite_code)">&#xe706;</i>
            <!-- #endif -->
            <!-- #ifndef H5 -->
            <i class="iconfont" @click="$copy(detail.invite_code)">&#xe706;</i>
            <!-- #endif -->
          </view>
        </view>
        <view class="group d-flex m-t-xs">
          
          <button
          			type="blue"
            class="btn flex-fill color-plain rounded-sm h-34 btn-1 m-r-md fn-md bg-buy"
            @click="popshow=true;"
          >{{$t('common.b5')}}</button>
          <!-- #ifndef H5 -->
          <button
          			type="green"
            class="btn flex-fill rounded-sm color-plain h-34 btn-2 fn-md bg-buy"
            @click="$copy(detail.invite_url)"
          >{{$t('invite.a8')}}</button>
          <!-- #endif -->
          
          <!-- #ifdef H5 -->
          <button
          			type="green"
            class="btn flex-fill rounded-sm color-plain h-34 btn-2 fn-md bg-theme-1"
            @click="copy(detail.invite_url)"
          >{{$t('invite.a8')}}</button>
          <!-- #endif -->
        </view>
      </view>
      <!-- 推广 -->
	  <view class="d-flex justify-between m-b-lg m-x-lg fn-18">
	    <span>{{$t('invite.a9')}}</span>
	  </view>
      <view class="extension bg-panel-4 p-md m-y-md m-x-lg rounded-md">
        
        <view class="data d-flex justify-between fn-center p-x-md">
          <view class="item">
			  <view class="label fn-sm">{{$t('invite.b0')}}（{{$t('invite.b1')}}）</view>
            <view class="num color-light fn-lg">{{detail.invite_user_num}}</view>
          </view>
          <view class="item">
			  <view class="label fn-sm">{{$t('invite.b2')}}（USDT）</view>
            <view class="num color-light fn-lg">{{detail.invite_dividend}}</view>
          </view>
        </view>
      </view>
      <!-- 记录 -->
      <view class="bill p-x-md">
        <van-tabs v-model="active" animated class="bg-panel-4" lazy-render :broder="false">
          <van-tab :title="$t('invite.b3')">
            <v-paging :ajax="generalizeList" :refresher-enabled="false">
              <template #box="list " class="">
                <view class="d-flex justify-between p-x-md p-y-xs color-light bg-panel-3 rounded-sm m-y-md" v-for="item in $list(list)" :key="item.account">
                  <view>
                    {{item.account||item.username}}
                    <van-tag mark plain type="danger">{{$t('invite.b4')}}</van-tag>
                  </view>
                  <view>{{item.created_at}}</view>
                </view>
              </template>
            </v-paging>
          </van-tab>
          <van-tab :title="$t('invite.b5')">
            <v-paging :ajax="rewardLogs" :refresher-enabled="false">
              <template #box="list">
                <table class="w-max">
                  <tbody>
                    <tr v-for="item in $list(list)" :key="item.id">
                      <td class="p-l-md p-y-xs color-light">{{item.log_type_text}}</td>
                      <td class="fn-sm fn-center color-default">{{item.created_at}}</td>
                      <td class="p-r-md fn-right color-light">
                        {{item.amount}}{{item.coin_name}}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </v-paging>
          </van-tab>
        </van-tabs>
      </view>
      <van-popup
      class="fenxiang"
      custom-style="width:100%;height:auto;border-radius:10px 10px 0 0;background:none;" 
      :show="popshow"
      position='bottom'
      @close="popshow = false">
      <!-- closeable -->
          <view class="fn-center share bg-panel-3">
              <view class="fn-center p-y-md fn-bold">
                  {{$t('common.b6')}}
              </view>
              <special-Banner :banner-list="home" :swiper-config="swiperConfig" @curIndexs="curIndex"></special-Banner>
              <view class="bottom">
                  <view @click="down()" class="box-size w-max d-flex justify-center flex-wrap p-y-xs p-x-lg p-t-md">
                      <img width="50px" height="50px" src="static/img/down.png"/>
                      <view class="w-max d-flex justify-center">{{$t('common.save')}}</view>
                  </view>
                  <button @click="popshow=false" class="bg-panel-3 color-default" >{{$t('common.cancel')}}</button>
              </view>
          </view>
      </van-popup>
    </view>
  </v-page>
</template>
<script>
import Profile from "@/api/profile";
import app from "@/app";
import {handleClipboard} from '../../utils/class/copy.js'
export default {
  data() {
    return {
      active: 0,
      detail: {},
      imgBase64: undefined,
      app,
      taskHeight:0,
      popshow:false,
      swiperConfig: {
          indicatorDots: false,
          indicatorColor: 'rgba(255, 255, 255, .4)',
          indicatorActiveColor: 'rgba(255, 255, 255, 1)',
          autoplay: false,
          interval: 3000,
          duration: 300,
          circular: true,
          previousMargin: '58rpx',
          nextMargin: '58rpx'
      },
      home:[],
      bg_id:4,
      imgs:''
    };
  },
  computed: {
  },
  methods: {
      curIndex(e){
          this.bg_id=e
      },
    // 获取推广记录
    generalizeList: Profile.generalizeList,
    // 获取返佣记录
    rewardLogs: Profile.rewardLogs,
    generalizeInfo() {
      Profile.generalizeInfo().then((res) => {
        this.detail = res.data;
      });
    },
    poster() {
	  let data={bg_id:4}
      Profile.poster(data).then((res) => {
		let imginfo = [
		  {
			"id": 4,
			"image": "",
			"status": 1,
			"is_default": 1,
			"sort": 0,
			"created_at": "2021-08-11 18:22:20",
			"updated_at": "2021-11-24 15:16:45",
			"image_url": ""
		  }
		]
		imginfo[0].image_url=res.data
		imginfo[0].image =res.data
        this.home=imginfo
      });
    },
    copy(data){
      handleClipboard(data, event, () => {
        uni.showToast({
            icon: 'success',
            title: this.$t('common.a1')
        })
      }, () => {
        uni.showToast({
            icon: 'none',
            title: this.$t('common.a2')
        })
      })
    },
    downImg() {
      var pages = getCurrentPages();
      var page = pages[pages.length - 1];
      var bitmap = null;
      var currentWebview = page.$getAppWebview();
      bitmap = new plus.nativeObj.Bitmap("amway_img");
      // 将webview内容绘制到Bitmap对象中
      currentWebview.draw(
        bitmap,
        function () {
          bitmap.save(
            "_doc/a.jpg",
            {},
            function (i) {
              uni.saveImageToPhotosAlbum({
                filePath: i.target,
                success: function () {
                  bitmap.clear(); //销毁Bitmap图片
                  uni.showToast({
                    title: uni.getStorageSync('language')=='zh-CN'?"保存图片成功":"success",
                    mask: false,
                    duration: 1500,
                  });
                },
              });
            },
            function (e) {
              console.log("保存图片失败：" + JSON.stringify(e));
            }
          );
        },
        function (e) {
          console.log("截屏绘制图片失败：" + JSON.stringify(e));
        }
      );
    },
    down(){
		//console.log(this.bg_id)
        /*let data={
              bg_id:this.bg_id
          }
        Profile.poster(data).then((res) => {
          this.imgs=res.data
          uni.showLoading()
          this.saves()
        });*/
		uni.showLoading()
		this.saves(this.home[0].image_url)
    },
    saves(imgurl){
        var that=this
        uni.downloadFile({//下载
            url:imgurl,      //文件链接
			success: (res) => {
                if (res.statusCode === 200) {
                    uni.hideLoading()
                    uni.saveImageToPhotosAlbum({//保存图片到系统相册。
                        filePath: res.tempFilePath,//图片文件路径
                        success: function() {
                            that.$toast(that.$t('common.b3'))
                        },
                        fail: function(e) {
                            that.$toast(that.$t('common.b4'))
                        }
                    });
                }
            },
            fail:res => {
                uni.showToast({
                    title: this.$t('common.b4'),
                    icon: 'none',
                });
            }
        });
    },
    callback($ev) {
      this.imgBase64 = $ev;
    },
    getTaskHeight(){
      uni.getSystemInfo({
        success:(obj)=>{
          this.taskHeight = obj.statusBarHeight
        }
      })
    }
  },
  onLoad() {
    this.generalizeInfo();
    this.getTaskHeight()
    this.poster()
  },
};
</script>
<style lang="scss" scoped>
// .nav-head {
//   background: transparent;
//   ::v-deep .van-nav-bar{
// 	  background-color: inherit;
// 	  .van-nav-bar__title,.van-icon{
// 		   color:$plain;
// 	  }
//   }
//   // position: absolute;
//   left: 0;
//   width: 100%;
//   top: 0;
//   z-index: 99;
 
//   &::after {
//     border-bottom: none;
//   }
// }
.bg-inv{
	  background: $white url("../../static/img/bgb3.png") no-repeat center top;
	  background-size: 100% 100%;
  }
.top {
  // background: linear-gradient(180deg, #c86b49, $theme-1);
  padding-bottom: 80px;
  .title {
    padding-top: 45px;
  }
  
  .leveup {
    background: $white url("../../static/img/invite-bg.png") no-repeat center top;
    .search-code {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      border: 4px solid $white;
    }
    background-size: 100% 100%;
    box-sizing: border-box;
    .apply-btn {
      border-radius: 50px;
      border: none;
      width: 120px;
      background: linear-gradient(180deg, #ffd01e, #ff9d2c);
      box-shadow: 1px 1px 6px 1px #c8c9cc;
    }
  }
}
.invite-code {
  margin-top: -45px;
  .group {
    .btn-1 {
      border: 0;
      // background: linear-gradient(90deg, $theme-1, #ff9d2c);
    }
    .btn-2 {
      border: 0;
      // background: linear-gradient(90deg, $blue, #6dabe8);
    }
  }
}
::v-deep .uni-swiper-slide-frame{
    width:50%!important;
    left: 25%;
}
::v-deep .uni-swiper{
    height: auto!important;
}
.w-60{
    width: 30%;
}
.overflow-scroll{
    width: 100%;
    height: 300px;
    overflow: hidden;
    display: flex;
}
.swiper{
   display: flex;
}
::v-deep .item-center::before{
    content: "√";
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-family: monospace;
    line-height: 20px;
    background: #3c74f3;
    z-index: 10000;
    position: absolute;
    color: white;
    bottom: 5px;
    right: 15%;
}
.color-black{
    color: black!important;
}
</style>