<template>
  <!-- colto-section -->
  <footer class="footer mt-5">
    <div class="footer-upper-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-2 col-md-3 mb-4">
            <div class="footer-logo">
              <a href="#">
                <!-- <img :src="logo.imgurl" alt="img" class="img-responsive" /> -->
                <img :src="appConfig.foot_logo" alt="logo" />
              </a>
            </div>
          </div>
          <!-- 服务列表 -->
          <div class="col-lg-1 col-md-3 mb-4">
            <div class="footer-info-list">
              <h4>{{ $t("common.service") }}</h4>
              <ul>
                <li v-for="(item, index) in service" :key="index">
                  <router-link :to="item.url">{{ item.label }}</router-link>
                </li>
              </ul>
            </div>
          </div>
          <!-- 学院列表 -->
          <div class="col-lg-1 col-md-3 mb-4">
            <div class="footer-info-list">
              <h4>{{ $t("common.college") }}</h4>
              <ul>
                <li v-for="item in college" :key="item.id">
                  <router-link :to="item.url">{{ item.label}}</router-link>
                </li>
              </ul>
            </div>
          </div>

          <!-- 联系我们 -->
          <div class="col-lg-2 col-md-6">
            <div class="footer-info-list">
              <h4>{{$t('common.contactUs')}}</h4>
              <ul class="contact-info">
                <li>
                  {{ $t("common.email") }}:
                  <span>{{email}}</span>
                </li>
                <li>
                  <!-- Phone: <span>{{contactinfo.mobile}}</span> -->
                </li>
              </ul>
              <ul class="social-style-two">
                <li>
                  <a href="#">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-google-plus-g"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-github"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 border-left">
            <div class="pl-2 ">
              <div class="mb-2">
                {{$t('common.footerTips1')}}
              </div>
              <div class="mb-2"> {{$t('common.footerTips2',{name:appConfig.name})}}</div>
              <div class="mb-2">{{$t('common.footerTips3')}}</div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <!-- 版权信息 -->
      <div class="container">
        <div class="footer-bottom-wrap">
          <!-- &copy; -->
          <div class="copyright-text text-center">{{appConfig.copyright}}</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import College from "@/api/college";
import ContactUs from "@/api/contactUs";
import {mapState} from 'vuex'
export default {
  data() {
    return {
      service: [],
      college: [],
      email: ""
    };
  },
  computed:{
    ...mapState({
      appConfig:'appConfig'
    })
  },
  methods: {
    getCollegeLinks() {
      College.getCategoryList()
        .then(list => {
          list.forEach(item => {
            this.college.push({
              url: `/college/list/${item.id}`,
              label: item.name
            });
          });
        })
        .catch(err => {});
    },

    getServiceLink() {
      College.getServiceList()
        .then(list => {
          list.forEach(item => {
            this.service.push({
              url: `/service/${item.id}`,
              label: item.name
            });
          });
        })
        .catch(err => {});
    },
    getEmial() {
      ContactUs.contact()
        .then(data => {
          this.email = data.contact;
        })
        .catch(err => {});
    }
  },
  created() {
    this.getCollegeLinks();
    this.getServiceLink();
    this.getEmial();
  }
};
</script>

<style>
</style>
