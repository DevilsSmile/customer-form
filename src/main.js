import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store/store.js'
import filter from './filter/filter.js'
import router from './router/router.js'

Object.keys(filter).forEach(key => {
    Vue.filter(key, filter[key])
})

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi)

import './common/css/reset.css'
import './common/css/style.css'
import './common/css/layout.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
let output = new Vue({
    'el': '#app',
    'store': store,
    'router': router,
    'components': { App },
    'template': '<App/>'
})
export default output