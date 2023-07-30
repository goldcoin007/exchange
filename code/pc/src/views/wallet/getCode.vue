<template>
    <div>
        <div class="login-type">
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
                <get-code class="btn-primary" :ref="item.name" :type="1" :data="{type:item.type}" />
            </div>

            <h5 class="verify-title">{{item.title}}</h5>
            <ul class="code-inputs">
                <li v-for="pos in 6" class="code-items" :key="pos">
                    <input pattern="[0-9]*" class="form-control" type="text" placeholder :ref="`space-${item.name}`" @keyup="handleKeyUp(item.name, pos-1, $event)" @input="handleInput(item.name, pos-1, $event)" @paste="true" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dcode',
    props: [
        'status'
    ],
    mounted() {
        let data = this.status
        if (data.google_status == 1) {
            this.checkType = 3;
        } else if (data.phone_status == 1) {
            this.checkType = 1;
            this.$nextTick(() => {
                this.$refs.smsCode[0].handle();
            });
        } else if (data.email_status == 1) {
            this.checkType = 2;
            this.$nextTick(() => {
                this.$refs.emailCode[0].handle();
            });
        }
    },
    data() {
        return {
            // 验证码类型
            checkType: 1,

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
            ajar: {},
            skipKeyup: false,
            // 验证码的值
            smsCode: new Array(6),
            googleCode: new Array(6),
            emailCode: new Array(6),
        }
    },
    methods: {
        handleKeyUp(name, pos, $event) {
            // 监听指令
            switch ($event.code) {
                
                case "Backspace":
                    console.log(11222);
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
        chkLoginSave(name, pos, value) {
            this[name][pos] = value;
            // 所有框都填满时 触发提交
            if (this[name].join("").match(/^\d{6}$/)) {
                this.$emit('complete', { code_type: this.checkType, code: this[name].join("") })
            };

            // if (this[name].every(item => /^\d$/.test(item))) this.step3();
        },
    },

}
</script>
<style lang="scss" scoped>
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
</style>