import iVue from '../../../main.js'
import iHost from '../host.js'

let timerClose = 0
let loading = null
let loadingFilter = [
    'bid/order/queryState',                 // 查询支付状态
    'bid/common/getImgCode',                // 获取图片验证
]

let output = {
    /**
     *  请求拦截器
     *  @function
     *  @param {object} funcConfigure - 请求配置
     *  @returns {boolean}
     */
    request: function (funXmlHttpRequest, funcConfigure, funcUrl) {
        // funcUrl = funcUrl.replace(iHost.base, '')
        // // 只有不被过滤的接口才会显示加载动画
        // if (loadingFilter.indexOf(funcUrl) === -1) {
        //     if (loading === null) {
        //         loading = iVue.$loading({  lock: false, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(255, 255, 255, 0.7)' })
        //     }

        //     if (timerClose !== 0) {
        //         clearTimeout(timerClose)
        //     }
        // }

        // // 默认添加 token 属性
        // if (funcConfigure.isToken) {
        //     funXmlHttpRequest.setRequestHeader('token', localStorage.getItem('token'))
        // }
    },

    /**
     *  响应拦截器
     *  @function
     *  @param {object} funcConfigure - 请求配置
     *  @param {object} funcResult - 响应数据
     *  @returns {boolean}
     */
    response: function (funcConfigure, funcResult) {
        // if (loading) {
        //     timerClose = setTimeout(() => {
        //         if (loading) {
        //             loading.close()
        //         }
        //         loading = null
        //         clearTimeout(timerClose)
        //     }, 500)
        // }

        let funcDataType = ''
        try {
            JSON.parse(funcResult)
            funcDataType = 'object'
        }
        catch (funcError) {
            funcDataType = 'other'
        }

        if (funcDataType === 'object') {    
            let funcResultData = JSON.parse(funcResult)
            switch (Number(funcResultData.statusCode)) {
                case 10001:
                    console.log('token overdue')
                    this.$store.commit('isSignIn', false)
                    this.$store.commit('redirectPath', null)
                    localStorage.clear()
                    iVue.$router.push('/')
                    return { state: false, response: { message: funcResultData.msg }}
                    break

                // 请求正常直接返回 data 内容
                case 1:
                    return { state: true, response: funcResultData.responseResult}
                    break

                // 请求正常直接返回 data 内容
                case 400:
                    return { state: false, response: { message: funcResultData.resMessage, data: funcResultData.responseResult }}
                    break

                // 请求异常返回 msg 错误提示
                default:
                    return { state: false, response: { message: funcResultData.resMessage }}
                    break
            }
        }
        return funcResult
    }
}

export default output
