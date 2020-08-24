import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        clientType: 'phone',
        isSignIn: false,                    // 登录状态
        signInUser: {},
    },
    
    mutations: {
        clientType: function (state, value) {
            state.clientType = value
        },
        isSignIn: function (state, value) {
            state.isSignIn = value
        },
        signInUser: function (state, value) {
            state.signInUser = value
        },
    },

    getters: {
        clientType: function (state) {
            return state.clientType
        },
        isSignIn: function (state) {
            return state.isSignIn
        },
        signInUser: function (state) {
            return state.signInUser
        },
    }
})