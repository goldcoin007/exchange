<template>
    <div>
        <div class="vh-100 d-flex justify-content-center">
            <div class="form-access my-auto">
                <form class="register-body bg-panel">
                    <div class="text-center h3">
                        <span>代理注册</span>
                    </div>

                    <!-- Step1  -->
                    <template v-if="step == 1">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" @click="registerType = 1">
                                <a :class="[`nav-link`, {active : registerType == 1}]" id="email-tab" data-toggle="tab" href="#email" role="tab" aria-controls="email" :aria-selected="registerType == 1">{{$t('login.email')}}</a>
                            </li>
                            <!-- <li class="nav-item" @click="registerType = 2">
                                <a :class="[`nav-link`, {active : registerType == 2}]" id="phone-tab" data-toggle="tab" href="#phone" role="tab" aria-controls="phone" :aria-selected="registerType == 2">{{$t('login.phone')}}</a>
                            </li> -->
                        </ul>

                        <!-- 切换显示不同类型的账号 -->
                        <div class="tab-content" id="myTabContent">
                            <!-- email address  active为切换时的动画效果 
              show为默认的控制显示 这里替换为v-if的渲染 这样email和phone只能存在一个 避免同时创建require规则时报错-->
                            <div class="tab-pane fade" :class="{show:registerType == 1, active:registerType == 1}" v-if="registerType==1" id="email" role="tabpanel" aria-labelledby="email-tab">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="请输入代理名称" v-model="user.name"/>
                                </div>
                                <div class="form-group">
                                    <input type="email" name="email" class="form-control" :placeholder="$t('login.pleaseEmail')" v-model="user.email" :data-has="$t('login.pleaseEmail')" :data-message="$t('login.invalidEmail')" />
                                </div>
                            </div>
                            <!-- phone number  -->
                            <div class="tab-pane fade" :class="{show:registerType == 2, active:registerType == 2}" v-if="registerType==2" id="phone" role="tabpanel" aria-labelledby="phone-tab">
                                <div class="form-group">
                                    <div class="d-flex">
                                        <div class="mr-2">
                                            <el-select v-model="user.country_id" filterable :placeholder="$t('login.country')">
                                                <el-option v-for="(item, index) in cacheOption" :key="index" :value="`${item.id}`" :label="`+${item.country_code} ${item.name} ${item.code}`"></el-option>
                                            </el-select>
                                        </div>
                                        <input type="text" name="phone" class="form-control" :placeholder="$t('login.enterMobile')" v-model="user.phone" :data-has="$t('login.enterMobile')"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row password">
                            <input type="password" v-model="user.password" required :placeholder="$t('login.password')" class="form-control" />
                            <label for="password" @click="showType('pwdType')"></label>
                        </div>

                        <div class="form-group row password">
                            <!-- 使用data-type指定额外的类型验证 -->
                            <input  type="password" v-model="user.repassword" required :data-has="$t('login.enterLengthPassword',{num1:8,num2:15})" :placeholder="$t('login.confirm-password')" class="form-control" />
                            <label @click="showType('repwdType')"></label>
                        </div>

                        <div class="form-group row">
                            <input type="text" class="form-control"  v-model="user.parentCode" placeholder="邀请码（必填）" />
                        </div>
                        <div class="form-group row">
                            <input type="text" class="form-control"  v-model="user.subscribe_rebate_rate" placeholder="申购返佣比率（请填0-1之间的数字）" />
                        </div>
                        <div class="form-group row">
                            <input type="text" class="form-control"  v-model="user.contract_rebate_rate" placeholder="合约返佣比率（请填0-1之间的数字）" />
                        </div>
                        <div class="form-group row">
                            <input type="text" class="form-control"  v-model="user.option_rebate_rate" placeholder="期权返佣比率（请填0-1之间的数字）" />
                        </div>

                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="form-checkbox" v-model="isAgree" />
                            <label class="custom-control-label" for="form-checkbox">
                                {{$t('login.iSee')}}
                                <a href="#!">{{$t('login.terms')}}</a>
                            </label>
                        </div>

                        <button type="submit" class="btn btn-primary rounded-pill" @click.prevent.stop="step1">{{$t('login.reg')}}</button>
                    </template>

                    <!-- Step3  -->
                    <template v-if="step == 3">
                        <div v-if="registerType === 1" class="verify-code">
                            <div class="form-text text-muted">
                                {{$t('login.enterEmailCode',{email:ajar.email,num:6})}}
                                <br />
                                {{$t('login.accountActivated')}}，
                                <a href @click.prevent="step = 1;">{{$t('login.backOld')}}</a>。
                            </div>
                            <section class="my-codes">
                                <header class="my-codes__title">{{$t('login.verCode')}}</header>
                                <div class="my-codes__controls">
                                    <input type="text" v-for="pos in 6" :key="pos" pattern="[0-9]*" @focus="current=pos" @blur="current=-1" ref="spaces" class="form-control" @keyup="handleKeyUp(pos-1, $event)" @input="handleInput(pos-1, $event)" @paste="autofill" />
                                </div>
                            </section>
                            <aside class="prompt">
                                <header class="prompt__no-recieved">{{$t('login.notEmail')}}：</header>
                                <ul class="prompt__inner">
                                    <li>· {{$t('login.confirmEmail')}}。</li>
                                    <li>· {{$t('login.confing')}}。</li>
                                    <li>· {{$t('login.checkTrashCan')}}。</li>
                                </ul>
                            </aside>
                        </div>

                        <div v-if="registerType === 2" class="verify-code">
                            <div class="form-text text-muted">
                                {{$t('login.enterPhone1')}} (
                                <b>{{ ajar.phone }}</b>
                                ) {{$t('login.enterPhone2',{num:6})}}
                                <br />
                                {{$t('login.accountActivated')}}，
                                <a href @click.prevent="step = 1;">{{$t('login.backOld')}}</a>。
                            </div>
                            <section class="my-codes">
                                <header class="my-codes__title">Code</header>
                                <div class="my-codes__controls">
                                    <input type="text" v-for="pos in 6" :key="pos" pattern="[0-9]*" @focus="current=pos" @blur="current=-1" ref="spaces" class="form-control" @keyup="handleKeyUp(pos-1, $event)" @input="handleInput(pos-1, $event)" @paste="autofill" />
                                </div>
                            </section>
                            <aside class="prompt">
                                <header class="prompt__no-recieved">{{$t('login.smsNotReceived')}}：</header>
                                <ul class="prompt__inner">
                                    <li>· {{$t('login.phoneCorrect')}}。</li>
                                    <li>· {{$t('login.securePhone')}}。</li>
                                </ul>
                            </aside>
                        </div>
                    </template>
                </form>
                <!-- <h2>
                    {{$t('login.hasAccount')}}?
                    <router-link to="sign-in">{{$t('login.toLogin')}}</router-link>
                </h2> -->
            </div>
        </div>

        <!-- Step2 滑块验证码Modal弹框 使用javascript控制-->
        <div class="modal fade" id="captcha" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{$t('login.safety')}}</h5>
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
                    <iframe name="my-modal-body" class="my-modal-body" :src="`/static/SliderCaptcha/src/index.html?`+ encodeURIComponent(`nextStep=step2Register&slider_type=register&account=${account}&lang=${lang}`)" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import md5 from "md5";
