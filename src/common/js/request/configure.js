let output = {
    sendType: 'json',                       // 数据发送方式
    sendTypeEnumeration: [ 'params', 'json','form', 'formdata'],

    method: 'post',                         // 请求方式
    methodEnumeration: [ 'get', 'post' ],

    timeout: 10000,                         // 超时设置
    isToken: true,                          // 是否携带
    isLog: true,                            // 是否打印请求相关信息
    errorCode: [ 101 ],
}

export default output