let output = function (funcParams, funcType) {
    funcType = funcType.toLowerCase()

    switch (funcType) {
        case 'url':
            if (JSON.stringify(funcParams) !== '{}') {
                let funcQuery = '?'
                Object.keys(funcParams).forEach((funcKey) => {
                    funcQuery = funcQuery + funcKey + '=' + funcParams[funcKey] + '&'
                })
                return funcQuery.substring(0, funcQuery.length - 1)
            } else {
                return ''
            }
            break

        case 'json':
            return JSON.stringify(funcParams)
            break
    }
}

export default output