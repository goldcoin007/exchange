import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import enLocale from 'element-ui/lib/locale/lang/en'
// import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from './en'
import cn from './cn'
import jp from './jp'
import kor from './kor'
import qs from 'qs'

Vue.use(VueI18n)

let UALang = navigator.language.includes('zh') ? 'cn' : 'en';

let local = localStorage.lang || UALang;

// 检测地址栏有无指定语言
let querystring = location.search.slice(1);
if (querystring.includes('lang')) {
    local = qs.parse(querystring)['lang'];
}

// 加载i8n语言包
const i18n = new VueI18n({
    locale: local,      // 默认语言
    messages: { en, cn, jp ,kor} // 文件列表
});

// 加载element语言包
// local == 'cn' ? ELEMENT.locale(ELEMENT.lang.zhCN) : ELEMENT.locale(ELEMENT.lang.en)

export default i18n;