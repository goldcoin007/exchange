import server from './server';
class Profile {
    // 获取用户信息
    static getUserInfo() {
        return server.get(`/user/getUserInfo`,{loading:false});
    }
    // 获取实名认证信息
    static getAuthInfo() {
        return server.get(`/user/getAuthInfo`);
    }
    /**
     * 初级认证 （认证第一步）
     * @param {object} data
     * @param {number} data.country_code
     * @param {number} data.country_id // 区号id
     * @param {string} data.realname
     * @param {number} data.id_card //证件号
     * @param {number} data.type //证件类型
     * @param {string} data.birthday //出生日期
     * @param {string} data.address //地址
     * @param {string} data.city //城市
     * @param {string} data.extra //额外信息
     * @param {string} data.postal_code //邮政编码
     * @param {string} data.phone //手机号
    */
    static primaryAuth(data) {
        return server.post(`/user/primaryAuth`, data);
    }
    /**
     * 高级认证（认证第二步）
     * @param {object} data
     * @param {string} data.front_img //证件照正面
     * @param {string} data.back_img   //证件照反面
     * @param {string} data.hand_img //手持证件照
    */
    static topAuth(data) {
        return server.post(`/user/topAuth`, data);
    }

    /**
     * 登录记录
    */
    static getLoginLogs(data){
        return server.get(`/user/getLoginLogs`, {
            params : data
        })
    }
    /**
     * 邀请推广
    */
    static generalizeInfo(){
        return server.get(`/generalize/info`)
    }
    /**
     * 推广记录
    */
    static generalizeList(data){
        return server.get(`/generalize/list`,{
            params : data
        })
    }
    
}

export default Profile;