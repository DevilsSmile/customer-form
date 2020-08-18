<template>
    <!-- 通用组件 - 头部 -->
    <div class="components-header">
        <!-- phond 端页面 -->
        <div v-if="clientType === 'phone'" class="container-header-phone">
            <div class="row con-b">
                <div>
                    <img class="container-header-phone-avatar" src="../assets/avatar.png" alt="">
                </div>
                <div>
                    <span class="container-header-phone-title">问卷列表</span>
                </div>
                <div></div>
            </div>
        </div>

        <!-- pc 端页面 -->
        <div class="container-header row con-b align-e" v-if="clientType === 'pc'">
            <div class="logo">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="user row con-c align-c">
                <img src="../assets/avatar.png" alt="">
                <span @click="onResetPassword">修改密码</span>
            </div>
        </div>

        <!-- 登录界面 -->
        <div class="input-sign-in row con-c align-c" v-if="winSignIn">
            <div class="form">
                <div class="form-title column con-c align-c">
                    <span>登录</span>
                    <div class="form-title-decorate"></div>
                </div>
                <el-form ref="formSignIn" key="formSignIn" :model="formSignIn" :rules="rule">
                    <el-form-item class="form-item" prop="oldPassword">
                        <el-input v-model="formSignIn.phone" maxlength="11" placeholder="手机号" prefix-icon="el-icon-mobile-phone"></el-input>
                    </el-form-item>
                    <el-form-item class="form-item" prop="newPassword">
                        <el-input v-model="formSignIn.password" maxlength="18" placeholder="登录密码" prefix-icon="el-icon-lock"></el-input>
                    </el-form-item>
                    <el-form-item class="form-item operation row con-c align-c">
                        <el-button @click.prevent="onSubmit()">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <!-- 企业信息 -->
        <div class="input-company-info row con-c align-c" v-if="winCompanyInfo">
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
                        <el-form-item class="form-item" label="联系人姓名：" prop="companyKey">
                            <el-input v-model="formCompanyInfo.name" maxlength="11" placeholder="联系人姓名"></el-input>
                        </el-form-item>
                        <el-form-item class="form-item" label="联系方式：" prop="companyProduct">
                            <el-input v-model="formCompanyInfo.contact" maxlength="18" placeholder="联系方式"></el-input>
                        </el-form-item>
                    </div>
                    <div class="row con-b align-c">
                        <el-form-item class="form-item" label="企业关键技术：" prop="oldPassword">
                            <el-input v-model="formCompanyInfo.companyKey" type="textarea" :autosize="{ minRows: 4 }" maxlength="11" placeholder="企业关键技术"></el-input>
                        </el-form-item>
                        <el-form-item class="form-item" label="企业提供产品：" prop="newPassword">
                            <el-input v-model="formCompanyInfo.companyProduct" type="textarea" :autosize="{ minRows: 4 }" maxlength="18" placeholder="企业提供产品"></el-input>
                        </el-form-item>
                    </div>
                    <div class="row con-b">
                        <el-form-item class="form-item" label="其他：" prop="oldPassword">
                            <el-input v-model="formCompanyInfo.other" type="textarea" :autosize="{ minRows: 4 }" maxlength="11" placeholder="其他"></el-input>
                        </el-form-item>
                        <el-form-item class="form-item" label="附件：" prop="newPassword">
                            <el-upload
                                class="upload-image"
                                ref="uploadLicense"
                                list-type="picture-card"
                                :auto-upload="false"
                                :limit="1"
                                :file-list="formCompanyInfo.file"
                                :action="''"
                                :on-preview="onUploadPreviewFile"
                                :on-remove="(file, fileList) => { onUploadRemove('license', file, fileList) }"
                                :on-change="(file, fileList) => { onUploadChange('license', file, fileList) }"
                                :on-success="(respons, file, fileList) => { onUploadSuccess('license', respons, file, fileList) }"
                                :on-error="(error) => { onUploadFail('license', error) }"
                            >
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                    <div class="operation row con-c align-c">
                        <el-button class="button-cancel" @click.prevent="winCompanyInfo = false">取消</el-button>
                        <el-button class="button-submit" @click.prevent="onSubmit()">保存</el-button>
                    </div>
                </el-form>
            </div>
        </div>

        <!-- 修改密码 -->
        <div class="input-reset-password row con-c align-c" v-if="winResetPassword">
            <div class="form">
                <div class="form-title column con-c align-c">
                    <span>修改密码</span>
                    <div class="form-title-decorate"></div>
                </div>
                <el-form ref="formResetPassword" key="formResetPassword" :model="formResetPassword" :rules="rule">
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
                        <el-button @click.prevent="onSubmit()">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import iHost from '@/common/js/host.js'
    import iRequest from '@/common/js/request/request.js'

    import iToken from '@/common/js/token.js'

    export default {
        data: function () {
            return {
                clientType: this.$store.state.clientType,
                formSignIn: {
                    phone: '',
                    password: '',
                },
                formCompanyInfo: {
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
            }
        },

        created: function () {
            console.log(this.clientType)
        },

        methods: {
            onResetPassword: function () {
                this.winResetPassword = true
            },

            onSubmit: function () {

            },

            /**
             *  上传组件 - 文件格式
             *  @function
             *  @param {string} funcType
             *  @param {object} funcFile
             *  @returns
             */
            checkFileFormat: function (funcType, funcFile) {
                switch (funcType) {
                    case 'license':
                        if (funcFile.raw.type !== 'image/png' && funcFile.raw.type !== 'image/jpeg') {
                            this.$message.error('图片仅支持JPG、PNG格式')
                            return false
                        }
                        if (funcFile.size >= 6291456) {
                            this.$message.error('文件大小不超过5MB')
                            return false
                        }
                        break

                    case 'quote':
                        console.log('quote', funcFile)
                        if (funcFile.size >= 6291456) {
                            this.$message.error('文件大小不超过5MB')
                            return false
                        }
                        break
                }
                return true
            },

            /**
             *  上传组件 - 文件状态
             *  @function
             *  @param {string} funcType
             *  @param {object} funcFile
             *  @param {array } funcFileList
             *  @returns
             */
            onUploadChange: function (funcType, funcFile, funcFileList) {
                if (funcFile.status === 'ready') {
                    if (this.checkFileFormat(funcType, funcFile)) {
                        // 重新定义上传文件名称
                        let funcFileFormat = funcFile.name.substring(funcFile.name.lastIndexOf('.'), funcFile.name.length)
                        let funcFileName = funcType + (new Date() - 0) + funcFileFormat
                        let funcCopyFile = new File([funcFile.raw], funcFileName, { type: funcFile.raw.type})
                        funcCopyFile.uid = funcFile.raw.uid
                        funcFile.raw = funcCopyFile
                        funcFile.name = funcFileName
                        
                        this.formRegister[funcType + 'Image'] = 'image'
                        this.uploadOption[funcType].image.push(funcFile)
                    } else {
                        let funcImageBuffer = JSON.stringify(this.uploadOption[funcType].image)
                        this.uploadOption[funcType].image = []
                        this.uploadOption[funcType].image = JSON.parse(funcImageBuffer)
                    }
                }

                if (funcFile.status === 'success') {
                    for (let i = 0, len = this.uploadOption[funcType].image.length; i < len; i++) {
                        if (this.uploadOption[funcType].image[i].status === 'ready') {
                            return
                        }
                    }

                    this.onNext()
                }
            },

            /**
             *  上传组件 - 文件删除
             *  @function
             *  @param {string} funcType
             *  @param {object} funcFile
             *  @param {array } funcFileList
             *  @returns
             */
            onUploadRemove: function (funcType, funcFile, funcFileList) {
                // 判断当前文件列表是否存在删除图片
                // 找到列表中的文件进行删除
                let funcImageList = this.uploadOption[funcType].image
                for (let i = 0, len = funcImageList.length; i < len; i++) {
                    if (funcImageList[i] && funcImageList[i].uid === funcFile.uid) {
                        funcImageList.splice(i, 1)
                        break
                    }
                }

                // 删除文件逻辑
                // 如果当前文件列表为空则不通过校验
                if (funcImageList.length === 0) {
                    this.formRegister[funcType + 'Image'] = ''
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
             *  上传组件 - 文件下载
             *  @function
             *  @param {object} funcFile
             *  @returns
             */
            onUploadDownloadFile: function (funcFile) {
                let funcReader = new FileReader()
                funcReader.readAsArrayBuffer(funcFile.raw)
                funcReader.onload = function(funcEvent){
                    let funcBlob = new Blob([funcEvent.target.result], { type : funcFile.raw.type })

                    if (window.navigator.msSaveBlob) {
                        window.navigator.msSaveBlob(funcBlob, funcFile.raw.name)
                    } else {
                        let funcDownloadLink = document.createElement('a')
                        funcDownloadLink.download = funcFile.raw.name
                        funcDownloadLink.href = URL.createObjectURL(funcBlob)
                        document.body.appendChild(funcDownloadLink)
                        funcDownloadLink.click()
                        document.body.removeChild(funcDownloadLink)
                    }
                }
            },

            /**
             *  上传组件 - 上传成功
             *  @function
             *  @param {string} funcType
             *  @param {object} funcResponse
             *  @returns
             */
            onUploadSuccess: function (funcType, funcResponse, funcFile, funcFileList) {
                // 文件上传成功之后替换文件临时路径
                if (funcResponse.code === 200) {
                    let funcImageList = this.uploadOption[funcType].image
                    for (let i = 0, len = funcImageList.length; i < len; i++) {
                        if (funcImageList[i] && funcImageList[i].uid === funcFile.uid) {
                            funcImageList[i].url = iHost.resources + funcResponse.data.url
                            break
                        }
                    }

                    this.uploadOption[funcType].image = funcImageList
                }

                console.log(this.uploadOption[funcType].image)
            },

            /**
             *  上传组件 - 上传失败
             *  @function
             *  @param {string} funcType
             *  @param {object} funcError
             *  @returns
             */
            onUploadFail: function (funcType, funcError) {

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
