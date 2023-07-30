<template>
<div class="code-wrap">
    <!-- 接受子组件的点击动作 -->
    <button type="button" :class="[`btn`,`btn-info`,{disabled : state}]" @click="handle">
        {{$t("login.resend")}} {{ state || '' }}
    </button>
</div>
</template>

<script>
import Member from "@/api/member";

export default {
    props: {
        type: {
            type: Number,
            default: 1
        },
        account: {
            type: String,
            default: null,
        },
        signature: {
            type: String,
            default: null,
        },
        autoSend: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            state: null,
        };
    },

    watch: {
        autoSend() {
            // 初始化 发送验证码请求
            if (this.autoSend) this.handle();
        }
    },

    methods: {
        async sendRequest() {
            let pms;
            switch (this.type) {
                // 登陆的短信验证
                case 1:
                    pms = await Member.sendSmsCodeBeforeLogin({
                        signature: this.signature
                    });
                    break;

                // 登陆的邮箱验证
                case 2:
                    pms = await Member.sendEmailCodeBeforeLogin({
                        signature: this.signature
                    });
                    break;

                    // 通用的短信验证
                    // case 5:
                    //     pms = await Member.sendSms(this.account);
                    //     break;

                    //     // 通用的邮箱验证
                    // case 6:
                    //     pms = await Member.sendEmailCode(this.account);
                    //     break;
            }

            return pms;
        },

        handle: function () {
            // 拦截过程中的状态 不处理
            if (this.state) return;

            // 开始倒计时
            let timer = utils.curryTimeTD(ret => {
                this.state = `(${ret}s)`;
            })(() => {
                this.state = "";
            });

            const pms = this.sendRequest();
            pms
                .then(response => {
                    let type = this.type == 1 ? this.$("login.sms") : this.$t("login.email");
                    this.$message({
                        message: `${type} ${this.$t("login.sendOK")}`,
                        type: "success",
                        duration : 2000,
                    });
                })
                .catch(err => {
                    // 停止当前的倒计时
                    clearInterval(timer);
                    // 恢复可点击的状态
                    this.state = "";
                });
        }
    },

    created() {
        // 初始化 发送验证码请求
        if (this.autoSend) this.handle();
    }

};
</script>

<style lang="scss" scoped>
.code-wrap {
    // border: 1px solid red;
    width : 108px;
    height: 30px;
    .btn, .btn-info {
        margin: 0;
        padding: 0;
        @include font(OpenSans-Regular, 13, 30, #fff);
        @include flexible(row, center, center);
    }
    // 倒计时期间 禁用样式
    .disabled {
        opacity: .5;
        cursor: default !important;
    }
}
</style>
