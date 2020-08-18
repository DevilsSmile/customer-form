import iBase64 from 'js-base64';

let output = {
    /**
     *  提取令牌有效期限
     *  @function
     *  @param {event}
     *  @returns
     */
    term: function (funcToken) {
        let funcIndex = funcToken.indexOf('.') + 1
        let funcDateBase = funcToken.substring(funcIndex)
        funcIndex = funcDateBase.indexOf('.')
        funcDateBase = funcDateBase.substring(0, funcIndex)

        let funcDateInfo = iBase64.Base64.decode(funcDateBase)
        let funcDateKey = '"exp":'
        let funcDateString = funcDateInfo.substring(funcDateInfo.indexOf(funcDateKey) + funcDateKey.length, funcDateInfo.length)
        funcDateString = funcDateString.substring(0, funcDateString.indexOf(','))

        return Number(funcDateString)
    },

    /**
     *  根据时间判断当前令牌状态
     *  @function
     *  @param {string} - funcToken
     *  @returns
     */
    state: function (funcToken) {
        let funcDate = output.term(funcToken)
        let funcNowDate = Math.round(new Date() / 1000)

        // 令牌有效
        if (funcNowDate < funcDate) {
            // 判断当前时间是否小于令牌期限
            if (funcNowDate + 1200 < funcDate) {
                // 令牌有效时间大于安全时间
                console.log('[token] valid')
                return 'valid'
            } else {
                console.log('[token] refresh')
                return 'refresh'
            }
        }

        // 令牌无效继续判断刷新令牌是否有效
        funcDate = output.term(localStorage.getItem('refresh'))
        // 令牌过期，刷新令牌有效需要重新登录
        if (funcNowDate < funcDate) {
            console.log('[token] relist')
            return 'relist'
        }

        // 令牌过期，刷新令牌过期默认游客身份
        if (funcNowDate > funcDate) {
            console.log('[token] invalid')
            return 'invalid'
        }
    },
}

export default output