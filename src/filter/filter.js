const output = {
    urlFormat: function (value) {
        if (!value) return value
    
        let funcRegExp = new RegExp('^(https://)|(http://)', 'i')
        if (!funcRegExp.test(value)) {
            value = 'http://' + value
        }

        console.log('[filter]', value)
        return value
    }
}

export default output