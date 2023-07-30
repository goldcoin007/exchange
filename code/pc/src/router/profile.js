
import Profile from '@/views/profile';
import ResetPwd from '@/views/profile/reset-pwd';
import Certification from '@/views/profile/certification';
import Invite from '@/views/profile/invite';
import LoginHistory from '@/views/profile/login-history';

export default [
    {
        name: "profile",
        path: "/profile/index", // 默认账号页面
        component: Profile
    },
    {
        name: "resetPwd",
        path: "/profile/reset-pwd", // 重置密码
        component: ResetPwd
    }, {
        name: "certification",
        path: "/profile/certification",   // 实名认证
        component: Certification
    },
    {
        name: "invite",
        path: "/profile/invite",   // 邀请好友
        component: Invite
    },
    {
        name: "loginHistory",
        path: "/profile/login-history",   // 登录历史
        component: LoginHistory
    },

]