import Member from "@/api/member";

export default {
    data() {
        return {
            current: 0,
            pwdType: "password",
            repwdType: "password",

            step: 1,
            cacheRegisterType: null, // 注册类型中间值

            user: {
                name: "",
                email: "",
                password: "",
                repassword: "",
                country_id: "", //  区号id
                phone: "",
                parentCode: "",
                subscribe_rebate_rate:'',
                contract_rebate_rate:'',
                option_rebate_rate:''
            },

            isAgree: false,

            options: [], // 原始数据
            cacheOption: [],
            storeOption: null, // 存储的有效options
            storeTel: null, // 存储的tel

            valueTel: "",
            valueTelPhone: "",
            showBox: false, //滑动弹窗

            ajar: {
                email: "",
                phone: ""
            },
            skipKeyup: null,
            skipInput: null,
            isFirst: {
                smsCode: null,
                emailCode: null
            },

            codes: new Array(6)
        };
    },

    computed: {
        // 当前语言
        lang() {
            let UALang = navigator.language.includes("zh") ? "cn" : "en";
            return localStorage.lang || UALang;
        },

        // 根据语言切换注册的类型 2为手机 1为邮箱
        registerType: {
            get() {
                return 1
            },

            set(val) {
                // 缓存注册类型值
                this.cacheRegisterType = val;
            }
        },

        //
        account() {
            return this.registerType === 2 ? this.user.phone : this.user.email;
        },
        // 当前选中的区号
        country() {
            return (
                this.cacheOption.find(item => item.id == this.user.country_id) || {}
            );
        }
    },

    methods: {
        showType(type) {
            this[type] = this[type] == "text" ? "password" : "text";
        },

        step1: _.throttle(function () {

            if (utils.validate(".register-body")) {
                if (this.user.password !== this.user.repassword) {
                    this.$message(
                        {
                            type: "error",
                            message: this.$t('login.confirmpassword') + "！"
                        },
                        1000
                    );
                    return
                }
                // 其他补充的验证
                if (!this.isAgree) {
                    // 没有同意条款
                    this.$message(
                        {
                            type: "warning",
                            message: this.$t("login.disagree") + "！"
                        },
                        1000
                    );
                    return;
                }

                // 滑块安全性验证
                // if (this.user.parentCode) {
                //     // this.chkRefer(this.user.parentCode, () => {
                //     //     this.showBox = true;
                //     // });
                // } else {
                // 调用模态框
                // if (utils.isMobile()) {
                    this.step2();
                    // return;
                // }
                // $("#captcha").modal({
                //     backdrop: "static" // 点击背景时不关闭动态模态框
                //     // keyboard : true,  // 按下esc时关闭动态视窗
                //     // show : false, // 初始化不显示
                // });
                // }
            }
        }, 1000),

        step2(token) {
            if(!this.user.name){
                this.$message.error('请输入代理名称');
                return
            }
            if(!this.user.parentCode){
                this.$message.error('请输入邀请码');
                return
            }
            switch (
            this.registerType // 发送邮箱验证码
            ) {
                case 1:
                    Member.sendEmailCode({
                        email: this.user.email,
                        token
                    })
                        .then(data => {
                            console.log(data)
                            const res = /^([\w\-\.]+)@([\w\.\-]+)$/.exec(this.user.email);
                            this.ajar.email = `${res[1].slice(0, 3)}${"*".repeat(5)}@${res[2]
                                }`;
                            this.step = 3;
                            // 自动第一个焦点
                            this.$nextTick(function () {
                                // DOM 现在更新了
                                this.$refs.spaces[0].focus();
                            });
                        })
                        .catch(err => { });
                        break;
                case 2: // 发送手机验证码
                    Member.sendSmsCode({
                        phone: this.user.phone,
                        country_code: this.country.country_code, // 国际电话应该前缀00
                        token
                    })
                        .then(data => {
                            this.ajar.phone = this.user.phone.replace(
                                /^(\d{3})\d{4}(\d{4})$/,
                                "$1****$2"
                            );
                            this.step = 3;
                            // 自动第一个焦点
                            this.$nextTick(function () {
                                // DOM 现在更新了
                                this.$refs.spaces[0].focus();
                            });
                        })
                        .catch(err => { });
                    break;

                default:
                    break;
            }
            // 关闭模态框
            $("#captcha").modal("hide");
        },

        refreshSlider() {
            // name标记的iframe返回窗口对象
            // id标记的iframe返回dom对象 需要在通过contentWindow读取
            window.frames["my-modal-body"].$captcha.sliderCaptcha("reset");
        },

        autofill($event) {
            let data = $event.clipboardData.getData("text/plain"),
                val;
            if (!data) return;
            else val = _.trim(data);
            if (val.match(/^\d{6}$/)) {
                $event.preventDefault();
                this.skipInput = true;

                this.$refs.spaces.forEach((item, index) => {
                    item.value = val.charAt(index);
                    this.chkLoginSave(index, val.charAt(index));
                });
            }
        },

        reset(checkType) {
            // 清空输入框的值
            Array.from(this.$refs.spaces).forEach(item => (item.value = ""));
            // 清除存储的值
            this.codes = new Array(6);
            // 自动获取焦点
            this.$refs.spaces[0].focus();
        },

        handleKeyUp(pos, $event) {
            // 监听删除动作
            switch ($event.code) {
                case "Backspace":
                    if (this.skipKeyup === true) {
                        this.skipKeyup = false;
                        return;
                    }
                    if (pos - 1 >= 0) {
                        // 删除前值

                        this.$refs.spaces[pos - 1].value = "";

                        this.$refs.spaces[pos - 1].focus();
                    }
                    break;

                case "ArrowLeft":
                    // case "ArrowUp":
                    if (pos - 1 >= 0) {
                        this.$refs.spaces[pos - 1].focus();
                    }
                    break;
                // case "ArrowDown":
                case "ArrowRight":
                    if (pos + 1 <= 5) {
                        this.$refs.spaces[pos + 1].focus();
                    }
                    break;
            }
        },

        // 将值同步到vm 并验证提交
        chkLoginSave(pos, value) {
            this.codes[pos] = value;

            // 所有框都填满时 触发提交
            if (this.codes.join("").match(/^\d{6}$/)) this.step3();

            // if (this[name].every(item => /^\d$/.test(item))) this.step3();
        },

        handleInput(pos, $event) {
            if (this.skipInput == true) {
                this.skipInput = false;
                return;
            }

            let val = $event.target.value;

            if (val) {
                // 执行了输入
                // 合法的值
                if (val.match(/^\d{1,2}$/)) {
                    if (val.length == 2) {
                        // 再次输入时 重置值

                        val = _.trim(val, this.codes[pos]);
                        $event.target.value = val;
                    }
                    // 找到下一个空节点
                    const tmpArr = Array.from(this.$refs.spaces);
                    for (let item of tmpArr) {
                        if (!item.value) {
                            item.focus();
                            break;
                        }
                    }

                    this.chkLoginSave(pos, $event.target.value);

                    // 非法的值
                } else {
                    $event.target.value = this.codes[pos] || "";
                }
            } else {
                // 执行了删除 第一次删除跳过keyup事件
                this.skipKeyup = true;
            }
        },

        step3() {
            // 基础参数
            const base = {
                email: this.user.email,
                name:this.user.name,
                code: this.codes.join(""),
                password:this.user.password,
                password_confirmation:this.user.repassword,
                invite_code:this.user.parentCode,
                subscribe_rebate_rate:this.user.subscribe_rebate_rate,
                contract_rebate_rate:this.user.contract_rebate_rate,
                option_rebate_rate:this.user.option_rebate_rate
            };

            // 分离参数
            let data = {};
            switch (this.registerType) {
                case 2: // 手机
                    data.type = `1`;
                    data.country_id = this.user.country_id;
                    data.account = this.user.phone;
                    data.country_code = this.country.country_code;
                    break;
                case 1:
                    data.type = `2`;
                    data.account = this.user.email;
                    break;

                default:
                    break;
            }
            // Member.agent({
            //     email: this.user.email,
            //     name:this.user.name,
            //     code: this.codes.join(""),
            //     password:this.user.password,
            //     password_confirmation:this.user.repassword,
            //     invite_code:this.user.parentCode,
            //     subscribe_rebate_rate:0.8,
            //     contract_rebate_rate:0.8,
            //     option_rebate_rate:0.8
            // })
            //     .then(data => {
            //         this.$message.success('success');
            //     })
            //     .catch(err => {
            //         this.step=1
            //      });
            // 服务端真实性验证
            Member.agent(Object.assign(base, data))
                .then(response => {
                    this.$message({
                        type: "success",
                        message: 'success',
                        duration: 2000,
                        onClose: () => {
                            // 注册完成 进入登录页
                            this.step=1
                            this.user.name=''
                            this.user.email=''
                            this.user.password=''
                            this.user.repassword=''
                            this.user.parentCode=''
                        }
                    });
                })
                .catch(err => {
                    this.step=1
                    this.reset(this.registerType);
                });
        }
    },

    created() {
        Member.getCountryCode()
            .then(data => {
                this.cacheOption = data;
            })
            .catch(err => { });
        if (this.$route.query.invite_code) {
            this.user.parentCode = this.$route.query.invite_code;
            if (document.body.clientWidth < 750) {
                window.location.href = this.Globals.mobileUrl + '/#/pages/reg/index?invite_code=' + this.$route.query.invite_code
            }
        }
    },

    mounted() {
        //
        window.md5 = md5;
        // 安全性验证成功时的回调函数
        window.step2Register = this.step2;
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base/_common.scss';
form.register-body {
    .form-group {
        margin: 1rem auto;
    }

    .password {
        label {
            width: 2em;
            height: 2em;
            // border: 1px solid red;
            display: inline-block;
            content: "";
            background: url("../../assets/img/eyed.svg") no-repeat center center;
            // background-repeat: no-repeat;
            background-size: 1rem 1rem;
            position: absolute;
            right: 1em;
            top: calc(50% - 1em);
            cursor: pointer;
            opacity: 0.5;
        }
        position: relative;
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

div.verify-code {
    // min-width: 375px;
    flex-basis: 400px;
    @include flexible(column);

    .my-codes {
        width: 100%;
        height: 138px;
        @include flexible(column, center, flex-start);

        // border: 1px solid red;
        .my-codes__title {
            color: #007bff;
            margin: 10px 0;
        }

        .my-codes__controls {
            width: 100%;
            @include flexible(row, space-between, center);

            .form-control {
                width: 48px;
                height: 48px;
                text-align: center;
                @include font(OpenSans-Regular, 22, 32, #fff);
            }
        }
    }

    .form-text {
        @extend .break-word;
    }

    .prompt {
        .prompt__no-recieved {
            @include font(Overpass-Regular, 13, 30, #555);
        }

        .prompt__inner {
            @include font(Overpass-Regular, 12, 20, #666);
            @extend .form-text;
            @extend .text-muted;
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
.form-control:disabled, .form-control[disabled]{
    background-color: #1e2834;
}
.form-control:disabled, .form-control[readonly]{
    background-color: #1e2834;
}
</style>
