let output = function (funcXMLHttpRequest, funcConfigure) {
    switch (funcConfigure.sendType) {
        case 'json':
            funcXMLHttpRequest.setRequestHeader('Content-Type', 'application/json;')
            break

        case 'file':
            funcXMLHttpRequest.setRequestHeader('Content-Type', 'multipart/form-data;')
            break

        case 'form':
            funcXMLHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;')
            break

        case 'formdata':
            // 浏览器自行设置表头
            break

        case 'params':

            break
    }
}

export default output