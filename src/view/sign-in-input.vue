<template>
    <!-- 通用组件 - 登录 -->
    <div class="currency-sign-in-input row con-c">
        <div class="main global-maxwidth">
            <!-- 登录信息 -->
            <div class="row con-c align-s">
                <div class="currency-sign-in-form col con-b">
                    <div>
                        <span>{{statusText}}</span>
                    </div>
                    <el-form ref="formSignIn" :model="info" :rules="rule" label-width="0">
                        <el-form-item prop="phone">
                            <el-input v-model="info.phone" placeholder="手机号" :autofocus="true" maxlength="11" @keyup.enter.native="onSignInSubmit()"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="info.password" show-password maxlength="20" placeholder="密码" @keyup.enter.native="onSignInSubmit()"></el-input>
                        </el-form-item>
                        <el-form-item v-show="showImageCode" class="form-item-code" prop="code">
                            <el-input v-model="info.code" maxlength="4" placeholder="请输入验证码" @keyup.enter.native="onSignInSubmit()"></el-input>
                            <button @click.prevent=""><img :src="imageCodeData" alt=""></button>
                        </el-form-item>
                        <div class="row con-b align-c">
                            <!-- <el-checkbox v-model="isRecordPassword" @change="onCheckboxChange">记住密码</el-checkbox> -->
                            <span></span>
                            <span class="currency-sign-in-forget global-cursor" @click="onForget()">忘记密码？</span>
                        </div>
                        <el-form-item class="submit">
                            <button class="global-cursor" @click.prevent="onSignInSubmit()">登录</button>
                        </el-form-item>
                    </el-form>
                    <div class="row con-c align-c">
                        <span class="global-cursor">没有账号？</span>
                        <span class="global-cursor" @click="onRegister">立即注册</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import iCryptoJs from 'crypto-js'

    import iHost from '@/common/js/host.js'
    import iRule from '@/common/js/rule/rule.js'
    import iRequest from '@/common/js/request/request.js'

    export default {
        data: function () {
            return {
                statusText: '',
                isRecordPassword: false,

                info: {
                    'name': '',                     // 名称
                    'phone': '',                    // 登录号码
                    'password': '',                 // 记录密码
                    'register': '',                 // 审核状态
                    'identity': '',                 // 登录身份
                    'code': ''
                },
                imageCodeData: '',
                showImageCode: false,

                // 表单验证
                rule: {
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'blur' }
                    ],
                },
            }
        },

        created: function () {
            this.reset()
            this.init()
        },

        methods: {
            /**
             *  设置登录文本以及登录身份
             *  @function
             *  @returns
             */
            init: function () {
                // 1 - 专家
                // 2 - 商家
                switch (this.$route.query.status) {
                    case 'specialist':
                        this.info.identity = 1
                        this.statusText = '专家登录'
                        break

                    case 'supplier':
                        this.info.identity = 2
                        this.statusText = '供应商登录'
                        break

                    case 'agency':
                        this.info.identity = 3
                        this.statusText = '代理商登录'
                        break

                    default:
                        this.$router.push('/signIn')
                        break
                }
            },

            reset: function () {
                this.info = {
                    'name': '',                     // 名称
                    'phone': '',                    // 登录号码
                    'password': '',                 // 记录密码
                    'register': '',                 // 审核状态
                    'identity': '',                 // 登录身份
                    'code': ''
                }
                this.imageCodeData = ''
                this.showImageCode = false
            },

            /**
             *  读取登录信息
             *  @function
             *  @returns
             */
            loadSignInInfo: function () {
                let funcSignInRecord
                switch (this.info.identity) {
                    case 1:
                        funcSignInRecord = localStorage.getItem('signInSpecialist')
                        break

                    case 2:
                        funcSignInRecord = localStorage.getItem('signInSupplier')
                        break
                }
                
                if (funcSignInRecord) {
                    this.info.phone = JSON.parse(funcSignInRecord).phone
                    this.info.password = JSON.parse(funcSignInRecord).password
                    this.isRecordPassword = true
                }
            },

            /**
             *  登录时保存登录信息
             *  @function
             *  @returns
             */
            recordPassword: function () {
                if (!this.isRecordPassword) return
                
                let funcParam = {
                    'phone': this.info.phone,
                    'password': this.info.password,
                }
                switch (this.info.identity) {
                    case 1:
                        localStorage.setItem('signInSpecialist', JSON.stringify(funcParam))
                        break

                    case 2:
                        localStorage.setItem('signInSupplier', JSON.stringify(funcParam))
                        break
                }
            },

            queryUserInfo: function () {
                switch (this.info.identity) {
                    case 1:
                        iRequest.request(iHost.base + 'bid/zUserExpert/getLoginUserInfo', {}, 'json', 'get')
                            .then((funcResponse) => {
                                // 0 - 审核
                                // 1 - 通过
                                // 2 - 拒绝
                                this.info.name = funcResponse.name
                                this.info.register = Number(funcResponse.state)
                                this.$store.commit('isSignIn', true)
                                this.$store.commit('info', this.info)
                                localStorage.setItem('info', JSON.stringify(this.info))
                                this.redirectPath()
                            })
                            .catch((funcError) => {
                                this.$message.error(funcError.message)
                            })
                        break

                    case 2:
                        iRequest.request(iHost.base + 'bid/zUserCompany/getLoginUserInfo', {}, 'json', 'get')
                            .then((funcResponse) => {
                                // 0 - 审核
                                // 1 - 通过
                                // 2 - 拒绝
                                this.info.name = funcResponse.companyName
                                this.info.register = Number(funcResponse.state)
                                this.$store.commit('isSignIn', true)
                                this.$store.commit('info', this.info)
                                localStorage.setItem('info', JSON.stringify(this.info))
                                this.redirectPath()
                            })
                            .catch((funcError) => {
                                this.$message.error(funcError.message)
                            })
                        break
                }

            },

            redirectPath: function () {
                if (this.$store.getters.redirectPath) {
                    this.$router.push(this.$store.getters.redirectPath)
                } else {
                    this.$router.push('/')
                }
            },

            /**
             *  密码加密
             *  @function
             *  @param {number} value - 加密字段
             *  @param {array } key
             *  @returns
             */
            encryptByDES: function (value, key) {
                if(value == '') return '';
                var keyHex = iCryptoJs.enc.Utf8.parse(key);
                var encrypted = iCryptoJs.DES.encrypt(value, keyHex, {
                    mode: iCryptoJs.mode.ECB,
                    padding: iCryptoJs.pad.Pkcs7
                })
                return encrypted.toString()
            },

            /**
             *  登录
             *  @function
             *  @param {number} funcIndex - 组件索引
             *  @param {array } funcSelectId - ['id01', 'id02', 'id03', 'id04', '' ]
             *  @returns
             */
            onSignInSubmit: function () {
                this.$refs.formSignIn.validate(funcValid => {
                    if (funcValid) {
                        let funcParam = {
                            'loginName': this.info.phone,
                            'password': this.encryptByDES(this.info.password, 'bidkey11'),
                            'userType': this.info.identity,
                            'vCode': this.info.code
                        }

                        iRequest.request(iHost.base + 'bid/zLogin/login', funcParam, 'json', 'post', { isToken: false })
                            .then((funcResponse) => {
                                localStorage.clear()
                                localStorage.setItem('token', funcResponse.token)
                                localStorage.setItem('refresh', funcResponse.refreshToken)
                                this.recordPassword()
                                this.queryUserInfo()
                            })
                            .catch((funcError) => {
                                if (funcError.data) {
                                    this.showImageCode = true
                                    this.imageCodeData = funcError.data.imgCode
                                }
                            })
                    }
                })
            },

            /**
             *  勾选组件 - 记录密码
             *  @function
             *  @param {number} funcValue
             *  @returns
             */
            onCheckboxChange: function (funcValue) {
                this.isRecordPassword = funcValue
                if (!this.isRecordPassword) {
                    switch (this.info.identity) {
                        case 1:
                            localStorage.removeItem('signInSpecialist')
                            break

                        case 2:
                            localStorage.removeItem('signInSupplier')
                            break
                    }
                }
            },

            onForget: function () {
                this.$router.push('/signIn/forget?status=' + this.$route.query.status)
            },

            onRegister: function () {
                this.$router.push('/register?status=' + this.$route.query.status)
            },
        },
    }
</script>

<style lang="less">
    .currency-sign-in-input {
        
    }
</style>
