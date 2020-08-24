<template>
    <!-- 登录界面 -->
    <div class="edit-information">
        <div v-if="clientType === 'phone'" class="phone column con-c align-c">
            <div class="container-form">
                <el-form ref="elementFormCompanyInfo" :model="formCompanyInfo" :rules="rule">
                    <el-form-item label="企业名称" prop="companyName">
                        <el-input class="input-text" v-model="formCompanyInfo.companyName" maxlength="11" placeholder="企业名称"></el-input>
                    </el-form-item>
                    <el-form-item label="统一机构代码" prop="companyCode">
                        <el-input class="input-text" v-model="formCompanyInfo.companyCode" maxlength="18" placeholder="统一机构代码"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人姓名" prop="name">
                        <el-input class="input-text" v-model="formCompanyInfo.name" maxlength="11" placeholder="联系人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="contact">
                        <el-input class="input-text" v-model="formCompanyInfo.contact" maxlength="18" placeholder="联系方式" disabled></el-input>
                    </el-form-item>
                    <el-form-item class="column" prop="companyKey">
                        <div class="form-item-label row">企业关键技术</div>
                        <el-input v-model="formCompanyInfo.companyKey" type="textarea" :autosize="{ minRows: 4 }" maxlength="11" placeholder="企业关键技术"></el-input>
                    </el-form-item>
                    <el-form-item prop="companyProduct">
                        <div class="form-item-label row">企业提供产品</div>
                        <el-input v-model="formCompanyInfo.companyProduct" type="textarea" :autosize="{ minRows: 4 }" maxlength="18" placeholder="企业提供产品"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="form-item-label row">其他</div>
                        <el-input v-model="formCompanyInfo.other" type="textarea" :autosize="{ minRows: 4 }" maxlength="11" placeholder="其他"></el-input>
                    </el-form-item>
                    <el-form-item>
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
                    <div class="column con-c align-c">
                        <el-button class="button-submit" @click.prevent="onCompany()">保存</el-button>
                        <el-button class="button-cancel" @click.prevent="onRouteHome()">取消</el-button>
                    </div>
                </el-form>
            </div>
        </div>

        <div v-if="clientType === 'pc'" class="pc row con-c align-c" @click.self="onRouteHome()">
            <div class="container-form">
                <div class="form-title column con-c align-c">
                    <span>企业信息</span>
                    <div class="form-title-decorate"></div>
                </div>
                <el-form ref="elementFormCompanyInfo" :model="formCompanyInfo" :rules="rule" label-width="130px" label-position="right">
                    <div class="row con-b align-c">
                        <el-form-item label="企业名称：" prop="companyName">
                            <el-input v-model="formCompanyInfo.companyName" maxlength="11" placeholder="企业名称"></el-input>
                        </el-form-item>
                        <el-form-item label="统一机构代码：" prop="companyCode">
                            <el-input v-model="formCompanyInfo.companyCode" maxlength="18" placeholder="统一机构代码"></el-input>
                        </el-form-item>
                    </div>
                    <div class="row con-b align-c">
                        <el-form-item label="联系人姓名：" prop="name">
                            <el-input v-model="formCompanyInfo.name" maxlength="11" placeholder="联系人姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式：" prop="contact">
                            <el-input v-model="formCompanyInfo.contact" maxlength="18" placeholder="联系方式" disabled></el-input>
                        </el-form-item>
                    </div>
                    <div class="row con-b align-c">
                        <el-form-item label="企业关键技术：" prop="companyKey">
                            <el-input v-model="formCompanyInfo.companyKey" type="textarea" :autosize="{ minRows: 4 }" maxlength="11" placeholder="企业关键技术"></el-input>
                        </el-form-item>
                        <el-form-item label="企业提供产品：" prop="companyProduct">
                            <el-input v-model="formCompanyInfo.companyProduct" type="textarea" :autosize="{ minRows: 4 }" maxlength="18" placeholder="企业提供产品"></el-input>
                        </el-form-item>
                    </div>
                    <div class="row con-b">
                        <el-form-item label="其他：">
                            <el-input v-model="formCompanyInfo.other" type="textarea" :autosize="{ minRows: 4 }" maxlength="11" placeholder="其他"></el-input>
                        </el-form-item>
                        <el-form-item label="附件：">
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
                        <el-button class="button-cancel" @click.prevent="onRouteHome()">取消</el-button>
                        <el-button class="button-submit" @click.prevent="onCompany()">保存</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import iHost from '@/common/js/host.js'
    import iRule from '@/common/js/rule/rule.js'
    import iRequest from '@/common/js/request/request.js'

    export default {
        data: function () {
            return {
                host: iHost.base,
                clientType: this.$store.state.clientType,

                // 动态表单相关参数
                uploadFile: [],
                uploadFileUrl: [],

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
                formCompanyInfoBuffer: {},
                rule: {
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
                },
            }
        },
        created: function () {
            if (!this.$store.state.isSignIn) {
                this.onRouteHome()
                return
            }

            this.formCompanyInfo = JSON.parse(JSON.stringify(this.$store.state.signInUser))
            this.formCompanyInfoBuffer = JSON.parse(JSON.stringify(this.$store.state.signInUser))
        },
        methods: {
            onRouteHome: function () {
                this.$router.push('/apppage/')
            },

            onCompany: function () {
                this.$refs['elementFormCompanyInfo'].validate((pass) => {
                    if (pass) {
                        // 判断图片是否上传
                        this.uploadFileUrl = []
                        for (let i = 0, l = this.formCompanyInfo.file.length; i < l; i++) {
                            if (this.formCompanyInfo.file[i].status === 'ready') {
                                let funcImageFile = this.formCompanyInfo.file[i].raw
                                let funcFormData = new FormData()
                                funcFormData.append('file', funcImageFile)
                                let funcAxios = iRequest.request(iHost.base + 'f/api/user/uploadFile', funcFormData, 'file', 'post')
                                                    .then((response) => {
                                                        this.uploadFileUrl.push(response.fileId)
                                                    })
                                this.uploadFile.push(funcAxios)
                            }
                        }

                        if (this.uploadFile.length > 0) {
                            Promise.all(this.uploadFile)
                                .then(() => {
                                    for (let i = 0, l = this.formCompanyInfo.file.length; i < l; i++) {
                                        if (this.formCompanyInfo.file[i].status === 'ready') {
                                            this.formCompanyInfo.file[i].url = iHost.base +  this.uploadFileUrl[0]
                                            this.formCompanyInfo.file[i].uploadUrl = iHost.base.substring(0, iHost.base.length - 1) +  this.uploadFileUrl[0]
                                            this.formCompanyInfo.file[i].status = 'success'

                                            // 删除已经被记录的地址
                                            this.uploadFileUrl.splice(0, 1)
                                        }
                                    }
                                    this.saveCompany()
                                })
                                .catch(() => {
                                    console.log('uploadAllImage catch')
                                })
                            return
                        } else {
                            this.saveCompany()
                        }
                    }
                })
            },

            saveCompany: function () {
                let funcUploadUrl = []
                let funcUploadImage = JSON.parse(JSON.stringify(this.formCompanyInfo.file))
                for (let i = 0, l = funcUploadImage.length; i < l; i++) {
                    funcUploadUrl.push(funcUploadImage[i].uploadUrl.replace(iHost.base, '/'))
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
                    'userFiles': '|' + funcUploadUrl.join('|'),
                })

                let funcFormData = new FormData()
                funcFormData.append('requestParam', funcParam)
                iRequest.request(iHost.base + 'f/api/user/userUpdate', funcFormData, 'file', 'post')
                    .then((funcResponse) => {
                        this.formCompanyInfoBuffer = JSON.parse(JSON.stringify(this.formCompanyInfo))
                        this.$store.commit('signInUser', this.formCompanyInfoBuffer)
                        this.$message({ showClose: true, message: '修改成功', type: 'success' })
                        this.onRouteHome()
                    })
                    .catch((funcError) => {})
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

            /**
             *  上传组件 - 超出上传数量
             *  @function
             *  @param {object} funcError
             *  @returns
             */
            onUploadExceed: function (funcFile, funcFileList) {
                if (funcFileList.length >= 3) this.$message.error('达到最大张数限制')
            }
        }
    }
