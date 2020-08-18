let output = function (funcValue, funcType, funcUpdateObject) {
    switch (funcType) {
        case 'size':
            funcUpdateObject.size = funcValue
            break

        case 'total':
            funcUpdateObject.total = funcValue
            break

        case 'current':
            funcUpdateObject.current = funcValue
            break
    }
    
    console.log('[frame pagination]: ', JSON.stringify(funcUpdateObject))
}

export default output