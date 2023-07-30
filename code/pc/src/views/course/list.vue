<template>
  <div>
    <secondary-nav />
    <!-- 列表 -->
    <div class="container course-list">
      <div class="row mt-3">
        <div class="col-12">
          <div class="title h3 my-4">{{title}}</div>
          <div class="row justify-content-between">
            <router-link to="/course/detail" class="item col-lg-3 col-md-6 mb-4 col-xs-12" v-for="item in 40" :key="item">
              <div class="banner">
                <img src="http://iph.href.lu/260x150" alt />
              </div>
              <div class="txt">{{$t('course.howToBuyBitcoin')}}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
      title(){
          let key = this.$route.params.id
          switch(key){
              case 'novice':
                  return this.$t('course.noviceTutorial')
              case 'strategy':
                  return this.$t('course.TradingStrategy')
              case 'research':
                  return this.$t('course.industryResearch')
              case 'dictionary':
                  return this.$t('course.dictionary')
              case 'report':
                  return this.$t('course.media')
              case 'OkChain':
                  return 'OkChain'
          }
      }
  }
};
</script>

<style>
</style>