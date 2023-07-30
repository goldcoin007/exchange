<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 my-4">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/course' }">{{$t('course.college')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/course/list/novice' }">{{$t('course.noviceTutorial')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/course/detail'}">{{$t('course.tutorialDetails')}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="title h2 mt-4">{{$t('course.howToBuyBitcoin')}}</div>
          <div class="single-subtitle d-flex justify-content-between border-bottom pb-2">
            <div class="text-muted">2018.1.11 limin.zhang</div>
          </div>
          <div class="edit-content py-4">12331 k ag kj sjh gkj sgjh sfdfg</div>
          <div class="row mt-3">
            <div class="col-12">
              <div class="title h3 my-4">{{$t('course.recommendedCourse')}}</div>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>