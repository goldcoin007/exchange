<template>
  <div class="profile-page">
    <secondary-nav></secondary-nav>
    <div class="container">
      <div class="w-100 d-flex align-items-center mb-3 mt-4">
        <div class="h3 mr-1">{{$t('profile.invitationReward')}}</div>
        <div class="border rounded-sm px-1 text-tips">{{$t('profile.dividends',{name:'AMATAK',num:'30%'})}}。</div>
      </div>
      <div class="row">
        <div class="col-12 mb-4">
          <div class="panel-box">
            <div class="heading d-flex justify-content-between aligin-items-center">
              <div>{{$t('profile.joinThePlan',{name:'AMATAK'})}}</div>
              <div class="blue">
                <i class="el-icon-coin"></i>
                {{$t('profile.checkMyDividend')}}
              </div>
            </div>
            <div class="tab-content py-4">
              <div class="step-group d-flex justify-content-center text-center">
                <div class="step mx-5">
                  <div class="icon">
                    <img src="../../assets/img/icon/top1.png" alt />
                  </div>
                  <div class="txt">{{$t('profile.step1')}}：{{$t('profile.shareLink')}}</div>
                </div>
                <div class="next-icon mt-4">
                  <img src="../../assets/img/icon/stepnext.png" alt />
                </div>
                <div class="step mx-5">
                  <div class="icon">
                    <img src="../../assets/img/icon/top2.png" alt />
                  </div>
                  <div class="txt">{{$t('profile.step2')}}：{{$t('profile.shareFriend')}}</div>
                </div>
                <div class="next-icon mt-4">
                  <img src="../../assets/img/icon/stepnext.png" alt />
                </div>
                <div class="step mx-5">
                  <div class="icon">
                    <img src="../../assets/img/icon/top3.png" alt />
                  </div>
                  <div class="txt">{{$t('profile.step3')}}：{{$t('profile.instantDividend')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 mb-4">
          <div class="panel-box">
            <div class="heading">{{$t('profile.invitationInformation')}}</div>
            <div class="tab-content row">
              <div class="col-sm-8">
                <form>
                  <div class="form-group">
                    <label>{{$t('profile.invitationLink')}}</label>
                    <div class="input-group">
                      <input type="text" readonly :value="detail.invite_url" class="form-control" />
                      <div class="input-group-append" @click="copy(detail.invite_url)">
                        <button class="btn btn-outline-primary" type="button">
                          <i class="el-icon-document-copy"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="form-group mb-0">
                    <label>{{$t('profile.invitationCode')}}</label>
                    <div class="input-group">
                      <input type="text" readonly :value="detail.invite_code" class="form-control" />
                      <div class="input-group-append" @click="copy(detail.invite_code)">
                        <button class="btn btn-outline-primary" type="button">
                          <i class="el-icon-document-copy"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label>{{$t('profile.invitationLink')}}</label>
                  <div class="input-group">
                    <vue-qr v-if="detail.invite_url" :text="detail.invite_url" :margin="10" :size="200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="panel-box">
            <div class="heading">{{$t('profile.registeredUser')}}</div>
            <div class="tab-content" style="height:273px" v-infinite-scroll="load">
              <table class="table">
                <thead>
                  <tr>
                    <th>{{$t('profile.accountNumber')}}</th>
                    <th class="text-right">{{$t('profile.registrationTime')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in list" :key="item">
                    <td>{{item.username}}</td>
                    <td class="text-right">{{item.created_at}}</td>
                  </tr>
                  <tr v-if="!list.length">
                    <td colspan="2">
                      <no-record/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="panel-box">
            <div class="heading">{{$t('profile.activityTerms')}}</div>
            <div class="tab-content">
              <ul>
                <li class="my-2">
                  1.
                  <span class="font-weight-bold">{{$t('profile.handlingFeeDividend')}}</span> {{$t('profile.equalInvitee')}}30%{{$t('profile.fee')}}。
                </li>
                <li class="my-2">
                  2.
                  <span class="font-weight-bold">{{$t('profile.handlingFeeDividend')}}</span> {{$t('profile.afterThat')}}10{{$t('profile.follow')}}。
                </li>
                <li class="my-2">
                  <div>
                    3.
                    <span class="font-weight-bold">{{$t('profile.handlingFeeDividend')}}</span>{{$t('profile.limit')}}
                    <span class="font-weight-bold">{{$t('profile.handlingFeeDividend')}}</span>。
                  </div>
                  <ul class="ml-3">
                    <li class="my-2">
                      3.1
                      <span class="font-weight-bold">{{$t('profile.handlingFeeDividend')}}</span>{{$t('profile.activityStartTime')}}：2020{{$t('profile.Y')}}5{{$t('profile.M')}}9{{$t('profile.D')}}
                    </li>
                    <li class="my-2">
                      3.2
                      <span class="font-weight-bold">{{$t('profile.handlingFeeDividend')}}</span>{{$t('profile.endTime')}}：{{$t('profile.proceed')}}
                    </li>
                  </ul>
                </li>
                <li class="my-2">4. AMATAK{{$t('profile.atAnyTime',{name:'AMATAK'})}}</li>
                <li class="my-2">5. AMATAK{{$t('profile.reservedRights')}}。</li>
                <li class="my-2">6. AMATAK{{$t('profile.canDecide',{name:'AMATAK',link:'web.coin.amatak.net'})}}.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from "@/api/profile";
import vueQr from "vue-qr";
export default {
  data() {
    return {
      detail: {},
      page:1,
      list:[]
    };
  },
  components: {
    vueQr
  },
  methods: {
    load(){
      this.page++
      this.generalizeList()
    },
    getUserInfo() {
      Profile.generalizeInfo()
        .then(res => {
          this.detail = res;
        })
        .catch(err => {});
    },
    // 拷贝
    copy(txt) {
      utils.copy(txt);
    },
    // 获取推广记录
    generalizeList(){
      let data = {page:this.page}
      Profile.generalizeList(data).then(res=>{
        this.list = [...this.list,...res.data]
      })
    }
  },
  created() {
    this.getUserInfo();
    this.generalizeList()
  }
};
</script>

<style>
</style>
