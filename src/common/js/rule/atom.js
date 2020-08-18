// 0630
let output = {
    isInt: function (value, isZero) {
        let regExp
        if (isZero) {
            regExp = new RegExp('^(0|[1-9][0-9]*)$')
        } else {
            regExp = new RegExp('^([1-9][0-9]*)$')
        }
        return regExp.test(value)
    },
    isMoney: function (value) {
        let regExp = new RegExp('^[0-9]+(.[0-9]{1,2})?$')
        return regExp.test(value)
    },

    isChinese: function (value) {
        let regExp = new RegExp('[\u4e00-\u9fa5]+', 'ig')
        return regExp.test(value)
    },

    isPhone: function (value) {
        let regExp = new RegExp(/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|19[0-9])[0-9]{8}$/, 'ig')
        return regExp.test(value)
    },

    isFixedPhone: function (value) {
        let regExp = new RegExp(/^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/, 'ig')
        return regExp.test(value)
    }
}

export default output