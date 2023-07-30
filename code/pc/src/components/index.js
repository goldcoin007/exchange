import Vue from 'vue'

// 加入公共组件
const requireComponent = require.context(
    // 其组件目录的相对路径
    './',
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /[A-Z]\w+\.(vue|js)$/
)

// console.log(requireComponent);

requireComponent.keys().forEach(fileName => {
    
    // 获取组件配置 - vm实例
    const componentConfig = requireComponent(fileName)
    // console.log(fileName); // ./GetCode.vue

    // 获取组件的PascalCase命名
    const componentName = _.upperFirst(
        _.camelCase(
            // 获取和目录深度无关的文件名
            fileName
                .split('/')
                .pop()
                .replace(/\.\w+$/, '')
        )
    )
    // console.log(componentName); // VButton
    // 全局注册组件
    Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
    )
})