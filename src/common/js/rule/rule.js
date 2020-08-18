import iAtom from './atom.js'

let output = {
    // 文本，除emoji符号
    predefineRoutineText: function (rule, value, callback) {
        let funcRegExp = new RegExp(/[\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|[\u2700-\u27BF]\uFE0F]/, 'ig')
        if (funcRegExp.test(value)) {
            callback(new Error('不允许使用表情符号'))
            return
        }

        callback()
    },

    // 文本，仅数字、英文字母（区分大小写）
    predefineNumeralText: function (rule, value, callback) {
        let funcRegExp = new RegExp(/^[0-9a-z]+$/, 'ig')
        if (!funcRegExp.test(value)) {
            callback(new Error(rule.message))
            return
        }

        callback()
    },

    // 文本，仅数字
    predefineNumeral: function (rule, value, callback) {
        let funcRegExp = new RegExp(/^[0-9]+$/, 'ig')
        if (!funcRegExp.test(value)) {
            callback(new Error(rule.message))
            return
        }

        callback()
    },

    email: function (rule, value, callback) {
        let funcRegExp = new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, 'ig')
        if (!funcRegExp.test(value)) {
            callback(new Error(rule.message))
            return
        }

        callback()
    },

    idCard: function (rule, value, callback) {
        let funcRegExp = new RegExp(/^[1-9][0-9]{5}(18|19|20)[0-9]{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)[0-9]{3}[0-9Xx]$/, 'ig')
        if (!funcRegExp.test(value)) {
            callback(new Error(rule.message))
            return
        }

        callback()
    },

    phone: function (rule, value, callback) {
        let funcRegExp = new RegExp(/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|19[0-9])[0-9]{8}$/, 'ig')
        if (!funcRegExp.test(value)) {
            callback(new Error(rule.message))
            return
        }

        callback()
    },

    fixedPhone: function (rule, value, callback) {
        let funcRegExp = new RegExp(/^[0-9*#-]+$/, 'ig')
        if (!funcRegExp.test(value)) {
            callback(new Error(rule.message))
            return
        }

        callback()
    },

    phoneAndFixedPhone: function (rule, value, callback) {
        if (!iAtom.isPhone(value) && !iAtom.isFixedPhone(value)) {
            callback(new Error(rule.message))
            return
        }

        callback()
    },

    password: function (rule, value, callback) {
        let funcRegulation
        let funcComplexity = 0

        funcRegulation = /[0-9]+/ig
        if (funcRegulation.test(value)) {
            funcComplexity = funcComplexity + 1
        }

        funcRegulation = /[a-z]+/ig
        if (funcRegulation.test(value)) {
            funcComplexity = funcComplexity + 1
        }

        funcRegulation = /((?=[\x21-\x7e]+)[^A-Za-z0-9])/ig
        if (funcRegulation.test(value)) {
            funcComplexity = funcComplexity + 1
        }

        if (funcComplexity < 2) {
            callback(new Error(rule.message))
            return
        }
        callback()
    },

    passwordRepeat: function (rule, value, callback, password) {
        if (value !== password) {
            callback(new Error(rule.message))
            return
        }

        callback()
    },

    unEmoji: function (rule, value, callback) {
        let funcRegExp = new RegExp(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/, 'ig')
        if (funcRegExp.test(value)) {
            callback(new Error(rule.message))
            return
        }

        callback()
    },

    unSpace: function (rule, value, callback) {
        let funcRegExp = new RegExp(/ /, 'ig')
        if (funcRegExp.test(value)) {
            callback(new Error(rule.message))
            return
        }

        callback()
    },

    unChinese: function (rule, value, callback) {
        let regExp = new RegExp('[\u4e00-\u9fa5]+', 'ig')
        regExp.test(value) ? callback(new Error(rule.message)) : callback()
    },

    // 无符号正整数
    signlessInteger: function (rule, value, callback) {
        if (!iAtom.isInt(value, true)) {
            callback(new Error(rule.message))
            return
        }
        callback()
    },

    // 无符号非零正整数
    signlessIntegerNonZero: function (rule, value, callback) {
        if (!iAtom.isInt(value, false)) {
            callback(new Error(rule.message))
            return
        }
        callback()
    }
}

export default output