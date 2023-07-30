import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import enLocale from 'element-ui/lib/locale/lang/en'
// import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from './en.json'
import cn from './cn.json'
import tw from './tw.json'
import jp from './jp.json'
import qs from 'qs'
import kor from './kor.json'
import de from './de.json'
import fin from './fin.json'
import fra from './fra.json'
import it from './it.json'
import pl from './pl.json'
import pt from './pt.json'
import spa from './spa.json'
import swe from './swe.json'
import ukr from './ukr.json'
import tr from './tr.json'

Vue.use(VueI18n)

let UALang;
// 检测中文简体和翻译
if (navigator.language.startsWith("zh")) {
    UALang = _.trimStart(navigator.language, 'zh-').toLowerCase()
} else {
    UALang = "en";// 其余英文
}

let local = localStorage.lang || UALang;
// 检测地址栏有无指定语言 ?lang=cn/tw/en
let querystring = location.search.slice(1);
if (querystring.includes('lang')) {
    local = qs.parse(querystring).lang;
}

// 加载i18n语言包
const i18n = new VueI18n({
    locale: local,      // 默认语言
    messages: { en, cn,tw,kor,jp,de,fin,fra,it,pl,pt,spa,swe,ukr,tr } // 文件列表
});

// 加载element语言包
// local == 'cn' ? ELEMENT.locale(ELEMENT.lang.zhCN) : ELEMENT.locale(ELEMENT.lang.en)

export default i18n;