let output = function (funcXMLHttpRequest, funcConfigure) {
    // text/xml                          - xml
    // application/json                  - json
    // multipart/form-data               - 文件上传
    // application/x-www-form-urlencoded - 表单提交

    switch (funcConfigure.sendType) {
        case 'xml':
            console.log('[request] set content-type: text/xml')
            funcXMLHttpRequest.setRequestHeader('Content-Type', 'text/xml; charset=UTF-8')
            break

        case 'json':
            console.log('[request] set content-type: text/json')
            funcXMLHttpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
            break

        case 'file':
            // 浏览器自行设置表头
            console.log('[request] set content-type: multipart/form-data')
            // funcXMLHttpRequest.setRequestHeader('Content-Type', 'multipart/form-data; charset=UTF-8')
            break

        case 'form':
            console.log('[request] set content-type: x-www-form-urlencoded')
            funcXMLHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            break
    }
}

export default output