import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        clientType: 'phone',
        isSignIn: true,                    // 登录状态
    },
    
    mutations: {
        clientType: function (state, value) {
            state.clientType = value
        },
        isSignIn: function (state, value) {
            state.isSignIn = value
        },
    },

    getters: {
        clientType: function (state) {
            return state.clientType
        },
        isSignIn: function (state) {
            return state.isSignIn
        },
    }
})