<template>
    <div class="setting-page">
        <div class="container">
            <div class="w-100 d-flex justify-content-between align-items-center mb-3 mt-4">
                <div class="h3">{{$t('setting.safeSetting')}}</div>
            </div>
            <div class="row">
                <!-- 登录密码 -->
                <div class="col-md-6 d-flex">
                    <div class="panel-box bg-panel shadow-sm mb-4 w-100 d-flex flex-column">
                        <div class="heading">{{$t('setting.loginPassword')}}</div>
                        <div class="tab-content flex-fill d-flex flex-column justify-content-between align-items-start">
                            <div>{{$t('setting.loginPassword')}}</div>
                            <button class="btn btn-primary btn-sm" @click="loginShow=true">{{$t('setting.resLoginPassword')}}</button>
                        </div>
                    </div>
                </div>
                <!-- 交易密码 -->
                <div class="col-md-6 d-flex">
                    <div class="panel-box bg-panel shadow-sm mb-4 w-100 d-flex flex-column">
                        <div class="heading">{{$t('setting.transactionPassword')}}</div>
                        <div class="tab-content flex-fill d-flex flex-column justify-content-between align-items-start">
                            <div>{{$t('setting.usedFor')}}。</div>
                            <div class="status text-tips my-2" v-if="!detail.is_set_payword">{{$t('setting.notOpen')}}</div>
                            <button class="btn btn-primary btn-sm" @click="transShow=true" v-if="detail.is_set_payword">{{$t('setting.modifyPassword')}}</button>
                            <button class="btn btn-primary btn-sm" @click="transShow=true" v-else>{{$t('setting.safeSetting')}}</button>
                        </div>
                    </div>
                </div>
                <!-- Google验证 -->
                <div class="col-md-4 d-flex">
                    <div class="panel-box bg-panel shadow-sm mb-4 w-100 d-flex flex-column">
                        <div class="heading">Google {{$t('setting.verCode')}}</div>
                        <div class="tab-content flex-fill d-flex flex-column justify-content-between align-items-start">
                            <div>{{$t('setting.forLogin')}}。</div>
                            <div class="tip fn-12 light-purple my-2">({{$t('setting.alLast')}})</div>
                            <div class="status text-tips my-2" v-if="detail.google_status==0&&detail.google_token">{{$t('setting.notOpen')}}</div>
                            <div class="group d-flex align-items-center">
                                <button class="btn btn-primary btn-sm mr-2" @click="googleShow=true">
                                    <template v-if="!detail.google_token">{{$t('setting.bind')}}</template>
                                    <template v-else>{{$t('setting.unbind')}}</template>
                                </button>
                                <div class="custom-control custom-switch" v-if="detail.google_token">
                                    <input type="checkbox" readonly @change="verificationChange(3,detail.google_status)" v-model="detail.google_status" class="custom-control-input" id="GoogleSwitch" />
                                    <label class="custom-control-label" v-if="detail.google_status" for="GoogleSwitch">{{$t('setting.close')}}</label>
                                    <label class="custom-control-label" v-else for="GoogleSwitch">{{$t('setting.open')}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 短信验证 -->
                <div class="col-md-4 d-flex">
                    <div class="panel-box bg-panel shadow-sm mb-4 w-100 d-flex flex-column">
                        <div class="heading">SMS {{$t('setting.smsVer')}}</div>
                        <div class="tab-content flex-fill d-flex flex-column justify-content-between align-items-start">
                            <div>{{$t('setting.forLogin')}}。</div>
                            <div class="tip fn-12 light-purple my-2">({{$t('setting.alLast')}})</div>
                            <div class="num blue my-2" v-if="detail.phone">{{detail.phone|userFilter}}</div>
                            <div class="status text-tips my-2" v-if="detail.phone_status==0&&detail.phone">{{$t('setting.notOpen')}}</div>
                            <div class="group d-flex align-items-center">
                                <button class="btn btn-primary btn-sm mr-2" @click="smsShow=true">
                                    <template v-if="detail.phone">{{$t('setting.unbind')}}</template>
                                    <template v-else>{{$t('setting.bind')}}</template>
                                </button>
                                <div class="custom-control custom-switch" v-if="detail.phone">
                                    <input type="checkbox" readonly @change="verificationChange(1,detail.phone_status)" v-model="detail.phone_status" class="custom-control-input" id="SMSSwitch" />
                                    <label class="custom-control-label" v-if="detail.phone_status" for="SMSSwitch">{{$t('setting.close')}}</label>
                                    <label class="custom-control-label" v-else for="SMSSwitch">{{$t('setting.open')}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 邮箱验证 -->
                <div class="col-md-4 d-flex">
                    <div class="panel-box bg-panel shadow-sm mb-4 w-100 d-flex flex-column">
                        <div class="heading">{{$t('setting.emailVer')}}</div>
                        <div class="tab-content flex-fill d-flex flex-column justify-content-between align-items-start">
                            <div>{{$t('setting.forLogin')}}。</div>
                            <div class="tip fn-12 light-purple my-2">({{$t('setting.alLast')}})</div>
                            <div class="num blue my-2" v-if="detail.email">{{detail.email|userFilter}}</div>
                            <div class="status text-tips my-2" v-if="detail.email_status==0&&detail.email">{{$t('setting.notOpen')}}</div>
                            <div class="group d-flex align-items-center">
                                <button class="btn btn-primary btn-sm mr-2" @click="emailShow=true">
                                    <template v-if="detail.email">{{$t('setting.unbind')}}</template>
                                    <template v-else>{{$t('setting.bind')}}</template>
                                </button>
                                <div class="custom-control custom-switch" v-if="detail.email">
                                    <input type="checkbox" readonly @change="verificationChange(2,detail.email_status)" v-model="detail.email_status" class="custom-control-input" id="EMAILSwitch" />
                                    <label class="custom-control-label" v-if="detail.email_status" for="EMAILSwitch">{{$t('setting.close')}}</label>
                                    <label class="custom-control-label" v-else for="EMAILSwitch">{{$t('setting.open')}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 短信 -->
        <v-box v-model="smsShow" :title="'SMS' +$t('setting.ver')">
            <sms-verify @close="smsShow=false" @change="getUserInfo" :detail="detail" id="SMSModal" />
        </v-box>
        <!-- 交易密码 -->
        <v-box v-model="transShow" :title="$t('setting.transactionPassword')">
            <trans-pwd @close="transShow=false" @change="getUserInfo" :detail="detail" id="tranPsw" />
        </v-box>
        <!-- 邮箱验证 -->
        <v-box v-model="emailShow" :title="$t('setting.emailVer')">
            <email-verify @change="getUserInfo" @close="emailShow=false" :detail="detail" id="emailVerify" />
        </v-box>
        <!-- 谷歌验证 -->
        <v-box v-model="googleShow" :title="'Google '+ $t('setting.ver')">
            <google-verify @change="getUserInfo" @close="googleShow=false" :detail="detail" id="googleVerify" />
        </v-box>
        <!-- 登录密码 -->
        <v-box v-model="loginShow" :title="$t('setting.loginPassword')">
            <login-pwd @close="loginShow=false" @change="getUserInfo" :detail="detail" id="loginPwd" />
        </v-box>

        <!-- 校验开关 -->
        <v-box v-model="verification" :title="`${changeVerificationObj.status?$t('setting.open'):$t('setting.close')}${changeVerificationObj.name}`">
            <change-verification @close="verification=false" :changeObj="changeVerificationObj" @change="getUserInfo" :detail="detail" />
        </v-box>
    </div>
</template>

<script>
import SmsVerify from "./sms-verify";
import TransPwd from "./trans-pwd";
import LoginPwd from "./login-pwd";
import EmailVerify from "./email-verify";
import GoogleVerify from "./google-verify";
import ChangeVerification from "./change-verification";
import Setting from "../../api/setting";

export default {
    components: {
        SmsVerify,
        TransPwd,
        EmailVerify,
        GoogleVerify,
        LoginPwd,
        ChangeVerification
    },
    data() {
        return {
            detail: {},
            loginShow: false,
            smsShow: false,
            transShow: false,
            emailShow: false,
            googleShow: false,
            verification: false,
            // 变更校验开关的对象
            changeVerificationObj: {
                status: '',
                type: '',
                name: ''
            }
        };
    },
    filters: {
        //显示（手机号|邮箱号）过滤
        userFilter(val) {
            return val.replace(/(^\w{3})\w*(@|\w{3}$)/g, '$1***$2')
        }
    },
    methods: {
        // 获取用户信息
        getUserInfo() {
            Setting.getUserInfo()
                .then(res => {
                    this.detail = res;
                })
                .catch(err => { });
        },
        // 校验开关
        verificationChange(type, status) {
            this.changeVerificationObj.status = status;
            this.changeVerificationObj.type = type;
            this.$nextTick(() => {
                if (type == 1) {
                    this.detail.phone_status = !status;
                    this.changeVerificationObj.name = this.$t('setting.smsVer');
                } else if (type == 2) {
                    this.detail.email_status = !status;
                    this.changeVerificationObj.name = this.$t('setting.emailVer');
                } else if (type == 3) {
                    this.detail.google_status = !status;
                    this.changeVerificationObj.name = "Google " + this.$t('setting.ver');
                }
            });
            this.verification = true;

        }
    },
    created() {
        this.getUserInfo();
    }
};
</script>

<style>
</style>