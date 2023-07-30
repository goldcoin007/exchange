<template>
  <div id="dowebok" ref="dowebok">
    <div class="section">
      <div class="banner-block col-xs-8">
        <el-carousel :interval="6000" height="490px">
          <el-carousel-item v-for="item in pcBannerList" :key="item.id">
             <img :src="item.imgurl" width="100%" height="100%" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 公告 -->
      <div class="notice container d-flex align-items-center">
        <div class="item d-flex" @click="$router.push(`/notice/${item.id}`)" v-for="(item) in noticeList" :key="item.id">
          <div class="title text-truncate">{{item.title}}</div>
          <div class="time">{{getNoticeDate(item.created_at)}}</div>
        </div>
        <router-link to="/notice" class="text-warning">{{$t('home.more')}}</router-link>
      </div>
      <!-- 走马灯 -->
      <div class="marquee">
        <div class="marquee-pargress d-flex">
          <ul class="marquee-list d-flex" v-for="box in 4" :key="box">
            <li
              class="item border-right"
              v-for="item in homeList"
              :key="item.pair + '' + box"
            >
              <div class="symbol fn-16 mb-2">{{ item.pair }}</div>
              <div class="d-flex justify-content-between">
                <span>{{ item.price }}</span>
                <span :class="item.increase >= 0 ? 'increace' : 'decreace'">
                  {{ item.increaseStr }}
                  <i class="el-icon-caret-top" v-if="item.increase >= 0"></i>
                  <i class="el-icon-caret-bottom" v-else></i>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="section markets">
      <div class="new-ticker-block new-ticker-block-section">
        <div class="container">
          <div class="markets__container new-ticker-block-wrap shadow">
            <div class="ticker-head">
              <ul class="nav nav-tabs ticker-nav" role="tablist">
                <li class="nav-item">
                  <div class="markets__title">
                    {{ $t("home.marketCenter") }}
                  </div>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="javascript:void(0);"
                    @click="tab = 'Optional'"
                    :class="{ active: tab == 'Optional' }"
                  >
                    {{ $t("home.optional") }}
                    <i class="fa fa-stroopwafel"></i>
                  </a>
                </li>
                <li
                  class="nav-item"
                  @click="tab = item.coin_name"
                  v-for="item in marketList"
                  :key="item.coin_name"
                >
                  <a
                    class="nav-link"
                    :class="{ active: tab == item.coin_name }"
                    href="javascript:void(0);"
                    >{{ item.coin_name }}</a
                  >
                </li>
              </ul>
            </div>
            <div class="market-ticker-block">
              <!-- Tab panes -->
              <div class="tab-content">
                <div
                  class="tab-pane fade in show"
                  :class="{ active: 'Optional' == tab }"
                >
                  <table class="table coin-list table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th scope="col">{{ $t("home.coinType") }}</th>
                        <th scope="col">{{ $t("home.latestPrice") }}</th>
                        <th scope="col">
                          {{ $t("home.upAndDown") }}
                          <span class="ti-arrow-down"></span>
                        </th>
                        <th scope="col">{{ $t("home.heigh") }}</th>
                        <th scope="col">{{ $t("home.low") }}</th>
                        <th scope="col">
                          <div class="text-center">{{ $t("home.vol") }}</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in collect"
                        v-show="isShow(item.pair_name)"
                        :key="item.pair_name"
                      >
                        <td>
                          <i
                            href="javascript:void(0);"
                            @click="option(item)"
                            :class="{ active: isCoolect(item) }"
                            class="el-icon-star-on fn-22"
                          ></i>
                        </td>
                        <td>
                          <router-link :to="`/exchange/${item.symbol}`">{{
                            item.pair_name
                          }}</router-link>
                        </td>
                        <td>
                          <span
                            :class="
                              item.increase * 1 >= 0 ? 'increace' : 'decreace'
                            "
                            >{{ item.close }}</span
                          >
                        </td>
                        <td>
                          <span
                            :class="
                              item.increase * 1 >= 0 ? 'increace' : 'decreace'
                            "
                            >{{ item.increaseStr }}</span
                          >
                        </td>
                        <td>{{ item.high }}</td>
                        <td>{{ item.low }}</td>
                        <td class="text-center">{{ item.vol }}</td>
                      </tr>
                      <tr v-if="!collect.length">
                        <td colspan="7">
                          <no-record />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  class="tab-pane fade in show"
                  :class="{ active: parentItem.coin_name == tab }"
                  v-for="parentItem in marketList"
                  :key="parentItem.coin_name"
                >
                  <table class="table coin-list table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th scope="col">{{ $t("home.coinType") }}</th>
                        <th scope="col">{{ $t("home.latestPrice") }}</th>
                        <th scope="col">
                          {{ $t("home.upAndDown") }}
                          <span class="ti-arrow-down"></span>
                        </th>
                        <th scope="col">{{ $t("home.heigh") }}</th>
                        <th scope="col">{{ $t("home.low") }}</th>
                        <th scope="col">
                          <div class="text-center">{{ $t("home.vol") }}</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <template
                        v-for="(item, idx) in parentItem.marketInfoList"
                      >
                        <tr
                          v-if="idx < 8"
                          v-show="isShow(item.pair_name)"
                          :key="item.pair_name"
                        >
                          <td>
                            <i
                              href="javascript:void(0);"
                              @click="option(item)"
                              :class="{ active: isCoolect(item) }"
                              class="el-icon-star-on star-icon fn-22"
                            ></i>
                          </td>
                          <td>
                            <router-link :to="`/exchange/${item.symbol}`">{{
                              item.pair_name
                            }}</router-link>
                          </td>
                          <td>
                            <span
                              :class="
                                item.increase * 1 >= 0 ? 'increace' : 'decreace'
                              "
                              >{{ item.close }}</span
                            >
                          </td>
                          <td>
                            <span
                              :class="
                                item.increase * 1 >= 0 ? 'increace' : 'decreace'
                              "
                              >{{ item.increaseStr }}</span
                            >
                          </td>
                          <td>{{ item.high }}</td>
                          <td>{{ item.low }}</td>
                          <td class="text-center">{{ item.vol }}</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                  <!-- coin-list table -->
                </div>
                <!-- market-ticker-block -->
              </div>
            </div>
          </div>

          <div class="text-center">
            <router-link
              to="/market"
              tag="button"
              type="button"
              class="view-more btn btn-outline-light"
            >
              {{ $t("home.more") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="section features">
      <!-- new-ticker-block -->

      <header>
        <h3>{{ $t("home.features") }}</h3>
      </header>

      <aside class="activity-box">
        <div class="swiper-container">
          <ul class="swiper-wrapper">
            <li
              :class="[`swiper-slide`, { zoom: item.zoom }]"
              v-for="(item, index) in featuresList"
              :key="index"
            >
              <!-- 鼠标移上去效果 -->
              <section class="active">
                <div>
                  <img :src="item.thumb" width="80" />
                </div>

                <!-- 标题内容 -->
                <h3>{{ item.title }}</h3>

                <!-- 固定内容的盒子 -->
                <section>{{ item.content }}</section>
              </section>

              <!-- 静止状态样式 -->
              <section class="default">
                <!--固定背景的盒子-->
                <div>
                  <img :src="item.picture" width="130" />
                </div>
                <!-- 标题内容 -->
                <h3>{{ item.title }}</h3>
              </section>
            </li>
          </ul>

          <!-- Add Arrows -->
          <!-- 
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div> 
                    -->
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>

        <div class="turning">
          <!-- Add Arrows -->
          <a href="javascript:void 0" class="prevBtn"></a>
          <a href="javascript:void 0" class="nextBtn"></a>
        </div>
      </aside>
    </div>
    <div class="section">
      <!-- 多平台下载 -->
      <div class="multi-platform" ref="platform">
        <div class="d-flex container align-items-center">
          <div class="left text-center d-flex align-items-center">
            <div class="d-flex flex-column align-items-center">
              <div class="h2">{{ $t("home.download") }}</div>
              <div class="tip1">{{ $t("home.easy") }}</div>
              <div class="qr-code-box">
                <vue-qr :text="downloadLink" :margin="0" :size="200" />
                <div class="label">
                  <img
                    class="scan-icon"
                    src="../../assets/img/homescan.png"
                    alt=""
                  />
                  {{ $t("home.skan") }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <img
              class=""
              src="../../assets/img/home_bgb.png"
              alt=""
            />
        </div>
      </div>
    </div>

    <div class="section news">
      <!-- wallets-section -->
      <div class="lattest-news-section">
        <div class="container">
          <header>
            <h3 class="news-title">{{$t('common.noviceTutorial')}}</h3>
            <div class="tips">{{$t('home.core_advantages')}}</div>
          </header>
          <div class="row content">
            <template v-for="(item, idx) in articleList">
              <router-link tag="div" :to="{name:'college-detail',params:{cid:item.category_id,aid:item.id}}" class="item rounded" :key="idx">
                <figure>
                  <img :src="item.full_cover" alt="" />
                  <figcaption>
                    <h5 class="mt-4">{{ truncate(item.title, 26) }}</h5>
                  </figcaption>
                  <div class="eps-2" v-html="item.excerpt"></div>
                </figure>
                <article class="post-style-one" v-if="false">
                  <span class="post-metat-date">{{ item.updated_at }}</span>
                  <!-- <h4 class="post-title">
                                    <a href="javascript:void(0);">{{item.title}}</a>
                                </h4> -->
                  <!-- <p class="post-entry">{{(item.body)}}</p> -->
                  <p class="post-entry" v-html="item.excerpt"></p>

                  <router-link
                    class="post-link"
                    :to="`/college/detail/${item.category_id}/${item.id}`"
                    >{{ $t("home.detail") }}</router-link
                  >
                </article>
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- lattest-news-section -->
    <div class="colto-section">
      <div class="container">
        <div
          class="colto-content-wrap d-flex flex-column align-items-center justify-content-center"
        >
          <div class="colto-content">
            <div class="title">{{ $t("common.start-trade") }}</div>
          </div>
          <div class="colto-btn-group" v-if="!isLogin">
            <router-link tag="button" to="/sign-in" class="btn btn-success rounded-pill callto-btn">{{
              $t("common.login")
            }}</router-link>
            <span>or</span>
            <router-link tag="button" to="/sign-up" class="btn btn-primary rounded-pill callto-btn">{{
              $t("common.register")
            }}</router-link>
          </div>
          <div v-else class="colto-btn-group">
            <router-link tag="button" to="/exchange" class="btn btn-primary rounded-pill callto-btn">{{
              $t("common.trading")
            }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// import VueAwesomeSwiper from "vue-awesome-swiper";
import vueQr from "vue-qr";
import Home from "@/api/home";
// import "swiper/swiper-bundle.css";
import Socket from "@/api/server/Socket.js";
import College from "@/api/college";
import Member from "@/api/member";
// Vue.use(VueAwesomeSwiper);
export default {
  components: {
    vueQr,
  },

  computed: {
    isLogin() {
      return Boolean(localStorage.token);
    },
    downloadLink() {
      return "https://web.coin.amatak.net/download";
    },
    // 特色卡片列表
    featuresList() {
      return [
        {
          zoom: false,
          bgclr: "rgba(76, 48, 115, 1)",
          picture: require("@/assets/img/features/trade.png"),
          thumb: require("@/assets/img/features/trade-thumb.png"),
          title: this.$t("home.stablecoin_title"),
          content: this.$t("home.stablecoin_cont"),
        },
        {
          zoom: false,
          bgclr: "rgba(60, 52, 125, 1)",
          picture: require("@/assets/img/features/safe.png"),
          thumb: require("@/assets/img/features/safe-thumb.png"),
          title: this.$t("home.security_title"),
          content: this.$t("home.security_cont"),
        },
        {
          zoom: false,
          bgclr: "rgba(93, 46, 93, 1)", // 背景色
          picture: require("@/assets/img/features/server.png"),
          thumb: require("@/assets/img/features/server-thumb.png"),
          title: this.$t("home.service_title"),
          content: this.$t("home.service_cont"),
        },
        {
          zoom: false,
          bgclr: "rgba(60, 52, 125, 1)",
          picture: require("@/assets/img/features/analysis.png"),
          thumb: require("@/assets/img/features/analysis-thumb.png"),
          title: this.$t("home.analy_title"),
          content: this.$t("home.analy_cont"),
        },
        {
          zoom: false,
          bgclr: "rgba(76, 48, 115, 1)",
          picture: require("@/assets/img/features/tech.png"),
          thumb: require("@/assets/img/features/tech-thumb.png"),
          title: this.$t("home.technology_title"),
          content: this.$t("home.technology_cont"),
        },
        {
          zoom: false,
          bgclr: "rgba(93, 46, 93, 1)",
          picture: require("@/assets/img/features/flow.png"),
          thumb: require("@/assets/img/features/flow-thumb.png"),
          title: this.$t("home.liquidity_title"),
          content: this.$t("home.liquidity_cont"),
        },
      ];
    },
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
      },
      bannerList: [],
      articleList: [],
      homeList: [],
      iconList: [],
      marketList: [],
      tab: "Optional",
      searchTxt: "",
      skro: new Skroll(),
      collect: [],
      ws: null,
      pcBannerList:[],
      noticeList:[]

    };
  },
  methods: {
    truncate(str, length) {
      return _.truncate(str, { length });
    },
    isShow(str) {
      let reg = new RegExp(this.searchTxt, "ig");
      return reg.test(str);
    },
    filterCode: function (str) {
      return str.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "");
    },
    swiperPrev() {
      let $swiper = this.$refs.swiper.$swiper;
      $swiper.slidePrev();
    },
    swiperNext() {
      let $swiper = this.$refs.swiper.$swiper;
      $swiper.slideNext();
    },
    indexList() {
      Home.indexList()
        .then((res) => {
          this.bannerList = res.bannerList;
          
          this.homeList = res.homeList;
          this.marketList = res.marketList;
          this.iconList = res.iconList;
          this.pcBannerList = res.pcBannerList
          this.tab = this.marketList[0].coin_name;
          setTimeout(() => {
            this.skroll();
          }, 100);
        })
        .catch((res) => {});
    },
    skroll() {
      let skro = this.skro;

      skro
        .add(".marquee-list .item", {
          animation: "fadeInLeft",
          delay: 80,
          duration: 1000,
        })
        .add(".new-ticker-block", {
          animation: "fadeInRight",
          delay: 80,
          duration: 800,
        })
        .add(".shlitu", {
          animation: "fadeInLeft",
          delay: 80,
          duration: 800,
        })
        .add(".activity-box", {
          animation: "zoomIn",
          delay: 80,
          duration: 800,
        })
        .add(".lattest-news-section .item", {
          animation: "zoomIn",
          wait: 150,
          delay: 80,
          duration: 800,
        })
        .init();
    },

    // 是否为自选
    isCoolect(i) {
      return this.collect.map((item) => item.pair_name).includes(i.pair_name);
    },

    // 获取自选交易列表
    getCollect() {
      Home.getCollect()
        .then((res) => {
          this.collect = res || [];
        })
        .catch((err) => {});
    },

    // 添加自选
    option(item) {
      let data = {
        pair_name: item.pair_name,
      };
      Home.option(data)
        .then((res) => {
          this.getCollect();
          if (res) {
            this.$message.success(this.$t("home.add"));
          } else {
            this.$message.success(this.$t("home.cancel"));
          }
        })
        .catch((err) => {});
    },

    // 替换自选数据
    replaceOptional() {
      let collect = this.collect.map((item) => item.pair_name);
      this.marketList.forEach((parentItem) => {
        parentItem.marketInfoList.forEach((item) => {
          let idx = collect.indexOf(item.pair_name);
          if (idx != -1) {
            this.collect.splice(idx, 1, item);
          }
        });
      });
    },

    // 链接socket
    indexMarketList() {
      const ws = new Socket(this.Globals.Server.Path.WS);
      ws.on("open", () => {
        this.ws = ws;
        ws.send({
          cmd: "sub",
          msg: "indexMarketList",
        });
      });
      ws.on("message", (res) => {
        let { data, msg, code, sub, type, status } = res;
        if (sub == "indexMarketList") {
          this.marketList = data;
          this.replaceOptional();
        } else if (type == "ping") {
          ws.send({
            cmd: "pong",
          });
        }
      });
    },

    // 鼠标移入卡片的样式
    addZoom(idx) {
      // 放大图片
      this.featuresList.forEach((item, key, arr) => {
        if (idx == key) {
          arr[key].zoom = true;
        } else {
          arr[key].zoom = false;
        }
      });
    },

    // 鼠标移出卡片的样式
    removeZoom(idx) {
      this.featuresList[idx].zoom = false;
    },
    // 新手教程
      getArticleList() {
            College.getArticleList(18).then(data => {
                this.articleList = data.splice(0,3);
                  setTimeout(() => {
            this.skroll();
          }, 100);
            }).catch();
        },
    // 獲取公告列表
    article(){
      Member.article({type:'notice'}).then(res=>{
        this.noticeList = res.data.splice(0,4)
      })
    },
    getNoticeDate(str){
      let _time = new Date(str);
      return (_time.getMonth()+1)+'-'+_time.getDate()
    }
  },
  mounted() {
    this.indexList();
    this.article()
    if (this.isLogin) {
      this.getCollect();
    }
    this.indexMarketList();
    this.getArticleList()
    /*
     * swiper 轮播图效果
     */
    // features 卡片轮播
    const mySwiper = new Swiper(".swiper-container", {
      // slidesPerGroup: 1,
      // loop: true,
      // loopFillGroupWithBlank: true,
      slidesPerView: 3, // 每个视口显示个数
      // spaceBetween: 30,    // 盒子之间的距离 由于异形slide初始化缩小了 因此不再设置距离
      // freeMode: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      // navigation: {
      //     nextEl: '.swiper-button-next',
      //     prevEl: '.swiper-button-prev',
      // },
      // on: {
      //     transitionEnd: function () {
      //         $('.features aside ul').css('margin-left', `calc(50% - 640px)`)
      //     },
      // },
    });

    $(".prevBtn").click(function () {
      // if (mySwiper.activeIndex <= 0) {
      //     console.log(1)
      //     $(this).addClass('my-button-disabled');

      // } else { // 1+
      mySwiper.slidePrev();
      // }
    });

    $(".nextBtn").click(function () {
      // console.dir(mySwiper)
      // if (mySwiper.realIndex == )
      mySwiper.slideNext();
    });
  },
};
</script>

<style lang="scss" scoped>
// .view-more {
//     background: #fd5b2c !important;
// }
.notice{
   white-space: nowrap;
  .item{
    white-space: nowrap;
    padding: 15px 0;
    width: 24%;
    box-sizing: border-box;
    padding-right: 20px;
    cursor: pointer;
    .title{
      width: 80%;
    }
    .time{
      margin-left: 5px;
      color: #999;
    }
  }
}

.section {
  overflow-x: hidden;
}

.news {
  // height: 720px;
  background-color: #2c2c38;
  color: white;
  padding: 80px 0 0;
  header {
    height: 38px;
    text-align:center;
    h3 {
      // border : 1px solid red;
      margin-bottom: 0 !important; // 去除mb-4效果
      @include font(Overpass, 30, 38, bold);
      position: relative;
      &::after{
          position: absolute;
          content: '';
          display: block;
          left: 50%;
          bottom:-10px;
          transform: translateX(-50%);
          height: 3px;
          width: 50px;
          background: #4681FB;
      }
    }
    .tips{
        margin-top: 20px;
        font-size: 14px;
    }
  }

  .content {
    margin: 50px auto;
    // border: 1px solid yellow;
    @include flexible(row, space-between, flex-start, wrap);
    .item {
      border-radius: 2px;
      width: 370px;
      padding: 10px;
      margin-bottom: 20px;
      @include flexible(row, flex-start, center);
      // border: 1px solid red;
      figure {
        width: 100%;
        padding: 5px;
        flex-shrink: 0;
        img {
          display: block;
          width: 100%;
          height: 230px;
        }
        figcaption {
          @include font(Overpass, 15, 50);
        }
        // border: 1px solid red;
      }
      article {
        border: none !important;
        height: 100%;
        overflow: hidden;
        margin-bottom: 41px;
      }
      .eps-2 {
        font-size: 12px;
        color: #8a8a98;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-break: break-all;
      }
    }
  }
}
.ticker-nav .nav-item {
  color: #888894;
}
.ticker-nav .nav-item a {
  font-weight: normal !important;
}

.ticker-nav .nav-item a.active {
  @include font(Overpass, 15, null, white, 800);
  @include flexible(row, center, center);

  &::after {
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
  }
}

.start-trade {
  background: #fd5b2c !important;
  padding: 0 !important;
  border: none;
  width: 196px;
  height: 58px;
  border-radius: 29px;
  text-align: center;
  @include font(Overpass, 18, 58, #fff);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.marquee {
  li.item {
    padding: 10px 18px !important;
  }
}

.markets {
  // border: 1px solid red;
  .markets__title {
    line-height: 55px;
    color: white;
    font-size: 24px;
    padding-left: 15px;
  }

  .markets__container {
    // border : 1px solid blue;
    margin: 50px auto 50px; // 居中
  }
}

.features {
  width: 100%;
  // 固定高度 宽度自适应
  height: 700px;
  padding: 70px 0 0;
  // 图片默认底部对齐 水平居中
  background: #2c2c38;
  // background: #fff;
  // 只设置宽度100% 高度自适应
  // 超出的部分被裁剪
  background-size: auto 100%;
  color: white;
}

.features header {
  width: 1280px;
  margin: 0 auto;
  height: 38px;
  @include flexible(row, center, center);

  h3 {
    @include font(Overpass, 30, 38, bold);
  }
}

.features aside {
  width: 1350px;
  margin: 35px auto 0px; // 居中
  padding: 0 85px;
  position: relative;
}

.features aside ul {
  height: 500px;

  li.swiper-slide {
    // 原始尺寸
    // width           : 330px !important;
    // height          : 400px !important;
    transition: transform 500ms ease 100ms;
    border-radius: 8px;
    overflow: hidden;
    // 放大尺寸
    width: 363px !important;
    height: 440px !important;
    margin: 0 15px;
    transform: scale(0.9); // 初始化收缩

    box-shadow: 0 0.5em 1rem rgba(0, 0, 0, 0.15);
    display: flex;

    flex-direction: column;

    section {
      padding: 80px 0 0 0;
      flex-grow: 1;
      text-align: center;
    }

    h3 {
      @include font(Overpass, 22, 30);
      padding: 50px;
      // height: 100px;
      text-align: center;
    }
    .default {
      display: block;
      background: #383847;
    }
    .active {
      display: none;
    }
  }

  li:hover {
    .default {
      display: none;
    }
    .active {
      display: block;
    }
    // 异形切换 还原大小
    transform: scale(1);
    background: #383847;
    border: 1px solid #383847;
    color: white;

    div {
      height: 120px;
      padding: 20px;
      text-align: left;
    }

    h3 {
      padding: 20px;
      // height: 80px;
      text-align: left;
    }

    section {
      padding: 0 20px;
      height: 100%;
      // display: none; // 初始化隐藏
      @include font(Overpass, 14, 24, white);
      // text-indent: 20px;
      text-align: left;
    }
  }
}

.my-button-disabled {
  opacity: 0.2;
  cursor: default;
}

.features aside .turning {
  position: absolute;

  width: 100%;
  left: 0;
  top: calc(50% - 40px);

  @include flexible(row, space-between, center);

  // border: 1px solid blue;
  a {
    width: 50px;
    height: 50px;

    @include flexible(row, center, center);
    color: white;
    &:first-child {
      background: url("../../assets/img/arrow-left.svg") center center;
      background-size: 100%;
    }

    &:last-child {
      background: url("../../assets/img/arrow-right.svg") center center;
      background-size: 100%;
    }
  }

  .disabled {
    color: #666;
    cursor: default;
  }
}

.swiper-container {
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: inset 0 0 5px #eee;
    border: 1px solid #fff;
    margin: 0 8px !important;
  }

  // 箭头颜色
  --swiper-theme-color: #fff;

  // 分页选中的底色
  --swiper-pagination-color: rgba(0, 0, 0, 0.5);

  /* 两种都可以 */
  .swiper-slide {
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 50px;
    height: 50px;
    background: url("../../assets/img/circle@2x.png") center center;
    background-size: 100%;

    // border: 1px solid pink;
    &::after {
      font-size: 16px !important;
    }
  }

  .swiper-button-next {
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
  }

  .swiper-slide-active,
  .swiper-slide-duplicate-active {
    // transition: all 1s;
    // // 异形切换
    // transform: scale(1);
    // //
    // opacity: 1;
    // //
    // margin-right: 30px;
    // section {
    //     background: none!important;

    //     div {
    //         // display : block;
    //         color: rgba(255, 255, 255, 1);
    //     }
    // }
  }
}
</style>
