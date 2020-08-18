let output = {
    // 开发路径
    // base: 'http://bid-server.meiqicloud.com/',
    // resources: 'http://bid-web.meiqicloud.com/',
    // agentSignIn: 'http://bid-vue.meiqicloud.com/'

    // 测试环境
    base: '/Api/',
    resources: 'http://bid-web.meiqicloud.com',
    agentSignIn: 'http://bid-vue.meiqicloud.com/'

    // 正式环境
    // base: '/Api/',
    // resources: 'https://www.fjbidding.com',
    // agentSignIn: 'https://www.fjbidding.com/admin/'
}

output.uploadFile = output.base + 'bid/common/webupload/upload'

export default output