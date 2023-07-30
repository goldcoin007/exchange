<template>
<button type="button" :class="[`btn`, btnSize, {disabled : state}]" @click="handle">
    {{state || $t('common.retransmission')}}
</button>
</template>

<script>
import Setting from "@/api/setting";
import Member from "@/api/member";

export default {
    props: {
        type: {
            type: Number,
            default: null,
        },
        data: {
            type: [String, Object, Number],
            default: null
        },
        btnSize: {
            type: String,
            default: 'btn-sm',
        }
    },

    data() {
        return {
            state: '',
        };
    },

    methods: {

        async sendRequest() {
            let pms;
            switch (this.type) {
                // 通用的短信和邮箱验证
                case 1:
                    pms = await Setting.getCode(this.data);
                    break;

                    // 绑定手机时的验证 
                case 2:
                    pms = await Setting.sendBindSmsCode(this.data)
                    break;

                    // 绑定邮箱时的验证 data
                case 3:
                    pms = await Setting.sendBindEmailCode(this.data)
                    break;

                    // 忘记密码的短信验证
                case 6:
                    pms = await Member.sendSmsCodeForgetPassword(this.data);
                    break;
                    // 忘记密码邮箱验证
                case 7:
                    pms = await Member.sendEmailCodeForgetPassword(this.data)
                    break;
            }

            return pms;
        },

        chkError() {
            let err_msg = '';
            switch (this.type) {
                // 绑定手机验证码时 验证手机号
                case 2:
                    if (!utils.rules.isPhone.test(this.data.phone)) {
                        err_msg = "The register phone is not available!";
                    }
                    break;

                    // 绑定邮箱验证码时 验证邮箱号
                case 3:
                    if (!utils.rules.isEmail.test(this.data.email)) {
                        err_msg = "The register email is not available!";
                    }
                    break;
            }

            return err_msg;
        },

        handle: function () {
            // 禁用状态 不可点击
            if (this.state) return;

            // 检查账号错误
            let message = this.chkError();
            if (message) {
                this.$message({
                    message,
                    type: "warning"
                });
                return;
            }

            // 开始倒计时
            let timer = utils.curryTimeTD(ret => {
                this.state = `${ret}s`;
            })(() => {
                this.state = '';
            });

            const pms = this.sendRequest();

            pms.then(response => {
                this.$message({
                    message: "Verification Code Sent！",
                    type: "success"
                })
            }).catch(err => {
                console.log(err)
                // 停止倒计时
                clearInterval(timer);
                this.$message({
                    message: "Error getting captcha",
                    type: "error"
                });
                this.state = '';
            });
        },

    },

    created() {

    },
};
</script>

<style lang="scss" scoped>
.code-box {

    @include ff(OpenSans-Regular);

    @include flexible(row, center, center);

    height: 100%;

}

button {
    margin-top : 0!important;
}
.getcode {
    position: relative;

    &::before {
        content: '';
        width: 1px;
        height: 14px;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        left: -10px;
        background: rgba(255, 255, 255, 0.6);
    }
}
</style>
