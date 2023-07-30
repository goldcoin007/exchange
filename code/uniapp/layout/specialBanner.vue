<template>
  <div class="banner-container">
    <swiper :style="{width: '100vw', height: '410rpx'}" 
      :indicator-dots="swiperConfig.indicatorDots" 
      :indicator-color="swiperConfig.indicatorColor" 
      :indicator-active-color="swiperConfig.indicatorActiveColor"
      :autoplay="swiperConfig.autoplay" 
      :interval="swiperConfig.interval" 
      :duration="swiperConfig.duration" 
      :circular="swiperConfig.circular"
      :previous-margin="swiperConfig.previousMargin"
      :next-margin="swiperConfig.nextMargin"
      @change="swiperChange"
      @animationfinish="animationfinish">
      <swiper-item v-for="(item, i) in bannerList" :key="i">
		<!-- 1.当前展示为第1项时，bannerList最后一项和第二项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
		<!-- 2.当前展示为最后一项时，bannerList倒数第2项和第1项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
		<!-- 3.当前展示为其他项（非第1和最后1项）时，bannerList当前项的前1项和后1项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
		<!-- 4.padding值也需要根据不同项设定不同值，但理同justifyContent -->
        <div class="image-container" 
			:class="[curIndex===0?((i===listLen-1)?'item-left':(i===1?'item-right':'item-center')):(curIndex===listLen-1?(i===0?'item-right':(i===listLen-2?'item-left':'item-center')):(i===curIndex-1?'item-left':(i===curIndex+1?'item-right':'item-center')))]">
          <img :src="item.image_url" 
            class="slide-image" 
            :style="{
              transitionDuration: '.3s',
              transitionTimingFunction: 'ease'
            }"/>
            <!-- transform: curIndex===i?'scale(' + scaleX + ',' + scaleY + ')':'scale(1,1)', -->
            <div class="zhe"></div>
            <!-- @click="getBannerDetail(i)" -->
        </div>
      </swiper-item>
    </swiper>
    <!-- <div class="desc-wrap" :class="[isDescAnimating?'hideAndShowDesc':'']">
      <div class="title">{{bannerList[descIndex].title}}</div>
      <div class="desc">{{bannerList[descIndex].description}}</div>
    </div> -->
  </div>
</template>
<script>
export default {
    name: "special-Banner",
  props: {
	bannerList: {
		type: Array,
		default () {
			return []
		}
	},
	swiperConfig: {
		type: Object,
		default () {
			return {
				indicatorDots: true,
				indicatorColor: 'rgba(255, 255, 255, .4)',
				indicatorActiveColor: 'rgba(255, 255, 255, 1)',
				autoplay: false,
				interval: 3000,
				duration: 300,
				circular: true,
				previousMargin: '58rpx',
				nextMargin: '58rpx'
			}
		}
	},
	scaleX: {
		type: String,
		default: (634 / 550).toFixed(4)
	},
	scaleY: {
		type: String,
		default: (378 / 328).toFixed(4)
	}
  },
  computed:{
	listLen () {
		return this.bannerList.length
	}
  },
  data () {
    return {
      curIndex: 0,
      descIndex: 0,
      isDescAnimating: false,
    }
  },
  methods: {
    swiperChange (e) {
      this.$emit('curIndexs',this.bannerList[e.mp.detail.current].id)
      const that = this
      this.curIndex = e.mp.detail.current
      this.isDescAnimating = true
      let timer = setTimeout(function () {
        that.descIndex = e.mp.detail.current
        clearTimeout(timer)
      }, 150)
    },
    animationfinish (e) {
      this.isDescAnimating = false
    },
    getBannerDetail (index) {
	  uni.showLoading({
		title: '将前往详情页面',
		duration: 2000,
		mask: true
	  })
    }
  }
}
</script>
<style lang="scss" scoped>
.banner-container {
  width: 100vw;
  height: auto;
  .image-container {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	display: flex;
	.slide-image {
	  width: 80%;
	  height: auto;
	  z-index: 200;
	}
  }
  .item-left {
	justify-content: flex-end;
	padding: 0 0 0 0;
  }
  .item-right {
	justify-content: flex-start;
	padding: 0 0 0 0;
  }
  .item-center {
	justify-content: center;
	padding: 0 0 0 0;
  }
  .desc-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 98rpx;
    padding: 24rpx 66rpx 0;
    .title {
      width: 100%;
      height: 42rpx;
      line-height: 42rpx;
      color: #222222;
      font-size: 30rpx;
      font-family: 'PingFangTC-Regular';
      font-weight: 600;
      text-align: left;
    }
    .desc {
      margin-top: 4rpx;
      width: 100%;
      height: 34rpx;
      line-height: 34rpx;
      color: #999999;
      font-size: 24rpx;
      font-family: 'PingFangTC-Regular';
      text-align: left;
    }
  }
  @keyframes descAnimation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: .5;
    }
    50% {
      opacity: 0;
    }
    75% {
      opacity: .5;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes descAnimation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: .5;
    }
    50% {
      opacity: 0;
    }
    75% {
      opacity: .5;
    }
    100% {
      opacity: 1;
    }
  }
  .hideAndShowDesc {
    animation: descAnimation .3s ease 1;
    -webkit-animation: descAnimation .3s ease 1;
  }
}
.image-container{
    img{
        // filter: blur(5px);
    }
}
.item-center{
    .zhe{
        background-color:transparent;
    }
}
.zhe{
    z-index: 201;
    position: absolute;
    width: 80%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
}
</style>
