import iHeader from './header.js'
import iDataform from './dataform.js'
import iInterceptors from './interceptors.js'
import iVue from '../../../main.js'

let output = {
    /**
     *  通用请求函数
     *  @function
     *  @param {string} funcUrl     - 完整请求路径
     *  @param {object} funcData    - 请求数据
     *  @param {string} funcType    - 请求数据类型
     *  @param {string} funcMethod  - 请求方法
     *  @param {object} funcOther   - 其他配置
     */

    request: function (funcUrl, funcData, funcSendType, funcMethod, funcOther) {
        // 获取默认请求设置
        let funcConfigure = JSON.parse(JSON.stringify({
            sendType: 'json',                       // 数据发送方式
            method: 'post',                         // 请求方式
            timeout: 10000,                         // 超时设置
            isToken: true,                          // 是否携带
            errorCode: [ 101 ],
        }))

        if (funcSendType) funcConfigure.sendType = funcSendType
        if (funcMethod) funcConfigure.method = funcMethod
        
        Object.assign(funcConfigure, funcOther)
        console.log(funcConfigure)



        // get 请求需要将参数转换为 url 形式
        if (funcConfigure.method === 'get') {
            // 设置数据类型
            funcData = iDataform(funcData, 'url')
            let funcPromise = new Promise(function (funcResolve, funcReject) {
                let funcXMLHttpRequest = new XMLHttpRequest()
                funcXMLHttpRequest.open(funcConfigure.method, funcUrl + funcData, true)
    
                // 请求之前修改
                iHeader(funcXMLHttpRequest, funcConfigure)
                iInterceptors.request(funcXMLHttpRequest, funcConfigure, funcUrl)
    
                funcXMLHttpRequest.send()
                funcXMLHttpRequest.onreadystatechange = function () {
                    if (funcXMLHttpRequest.readyState !== 4) {
                        return
                    }
                    let funStatus = funcXMLHttpRequest.status
                    if ((funStatus >= 200 && funStatus < 300) || funStatus === 304) {
                        let funcInterceptorsResponse = iInterceptors.response(funcConfigure, funcXMLHttpRequest.responseText)
                        if (funcInterceptorsResponse.state) {
                            funcResolve(funcInterceptorsResponse.response)
                        } else {
                            iVue.$message.error(funcInterceptorsResponse.response.message)
                        }
                    } else {
                        let funcInterceptorsResponse = iInterceptors.response(funcConfigure, funcXMLHttpRequest.responseText)
                        if (funcInterceptorsResponse.state) {
                            funcResolve(funcInterceptorsResponse.response)
                        } else {
                            iVue.$message.error(funcInterceptorsResponse.response.message)
                        }
                    }
                }
            })
            return funcPromise
        }



        if (funcConfigure.method === 'post') {
            // 设置数据类型
            let funcPromise = new Promise(function (funcResolve, funcReject) {
                let funcXMLHttpRequest = new XMLHttpRequest()
                funcXMLHttpRequest.open(funcConfigure.method, funcUrl, true)
    
                // 请求之前修改
                iHeader(funcXMLHttpRequest, funcConfigure)
                iInterceptors.request(funcXMLHttpRequest, funcConfigure, funcUrl)
                funcXMLHttpRequest.send(funcData)
                funcXMLHttpRequest.onreadystatechange = function () {
                    if (funcXMLHttpRequest.readyState !== 4) {
                        return
                    }
                    let funStatus = funcXMLHttpRequest.status
                    if ((funStatus >= 200 && funStatus < 300) || funStatus === 304) {
                        let funcInterceptorsResponse = iInterceptors.response(funcConfigure, funcXMLHttpRequest.responseText)
                        if (funcInterceptorsResponse.state) {
                            funcResolve(funcInterceptorsResponse.response)
                        } else {
                            console.log('funcReject')
                            iVue.$message.error(funcInterceptorsResponse.response.message)
                            funcReject(funcInterceptorsResponse.response)
                        }
                    } else {
                        let funcInterceptorsResponse = iInterceptors.response(funcConfigure, funcXMLHttpRequest.responseText)
                        if (funcInterceptorsResponse.state) {
                            funcResolve(funcInterceptorsResponse.response)
                        } else {
                            iVue.$message.error(funcInterceptorsResponse.response.message)
                        }
                    }
                }
            })
            return funcPromise
        }
    },
}

export default output