import server from './server'

class Member {

    /**
     * 注册滑块验证码
     * @param {object} data 
     */
    static sliderVerify(data) {
        return server.post(`/sliderVerify`, data);
    }

    /**
     * 注册发送手机验证码 
     * @param data {phone,country_code,token}
     */
    static sendSmsCode(data) {
        return server.post(`/register/sendSmsCode`, data);
    }

    /**
     * 注册发送验证码
     * @param data {email,token}
     */
    static sendEmailCode(data) {
        return server.post(`/register/sendEmailCode`, data);
    }

    /**
     * 获取国家区号
     * @param {object} data
     */
    static getCountryCode() {
        return server.get(`/getCountryList`);
    }

    /**
     * 注册提交
     * @param {object} data 
     */
    static register(data) {
        return server.post(`user/register`, data);
    }

    /**
     * 登陆发送短信验证码
     * @param {object} data 
     */
    static sendSmsCodeBeforeLogin(data) {
        return server.post(`/login/sendSmsCodeBeforeLogin`, data);
    }

    /**
     * 登陆发送邮箱验证码
     * @param {object} data 
     */
    static sendEmailCodeBeforeLogin(data) {
        return server.post(`/login/sendEmailCodeBeforeLogin`, data);
    }

    /**
     * 登陆初始化验证
     * @param {object} data 
     */
    static login(data) {
        return server.post(`user/login`, data);
    }

    /**
     * 登陆二次验证
     * @param {object} data 
     */
    static loginConfirm(data) {
        return server.post(`/user/loginConfirm`, data)
    }

    /**
     * 退出登录
     */
    static logout() {
        return server.post(`/user/logout`);
    }
    /**
     * 上传文件
     * @param {FormData} data
     */
    static uploadImage(data) {
        return server.post(`/uploadImage`, data);
    }

    /**
     * 忘记密码的账号验证
     * @param {object} data 
     */
    static forgetPasswordAttempt(data) {
        return server.post(`/user/forgetPasswordAttempt`, data);
    }

    /**
     * 忘记密码短信验证
     */
    static sendSmsCodeForgetPassword(data) {
        return server.post(`/user/sendSmsCodeForgetPassword`, data);
    }

    /**
     * 忘记密码邮箱验证
     */
    static sendEmailCodeForgetPassword(data) {
        return server.post(`/user/sendEmailCodeForgetPassword`, data);
    }

    static forgetPwdSumit(data) {
        return server.post(`/user/forgetPassword`, data);
    }
    // 消息通知
    static myNotifiables(data) {
        return  server.get('/user/myNotifiables', {params:data})
    }
    // 未读消息数量
    static myNotifiablesCount() {
        return  server.get('/user/myNotifiablesCount')
    }
    // 消息详情
    static readNotifiable(data){
        return  server.get('/user/readNotifiable',{params:data})
    }
    // 一键已读
    static batchReadNotifiables(){
        return  server.get('/user/batchReadNotifiables')
    }
    // 获取logo
    static getLogo(){
        return server.get('/index/logo')
    }
    // 移动端文章
    static article(data){
        return server.get('/article/list',{params:data})
    }
    // 文章详情
    static articleDetail(data){
        return server.get('/article/detail',{params:data})
    }
    // 文章详情
    static agent(data){
        return server.post('/agent/register',data)
    }
}

export default Member;
