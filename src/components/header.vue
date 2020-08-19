<template>
    <!-- 通用组件 - 头部 -->
    <div class="components-header">
        <!-- phond 端页面 -->
        <div v-if="clientType === 'phone'" class="container-header-phone">
            <div class="row con-b">
                <div @click="winCompanyInfo = true">
                    <img class="container-header-phone-avatar" src="../assets/avatar.png" alt="">
                </div>
                <div>
                    <span class="container-header-phone-title">问卷列表</span>
                </div>
                <div @click="onHome()">
                    <span>主页</span>
                </div>
            </div>
        </div>

        <!-- 登录界面 -->
        <div class="phone-input-sign-in column con-c align-c" v-if="clientType === 'phone' && winSignIn" @click.self="onCloseDialog">
            <div>
                <img class="container-header-phone-logo" src="../assets/logo-phone.png" alt="">
            </div>
            <div class="form">
                <el-form ref="formSignIn" key="formSignIn" :model="formSignIn" :rules="ruleSignIn">
                    <el-form-item class="form-item" prop="oldPassword">
                        <el-input v-model="formSignIn.phone" maxlength="11" placeholder="手机号">
                            <i slot="prefix" class="el-icon-mobile-phone"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="form-item" prop="newPassword">
                        <el-input v-model="formSignIn.password" maxlength="18" placeholder="登录密码">
                            <i slot="prefix" class="el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                        <el-button class="button-signin" @click.prevent="onSignIn()">登录</el-button>
                </el-form>
            </div>
        </div>

        <!-- 企业信息 -->
        <div class="phone-input-company-info column con-c align-c" v-if="clientType === 'phone' && winCompanyInfo" @click.self="onCloseDialog()">
            <el-form ref="formCompanyInfo" key="formCompanyInfo" :model="formCompanyInfo" :rules="rule">
                <el-form-item label="企业名称" prop="companyName">
                    <el-input class="input-text" v-model="formCompanyInfo.companyName" maxlength="11" placeholder="企业名称"></el-input>
                </el-form-item>
                <el-form-item label="统一机构代码" prop="companyCode">
                    <el-input class="input-text" v-model="formCompanyInfo.companyCode" maxlength="18" placeholder="统一机构代码"></el-input>
                </el-form-item>
                <el-form-item label="联系人姓名" prop="companyKey">
                    <el-input class="input-text" v-model="formCompanyInfo.name" maxlength="11" placeholder="联系人姓名"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="companyProduct">
                    <el-input class="input-text" v-model="formCompanyInfo.contact" maxlength="18" placeholder="联系方式"></el-input>
                </el-form-item>
                <el-form-item class="column" prop="oldPassword">
                    <div class="form-item-label row">企业关键技术</div>
                    <el-input v-model="formCompanyInfo.companyKey" type="textarea" :autosize="{ minRows: 4 }" maxlength="11" placeholder="企业关键技术"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <div class="form-item-label row">企业提供产品</div>
                    <el-input v-model="formCompanyInfo.companyProduct" type="textarea" :autosize="{ minRows: 4 }" maxlength="18" placeholder="企业提供产品"></el-input>
                </el-form-item>
                <el-form-item prop="oldPassword">
                    <div class="form-item-label row">其他</div>
                    <el-input v-model="formCompanyInfo.other" type="textarea" :autosize="{ minRows: 4 }" maxlength="11" placeholder="其他"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <div class="form-item-label row">附件</div>
                    <el-upload
                        class="upload-image row"
                        ref="uploadImage"
                        list-type="picture-card"
                        :auto-upload="false"
                        :limit="3"
                        :action="''"
                        :file-list="formCompanyInfo.file"
                        :on-preview="onUploadPreviewFile"
                        :on-remove="(file, fileList) => { onUploadRemove(file, fileList) }"
                        :on-change="(file, fileList) => { onUploadChange(file, fileList) }"
                        :on-success="(respons, file, fileList) => { onUploadSuccess(respons, file, fileList) }"
                        :on-error="(error) => { onUploadFail(error) }"
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <div class="operation column con-c align-c">
                    <el-button class="button-submit" @click.prevent="onCompany()">保存</el-button>
                    <el-button class="button-cancel" @click.prevent="winCompanyInfo = false">取消</el-button>
                </div>
            </el-form>
        </div>

        <!-- 修改密码 -->
        <div class="phone-input-reset-password column con-c align-c" v-if="clientType === 'phone' && winResetPassword" @click.self="onCloseDialog()">
            <div class="form">
                <el-form ref="formSignIn" key="formSignIn" :model="formSignIn" :rules="ruleResetPassword">
                    <el-form-item class="form-item" prop="oldPassword">
                        <el-input v-model="formResetPassword.oldPassword" maxlength="11" placeholder="旧密码">
                            <i slot="prefix" class="el-icon-mobile-phone"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="form-item" prop="newPassword">
                        <el-input v-model="formSignIn.newPassword" maxlength="18" placeholder="新密码">
                            <i slot="prefix" class="el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="form-item" prop="newPassword">
                        <el-input v-model="formSignIn.repeatPassword" maxlength="18" placeholder="确认密码">
                            <i slot="prefix" class="el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-button class="button-signin" @click.prevent="onResetPassword()">确认修改</el-button>
                </el-form>
            </div>
        </div>

        <!-- pc 端页面 -->
        <div class="container-header row con-b align-e" v-if="clientType === 'pc'">
            <div class="logo">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="user row con-c align-c">
                <img src="../assets/avatar.png" alt="" @click="winCompanyInfo = true">
                <span @click="winResetPassword = true">修改密码</span>
            </div>
        </div>

        <!-- 登录界面 -->
        <div class="input-sign-in row con-c align-c" v-if="clientType === 'pc' && winSignIn">
            <div class="form">
                <div class="form-title column con-c align-c">
                    <span>登录</span>
                    <div class="form-title-decorate"></div>
                </div>
                <el-form ref="formSignIn" key="formSignIn" :model="formSignIn" :rules="rule">
                    <el-form-item class="form-item" prop="phone">
                        <el-input v-model="formSignIn.phone" maxlength="11" placeholder="手机号" prefix-icon="el-icon-mobile-phone"></el-input>
                    </el-form-item>
                    <el-form-item class="form-item" prop="password">
                        <el-input v-model="formSignIn.password" maxlength="18" placeholder="登录密码" prefix-icon="el-icon-lock"></el-input>
                    </el-form-item>
                    <el-form-item class="form-item operation row con-c align-c">
                        <el-button @click.prevent="onSignIn()">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <!-- 企业信息 -->
        <div class="input-company-info row con-c align-c" v-if="clientType === 'pc' && winCompanyInfo" @click.self="onCloseDialog()">
            <div class="form">
                <div class="form-title column con-c align-c">
                    <span>企业信息</span>
                    <div class="form-title-decorate"></div>
                </div>
                <el-form ref="formCompanyInfo" key="formCompanyInfo" :model="formCompanyInfo" :rules="rule" label-width="130px" label-position="right">
                    <div class="row con-b align-c">
                        <el-form-item class="form-item" label="企业名称：" prop="companyName">
                            <el-input v-model="formCompanyInfo.companyName" maxlength="11" placeholder="企业名称"></el-input>
                        </el-form-item>
                        <el-form-item class="form-item" label="统一机构代码：" prop="companyCode">
                            <el-input v-model="formCompanyInfo.companyCode" maxlength="18" placeholder="统一机构代码"></el-input>
                        </el-form-item>
                    </div>
                    <div class="row con-b align-c">
                        <el-form-item class="form-item" label="联系人姓名：" prop="name">
                            <el-input v-model="formCompanyInfo.name" maxlength="11" placeholder="联系人姓名"></el-input>
                        </el-form-item>
                        <el-form-item class="form-item" label="联系方式：" prop="contact">
                            <el-input v-model="formCompanyInfo.contact" maxlength="18" placeholder="联系方式"></el-input>
                        </el-form-item>
                    </div>
                    <div class="row con-b align-c">
                        <el-form-item class="form-item" label="企业关键技术：" prop="companyKey">
                            <el-input v-model="formCompanyInfo.companyKey" type="textarea" :autosize="{ minRows: 4 }" maxlength="11" placeholder="企业关键技术"></el-input>
                        </el-form-item>
                        <el-form-item class="form-item" label="企业提供产品：" prop="companyProduct">
                            <el-input v-model="formCompanyInfo.companyProduct" type="textarea" :autosize="{ minRows: 4 }" maxlength="18" placeholder="企业提供产品"></el-input>
                        </el-form-item>
                    </div>
                    <div class="row con-b">
                        <el-form-item class="form-item" label="其他：">
                            <el-input v-model="formCompanyInfo.other" type="textarea" :autosize="{ minRows: 4 }" maxlength="11" placeholder="其他"></el-input>
                        </el-form-item>
                        <el-form-item class="form-item" label="附件：">
                            <el-upload
                                class="upload-image row"
                                ref="uploadImage"
                                list-type="picture-card"
                                :auto-upload="false"
                                :limit="3"
                                :action="''"
                                :file-list="formCompanyInfo.file"
                                :on-preview="onUploadPreviewFile"
                                :on-remove="(file, fileList) => { onUploadRemove(file, fileList) }"
                                :on-change="(file, fileList) => { onUploadChange(file, fileList) }"
                                :on-success="(respons, file, fileList) => { onUploadSuccess(respons, file, fileList) }"
                                :on-error="(error) => { onUploadFail(error) }"
                            >
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                    <div class="operation row con-c align-c">
                        <el-button class="button-cancel" @click.prevent="winCompanyInfo = false">取消</el-button>
                        <el-button class="button-submit" @click.prevent="onCompany()">保存</el-button>
                    </div>
                </el-form>
            </div>
        </div>

        <!-- 修改密码 -->
        <div class="input-reset-password row con-c align-c" v-if="clientType === 'pc' && winResetPassword" @click.self="onCloseDialog()">
            <div class="form">
                <div class="form-title column con-c align-c">
                    <span @click="winResetPassword = true">修改密码</span>
                    <div class="form-title-decorate"></div>
                </div>
                <el-form ref="formResetPassword" key="formResetPassword" :model="formResetPassword" :rules="ruleResetPassword">
                    <el-form-item class="form-item" prop="oldPassword">
                        <el-input v-model="formResetPassword.oldPassword" maxlength="30" placeholder="旧密码"></el-input>
                    </el-form-item>
                    <el-form-item class="form-item" prop="newPassword">
                        <el-input v-model="formResetPassword.newPassword" maxlength="18" placeholder="新密码"></el-input>
                    </el-form-item>
                    <el-form-item class="form-item" prop="repeatPassword">
                        <el-input v-model="formResetPassword.repeatPassword" maxlength="18" placeholder="确认新密码"></el-input>
                    </el-form-item>
                    <el-form-item class="form-item operation row con-c align-c">
                        <el-button @click.prevent="onResetPassword()">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import iCrypto from 'crypto-js'

    import iHost from '@/common/js/host.js'
    import iRequest from '@/common/js/request/request.js'

    import iToken from '@/common/js/token.js'

    export default {
        data: function () {
            return {
                host: iHost.base,
                clientType: this.$store.state.clientType,

                formSignIn: {
                    phone: '',
                    password: '',
                },
                formCompanyInfo: {
                    id: '',
                    companyName: '',
                    companyCode: '',
                    companyKey: '',
                    companyProduct: '',
                    name: '',
                    contact: '',
                    other: '',
                    file: [],
                },
                formResetPassword: {
                    oldPassword: '',
                    newPassword: '',
                    repeatPassword: '',
                },

                // 动态表单相关参数
                uploadindKey: '',
                uploadKeyList: [],
                uploadFile: [],
                uploadFileUrl: [],

                winSignIn: false,
                winCompanyInfo: false,
                winResetPassword: false,

                rule: {
                    oldPassword: [
                        { required: true, message: '旧密码', trigger: 'blur' },
                    ],
                    newPassword: [
                        { required: true, message: '新密码', trigger: 'blur' },
                    ],
                    repeatPassword: [
                        { required: true, message: '重复密码', trigger: 'blur' },
                    ],
                },

                ruleSignIn: {
                    phone: [
                        { required: true, message: '手机号码不能为空', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                    ],
                },

                ruleResetPassword: {
                    oldPassword: [
                        { required: true, message: '旧密码不能为空', trigger: 'blur' },
                    ],
                    newPassword: [
                        { required: true, message: '新密码不能为空', trigger: 'blur' },
                    ],
                    repeatPassword: [
                        { required: true, message: '两次密码不一致', trigger: 'blur' },
                    ],
                },

                ruleCompanyInfo: {
                    companyName: [
                        { required: true, message: '企业名称不能为空', trigger: 'blur' },
                    ],
                    companyCode: [
                        { required: true, message: '统一机构代码不能为空', trigger: 'blur' },
                    ],
                    companyKey: [
                        { required: true, message: '企业关键技术不能为空', trigger: 'blur' },
                    ],
                    companyProduct: [
                        { required: true, message: '企业提供产品不能为空', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '联系人姓名不能为空', trigger: 'blur' },
                    ],
                    contact: [
                        { required: true, message: '联系方式不能为空', trigger: 'blur' },
                    ],
                }
            }
        },

        computed: {
            isSignIn: function () {
                return this.$store.state.isSignIn
            },
        },

        watch: {
            isSignIn: {
                handler: function (funcNewValue, funcOldValue) {
                    console.log('home', funcNewValue)
                    if (!funcNewValue) return
                    this.winSignIn = false
                },
                deep: true,
                immediate: true,
            },
        },

        created: function () {
            if (!this.isSignIn) {
                this.$router.push('/')
                this.winSignIn = true
            } else {
                this.formCompanyInfo = JSON.parse(localStorage.getItem('signInUser'))
                console.log('signin', this.formCompanyInfo)
            }
        },

        methods: {
            onHome: function () {
                this.$router.push('/')
            },
            /**
             *  重置密码
             *  @function
             *  @param
             *  @returns
             */
            onResetPassword: function () {
                this.$refs['formResetPassword'].validate((pass) => {
                    if (pass) {
                        let funcParam = JSON.stringify({
                            'userId': this.formCompanyInfo.id,
                            'oldPassword': iCrypto.MD5(this.formResetPassword.oldPassword).toString(),
                            'newPassword': iCrypto.MD5(this.formResetPassword.newPassword).toString()
                        })

                        let funcFormData = new FormData()
                        funcFormData.append('requestParam', funcParam)
                        iRequest.request(iHost.base + 'f/api/user/pwdModify', funcFormData, 'file', 'post')
                            .then((funcResponse) => {

                            })
                            .catch((funcError) => {})
                    }
                })
            },

            onCompany: function () {
                this.$refs['formCompanyInfo'].validate((pass) => {
                    if (pass) {
                        // 判断图片是否上传
                        for (let i = 0, l = this.formCompanyInfo.file.length; i < l; i++) {
                            if (this.formCompanyInfo.file[i].status === 'ready') {
                                let funcImageFile = this.formCompanyInfo.file[i].raw
                                let funcFormData = new FormData()
                                funcFormData.append('file', funcImageFile)
                                let funcAxios = iRequest.request(iHost.base + 'f/api/app/v2/getUrl', funcFormData, 'file', 'post')
                                                    .then((response) => {
                                                        console.log(response)
                                                        // this.uploadFileUrl.push(response.data.fileId)
                                                    })
                                this.uploadFile.push(funcAxios)
                            }
                        }

                        if (this.uploadFile.length > 0) {
                            Promise.all(this.uploadFile)
                                .then(() => {
                                    for (let i = 0, l = this.uploadFileUrl.length; i < l; i++) {
                                        if (this.formCompanyInfo.file[i].status === 'ready') {
                                            this.formCompanyInfo.file[i].uploadUrl = this.uploadFileUrl[i]
                                            this.formCompanyInfo.file[i].status = 'success'
                                        }
                                    }
                                    this.saveCompany()
                                })
                                .catch(() => {
                                    console.log('uploadAllImage catch')
                                })
                            return
                        }
                    }
                })
            },

            saveCompany: function () {
                let funcUploadUrl = []
                let funcUploadImage = this.formCompanyInfo.file
                for (let i = 0, l = funcUploadImage.length; i < l; i++) {
                    funcUploadUrl.push(funcUploadImage[i].uploadUrl)
                }

                let funcParam = JSON.stringify({
                    'userId': this.formCompanyInfo.id,
                    'name': this.formCompanyInfo.companyName,
                    'code': this.formCompanyInfo.companyCode,
                    'contacts': this.formCompanyInfo.name,
                    'phone': this.formCompanyInfo.contact,
                    'technology': this.formCompanyInfo.companyKey,
                    'product': this.formCompanyInfo.companyProduct,
                    'others': this.formCompanyInfo.other,
                    'userFiles': funcUploadUrl.join('|'),
                })

                console.log(JSON.stringify(funcParam))

                let funcFormData = new FormData()
                funcFormData.append('requestParam', funcParam)
                iRequest.request(iHost.base + 'f/api/user/userUpdate', funcFormData, 'file', 'post')
                    .then((funcResponse) => {

                    })
                    .catch((funcError) => {})
            },

            onSignIn: function () {
                this.$refs['formSignIn'].validate((pass) => {
                    if (pass) {
                        let funcParam = JSON.stringify({
                            'phone': this.formSignIn.phone,
                            'password': iCrypto.MD5(this.formSignIn.password).toString()
                        })

                        let funcFormData = new FormData()
                        funcFormData.append('requestParam', funcParam)
                        iRequest.request(iHost.base + 'f/api/user/userLogin', funcFormData, 'file', 'post')
                            .then((funcResponse) => {
                                this.formCompanyInfo = {
                                    id: funcResponse.userId,
                                    companyName: funcResponse.name,
                                    companyCode: funcResponse.code,
                                    companyKey: funcResponse.technology,
                                    companyProduct: funcResponse.product,
                                    name: funcResponse.name,
                                    contact: funcResponse.contacts,
                                    other: funcResponse.others,
                                    file: funcResponse.fileList,
                                },

                                this.$store.commit('signInUser', this.formCompanyInfo)
                                this.$store.commit('isSignIn', true)
                                this.winSignIn = false

                                // 测试数据
                                localStorage.setItem('signInUser', JSON.stringify(this.formCompanyInfo))
                            })
                            .catch((funcError) => {})
                    }
                })
            },

            onCloseDialog: function () {
                this.winCompanyInfo = false
                this.winResetPassword = false
            },

            /**
             *  上传组件 - 文件格式
             *  @function
             *  @param {object} funcFile
             *  @returns
             */
            checkFileFormat: function (funcFile) {
                if (funcFile.raw.type !== 'image/png' && funcFile.raw.type !== 'image/jpeg') {
                    this.$message.error('图片仅支持JPG、PNG格式')
                    return false
                }
                if (funcFile.size >= 6291456) {
                    this.$message.error('文件大小不超过5MB')
                    return false
                }
                return true
            },

            /**
             *  上传组件 - 文件状态
             *  @function
             *  @param {object} funcFile
             *  @param {array } funcFileList
             *  @returns
             */
            onUploadChange: function (funcFile, funcFileList) {
                if (funcFile.status === 'ready') {
                    if (this.checkFileFormat(funcFile)) {
                        // 重新定义上传文件名称
                        let funcFileFormat = funcFile.name.substring(funcFile.name.lastIndexOf('.'), funcFile.name.length)
                        let funcFileName = (new Date() - 0) + funcFileFormat
                        let funcCopyFile = new File([funcFile.raw], funcFileName, { type: funcFile.raw.type})
                        funcCopyFile.uid = funcFile.raw.uid
                        funcFile.raw = funcCopyFile
                        funcFile.name = funcFileName
                        
                        this.formCompanyInfo.file.push(funcFile)
                    } else {
                        let funcImageBuffer = JSON.stringify(this.formCompanyInfo.file)
                        this.formCompanyInfo.file = []
                        this.formCompanyInfo.file = JSON.parse(funcImageBuffer)
                    }
                }

                if (funcFile.status === 'success') {
                    for (let i = 0, len = this.formCompanyInfo.file.length; i < len; i++) {
                        if (this.formCompanyInfo.file[i].status === 'ready') {
                            return
                        }
                    }
                }
            },

            /**
             *  上传组件 - 文件删除
             *  @function
             *  @param {object} funcFile
             *  @param {array } funcFileList
             *  @returns
             */
            onUploadRemove: function (funcFile, funcFileList) {
                // 判断当前文件列表是否存在删除图片
                // 找到列表中的文件进行删除
                let funcImageList = this.formCompanyInfo.file
                for (let i = 0, len = funcImageList.length; i < len; i++) {
                    if (funcImageList[i] && funcImageList[i].uid === funcFile.uid) {
                        funcImageList.splice(i, 1)
                        break
                    }
                }
            },

            /**
             *  上传组件 - 文件预览
             *  @function
             *  @param {object} funcFile
             *  @returns
             */
            onUploadPreviewFile(funcFile) {
                this.uploadFileUrl = funcFile.url
                this.winUploadFile = true
            },

            /**
             *  上传组件 - 上传成功
             *  @function
             *  @param {string} funcType
             *  @param {object} funcResponse
             *  @returns
             */
            onUploadSuccess: function (funcResponse, funcFile, funcFileList) {
                // 文件上传成功之后替换文件临时路径
                if (funcResponse.code === 200) {
                    let funcImageList = this.formCompanyInfo.file
                    for (let i = 0, len = funcImageList.length; i < len; i++) {
                        if (funcImageList[i] && funcImageList[i].uid === funcFile.uid) {
                            funcImageList[i].url = iHost.resources + funcResponse.data.url
                            break
                        }
                    }

                    this.formCompanyInfo.file = funcImageList
                }
            },

            /**
             *  上传组件 - 上传失败
             *  @function
             *  @param {object} funcError
             *  @returns
             */
            onUploadFail: function (funcError) {

            },
        }
    }
</script>

<style lang="less">   
    .components-header {
        width: 100%;
        // phone 端样式
        .container-header-phone {
            width: 100%;
            height: 15rem;
            padding: 7.4rem 2.8rem 0 2.8rem;
            background: linear-gradient(90deg,#74BC90, #0C6CB0,);

            .container-header-phone-avatar {
                width: 5.5rem;
                height: 5.5rem;
            }

            .container-header-phone-title {
                font-size: 4rem;
                color: #FFFFFF;
            }
        }

        .phone-input-sign-in,
        .phone-input-reset-password {
            z-index: 1900;
            position: fixed;
            top: 15rem;
            left: 0;
            width: 100%;
            height: calc(100% - 15rem);
            background: url(@backdropPhone);
            background-repeat: no-repeat;
            background-size: 100%;

            .container-header-phone-logo {
                width: 39rem;
                height: 17rem;
                margin-top: 7rem;
            }

            .el-form {
                margin-top: 7rem;

                .el-form-item {
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    > div {
                        width: 64rem;
                        min-height: 8.8rem;
                        .el-input {
                            width: 64rem;
                            height: 8.8rem;

                            input {
                                flex-grow: 1;
                                height: 8.8rem;
                                padding-left: 6rem;

                                font-size: 2.4rem;
                                font-weight: 400;
                                color: #9A9A9A;
                            }

                            span {
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                margin-left: 2rem;
                                i {
                                    font-size: 3rem;
                                }
                            }
                        }
                    }
                }
            }

            .button-signin {
                width: 64rem;
                height: 8.8rem;
                margin-top: 7rem;
                border-radius: 4.4rem;
                background: linear-gradient(90deg, #0C6CB0, #74BC90);

                font-size: 3rem;
                color: #FFFFFF;
            }
        }
        
        .phone-input-company-info {
            width: 100vw;
            height: calc(100% - 15rem);
            overflow: scroll;
            background: url(@backdropPhone);
            background-repeat: no-repeat;
            background-size: 100%;

            .el-form {
                width: calc(100% - 5rem);
                height: 200rem;
                margin: 2.5rem 2.5rem 0 2.5rem;
                padding: 0 3rem 3rem 3rem;
                background: #FFFFFF;

                .el-form-item {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0;
                    border-bottom: .1rem #EEEEEE solid;

                    > div {
                        flex-grow: 1;
                    }

                    label {
                        position: relative;
                        width: 21rem;
                        padding-right: 2.4rem;

                        font-size: 2.8rem;
                        font-weight: 800;
                        text-align: right;
                        color: #000000;
                    }

                    .form-item-label {
                        margin: 3rem 0 0 2rem;
                        font-size: 2.8rem;
                        font-weight: 800;
                        text-align: right;
                        color: #000000;
                    }

                    .input-text {
                        flex-grow: 1;
                        min-height: 8.8rem;
                        
                        input {
                            flex-grow: 1;
                            height: 8.8rem;
                            border: none;

                            font-size: 2.4rem;
                            font-weight: 400;
                            color: #9A9A9A;
                        }
                    }

                    .el-textarea {
                        display: block;
                        flex-grow: 1;
                        min-height: 20rem;

                        textarea {
                            flex-grow: 1;
                            min-height: 20rem;
                            border: none;

                            font-size: 2.4rem;
                            font-weight: 400;
                            color: #9A9A9A;
                        }
                    }

                    .el-upload {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        width: 10rem;
                        height: 10rem;
                        margin: 3rem 3rem 0 0;
                        border: .1rem #EEEEEE solid;
                    }
                }
            }

            .button-submit {
                width: 64rem;
                height: 8.8rem;
                margin-top: 6rem;
                background: linear-gradient(90deg, #F2F2F2 , #CCCCCC);
                border-radius: 4.4rem;

                font-size: 3rem;
                color: #ffffff;
            }

            .button-cancel {
                width: 64rem;
                height: 8.8rem;
                background: linear-gradient(90deg, #76b993 , #1170ab);
                border-radius: 4.4rem;

                font-size: 3rem;
                color: #666666;
            }
        }


        // pc 端样式
        .container-header {
            width: 100%;
            min-width: 1200px;
            height: 120px;
            margin-bottom: 40px;
            padding: 0 60px;
            .logo img {
                width: 550px;
                height: 80px;
            }

            .user {
                img {
                    width: 40px;
                    height: 40px;
                    margin-right: 10px;
                    border-radius: 20px;
                }
            }
        }

        // 登录样式
        .input-sign-in {
            z-index: 1900;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .6);

            .form {
                width: 500px;
                height: 450px;
                padding: 30px 40px 44px 40px;
                background:#FFFFFF;
                box-shadow: 1px 5px 15px 0px rgba(0, 0, 0, 0.1);
                border-radius: 16px;

                .el-input {
                    height: 80px;
                    background: #FFFFFF;

                    input {
                        height: 80px;
                        padding-left: 66px;
                        border: 2px solid #EEEEEE;
                        border-radius: 6px;

                        font-size: 24px;
                        font-weight: 500;
                        color: #AAAAAA;
                    }

                    i {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        margin-left: 28px;
                        font-size: 30px;
                    }
                }
            }
        }

        // 修改密码样式
        .input-reset-password {
            z-index: 1900;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .6);

            .form {
                width: 500px;
                height: 550px;
                padding: 30px 40px 44px 40px;
                background:#FFFFFF;
                box-shadow: 1px 5px 15px 0px rgba(0, 0, 0, 0.1);
                border-radius: 16px;

                .el-input {
                    height: 80px;
                    background: #FFFFFF;

                    input {
                        height: 80px;
                        padding-left: 66px;
                        border: 2px solid #EEEEEE;
                        border-radius: 6px;

                        font-size: 24px;
                        font-weight: 500;
                        color: #AAAAAA;
                    }

                    i {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        margin-left: 28px;
                        font-size: 30px;
                    }
                }
            } 
        }

        // 企业信息样式
        .input-company-info {
            z-index: 1900;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .6);

            .form {
                width: 1000px;
                height: 640px;
                padding: 36px 30px 46px 30px;
                border-radius: 16px;
                background: #FFFFFF;
                box-shadow: 1px 5px 15px 0px rgba(0, 0, 0, 0.1);

                .form-item {
                    width: 440px;

                    label {
                        color: #000000;
                        font-weight: 800;
                    }
                }

                .el-input,
                .el-textarea {
                    width: 310px;
                    background: #FFFFFF;
                }

                .el-upload {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    width: 80px;
                    height: 80px;
                }

                .el-upload-list {
                    li {
                        width: 80px;
                        height: 80px;
                    }
                }
            }
        }

        // 表格公共样式
        .form-title {
            height: 80px;
            margin-bottom: 24px;
            font-size: 34px;
            font-weight: 500;
            color: #000000;

            .form-title-decorate {
                width: 46px;
                height: 8px;
                margin-top: 10px;
                background: linear-gradient(-90deg,#74BC90,#0C6CB0);
                border-radius: 4px;
            }
        }

        .operation {
            button {
                width: 150px;
                height: 56px;
                margin: 40px 10px 0 10px;
                border: none;
                border-radius: 28px;
                background:linear-gradient(-90deg,#74BC90,#0C6CB0);

                font-size: 18px;
                font-weight: 500;
                color: #FFFFFF;
            }

            .button-cancel {
                color: #666666;
                background: linear-gradient(90deg, #f5f2f5 , #d0cdd0);
            }

            .button-submit {
                background: linear-gradient(90deg, #76b993 , #1170ab);
            }
        }
    }
</style>
