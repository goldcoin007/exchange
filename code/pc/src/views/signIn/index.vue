<template>
    <div>
        <div class="vh-100 d-flex justify-content-center">
            <div class="form-access my-auto ">
                <form class="login-body bg-panel">
                    <div class="text-center h3">
                        <span>{{ $t("login.sign-in") }}</span>
                    </div>

                    <template v-if="step === 1">
                        <div class="form-group">
                            <input type="text" name="account" v-model="user.account" required :data-has="$t('login.effectivePhoneEmail')" class="form-control" :placeholder="$t('login.enterPhoneEmail')" :data-message="$t('login.effectivePhoneEmail')" />
                        </div>
                        <div class="form-group">
                            <!-- <input type="password" v-model="user.password" class="form-control" name="password" required :data-has="$t('login.emailCode',{num:'8-15'})" pattern="(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{8,15}$" :data-message="$t('login.passwordLength',{num:'8-15'})" :placeholder="$t('login.password')" /> -->
                            <el-input v-model="user.password" show-password required :placeholder="$t('login.password')"></el-input>
                        </div>
                        <div class="text-right">
                            <router-link to="/forget-pwd">{{$t('login.forgetPassword')}}?</router-link>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" v-model="isRember" class="custom-control-input" id="form-checkbox" />
                            <label class="custom-control-label" for="form-checkbox">{{$t('login.rememberMe')}}</label>
                        </div>
                        <button type="submit" class="btn btn-primary rounded-pill" @click.prevent.stop="step1">{{$t('login.login')}}</button>
                    </template>

                    <template v-else-if="step === 3">
                        <div class="login-type" v-if="(status.google_status + status.phone_status + status.email_status) >= 2">
                            <!-- 选项卡 -->

                            <ul class="login-type__container">
                                <li v-if="status.google_status" @click="checkType=3" :class="[`login-type__controls`, {active:checkType==3}]">Google</li>
                                <li v-if="status.phone_status" @click="checkType=1" :class="[`login-type__controls`, {active:checkType==1}]">{{$t('login.sms')}}</li>
                                <li v-if="status.email_status" @click="checkType=2" :class="[`login-type__controls`, {active:checkType==2}]">{{$t('login.email')}}</li>
                            </ul>
                        </div>

                        <!-- show懒加载dom 以维持验证码的状态 -->
                        <div class="verify-box" v-for="(item, index) in codeLists" :key="index" v-show="item.type===checkType">
                            <!-- 提示信息 -->
                            <figure class="login-tips">
                                <img :src="item.url" alt />
                                <figcaption class="content">
                                    {{ item.caption }}
                                    <br />
                                    {{ ajar[item.account] }}
                                </figcaption>
                            </figure>

                            <!-- google没有自动发送 -->
                            <div v-if="item.resend" class="resend-btn">
                                <!-- 短信验证码 或者 邮箱 -->
                                <verify-code :type="item.type" :signature="user.signature" :autoSend="item.type===checkType && isFirst[item.name]"></verify-code>
                            </div>

                            <h5 class="verify-title">{{item.title}}</h5>

                            <ul class="code-inputs">
                                <li v-for="pos in 6" class="code-items" :key="pos">
                                    <input pattern="[0-9]*" class="form-control" type="text" placeholder :ref="`space-${item.name}`" @keyup="handleKeyUp(item.name, pos-1, $event)" @input="handleInput(item.name, pos-1, $event)" @paste="autofill" />
                                </li>
                            </ul>
                            <!-- <el-input v-model="googleCode"  @change="step3"></el-input> -->
                        </div>
                    </template>
                </form>

                <h2>
                    {{$t('login.noAccountYet')}}?
                    <router-link to="/sign-up">{{$t('login.goRegister')}}</router-link>
                </h2>
            </div>
        </div>

        <!-- Step2
    滑块验证码Modal弹框 使用javascript控制-->
        <div class="modal fade" id="captcha" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{$t('login.safe')}}</h5>
                        <!-- 自定义刷新验证码按钮 -->
                        <a href class="refresh" @click.prevent="refreshSlider">
                            <img src="@/assets/img/icon-refresh.svg" alt />
                        </a>
                        <!-- 模态原生支持的关闭按钮 -->
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <img src="@/assets/img/icon-close.svg" alt />
                            <!-- &times; 自带图标 -->
                        </button>
                    </div>
                    <!-- <div class="modal-body">
                    ...
          </div>-->
                    <iframe name="my-modal-body" class="my-modal-body" :src="`/static/SliderCaptcha/src/index.html?`+ encodeURIComponent(`nextStep=step2Login&slider_type=login&account=${user.account}&lang=${lang}`)" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import md5 from "md5";
