<template>
  <v-paging :ajax="getHistoryEntrust" class="h-max" ref="vPag">
    <template #box="list">
       <van-empty v-if="!$list(list).length" description="" />
      <div
        class="item bg-panel-4 m-md rounded-sm box-shadow"
        v-for="item in $list(list)"
        :key="item.id"
        @click="showDetail(item)"
      >
        <div
          class="head d-flex align-center border-b  p-x-md p-y-xs justify-between"
        >
          <div class="d-flex">
            <div>
              <div class="color-light fn-20">{{ item.symbol }}/USDT</div>
              <div class="fn-10">{{ item.created_at }}</div>
            </div>
          </div>
          <div class="d-flex">
            <span>{{ item.lever_rate }}X</span>
          </div>
        </div>
        <div class="p-x-md p-y-xs">
          <div class="row d-flex m-y-mini justify-between">
            <div class="label fn-sm">{{$t('contract.a6')}}</div>
            <div class="color-light">{{cals(item.side,item.order_type)}}</div>
          </div>
          <div class="row d-flex m-y-mini justify-between">
            <div class="label fn-sm">{{$t('contract.a7')}}/{{$t('contract.a8')}}</div>
            <div class="color-light">{{item.traded_amount}}/{{item.amount}}</div>
          </div>
          <div class="row d-flex m-y-mini justify-between">
            <div class="label fn-sm">{{$t('contract.a9')}}/{{$t('contract.b0')}}</div>
            <div class="color-light">{{item.avg_price||'--'}}/{{item.entrust_price||'--'}}</div>
          </div>
          <div class="row d-flex m-y-mini justify-between">
            <div class="label fn-sm">{{$t('contract.b1')}}</div>
            <div class="color-light">{{item.margin*1}}</div>
          </div>
          <div class="row d-flex m-y-mini justify-between">
            <div class="label fn-sm">{{$t('contract.b2')}}</div>
            <div class="color-light">{{item.fee*1}}</div>
          </div>
          <div class="row d-flex m-y-mini justify-between">
            <div class="label fn-sm">{{$t('contract.c7')}}</div>
            <div class="color-light">{{item.profit*1||'--'}}</div>
          </div>
          <div class="row d-flex m-y-mini justify-between">
            <div class="label fn-sm">{{$t('contract.b3')}}</div>
            <div class="color-light">{{ status(item.status) }}</div>
          </div>
          <div class="row d-flex m-y-mini justify-between" v-if="item.profit">
            <div class="label fn-sm">{{$t('contract.b4')}}</div>
            <div class="color-light">
                <!-- <v-button type="green-plain" class="m-l-xs rounded-xs" size="mini" plain
                :to="{path:'/pages/income/index',query:{
                  symbol:item.symbol,
                  side:item.side,
                  profitRate:item.profit/item.margin*100+'',
                  lever_rate:item.lever_rate,
                  avg_price:item.avg_price,
                  pair_name:item.symbol+'/USDT',
                  newPrice: newPrice,
                  position_side: 2,
                }}"
                >{{$t('contract.c8')}}</v-button> -->
                <v-button type="green-plain" class="m-l-xs rounded-xs" size="mini" plain @click="canvasImage(item)">{{$t('contract.c8')}}</v-button>
            </div>
          </div>
        </div>
      </div>
    <van-popup
      v-model="show"
      closeable
      close-on-popstate
      position="bottom"
      :style="{ height: '80%', width: '100%' }"
    >
      <div class="bg-panel-1 h-max" @touchstart.stop @touchmove.stop>
        <div class="fn-center title-box p-md bg-panel-4 fn-lg">
          {{$t('contract.c9')}}
        </div>
        <van-empty v-if="!order_details.length" :description="$t('contract.d0')" />
        <div class="item bg-panel-4 m-md rounded-sm p-md" v-for="item in order_details" :key="item.id">
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.d1')}}</div>
            <div class="color-light">{{item.unit_price}}</div>
          </div>
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.d2')}}</div>
            <div class="color-light">{{item.trade_amount}}</div>
          </div>
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.b2')}}</div>
            <div class="color-light">{{item.trade_buy_fee}}</div>
          </div>
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.d3')}}</div>
            <div class="color-light">{{item.created_at}}</div>
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup
    class="share"
    custom-style="width:100%;height:100%;background-color:transparent;padding-top:5%" 
    :show="canvasShow"
    @close="canvasShow = false">
        <view class="canvas" >
            <canvas canvas-id="mycanvas" style="width: 80%;height: 1120rpx;border-radius: 10px;overflow: hidden;"></canvas>
        </view>
        <view class="foot" :style="[{'bottom':android=='iOS'?'60px':'0px'}]">
            <view @click="saveImage" class="bg-lin w-8/12 rounded-xs autowidth fn-center p-y-ms m-t-lg">
                {{$t('common.save')}}
            </view>
            <view @click="cancel" class="autowidth fn-center p-y-ms m-y-lg border-bb">
                {{$t('common.cancel')}}
            </view>
        </view>
    </van-popup>
    </template>
  </v-paging>
