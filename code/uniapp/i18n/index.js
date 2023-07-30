import vue from "vue";
import VueI18n from "vue-i18n";
vue.use(VueI18n)

// 获取语言
const requireComponent = require.context(
    // 其组件目录的相对路径
    './lang',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /[a-zA-Z]\w+\.(json)$/
)
let messages = new Object();
requireComponent.keys().forEach(fileName => {
    // 获取组件的PascalCase命名
    const componentName = fileName.split('/').pop().replace(/\.\w+$/, '');
    messages[componentName] = requireComponent(fileName);
})
// 语言注入
let system_lang = uni.getStorageSync('language')
if (!system_lang) {
    // 获取设备信息
    uni.getSystemInfo({
        success: function (res) {
			if(res.language.slice(0,2) == "en"){
			    system_lang = "en";
			} else {
				system_lang = res.language;
			}
            uni.setStorageSync('language', system_lang);
        }
    })
}
let i18n = new VueI18n({
    locale: uni.getStorageSync('language'),
    messages: messages
})
export default i18n;