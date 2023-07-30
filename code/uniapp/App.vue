<script>
import Member from "@/api/member";
import { mapActions } from "vuex";
import app from "@/app.js"
export default {
  onLaunch: function () {
    setInterval(() => {
      this.$navFontColor();
    }, 1000);
    this.mobileLogo();
    // this.update()
  },
  methods: {
    ...mapActions({
      setLogoMap: "logoMap",
    }),
    mobileLogo() {
      Member.mobileLogo().then((res) => {
        let data = res.data;
        this.setLogoMap({
          home_logo: data.home_logo,
          login_logo: data.login_logo,
          title_logo: data.title_logo,
          share_logo: data.share_logo,
          name: data.name,
        });
      });
    },
    // update(){
    //     var baseUrl=app.baseUrl + '/api/app/getNewestVersion'
    //     console.log(baseUrl)
    //     var _this = this;
    //     uni.request({
    //     url: baseUrl,  //请求接口
    //     method: 'GET',
    //     success: result => {
    //         console.log(result)
    //         if (result.data.code == 200) {
    //             plus.runtime.getProperty(plus.runtime.appid, function(inf) {
    //                 console.log(inf)
    //                 if(inf.version != result.data.data.versions){
    //                     uni.showModal({
    //                         title: "发现新版本",
    //                         content: "确认下载更新",
    //                         success: (res) => {
    //                             if (res.confirm == true) {//当用户确定更新，执行更新
    //                                 _this.doUpData();
    //                             }
    //                         }
    //                     })
    //                 }
    //             });
    //         }
    //     },
    //     })
    // },
     
    // doUpData() {
    //     uni.showLoading({
    //         title: '更新中……'
    //     })
    //     uni.downloadFile({//执行下载
    //         url: 'https://www.AMATAKex.net/download/android/AMATAK.apk', //下载地址
    //         success: downloadResult => {//下载成功
    //             uni.hideLoading();
    //             if (downloadResult.statusCode == 200) {
    //                 uni.showModal({
    //                     title: '',
    //                     content: '更新成功，确定现在重启吗？',
    //                     confirmText: '重启',
    //                     confirmColor: '#EE8F57',
    //                     success: function(res) {
    //                         if (res.confirm == true) {
    //                             plus.runtime.install(//安装
    //                                 downloadResult.tempFilePath, {
    //                                     force: true
    //                                 },
    //                                 function(res) {
    //                                     utils.showToast('更新成功，重启中');
    //                                     plus.runtime.restart();
    //                                 }
    //                             );
    //                         }
    //                     }
    //                 });
    //             }
    //         }
    //     });
    // }
  },
  // onLaunch: function() {
      // console.log('App Launch');
      // 检测升级
      // #ifdef APP-PLUS
      // var baseUrl=app.baseUrl + '/api/app/getNewestVersion'
      // uni.request({
      //     url: baseUrl, //检查更新的服务器地址
      //     method: 'GET',
      //     // data: {
      //     //     appid: plus.runtime.appid,
      //     //     version: plus.runtime.version,
      //     //     imei: plus.device.imei
      //     // },
      //     success: (res) => {
      //         console.log(res)
      //         if (res.data.code == 200) {
      //             console.log(res.data.data.android.url)
      //             var openUrl = plus.os.name === 'iOS' ? res.data.data.ios.url : res.data.data.android.url;
      //             // 提醒用户更新
      //             uni.showModal({
      //                 title: '更新提示',
      //                 content: '是否选择更新',
      //                 success: (showResult) => {
      //                     if (showResult.confirm) {
      //                         plus.runtime.openURL(openUrl);
      //                     }
      //                 }
      //             })
      //         }
      //     }
      // })
      // #endif
  // },
  onLaunch() {
      
  },
  onShow: function () {
    uni.$emit("appShow");
    this.$navFontColor();
  },
  onHide: function () {},
};
</script>

<style lang="scss">
.layout-page {
  height: 100vh;
  font-size: 14px;
  background: $panel-1;
  color: $text-color;
}

/* #ifdef H5 */
.layout-page {
  height: 100%!important;
}
uni-page-body{
    height: 100%;
}
/* #endif */
@import "./assets/scss/app.scss";
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  src: url("/static/uni.ttf");
}
/* #endif */
</style>