</template>
<script>
import Profile from "@/api/profile";
import Contract from "@/api/contract";
import math from "@/utils/class/math";
export default {
  name: "contract-entrustment",
  data() {
    return {
      show:false,
      activeItem:{},
      order_details:[],
      newPrice: 0,
      canvasShow:false,
      myCanvas:'',
      imgurl:'',
      detail:''
    };
  },
  props:['tabs'],
  computed:{
      android(){
          // #ifdef APP-PLUS
          return plus.os.name
          // #endif
      }
  },
  methods: {
      omitTo:math.omitTo,
      canvasImage(i){
          var that=this
          that.canvasShow=true
          Contract.positionShare({
            symbol: i.symbol,
            position_side: i.side,
            order_no:i.order_no,
            lang:uni.getStorageSync('language')||'zh-CN'
          }).then((ress) => {
                if(ress.code==200){
                    that.sha(ress,i)
                }
          });
      },
      sha(ress,i){
          let arr=[];
          ress.data.share_imgs.forEach((res)=>{
              if(i.profit>0&&res.type==1){
                  arr.push(res)
              }else if(i.profit<0&&res.type==2){
                  arr.push(res)
              }
          })
          
          var share_imgs=arr[Math.round(Math.random()*arr.length)];
          if(!share_imgs||!this.detail){
              this.$toast(this.$t('recharge.a6'))
              this.canvasShow=false
              return
          }
          let windowHeight,windowWidth
          uni.getSystemInfo({
              success: function (res) {
                  windowHeight=res.windowHeight
                  windowWidth=res.windowWidth
              }
          });
          let myCanvas = uni.createCanvasContext('mycanvas', this); 
          //画布背景
          //参数：图片，左偏移，上偏移，宽，高
          myCanvas.drawImage(share_imgs.bg_img,0,0,windowWidth,windowHeight);
          myCanvas.drawImage(share_imgs.peri_img,-40,0,windowWidth,windowHeight*0.3);
          myCanvas.drawImage('../../static/img/logo.png',25,windowHeight*0.6,50,50);
          myCanvas.drawImage(this.detail,windowWidth*0.58,windowHeight*0.59,65,65);
          myCanvas.textAlign = 'left';
          myCanvas.setFillStyle('#000000')
          myCanvas.font = '12px Arial';//绘制文字
          myCanvas.fillText('全球合约领跑者',88,windowHeight*0.653);
          myCanvas.font = '16px Arial';
          myCanvas.fillText('AMATAK',88,windowHeight*0.63);
          myCanvas.font = '14px Arial';
          myCanvas.setFillStyle('#717171')
          myCanvas.fillText(i.symbol+'/USDT',25,windowHeight*0.53);
          myCanvas.fillText(this.$t("contract.k0"),uni.getStorageSync('language')=='zh-CN'?windowWidth*0.34:windowWidth*0.29,windowHeight*0.53);
          myCanvas.fillText(this.$t("contract.j7"),uni.getStorageSync('language')=='zh-CN'?windowWidth*0.6:windowWidth*0.56,windowHeight*0.53);
          myCanvas.setFillStyle('#000000')
          myCanvas.fillText(this.cals(i.side,i.order_type),25,windowHeight*0.555);
          myCanvas.fillText(ress.data.price1>1?this.omitTo(ress.data.price1,2):this.omitTo(ress.data.price1,4),uni.getStorageSync('language')=='zh-CN'?windowWidth*0.345:windowWidth*0.33,windowHeight*0.555);
          myCanvas.fillText(ress.data.price2>1?this.omitTo(ress.data.price2,2):this.omitTo(ress.data.price2,4),uni.getStorageSync('language')=='zh-CN'?windowWidth*0.605:windowWidth*0.6,windowHeight*0.555);
          
          myCanvas.textAlign = 'center';
          myCanvas.setFillStyle('#000000')
          myCanvas.font = '25px Arial';
          this.drawText(myCanvas, share_imgs.title, windowWidth/2.5, windowHeight*0.34, 30, 265);// 调用行文本换行函数
          // myCanvas.fillText(share_imgs.title,windowWidth/2.5,windowHeight*0.35);
          myCanvas.textAlign = 'center';
          myCanvas.font = '12px Arial';
          myCanvas.fillText(this.$t('option.a4'),windowWidth/2.5,windowHeight*0.42);
          myCanvas.setFillStyle(i.profit>0?'#60c08c':'#ea3131')
          myCanvas.font = 'bold 50px Arial';
          myCanvas.fillText(this.omitTo(i.profit/i.margin*100,2)+'%',windowWidth/2.5,windowHeight*0.48);
          myCanvas.draw(true,()=>{
              uni.canvasToTempFilePath({
                  canvasId: 'mycanvas',
                  // destWidth: windowWidth, //分享图片尺寸=画布尺寸1*缩放比0.5*像素比2
                  // destHeight: windowHeight*0.9,
                  success: (res) => {
                      // 在H5平台下，tempFilePath 为 base64
                      this.imgurl = res.tempFilePath;
                      // this.canvasShow = false;
                      uni.setStorageSync('person-card',this.imgurl);
                    },
                  fail: () => {
                      
                  }
              });
          });
      },
      drawText (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
          let lineWidth = 0;
          let lastSubStrIndex = 0; //每次开始截取的字符串的索引
          for (let i = 0; i < str.length; i++) {
              lineWidth += ctx.measureText(str[i]).width;
              if (lineWidth > canvasWidth) {
                  ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
                  initHeight += 22; //22为 文字大小20 + 2
                  lineWidth = 0;
                  lastSubStrIndex = i;
                  titleHeight += 22;
              }
              if (i == str.length - 1) { //绘制剩余部分
                  ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
              }
          }
          // 标题border-bottom 线距顶部距离
          titleHeight = titleHeight + 10;
          return titleHeight;
      },
      saveImage(){
          // uni.showActionSheet({
          //     itemList: [this.$t('common.save')], 
          //     success: (res) => {
          //         if(res.tapIndex == 0){
                      
          //         }
          //     },
          //     fail: function (res) {
          //         console.log(res.errMsg);
          //     }
          // });
          uni.saveImageToPhotosAlbum({
              filePath: this.imgurl,//    图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
              fileType: 'jpg', //图片的质量，目前仅对 jpg 有效。取值范围为 (0, 1]，不在范围内时当作 1.0 处理。
              quality: 1,
              success: () => {
                  this.canvasShow = false;
                  uni.showToast({
                      title: this.$t('common.b3'),
                      duration: 2000
                  });
              },
              fail: () => {
                  uni.showToast({
                      title: this.$t('common.b4'),
                      duration: 2000 
                  });
              }
          });
      },
      generalizeInfo() {
        Profile.qrcode().then((res) => {
          this.detail = res.data;
          console.log(this.detail)
        });
      },
      // 获取买卖盘
      getMarketInfo() {
          let data = {
              symbol: this.symbolLeft,
          };
          Contract.getMarketInfo(data).then((res) => {
              this.newPrice = res.data.swapTradeList[0].price;
          });
      },
    getHistoryEntrust: Contract.getHistoryEntrust,
    status(status) {
      switch (status) {
        case 0:
          return this.$t('contract.b6');
        case 1:
          return this.$t('contract.b7');
        case 2:
          return this.$t('contract.b9');
        case 3:
          return this.$t('contract.b9');
      }
    },
    cals(side, order_type) {
      // side - order_type
      let map = {
        "1-1": this.$t('contract.c0'),
        "1-2": this.$t('contract.c1'),
        "2-1": this.$t('contract.c2'),
        "2-2": this.$t('contract.c3'),
      };
      return map[`${side}-${order_type}`];
    },
    showDetail(item){
      Contract.getEntrustDealList({
        entrust_id:item.id,
        symbol:item.symbol
      },{loading:true}).then(res=>{
        this.order_details= res.data
        this.show = true
      })
    },
    cancel(){
        let windowHeight,windowWidth
        uni.getSystemInfo({
            success: function (res) {
                windowHeight=res.windowHeight
                windowWidth=res.windowWidth
            }
        });
        this.canvasShow=false
        let myCanvas = uni.createCanvasContext('mycanvas', this);
        myCanvas.width=0
        myCanvas.height=0
    },
   
  },
    mounted() {
      this.generalizeInfo()
      if (this.symbolLeft) {
          this.getMarketInfo();
      }
    }
};
</script>
<style lang="scss" scoped>
  .m-y-mini{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .canvas{
      canvas{
          margin: 50px auto 0 auto;
          transform: scale(0.8);
      }
  }
  .foot{
      width:100%;
      position:fixed;
      z-index: 100;
      /* #ifdef H5 */
      bottom: 0;
      /* #endif */
      background-color: #2c2f3a;
      color: black;
  }
  .autowidth{
      margin: 0 auto;
  }
  .bg-lin{
      background: linear-gradient(to right,#f6c769,#f3b644);
  }
  .border-bb{
      border-top: 3px solid #000;
      color: #969696;
  }
  /deep/ .share.vant-popup-index{
      z-index: 100;
  }
</style>
