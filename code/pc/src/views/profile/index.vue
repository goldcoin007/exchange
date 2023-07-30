<template>
  <div class="profile-page">
    <secondary-nav></secondary-nav>
    <div class="container">
      <div class="w-100 d-flex justify-content-between align-items-center mb-3 mt-4">
        <div class="h3">{{$t('profile.userInfo')}}</div>
      </div>
      <div class="row">
        <div class="col-md-5 d-flex align-items-stretch mb-4">
          <!-- 账户信息 -->
          <div class="panel-box bg-panel shadow-sm w-100">
            <div class="heading d-flex justify-content-between align-items-center">
              <div class="h6">{{$t('profile.userInfo')}}</div>
              <div class="status fn-14 text-tips">{{detail.user_auth_level_text }}</div>
            </div>
            <div class="tab-content">
              <div class="mobile fn-30 font-weight-bolder">{{detail.account | userFilter}}</div>
              <div class="label my-2">{{$t('profile.verState')}}：</div>
              <div class="d-flex align-items-center">
                <div class="icon mr-2">
                  <img src="../../assets/img/icon/top1.png" alt />
                </div>
                <div>
                  {{$t('profile.max')}}
                  <span class="font-weight-bold">20k</span>
                  <span class="font-weight-bold light-purple">USD</span>
                  <span class="font-weight-bold">24</span>
                  {{$t('profile.limitH')}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7 d-flex align-items-stretch mb-4">
          <!-- 实名认证 -->
          <div class="panel-box bg-panel shadow-sm w-100">
            <div class="heading d-flex justify-content-between align-items-center">
              <div class="h6">{{$t('profile.verLeave')}}</div>
            </div>
            <div class="tab-content">
              <div class="step-group d-flex justify-content-center text-center">
                <div class="step">
                  <div class="icon">
                    <img src="../../assets/img/icon/top1.png" alt />
                  </div>
                  <div class="txt">{{$t('profile.max')}} 20k USD</div>
                </div>
                <div class="next-icon mt-4">
                  <img src="../../assets/img/icon/stepnext.png" alt />
                </div>
                <div class="step">
                  <div class="icon">
                    <img src="../../assets/img/icon/top2.png" alt />
                  </div>
                  <div class="txt">{{$t('profile.max')}} 500K USD</div>
                  <div class="btn">
                    <button type="button" @click="$router.push('/profile/certification')" class="btn btn-sm btn-primary rounded-pill">{{$t('profile.clickToVerify')}}</button>
                  </div>
                </div>
                <div class="next-icon mt-4">
                  <img src="../../assets/img/icon/stepnext.png" alt />
                </div>
                <div class="step">
                  <div class="icon">
                    <img src="../../assets/img/icon/top3.png" alt />
                  </div>
                  <div class="txt">{{$t('profile.exceed')}} 500K USD</div>
                  <div class="btn">
                    <router-link
                      to="/contact-us"
                      tag="button"
                      type="button"
                      class="btn btn-sm btn-primary rounded-pill"
                      @click="$router.push('/contact-us')"
                    >{{$t('profile.contactUs')}}</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 d-flex">
          <!-- 邀请好友 -->
          <div class="panel-box bg-panel shadow-sm w-100">
            <div class="heading d-flex justify-content-between">{{$t('profile.inviteFriends')}}</div>
            <div class="tab-content">
              <div class="min-height-50">{{$t('profile.dividends',{name:'AMATAK',num:'30%'})}}</div>
              <button type="button" class="bottom-left-btn btn btn-sm btn-primary rounded-pill" @click="$router.push('/profile/invite')">{{$t('profile.sendInvitation')}}</button>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-flex">
          <!-- 重置密码 -->
          <div class="panel-box bg-panel shadow-sm w-100">
            <div class="heading d-flex justify-content-between">{{$t('profile.resetPassword')}}</div>
            <div class="tab-content">
              <div class="min-height-50">{{$t('profile.forLoginAccount')}}。</div>
              <button type="button" class="bottom-left-btn btn btn-sm btn-primary rounded-pill"  @click="$router.push('/setting')">{{$t('profile.clickReset')}}</button>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-flex">
          <!-- 访问记录 -->
          <div class="panel-box bg-panel shadow-sm w-100">
            <div class="heading d-flex justify-content-between">{{$t('profile.registrationDecord')}}</div>
            <div class="tab-content">
              <div class="min-height-50">{{$t('profile.recording')}}。</div>
              <button type="button" class="bottom-left-btn btn btn-sm btn-primary rounded-pill"  @click="$router.push('/profile/login-history')">{{$t('profile.recordingDEtail')}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from "@/api/profile";
export default {
  data() {
    return {
      detail: {}
    };
  },
  filters: {
    //显示（手机号|邮箱号）过滤
    userFilter(val) {
      if (!val) return;
      return val.replace(/(^\w{3})\w*(@|\w{3}$)/g, "$1***$2");
    }
  },
  methods: {
    getUserInfo() {
      Profile.getUserInfo().then(res => {
        this.detail = res;
      });
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>

<style>
</style>