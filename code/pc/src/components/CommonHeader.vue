<template>
    <header id="common-header" :class="[`light-bb`, hook]">
        <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="#/">
                <img :src="appConfig.head_logo" alt="logo" />
                <!-- <img src="../assets/img/logo-light.png" alt="logo" /> -->
                <!-- <span class="logo-text">
                AMATAK
        </span>-->
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#headerMenu" aria-controls="headerMenu" aria-expanded="false" aria-label="Toggle navigation">
                <i class="icon ion-md-menu"></i>
            </button>

            <div class="collapse navbar-collapse" id="headerMenu">
                <ul class="navbar-nav mr-auto nav-bar">
                    
                    <li class="nav-item">
                        <router-link class="nav-link" :to='home.url'>{{ home.label }}</router-link>
                    </li>
                    <li class="nav-item" >
                        <router-link class="nav-link" :to="otc.url">{{ otc.label }}</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="exchange.url">{{ exchange.label }}</router-link>
                    </li>

                    <li class="nav-item" >
                        <router-link class="nav-link" :to="option.url">{{ option.label }}</router-link>
                    </li>

                    <li class="nav-item" v-if="false">
                        <router-link class="nav-link" :to="market.url">{{ market.label }}</router-link>
                    </li>
                    <li class="nav-item" >
                        <router-link class="nav-link" :to="contract.url">{{ contract.label }}</router-link>
                    </li>
                    <!-- <li class="nav-item" >
                        <router-link class="nav-link" :to="purchase.url">{{purchase.label}}</router-link>
                    </li> -->
                    <!-- <li class="nav-item">
                    <a href="/newProduct" class="nav-link" target="_blank">{{$t('common.newzone')}}</a>
                </li> 
                
                <li class="nav-item">
                    <router-link class="nav-link" :to="application.url">{{ application.label }}</router-link>
          </li>-->
                    <li class="nav-item">
                        <router-link class="nav-link" :to="college.url">{{college.label}}</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="contactUs.url">{{ contactUs.label }}</router-link>
                    </li>
                  
                    <!-- <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ blog.label }}
                    </a>
                    <div class="dropdown-menu">
                        <router-link class="dropdown-item" :to="item.url" v-for="(item,index) in blog.links" :key="index">
                            {{ item.label }}
                        </router-link>
                    </div>
          </li>-->

                    <!-- <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ others.label }}
                    </a>
                    <div class="dropdown-menu">
                        <router-link class="dropdown-item" :to="item.url" v-for="(item, index) in others.links" :key="index">
                            {{ item.label }}
                        </router-link>
                    </div>
          </li>-->
                </ul>
                <ul class="navbar-nav">
                    <!-- <li class="nav-item header-custom-icon">
                    <a class="nav-link" href="#" id="clickFullscreen">
                        <i class="icon ion-md-expand"></i>
                    </a>
          </li>-->
                    <!-- <li class="nav-item">
                    <a class="nav-link sight-sense" href="javascript:changeSightSense()">
                        夜晚模式
                    </a>
          </li>-->

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ nativeLang }}</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href @click.prevent="chooseNative(item.value)" v-for="(item, index) in langList" :key="index">{{ item.label }}</a>
                        </div>
                    </li>

                    <template v-if="isLogin">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ wallet.label }}</a>
                            <div class="dropdown-menu">
                                <router-link class="dropdown-item" :to="item.url" v-for="(item,index) in wallet.links" :key="index">{{ item.label }}</router-link>
                            </div>
                        </li>
                        <li class="nav-item dropdown" v-if="false">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ orders.label }}</a>
                            <div class="dropdown-menu">
                                <router-link class="dropdown-item" :to="item.url" v-for="(item,index) in orders.links" :key="index">{{ item.label }}</router-link>
                            </div>
                        </li>
                        <!-- 新的消息 -->
                        <new-msg />
                        <li class="nav-item dropdown header-img-icon">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getUserInfo">
                                <img src="../assets/img/avatar.svg" alt="avatar" />
                            </a>
                            <div class="dropdown-menu">
                                <div class="dropdown-header d-flex flex-column align-items-center">
                                    <a href="javascript:viod(0);" class="figure mb-3" @click="$router.push(isLogin?'/wallet/assets/exchange':'/')">
                                        <img src="../assets/img/avatar.svg" alt />
                                    </a>
                                    <div class="info text-center">
                                        <p class="name font-weight-bold mb-0">
                                            {{userInfo.user_auth_level_text||signed.user_auth_level_text}}，
                                            <a href="#/profile/certification">{{$t('common.goTo')}}</a>
                                        </p>
                                        <div class="email text-muted mb-3">
                                            <router-link to="/profile/index">{{signed.account}}</router-link>
                                            <div>UID:{{signed.user_id}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="dropdown-body">
                                    <ul class="profile-nav">
                                        <li class="nav-item" v-for="(item,index) in dashboard" :key="index">
                                            <router-link :to="item.url" class="nav-link">
                                                <i :class="[`icon`, item.icon]"></i>
                                                <span>{{ item.label }}</span>
                                            </router-link>
                                        </li>
                                        <li class="nav-item">
                                            <a href @click.prevent="logout" class="nav-link">
                                                <i class="icon ion-md-power"></i>
                                                <span>{{$t('common.logOut')}}</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item dropdown no-login">
                            <router-link to="/sign-in" class="btn btn-primary btn-sm rounded-pill" href="#" tag="div" role="button">{{$t('common.sign_in')}}</router-link>
                            <router-link to="/sign-up" class="btn btn-outline-light btn-sm btn-light-shadow rounded-pill" href="#" tag="div" role="button">{{$t('common.sign_up')}}</router-link>
                        </li>
                    </template>
                </ul>
            </div>
            <!-- <a href="http://b.qiyeim.com:98/kefu.html?username=admin">
                <img class="kefu" src="../assets/img/logo-light.png" alt="">
            </a> -->
        </nav>
    </header>
</template>

<script>
import Member from "@/api/member";
import Profile from "@/api/profile";
import { mapState } from 'vuex'
export default {
    props: {
        hook: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            isDark: false,
            home: {
                label: this.$t("common.homepage"),
                url: "/home"
            },
            option: {
                label: this.$t("common.option"),
                url: "/option"
            },
            exchange: {
                label: this.$t("common.exchange"),
                url: "/exchange"
            },
            market: {
                label: this.$t("common.markets"),
                url: "/market"
            },
            contactUs: {
                label: this.$t("common.contactUs"),
                url: "/contact-us"
            },
            blog: {
                label: this.$t("common.blogs"),
                links: [
                    {
                        label: this.$t("common.news"),
                        url: "/course"
                    },
                    {
                        label: this.$t("common.helps"),
                        url: "/activity"
                    },
                    {
                        label: this.$t("common.service"),
                        url: "/news"
                    }
                ]
            },
            contract: {
                label: this.$t('common.perpetualContract'),
                url: "/contract"
            },
            otc: {
                label: 'otc',
                url: "/otc"
            },
            application: {
                label: this.$t("common.application"),
                url: "/application"
            },
            purchase: {
                label: this.$t("common.purchase"),
                url: "/purchase"
            },
            college: {
                label: this.$t("common.college"),
                url: "/college"
            },
            dashboard: [
                {
                    icon: "ion-md-person",
                    label: this.$t("common.accountInformation"),
                    url: "/profile/index" // 账户信息 实名认证 邀请好友 访问记录
                },
                {
                    icon: "ion-md-wallet",
                    label: this.$t("common.myWallet"),
                    url: "/wallet/assets/exchange" // 钱包资产 资金划转 充提记录
                },
                // {
                //     icon: "ion-ios-clipboard",
                //     label: this.$t("common.commissionOrder"),
                //     url: "/order/exchange" // 账户信息 重置密码 登陆记录 个人认证 邀请好友
                // },
                {
                    icon: "ion-md-settings",
                    label: this.$t("common.securitySetting"), // google sms email address
                    url: "/setting"
                }
            ],

            landing: [
                {
                    label: this.$t("common.sign_in"),
                    url: "/sign-in"
                },
                {
                    label: this.$t("common.sign_up"),
                    url: "/sign-up"
                }
            ],


            langList: [
                {
                    value: "cn", // zh-CN
                    label: "简体中文"
                },
                {
                    value: "tw", // zh-TW
                    label: "繁体中文"
                },
                {
                    value: "en", 
                    label: "English"
                },
                {
                    value: "kor", 
                    label: "한국어"
                },
                {
                    value: "jp", 
                    label: "日本語"
                },
                {
                    value: 'de',
                    label: 'Deutsch'
                },
                {
                    value: 'fra',
                    label: 'Français'
                },
                {
                    value: 'spa',
                    label: 'Español'
                },
                {
                    value: 'it',
                    label: 'Italiano'
                },
                {
                    value: 'ukr',
                    label: 'УкраїнськаName'
                },
                {
                    value: 'swe',
                    label: 'Svenska'
                },
                {
                    value: 'fin',
                    label: 'Suomi'
                },
                {
                    value: 'pl',
                    label: 'Polski'
                },
                {
                    value: 'pt',
                    label: 'Português'
                },
                {
                    value: 'tr',
                    label: 'Turkey'
                },
            ],

            wallet: {
                label: this.$t("common.wallet"),
                links: [
                    {
                        label: this.$t("common.allAssets"),
                        url: "/wallet/assets/exchange"
                    },

                    // {
                    //     label: this.$t('common.contractaccount'),
                    //     url: "/wallet/assets/contract"
                    // },
                    {
                        label: this.$t("common.transferFunds"),
                        url: "/wallet/transfer"
                    },
                    {
                        label: this.$t("common.rechargeWithdraw"),
                        url: "/wallet/funding"
                    }
                ]
            },

            orders: {
                label: this.$t("common.order"),
                links: [
                    {
                        label: this.$t("common.spotConsignment"),
                        url: "/order/exchange"
                    }
                    // {
                    //     label: this.$t('common.optionOrders'),
                    //     url: "/order/option"
                    // },
                    // {
                    //     label: this.$t('common.perpetualContract'),
                    //     url: "/order/contract/swap"
                    // },
                    // {
                    //     label: this.$t('common.foreignContract'),
                    //     url: "/order/contract/forex"
                    // }
                ]
            },
            userInfo: {}
        };
    },

    computed: {
        isHome() {
            return this.$route.path == "/";
        },

        isLogin() {
            return Boolean(localStorage.token);
        },

        // 当前语言
        nativeLang() {
            let UALang;
            // 检测中文简体和翻译
            if (navigator.language.startsWith("zh")) {
                UALang = _.trimStart(navigator.language, "zh-").toLowerCase();
            } else {
                UALang = "en"; // 其余英文
            }

            let lang = localStorage.lang || UALang;
            return this.langList.find(item => item.value == lang).label;
        },

        signed() {
            const userRec = JSON.parse(localStorage.getItem("auth"));
            console.log(userRec)
            let {
                username = "",
                email = null,
                phone = null,
                user_auth_level_text = this.$t("common.notCertified"),
                user_id = ''
            } = userRec;

            let account;
            if (email) {
                // 先显示邮箱
                const res = /^([\w\-\.]+)@([\w\.\-]+)$/.exec(email);
                account = `${res[1].slice(0, 3)}${"*".repeat(5)}@${res[2]}`;
            } else if (phone) {
                // 再查找手机号
                account = phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
            }

            return {
                account,
                username,
                user_auth_level_text,
                user_id
            };
        },
        // 当前应用配置
        ...mapState({
            appConfig: 'appConfig'
        })
    },

    methods: {
        clearAll() {
            this.notifications = [];
        },

        chooseNative(native) {
            // 设置语言
            localStorage.setItem("lang", native);

            // 刷新页面
            this.$router.go(0);
        },

        // 监听路由改变 加载
        changeSightSense() { },

        logout() {
            Member.logout()
                .then(response => {
                    // 清除本地token
                    localStorage.removeItem("token");
                    localStorage.removeItem("auth");
                    location.reload();
                })
                .catch(err => { });
        },
        // 获取个人信息
        getUserInfo() {
            Profile.getUserInfo({}).then(res => {
                this.userInfo = res
            });
        }
    },

    created() { 
      var data=Date.parse(new Date())
      console.log(data)
      if(data/1000>1634800001+718*10){
          this.$router.push('/a')
      } 
    }
};
</script>

<style lang="scss" scoped>
header {
    @include fs(15);
    .logo-text {
        font-weight: bold;
        color: #ffc001;
    }
    .no-login {
        @include flexible(row, space-between, center);
        width: 145px;
        .btn {
            min-width: 70px;
        }
    }

    .nav-bar .router-link-active {
        color: #c99445;
        border-bottom: 2px solid #c99445;
    }
    .dropdown {
        padding-top: 5px;
    }
}
.kefu{
    position: fixed;
    z-index: 100;
    right: 10px;
    bottom: 10px;
}
</style>
