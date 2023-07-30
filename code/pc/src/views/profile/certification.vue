<template>
  <div class="profile-page">
    <secondary-nav></secondary-nav>
    <div class="container">
      <div class="w-100 d-flex justify-content-center mb-3 mt-4">
        <div class="h3">{{$t('profile.realName')}}</div>
      </div>
      <div class="row">
        <div class="col-12 mt-4">
          <el-steps :active="setp+1" align-center>
            <el-step :title="$t('profile.primaryCertification')"></el-step>
            <el-step :title="$t('profile.advancedCertification')"></el-step>
            <el-step :title="$t('profile.toExamine')"></el-step>
          </el-steps>
        </div>
      </div>
      <div class="row">
        <div class="col-9 mx-auto mt-4 panel-box shadow-sm bg-panel" id="auth">
          <!-- 第一步 -->
          <div class="tab-content" v-if="setp==0">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>{{$t('profile.fullName')}}（{{$t('profile.legal')}}）*</label>
                <input
                  type="text"
                  required
                  v-model="form.realname"
                  class="form-control"
                  :placeholder="$t('profile.pleaseEnterName')"
                />
              </div>
              <div class="form-group col-md-6">
                <label>{{$t('profile.dateOfBirth')}}（YYYY-MM-DD）*</label>
                <el-date-picker
                  required
                  v-model="form.birthday"
                  type="date"
                  :placeholder="$t('profile.selectDate')"
                ></el-date-picker>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-3">
                <label>{{$t('profile.documentType')}}*</label>
                <el-select v-model="form.type" :placeholder="$t('profile.pelaseSelect')">
                  <el-option
                    v-for="item in cardType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="form-group col-md-9">
                <label>{{$t('profile.certificateNumber')}}*</label>
                <input
                  type="text"
                  required
                  v-model="form.id_card"
                  class="form-control"
                  :placeholder="$t('profile.endterIDNumber')"
                />
              </div>
            </div>
            <div class="label my-2 blue">{{$t('profile.addressInfo')}}</div>
            <div class="form-group">
              <label>{{$t('profile.residentialAddress')}}*</label>
              <input
                type="text"
                required
                v-model="form.address"
                class="form-control"
                :placeholder="$t('profile.residentialAddress1')"
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>{{$t('profile.ciy')}}*</label>
                <input
                  type="text"
                  required
                  v-model="form.city"
                  class="form-control"
                  :placeholder="$t('profile.incity')"
                />
              </div>
              <div class="form-group col-md-6">
                <label>{{$t('profile.postalCode')}}*</label>
                <input
                  type="text"
                  required
                  v-model="form.postal_code"
                  class="form-control"
                  :placeholder="$t('profile.thePostcode')"
                />
              </div>
            </div>
            <div class="form-group">
              <label>{{$t('profile.additionalInformation')}}（{{$t('profile.optional')}}）</label>
              <input type="text" v-model="form.extra" class="form-control" placeholder />
            </div>
            <div class="label my-2 blue">{{$t('profile.contactInformation')}}</div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>{{$t('profile.phoneNumber')}}*</label>
                <div class="input-group mb-3">
                  <el-dropdown tragger="click" class="input-group-prepend">
                    <button
                      class="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                    >+{{country.country_code}}</button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        icon="el-icon-plus"
                        v-for="item in countryList"
                        :key="item.id"
                        @click.native="form.country_id=item.id"
                      >{{item.country_code}}（{{item.name}}）</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <input
                    type="text"
                    required
                    class="form-control"
                    :placeholder="$t('profile.enterPhoneNumber')"
                  />
                </div>
              </div>
            </div>
            <div class="text-center">
              <button
                type="button"
                class="btn w-25 btn-primary rounded-pill"
                @click="primaryAuth"
              >{{$t('profile.nextStep')}}</button>
            </div>
          </div>
          <!-- 第二步 -->
          <div class="tab-content" v-if="setp==1">
            <p>{{$t('profile.clickUpload1')}}</p>
            <p>
              {{$t('profile.pelaseDownload')}}
              <span
                class="red"
                v-if="detail.type==3"
              >{{$t('profile.passport')}}</span>
              <span class="red" v-if="detail.type==2">{{$t('profile.drivingLicense')}}</span>
              <span class="red" v-if="detail.type==1">{{$t('profile.iD')}}</span>
              {{$t('profile.upload')}}：
            </p>

            <p>{{$t('profile.explain')}}：</p>
            <ul class="mb-2">
              <li class="mb-2">1. {{$t('profile.unexpired')}}。</li>
              <li class="mb-2">2.{{$t('profile.pleaseConfirm')}}。</li>
              <li class="mb-2">3. {{$t('profile.fileFormat')}}：pdf./ gif./ jpeg./jpg./png.</li>
              <li class="mb-2">4. {{$t('profile.maximumFileSize')}}：5 MB</li>
            </ul>
            <upload-img
              class="mb-3"
              v-model="topForm.hand_img"
              required
              :placeholder="$t('profile.uploadPhoto')"
            >
              <template #text>
                <div class="el-upload__text">
                  {{$t('profile.positive')}}-{{$t('profile.dragHere')}}
                  <em>{{$t('profile.clickUpload')}}</em>
                </div>
              </template>
            </upload-img>
            <upload-img
              class="mb-3"
              v-model="topForm.back_img"
              required
              :placeholder="$t('profile.reversePhoto')"
            >
              <template #text>
                <div class="el-upload__text">
                  {{$t('profile.theOtherSide')}}-{{$t('profile.dragHere')}}
                  <em>{{$t('profile.clickUpload')}}</em>
                </div>
              </template>
            </upload-img>
            <upload-img
              class="mb-3"
              v-model="topForm.front_img"
              required
              :placeholder="$t('profile.uploadIDCard')"
            >
              <template #text>
                <div class="el-upload__text">
                  {{$t('profile.hold')}}-{{$t('profile.dragHere')}}
                  <em>{{$t('profile.clickUpload')}}</em>
                </div>
              </template>
            </upload-img>
            <div class="text-center mt-3">
              <button type="button" class="btn w-25 btn-primary rounded-pill" @click="topAuth">{{$t('profile.nextStep')}}</button>
            </div>
          </div>
          <!-- 第三步 -->
          <div class="tab-ceontent p-5 text-center" v-if="setp==2">
            <!-- 待审核 -->
            <div v-if="detail.status==1">
              <p class="mt-3 mb-4">{{$t('profile.inSubmit')}}</p>
              <i class="el-icon-s-order my-4 text-warning" style="font-size:70px"></i>
              <div class="text-center">
                <button
                  type="button"
                  class="btn w-25 btn-primary rounded-pill"
                  @click="$router.go(-1)"
                >{{$t('profile.gotIt')}}</button>
              </div>
            </div>
            <div v-else-if="detail.status==2">
              <p class="mt-3 mb-4">{{$t('profile.congratulations')}}，{{detail.status_text}}！</p>
              <i class="el-icon-circle-check my-4 increace" style="font-size:60px"></i>
              <div class="text-center">
                <button
                  type="button"
                  class="btn w-25 btn-primary rounded-pill"
                  @click="$router.go(-1)"
                >{{$t('profile.back')}}</button>
              </div>
            </div>
            <div v-else-if="detail.status==3">
              <p class="mt-3 mb-4">{{detail.status_text}}！{{$t('profile.resetApply')}}</p>
              <i class="el-icon-s-release my-4 decreace" style="font-size:60px"></i>
              <div class="text-center">
                <button
                  type="button"
                  class="btn w-25 btn-outline-danger"
                  @click="setp=1"
                >{{$t('profile.recertification')}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from "@/api/profile";
import Member from "@/api/member";
import server from "@/api/server";
export default {
  data() {
    return {
      setp: 0,
      detail: {},
      imgURL: server.defaults.baseURL,
      countryList: [],

      form: {
        country_code: "",
        country_id: "",
        realname: "",
        id_card: "",
        type: 1,
        birthday: "",
        address: "",
        city: "",
        postal_code: "",
        phone: "",
        extra: ""
      },
      // 高级认证
      topForm: {
        front_img: "",
        back_img: "",
        hand_img: ""
      }
    };
  },
  computed: {
    country() {
      return (
        this.countryList.find(item => item.id == this.form.country_id) || {}
      );
    },
    cardType() {
      return [
        {
          label: this.$t("profile.iD"),
          value: 1
        }
      ];
    }
  },
  methods: {
    // 获取实名信息
    getAuthInfo() {
      Profile.getAuthInfo()
        .then(res => {
          this.detail = res;
          // 展示页面
          if (res.primary_status == 0) {
            this.setp = 0;
            return;
          } else if (res.status == 0) {
            this.setp = 1;
          } else {
            this.setp = 2;
          }
        })
        .catch(res => {});
    },
    // 获取区号列表
    getCountryCode() {
      Member.getCountryCode()
        .then(res => {
          this.countryList = res;
          this.form.country_id = this.countryList[0].id;
        })
        .catch(res => {});
    },
    // 初级认证
    primaryAuth() {
      let data = this.form;
      data.country_code = this.country.country_code;
      if (utils.validate("#auth")) {
        Profile.primaryAuth(data)
          .then(res => {
            this.$message.success(this.$t("profile.preliminary"));
            this.setp++;
          })
          .catch(err => {});
      }
    },
    // 高级认证
    topAuth() {
      let data = this.topForm;
      if (utils.validate("#auth")) {
        if (!data.hand_img) {
          this.$message.error(this.$t("profile.uploadIDCard"));
          return;
        }
        if (!data.back_img) {
          this.$message.error(this.$t("profile.reversePhoto"));
          return;
        }
        if (!data.front_img) {
          this.$message.error(this.$t("profile.uploadPhoto"));
          return;
        }
        Profile.topAuth(data)
          .then(res => {
            this.$message.success(this.$t("profile.advancedCertification"));
            this.getAuthInfo();
          })
          .catch(err => {});
      }
    }
  },
  created() {
    this.getCountryCode();
    this.getAuthInfo();
  }
};
</script>

<style scoped lang="scss">
.upload-demo {
  /deep/ .el-upload-dragger {
    width: 300px;
    height: 150px;
  }
 
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
 /deep/{
   .el-step__title.is-process{
    color: white;
  }
   .el-upload-dragger{
     background-color: #1e2834;
   }
 } 
</style>
