<template>
  <div class="course-page">
    <div class="banner">
      <div class="container pt-3">
        <div class="row py-5">
          <div class="col-5 left">
            <div class="title h3 text-light">{{$t('course.buy')}}</div>
            <div>
              <ul class="list">
                <li class="d-flex align-items-start my-3">
                  <div class="num text-light">1</div>
                  <div>
                    <div class="label h5">{{$t('course.register')}} AMATAK</div>
                    <div class="txt">{{$t('course.visit',{name:'AMATAK'})}}</div>
                  </div>
                </li>
                <li class="d-flex align-items-start my-3">
                  <div class="num text-light">2</div>
                  <div>
                    <div class="label h5">{{$t('course.realName')}}</div>
                    <div class="txt">{{$t('course.upload')}}</div>
                  </div>
                </li>
                <li class="d-flex align-items-start my-3">
                  <div class="num text-light">3</div>
                  <div>
                    <div class="label h5">{{$t('course.oneClick')}}</div>
                    <div class="txt">{{$t('course.inAssets')}}</div>
                  </div>
                </li>
              </ul>
              <button class="btn btn-primary">{{$t('course.tradeNow')}}</button>
            </div>
          </div>
          <div class="col-7 right">
            <video class="video" controls src></video>
          </div>
        </div>
      </div>
      <div class="banner-tab">
        <div class="container">
          <div class="row">
            <div class="col-12 d-flex">
              <div class="w-25 item active">
                <div class="icon fn-22">
                  <i class="default el-icon-refresh"></i>
                  <i class="iconshow el-icon-coin"></i>
                </div>
                <div class="txt">{{$t('course.buy')}}</div>
              </div>
              <div class="w-25 item">
                <div class="icon fn-22">
                  <i class="default el-icon-refresh"></i>
                  <i class="iconshow el-icon-coin"></i>
                </div>
                <div class="txt">{{$t('course.currencyTransaction')}}</div>
              </div>
              <div class="w-25 item">
                <div class="icon fn-22">
                  <i class="default el-icon-refresh"></i>
                  <i class="iconshow el-icon-coin"></i>
                </div>
                <div class="txt">{{$t('course.contractEntryTransaction')}}</div>
              </div>
              <div class="w-25 item">
                <div class="icon fn-22">
                  <i class="default el-icon-refresh"></i>
                  <i class="iconshow el-icon-coin"></i>
                </div>
                <div class="txt">{{$t('course.how')}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="container course-list">
      <div class="row mt-3">
        <div class="col-12">
          <div class="title h3 my-4 d-flex justify-content-between">
             <span>
               {{$t('course.noviceTutorial')}}
             </span>
            <a href="#/course/list/research" class="fn-14">{{$t('course.seeMore')}}&gt;&gt;</a>        
          </div>
          <div class="row justify-content-between">
            <div class="item col-lg-3 col-md-6 mb-4 col-xs-12" v-for="item in 4" :key="item">
              <div class="banner">
                <img src="http://iph.href.lu/260x150" alt />
              </div>
              <div class="txt">{{$t('course.howToBuyBitcoin')}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <div class="title h3 my-4 d-flex justify-content-between">
               <span>{{$t('course.TradingStrategy')}} </span>
              <a href="#/course/list/strategy" class="fn-14">{{$t('course.seeMore')}}&gt;&gt;</a> 
          </div>
          <div class="row justify-content-between">
            <div class="item col-lg-3 col-md-6 mb-4 col-xs-12" v-for="item in 4" :key="item">
              <div class="banner">
                <img src="http://iph.href.lu/260x150" alt />
              </div>
              <div class="txt">{{$t('course.howToBuyBitcoin')}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <div class="title h3 my-4">
            <span>{{$t('course.industryResearch')}}</span>
              <a href="#/course/list/research" class="fn-14">{{$t('course.seeMore')}}&gt;&gt;</a> 
          </div>
          <div class="row justify-content-between">
            <div class="item col-lg-3 col-md-6 mb-4 col-xs-12" v-for="item in 4" :key="item">
              <div class="banner">
                <img src="http://iph.href.lu/260x150" alt />
              </div>
              <div class="txt">{{$t('course.howToBuyBitcoin')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
       <!-- lattest-news-section -->
      <div class="colto-section mt-5">
        <div class="container">
          <div class="colto-content-wrap">
            <div class="colto-content">
              <h3>Getting started</h3>
              <p>We provide professional and secure trading services for investors</p>
            </div>
            <div class="colto-btn-group">
              <button class="btn callto-btn">Log In</button>
              <span>or</span>
              <button class="btn callto-btn">Create Account</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>