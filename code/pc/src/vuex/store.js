import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        theme: localStorage.theme || 'dark',
        // 获取应用配置
        appConfig: (() => {
            if (localStorage.appConfig) {
                return JSON.parse(localStorage.appConfig)
            } else {
                return {}
            }
        })()
    },
    mutations: {
        SET_THEME(state, data) {
            state.theme = data
            localStorage.setItem('theme', data)
        },
        SET_APPCONFIG(state, data) {
            state.appConfig = data
            localStorage.setItem('appConfig', JSON.stringify(data))
        }
    },
    actions: {
        setTheme({ commit }, data) {
            commit('SET_THEME', data)
        },
        setAppConfig({ commit }, data) {
            commit('SET_APPCONFIG', data)
        }
    },
})

export default store
