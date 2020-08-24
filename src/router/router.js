import Vue from 'vue'
import Router from 'vue-router'

// 解决跳转重复路径报错问题
let funcRouterPush = Router.prototype.push
Router.prototype.push = function push(funcPath) {
    return funcRouterPush.call(this, funcPath).catch(funcError => funcError)
}

Vue.use(Router)

export default new Router({
    mode : 'history',
    routes: [
        { path: '/apppage/', name: 'home', component: () => import('@/view/home.vue') },
        { path: '/apppage/signin', name: 'signin', component: () => import('@/view/sign-in.vue') },
        { path: '/apppage/resetpassword', name: 'resetpassword', component: () => import('@/view/reset-password.vue') },
        { path: '/apppage/editinformation', name: 'editinformation', component: () => import('@/view/edit-information.vue') },
        { path: '/apppage/questionnaireinput', name: 'questionnaire-input', component: () => import('@/view/questionnaire-input.vue') },
        { path: '/apppage/questionnairedisplay', name: 'questionnaire-display', component: () => import('@/view/questionnaire-display.vue') },
        { path: '/apppage/questionnairepreview', name: 'questionnaire-preview', component: () => import('@/view/questionnaire-preview.vue') },
        // { path: '/signIn', component: () => import('@/view/sign-in.vue'),
        //     children: [
        //         { path: '/', name: 'signInStatus', mapText: '登录身份', component: () => import('@/view/sign-in-status.vue') },
        //         { path: 'input', name: 'signInInput', mapText: '登录', component: () => import('@/view/sign-in-input.vue') },
        //         { path: 'forget', name: 'signInForget', mapText: '忘记密码', component: () => import('@/view/sign-in-forget.vue') },
        //     ]
        // },
        { path: '*', name: 'questionnaire-displaybb', component: () => import('@/view/questionnaire-display.vue') },
        // { path: '*', name: '404', meta: { title: '404' }, component: () => import('@/view/404.vue')}
    ],
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0,
        }
    }
})