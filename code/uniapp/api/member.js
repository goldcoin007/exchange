import server from '@/api/serve'

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
        return server.post(`/user/register`, data);
    }

    /**
     * 登陆发送短信验证码
     * @param {object} data 
     */
    static sendSmsCodeBeforeLogin(data) {
        return server.post(`/login/sendSmsCodeBeforeLogin`, data)
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
        return server.post(`/user/login`, data);
    }

    /**
     * 登陆二次验证
     * @param {object} data 
     */
    static loginConfirm(data,{loading}) {
        return server.post(`/user/loginConfirm`, data,{loading})
    }

    /**
     * 退出登录
     */
    static logout(data) {
        return server.post(`/user/logout`,data);
    }
    /**
     * 上传文件
     * @param {FormData} data
     */
    static uploadImage(data) {
        
        return server.uploadFile(`/uploadImage`,data);
    }

    // 页面底部信息
    static floor(){
        return server.get('/floor')
    }
    // 移动端logo
    static mobileLogo(){
        return server.get('/index/logo',{},{loading:false})
    }
    // 消息通知
    static myNotifiables(data){
        return server.get('/user/myNotifiables',data)
    }
    // 消息通知详情
    static readNotifiable(data){
        return server.get('/user/readNotifiable',data)
    }
    // 移动端文章
    static article(data){
        return server.get('/article/list',data)
    }
    // 文章详情
    static articleDetail(data){
        return server.get('/article/detail',data)
    }
    // 获取协议
    static clause(){
        return server.get('/login/clause')
    }
    // 获取app更新信息
    static getNewestVersion(){
        return server.get('/getNewestVersion')
    }
    static serviceDetail(data) {
        return server.get(`/article/serviceDetail`, data);
    }
}

export default Member;
