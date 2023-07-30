import Vue from 'vue'
import App from './App'
import router from './router'
import VueClipboard from 'vue-clipboard2'

import store from './vuex/store'
import i18n from './i18n'

// 导入公共组件
import './components';

// 所有utils方法既可以在全局使用utils导入 也可以作为过滤器使用
Object.keys(utils).forEach(key => {
    Vue.filter(key, function(value, ...args) {
        if (utils[key] instanceof Function) {
            // 将value作为第一个参数值，剩余参数分别传入方法中
            return utils[key](value, ...args);
        }
    });
});

// 复制
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard)

// 导入element-ui完整版
import ElementUI from 'element-ui';
import en from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, {
    size: 'medium',
    zIndex: 3000,
    locale: localStorage.lang == 'cn' ? undefined : en
});


// 引入全局常量
import consts from './utils/consts'
Vue.use(consts);

// 在scss文件中引入了bootstrap.css 此处无需再次引入
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    i18n,
    store,
    components: {
        App
    },
    template: '<App />'
});