import Member from "@/api/member";
import utils from '@/utils';

export default {
    data() {
        return {
            user: {
                account: "",
                password: "",
                smsCode: "",
                emailCode: "",
                signature: "" // 签名 用来生成token
            },

            isRember: false,

            step: 1, // 默认第一步

            ajar: {
                email: "",
                phone: ""
            },

            // 验证码类型
            checkType: "",

            // 验证码输入
            codeLists: [{
                type: 3,
                url: require("@/assets/icon/grip-vertical.svg"),
                caption: this.$t('login.googleVer', {
                    num: '6'
                }),
                title: "Authentication Code",
                resend: false,
                name: "googleCode",
                account: "google"
            },
            {
                type: 1,
                url: require("@/assets/icon/chat-dots.svg"),
                caption: `${this.$t('login.phoneCode', { num: 6 })}：`,
                title: "Verification Code",
                resend: true,
                name: "smsCode",
                account: "phone"
            },
            {
                type: 2,
                url: require("@/assets/icon/envelope.svg"),
                caption: `${this.$t('login.emailCode', { num: 6 })}：`,
                title: "Verification Code",
                resend: true,
                name: "emailCode",
                account: "email"
            }
            ],

            isFirst: {
                smsCode: null,
                emailCode: null
            },

            exchange: false,

            // 验证码的值
            smsCode: new Array(6),
            googleCode: new Array(6),
            emailCode: new Array(6),

            // 输入框事件触发时 选择性处理 跳过部分事件
            skipKeyup: null,
            skipInput: null,
        };
    },

    watch: {
        checkType(newVal, oldVal) {
            // 去除初始化发送
            if (newVal == 1) {
                if (this.isFirst.smsCode === null) this.isFirst.smsCode = true;
                else this.isFirst.smsCode = false;
            }

            if (newVal == 3) {
                if (this.isFirst.emailCode === null) this.isFirst.emailCode = true;
                else this.isFirst.emailCode = false;
            }

            // 进入之前 每次清空输入框并自动焦点 但需要等待DOM渲染完毕
            // 可以通过nextTick注册DOM渲染完毕的回调动作
            this.$nextTick(function () {
                this.reset(newVal, true);
            });
        }
    },

    computed: {},

    methods: {
        touchstart() {

        },
        // 当前语言
        lang() {
            // let UALang = navigator.language.includes("zh") ? "cn" : "en";
            return localStorage.getItem('lang');
        },

        refreshSlider() {
            // name标记的iframe返回窗口对象
            // id标记的iframe返回dom对象 需要在通过contentWindow读取
            window.frames["my-modal-body"].$captcha.sliderCaptcha("reset");
        },

        // 将值同步到vm 并验证提交
        chkLoginSave(name, pos, value) {
            this[name][pos] = value;

            // 所有框都填满时 触发提交
            if (this[name].join("").match(/^\d{6}$/)) this.step3();

            // if (this[name].every(item => /^\d$/.test(item))) this.step3();
        },

        autofill($event) {
            let data = $event.clipboardData.getData("text/plain"),
                val;
            if (!data) return;
            else val = _.trim(data);
            if (val.match(/^\d{6}$/)) {
                $event.preventDefault();

                this.skipInput = true;

                let {
                    name,
                    inputList
                } = this.type2name();

                inputList.forEach((item, index) => {
                    item.value = val.charAt(index);
                    this.chkLoginSave(name, index, val.charAt(index));
                });
            }
        },

        type2name(checkType = null) {
            let type = checkType || this.checkType;
            let inputList, name;

            switch (type) {
                case 1:
                    name = "smsCode";
                    inputList = this.$refs["space-smsCode"];
                    break;
                case 3:
                    name = "googleCode";
                    inputList = this.$refs["space-googleCode"];
                    break;
                case 2:
                    name = "emailCode";
                    inputList = this.$refs["space-emailCode"];
                    break;
            }

            return {
                inputList,
                name
            };
        },

        reset(checkType, autoFocus = false) {
            let {
                inputList,
                name
            } = this.type2name(checkType);

            // 亲空输入框并清除vm中的值
            inputList.forEach(item => (item.value = ""));

            this[name] = new Array(6);

            // 部分场景下 需要获取焦点
            if (autoFocus) inputList[0].focus();
        },

        handleKeyUp(name, pos, $event) {
            // 监听指令
            switch ($event.code) {
                case "Backspace":
                    if (this.skipKeyup === true) {
                        this.skipKeyup = false;
                        return;
                    }

                    if (pos - 1 >= 0) {
                        this.$refs[`space-${name}`][pos - 1].value = "";
                        // 删除前值
                        this.$refs[`space-${name}`][pos - 1].focus();
                    }
                    break;

                case "ArrowLeft":
                    // case "ArrowUp":
                    if (pos - 1 >= 0) {
                        this.$refs[`space-${name}`][pos - 1].focus();
                    }
                    break;
                // case "ArrowDown":
                case "ArrowRight":
                    if (pos + 1 <= 5) {
                        this.$refs[`space-${name}`][pos + 1].focus();
                    }
                    break;
            }
        },

        handleInput(name, pos, $event) {
            if (this.skipInput == true) {
                this.skipInput = false;
                return;
            }

            let val = $event.target.value;

            if (val) {
                // 执行了输入

                if (val.match(/^\d{1,2}$/)) {
                    if (val.length == 2) {
                        // 再次输入时 重置值

                        val = _.trim(val, this[name][pos]);
                        $event.target.value = val;
                    }
                    // 找到下一个空节点
                    const tmpArr = Array.from(this.$refs[`space-${name}`]);
                    for (let item of tmpArr) {
                        if (!item.value) {
                            item.focus();
                            break;
                        }
                    }

                    this.chkLoginSave(name, pos, $event.target.value);

                    // 非法的值
                } else {
                    $event.target.value = this[name][pos] || "";
                }
            } else {
                // 执行了删除 第一次删除跳过keyup事件
                this.skipKeyup = true;
            }
        },

        // 前端有效性验证
        step1: _.throttle(function () {
            // if (utils.isMobile()) {
                this.step2()
                // return
            // }
            // if (utils.validate(".login-body")) {
            //     // 滑块验证框
            //     $("#captcha").modal({
            //         backdrop: "static" // 点击背景时不关闭动态模态框
            //         // keyboard : true,  // 按下esc时关闭动态视窗
            //         // show : false, // 初始化不显示
            //     });
            // }
        }),

        // 初始化登录验证
        step2(token) {
            // 关闭模态框
            // $("#captcha").modal("hide");

            // 自动验证与自动完成
            let type = this.user.account.includes("@") ? 2 : 1;
            const data = {
                account: this.user.account,
                password: this.user.password,
                type,
                token
            };

            Member.login(data)
                .then(response => {
                    let {
                        google_status,
                        phone_status,
                        email_status,
                        signature,
                        phone,
                        email
                    } = response;

                    this.status = response; // 全局存储开启状态 便于模板展示

                    // 检查验证码类型并初始化checkType的值 用于默认选项卡 并设置顺序
                    switch (1) {
                        case google_status:
                            this.checkType = 3; // google
                            break;
                        case phone_status:
                            this.checkType = 1; // phone
                            break;
                        case email_status:
                            this.checkType = 2; // email
                            break;
                        default:
                            // 将用户信息存入local
                            localStorage.setItem("auth", JSON.stringify(response.user));
                            localStorage.setItem("token", response.token);
                            this.$router.push("/wallet/assets/exchange");
                            location.reload();
                            return;
                    }

                    // 获取登录信息 用以验证码展示
                    if (type === 1) {
                        // 手机登录
                        this.ajar.phone = phone.replace(
                            /^(\d{3})\d{4}(\d{4})$/,
                            "$1****$2"
                        );
                    } else if (type === 2) {
                        // 邮箱登陆
                        const res = /^([\w\-\.]+)@([\w\.\-]+)$/.exec(email);
                        this.ajar.email = `${res[1].slice(0, 3)}${"*".repeat(5)}@${res[2]}`;
                    }

                    // 存储验证码接口参数
                    this.user.signature = signature;

                    // 打开验证提示
                    this.step = 3;

                    // 等待dom更新
                    this.$nextTick(function () {
                        // DOM 现在更新了 找到验证码框 初始化
                        this.reset(this.checkType, true);
                    });
                })
                .catch(err => { });
        },

        // 提交登陆 获取token
        step3: _.throttle(function () {
            let code;
            switch (this.checkType) {
                case 1:
                    code = this.smsCode.join("");
                    break;
                case 2:
                    code = this.emailCode.join("");
                    break;
                case 3:
                    code = this.googleCode.join("");
                    break;
            }
            const data = {
                code_type: this.checkType,
                code,
                signature: this.user.signature
            };

            Member.loginConfirm(data)
                .then(response => {
                    console.dir(response);
                    // 将用户信息存入local
                    localStorage.setItem("auth", JSON.stringify(response.user));
                    localStorage.setItem("token", response.token);
                    // 登录和退出 需要刷新页面 才能更新头部
                    this.$router.push("/wallet/assets/exchange");
                    location.reload();
                })
                .catch(err => {
                    // 操作失败 清除当前输入框 并获取焦点
                    this.reset(this.checkType, true);
                });
        }, 10000)
    },

    created() { },

    mounted() {
        window.md5 = md5;
        // 安全性验证成功时的回调函数
        window.step2Login = this.step2;
        console.log(localStorage.lang,navigator.language.includes("zh"))

    }
};
</script>

