import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        clientType: 'pc',
        isSignIn: false,                    // 登录状态
    },
    
    mutations: {
        clientType: function (state, value) {
            state.clientType = value
        },
    },

    getters: {
        clientType: function (state) {
            return state.clientType
        },
    }
})