</script>
<style lang="less">
    .edit-information {
        .phone {
            width: 100vw;
            min-height: 130rem;
            background: url('../assets/backdrop-phone.png');
            background-repeat: no-repeat;
            background-size: 100%;

            .container-form {
                width: 100%;
                padding: 2.6rem;

                .el-form {
                    width: 100%;
                    padding: 0 2.6rem 2.6rem 2.6rem;
                    background: #FFFFFF;

                    .el-form-item {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        margin: 0;
                        border-bottom: .1rem #EEEEEE solid;

                        > div {
                            flex-grow: 1;
                        }

                        label {
                            position: relative;
                            width: 22rem;
                            padding-right: 2.4rem;

                            font-size: 2.8rem;
                            font-weight: 800;
                            text-align: right;
                            color: #000000;
                        }

                        // 单行文本
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

                        // 多行文本
                        .form-item-label {
                            margin: 3rem 0 0 2rem;
                            font-size: 2.8rem;
                            font-weight: 800;
                            text-align: right;
                            color: #000000;
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
                                font-family: Arial;
                                color: #9A9A9A;
                            }
                        }

                        // 上传组件
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

                        .el-upload-list {
                            padding-top: 3rem;
                            li {
                                width: 10rem;
                                height: 10rem;

                                label {
                                    position: relative;
                                    top: -10rem;
                                    left: 0;
                                }
                            }
                        }
                    }
                }

                .button-submit {
                    width: 64rem;
                    height: 8.8rem;
                    margin: 6rem 0 0 0;
                    padding: 0;
                    border-radius: 4.4rem;
                    background: linear-gradient(90deg, #76b993 , #1170ab);
                    font-size: 3rem;
                    color: #ffffff;
                }

                .button-cancel {
                    width: 64rem;
                    height: 8.8rem;
                    margin: 2rem 0 0 0;
                    padding: 0;
                    background: linear-gradient(90deg, #F2F2F2 , #CCCCCC);
                    border-radius: 4.4rem;

                    font-size: 3rem;
                    color: #666666;
                }
            }
        }

        .pc {
            z-index: 1900;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .6);

            .container-form {
                width: 1000px;
                min-height: 640px;
                padding: 36px 30px 46px 30px;
                border-radius: 16px;
                background: #FFFFFF;
                box-shadow: 1px 5px 15px 0px rgba(0, 0, 0, 0.1);

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
                    width: 70px;
                    height: 70px;
                }

                .el-upload-list {
                    li {
                        width: 70px;
                        height: 70px;
                    }
                }

                .button-submit {
                    width: 150px;
                    height: 56px;
                    margin: 20px 10px 0 10px;
                    border: none;
                    border-radius: 28px;
                    background: linear-gradient(90deg, #76b993 , #1170ab);

                    font-size: 18px;
                    font-weight: 500;
                    color: #FFFFFF;
                }

                .button-cancel {
                    width: 150px;
                    height: 56px;
                    margin: 20px 10px 0 10px;
                    border: none;
                    border-radius: 28px;
                    background: linear-gradient(90deg, #f5f2f5 , #d0cdd0);

                    font-size: 18px;
                    font-weight: 500;
                    color: #666666;
                }
            }
        }
    }
</style>