<style lang="scss" scoped>
form.login-body {
    .form-group {
        margin: 1rem auto;
    }

    .area-phone-box {
        // width: 100%;
        @include flexible();

        .area {
            width: 123px;
            margin-right: 3px;
        }

        .phone {
            width: 162px;
        }
    }

    // 去除搜索输入框自带的下拉图标
    input::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
    }
}

.login-type {
    border-bottom: 1px solid #eee;

    .login-type__container {
        @include flexible(row, flex-start, center);

        .login-type__controls {
            // border: 1px solid red;
            width: 88px;
            height: 40px;
            @include flexible(row, center, center);
            cursor: pointer;

            &.active {
                border-bottom: 1px solid rgba(95, 116, 160, 0.8);
                color: $cls-blue;
                font-weight: bold;
            }
        }
    }
}

.verify-box {
    min-width: 328px;
    height: 258px;
    @include flexible(column, flex-start, left);

    // border : 1px solid red;

    .login-tips {
        margin: 15px 0;
        @include flexible(row, flex-start, center);

        img {
            width: 36px;
            margin-right: 8px;
        }
    }

    .resend-btn {
        margin: 15px auto;
    }

    .verify-title {
        margin: 15px 0;
        @include font(OpenSans-Regular, 15, inherit, $cls-blue);
    }

    .code-inputs {
        @include flexible(row, space-between);

        .code-items input {
            width: 48px;
            height: 48px;
            text-align: center;
            @include font(OpenSans-Regular, 22, 32, #fff);
        }
    }
}

.modal-content {
    // iframe 底部没有设置圆角 超出时 隐藏
    overflow: hidden;
}

.modal-header {
    // border:1px solid red;
    .modal-title {
        @include fs(16);
    }

    .refresh {
        position: absolute;
        right: 58px;
        top: 18px;
    }
}

.my-modal-body {
    // border : 1px solid red;
    // border: none;
    width: calc(100% - 2px);
    height: 260px;
    padding: 0;
    margin: 0;
}
</style>
