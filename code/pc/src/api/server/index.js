/**
 * 初始化请求的封装
 *
 * @author lautin
 * @created 2019-11-21 14:54:43
 */

import axios from 'axios';
import qs from 'qs';

import {
    Message,
    Loading
} from 'element-ui'


// 加入状态管理
// import store from '../../store'

// 加入进度条
// import NProgress from 'nprogress' // nprogress插件
// import 'nprogress/nprogress.css'  // nprogress样式(必须)


// 加载惯例配置
import settings from './convention';

// 设置语言: 默认ua -> 用户设置 -> 参数指定
let browserLang = navigator.language.includes('zh') ? 'cn' : 'en'; // ua设置
let lang = localStorage.lang || browserLang; // 

let querystring = location.search.slice(1);
if (querystring.includes('lang')) {
    lang = qs.parse(querystring)['lang'];
}

// 用户认证
let token = localStorage.getItem("token");
let auth = { authorization: `bearer ${token}` } || {};

if(lang=='cn'){
    lang='zh-CN'
}else if(lang=='tw'){
    lang='zh-TW'
}else if(lang=='ukr'){
    lang='uk'
}
// 设置头信息
const headers = Object.assign({
    'X-Requested-With': 'XMLHttpRequest',
    lang,
}, auth);

console.log(process.env.NODE_ENV)
// 初始化配置
Object.assign(settings, {

    // api请求根地址 打包使用完整地址 调试使用本地服务器代理 避免跨域
    // baseURL: process.env.NODE_ENV == 'production' ? 'http://qkladmin2.ruanmeng.top/api/' : '/api/',
    // baseURL: process.env.NODE_ENV == 'production' ? 'https://guanli.coin.amatak.net/api/' : '/api/',
    baseURL: 'https://guanli.coin.amatak.net/api/',

    // 加载超时限定5s
    timeout: 10000,

    headers,

    // 跨站请求必要凭证
    // withCredentials: true,

});

// 创建服务请求对象
const server = axios.create(settings);

const exclude = [
    `getHistoryEntrust`,
    `getConditionEntrust`,
    `getCurrentEntrust`,
    `getUserCoinBalance`,
    `getKline`,
    `getEntrustTradeRecord`,
    `floor`
];

let loading = null;

// request拦截器
server.interceptors.request.use(

    config => {
        // 剔除部分高频接口 主要是交易时的后台操作
        if (!exclude.find(item => config.url.includes(item))) {
            if (!config.config || config.config.loading) {
                loading = Loading.service({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.5)'
                });
            }
        }
        return config;
    },

    error => {
        // do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// respone拦截器
server.interceptors.response.use(

    // 请求状态成功
    response => {

        // 如果有加载的loading则关闭
        if (loading) loading.close();

        let { code, message, data } = response.data;

        if (code != 200 && code != 1021) {

            switch (code) {
                case 1003: // 登陆失效
                    message = "登录失效，请重新登录!";
                    // 清除session
                    localStorage.removeItem("auth");
                    localStorage.removeItem("token");
                    location.href = "/"
                    break;
                case 1034: // 请设置交易密码
                    message = "请先设置交易密码！";
                    break;
                default: // 通用错误提示

            }
            if(code!=1051){
                Message({
                    type: 'error',
                    duration: 2 * 1000,
                    message,
                });
            }

            // 进入catch
            if(code==4002){
                throw (code);
            }else{
                throw new Error(message);
            }
        }


        return data;

    },

    // 请求发生错误
    error => {
        if (loading) loading.close();

        let message;
        if (error.message.includes("timeout")) {
            message = "Connection timed out";
        } else {
            message = error.message;
        }

        // 错误提示
        Message({
            type: 'error',
            duration: 2 * 1000,
            message,
            callback() {
                // 进入catch
                throw new Error(error);
            }
        });
        return Promise.reject(error)
    }
)

// request方法中的配置会合并到server中
export default server;