<template>
    <div class="questionnaire-input">
        <!-- 移动端页面 -->
        <div class="phone" v-if="clientType === 'phone'">
            <div class="input-form">
                <el-form :model="formDesign" label-position="top">
                    <div class="fd-design-group-item" v-for="item in widgetList" :key="item.key">
                        <el-form-item :label="item.name" :required="item.options.required">
                            <template v-if="item.type === 'input'">
                                <el-input v-model="formDesign[item.model]" :placeholder="item.options.defaultValue" :maxlength="item.options.maxlength"></el-input>
                            </template>
                            <template v-if="item.type === 'textarea'">
                                <el-input type="textarea" v-model="formDesign[item.model]" :placeholder="item.options.defaultValue" :maxlength="item.options.maxlength"></el-input>
                            </template>
                            <template v-if="item.type === 'number'">
                                <el-input-number v-model="formDesign[item.model]" :min="item.options.min" :max="item.options.max" class="fr-number"></el-input-number>
                            </template>
                            <template v-if="item.type === 'radio'">
                                <el-radio-group v-model="formDesign[item.model]" class="fr-radio-group">
                                    <el-radio v-for="(radio, index) in item.options.options" :label="radio.label" :key="index">{{radio.label}}</el-radio>
                                </el-radio-group>
                            </template>
                            <template v-if="item.type === 'checkbox'">
                                <el-checkbox-group v-model="formDesign[item.model]" class="fr-checkbox-group">
                                    <el-checkbox v-for="(radio, index) in item.options.options" :label="radio.label" :key="index">{{radio.label}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                            <template v-if="item.type === 'select'">
                                <el-select v-model="formDesign[item.model]" placeholder="请选择" class="fr-select">
                                    <el-option v-for="item in item.options.options" :key="item.value" :label="item.label" :value="item.label"></el-option>
                                </el-select>
                            </template>
                            <template v-if="item.type == 'imgupload'">
                                <el-upload
                                    class="fr-upload"
                                    action="#"
                                    :multiple="true"
                                    list-type="picture-card"
                                    :limit="Number(item.options.limit)"
                                    :auto-upload="false"
                                    :file-list="formDesign[item.model]"
                                    :on-change="(file, fileList) => { onUploadChange(file, fileList, item) }"
                                    :on-exceed="onUploadExceed"
                                    :on-remove="(file, fileList) => { onUploadRemove(file, fileList, item) }"
                                >
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                            </template>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div v-if="isPreview" class="info">
                <div class="info-title row con-c align-c">
                    <span>确认您的信息</span>
                </div>
                <div class="enterprise">
                    <el-form ref="formUser" key="formUser" :model="formUser" :rules="rule">
                        <el-form-item label="企业名称" prop="company">
                            <el-input v-model="formUser.company" maxlength="30" placeholder="请输入您的企业名称"></el-input>
                        </el-form-item>
                        <el-form-item label="统一机构代码" prop="code">
                            <el-input v-model="formUser.code" maxlength="18" placeholder="请输入统一机构代码"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人姓名" prop="name">
                            <el-input v-model="formUser.name" maxlength="18" placeholder="请输入联系人姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式" prop="contact">
                            <el-input v-model="formUser.contact" maxlength="18" placeholder="请输入您的联系方式"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="questionnaire-submit row con-c align-c">
                <el-button @click.prevent="onSubmit()">提交问卷</el-button>
            </div>
        </div>

        <!-- 电脑端页面 -->
        <div class="pc" v-if="clientType === 'pc'">
            <div class="questionnaire-title row con-c align-c">
                <span>{{formDetail.title}}</span>
            </div>
            <div class="input-form">
                <el-form :model="formDesign" label-position="top">
                    <div class="fd-design-group-item" v-for="item in widgetList" :key="item.key">
                        <el-form-item :label="item.name" :required="item.options.required">
                            <template v-if="item.type === 'input'">
                                <el-input v-model="formDesign[item.model]" :placeholder="item.options.defaultValue" :maxlength="item.options.maxlength"></el-input>
                            </template>
                            <template v-if="item.type === 'textarea'">
                                <el-input type="textarea" v-model="formDesign[item.model]" :placeholder="item.options.defaultValue" :maxlength="item.options.maxlength"></el-input>
                            </template>
                            <template v-if="item.type === 'number'">
                                <el-input-number v-model="formDesign[item.model]" :min="item.options.min" :max="item.options.max" class="fr-number"></el-input-number>
                            </template>
                            <template v-if="item.type === 'radio'">
                                <el-radio-group v-model="formDesign[item.model]" class="fr-radio-group">
                                    <el-radio v-for="(radio, index) in item.options.options" :label="radio.label" :key="index">{{radio.label}}</el-radio>
                                </el-radio-group>
                            </template>
                            <template v-if="item.type === 'checkbox'">
                                <el-checkbox-group v-model="formDesign[item.model]" class="fr-checkbox-group">
                                    <el-checkbox v-for="(radio, index) in item.options.options" :label="radio.label" :key="index">{{radio.label}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                            <template v-if="item.type === 'select'">
                                <el-select v-model="formDesign[item.model]" placeholder="请选择" class="fr-select">
                                    <el-option v-for="item in item.options.options" :key="item.value" :label="item.label" :value="item.label"></el-option>
                                </el-select>
                            </template>
                            <template v-if="item.type == 'imgupload'">
                                <el-upload
                                    class="fr-upload"
                                    action="#"
                                    :multiple="true"
                                    list-type="picture-card"
                                    :limit="Number(item.options.limit)"
                                    :auto-upload="false"
                                    :file-list="formDesign[item.model]"
                                    :on-change="(file, fileList) => { onUploadChange(file, fileList, item) }"
                                    :on-exceed="onUploadExceed"
                                    :on-remove="(file, fileList) => { onUploadRemove(file, fileList, item) }"
                                >
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                            </template>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div v-if="isPreview" class="info">
                <div class="info-title row con-c align-c">
                    <span>确认您的信息</span>
                </div>
                <el-form ref="formUser" key="formUser" :model="formUser" :rules="rule" label-width="120px" label-position="right">
                    <div class="row con-b align-c">
                        <el-form-item class="form-item" label="企业名称：" prop="company">
                            <el-input v-model="formUser.company" maxlength="30" placeholder="请输入您的企业名称"></el-input>
                        </el-form-item>
                        <el-form-item class="form-item" label="统一机构代码：" prop="code">
                            <el-input v-model="formUser.code" maxlength="18" placeholder="请输入统一机构代码"></el-input>
                        </el-form-item>
                    </div>
                    <div class="row con-b align-c">
                        <el-form-item class="form-item" label="联系人姓名：" prop="name">
                            <el-input v-model="formUser.name" maxlength="18" placeholder="请输入联系人姓名"></el-input>
                        </el-form-item>
                        <el-form-item class="form-item" label="联系方式：" prop="contact">
                            <el-input v-model="formUser.contact" maxlength="18" placeholder="请输入您的联系方式"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="questionnaire-submit row con-c align-c">
                <el-button @click.prevent="onSubmit()">提交问卷</el-button>
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
                clientType: this.$store.state.clientType,
                formId: '',
                formDesign: {},
                widgetList: [],

                // 动态表单相关参数
                uploadindKey: '',
                uploadKeyList: [],
                uploadFile: [],
                uploadFileUrl: [],

                isPreview: false,

                formDetail: {
                    title: '企业员工满意度调查',
                },
                formUser: {
                    company: '',
                    code: '',
                    name: '',
                    contact: '',
                },
                rule: {
                    company: [
                        { required: true, message: '请输入您的企业名称', trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: '请输入统一机构代码', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入联系人姓名', trigger: 'blur' },
                    ],
                    contact: [
                        { required: true, message: '请输入您的联系方式', trigger: 'blur' },
                    ],
                },
            }
        },
        computed: {
            signInUser: function () {
                return this.$store.state.signInUser
            },
        },

        watch: {
            signInUser: {
                handler: function (funcNewValue, funcOldValue) {
                    console.log('input', funcNewValue)
                    this.formUser = {
                        company: funcNewValue.companyName,
                        code: funcNewValue.companyCode,
                        name: funcNewValue.name,
                        contact: funcNewValue.contact,
                    }
                },
                deep: true,
                immediate: true,
            },
        },

        created: function () {
            if (this.$route.query.preview === 'true') {
                this.isPreview = false
            } else {
                this.isPreview = true
            }
            if (this.$route.query.formId) {
                this.queryForm()
            } else {
                this.$router.push('/apppage/')
            }
        },
        methods: {
            /**
             *  动态表单 - 获取数据
             *  @function
             *  @param {string} funcQueryId
             *  @returns
             */
            queryForm: function (funcQueryId) {
                let funcParam = JSON.stringify({
                    'id': this.$route.query.formId
                })
                let funcFormData = new FormData()
                funcFormData.append('requestParam', funcParam)
                iRequest.request(iHost.base + 'f/api/app/v2/questionnaire/queryById', funcFormData, 'file', 'post')
                    .then((response) => {
                        this.widgetList = JSON.parse(response.source).list
                        for (let i = 0, l = this.widgetList.length; i < l; i++) {
                            switch (this.widgetList[i].type) {
                                case 'input':
                                    this.$set(this.formDesign, this.widgetList[i].model, '')
                                    break

                                case 'textarea':
                                    this.$set(this.formDesign, this.widgetList[i].model, '')
                                    break

                                case 'number':
                                    this.$set(this.formDesign, this.widgetList[i].model, this.widgetList[i].options.min)
                                    break

                                case 'radio':
                                    this.$set(this.formDesign, this.widgetList[i].model, this.widgetList[i].options.selectValue)
                                    break

                                case 'checkbox':
                                    this.$set(this.formDesign, this.widgetList[i].model, this.widgetList[i].options.selectValue)
                                    break

                                case 'select':
                                    this.$set(this.formDesign, this.widgetList[i].model, this.widgetList[i].options.selectValue)
                                    break

                                case 'imgupload':
                                    this.$set(this.formDesign, this.widgetList[i].model, [])
                                    break
                            }
                        }
                    })
            },

            onSubmit: function () {
                this.$refs['formUser'].validate((pass) => {
                    if (pass) {
                        // 校验动态表单必填项目
                        for (let i = 0, l = this.widgetList.length; i < l; i++) {
                            if (this.widgetList[i].options.required) {
                                switch (this.widgetList[i].type) {
                                    case 'input':
                                    case 'textarea':
                                    case 'radio':
                                    case 'select':
                                        if (!this.formDesign[this.widgetList[i].model] && this.formDesign[this.widgetList[i].model] !== 0) {
                                            this.$message.error('您有必填的题目未填写，请填写完整再提交')
                                            return
                                        }
                                        break

                                    case 'number':
                                        
                                        break

                                    case 'checkbox':
                                    case 'imgupload':
                                        if (this.formDesign[this.widgetList[i].model].length === 0) {
                                            this.$message.error('您有必填的题目未填写，请填写完整再提交')
                                            return
                                        }
                                        break
                                }
                            }
                        }
                        this.onReadyUploadImage()
                    }
                })
            },

            onReadyUploadImage: function () {
                let funcFormKey = Object.keys(this.formDesign)

                // 记录所有包含图片的属性字段
                for (let i = 0, l = funcFormKey.length; i < l; i++) {
                    if (this.formDesign[funcFormKey[i]].length && this.formDesign[funcFormKey[i]][0].status) {
                        this.uploadKeyList.push(funcFormKey[i])
                    }
                }
                this.uploadAllImage()
            },

            uploadAllImage: function () {
                key: for (let i = 0, l = this.uploadKeyList.length; i < l; i++) {
                    this.uploadindKey = ''
                    this.uploadFile = []
                    this.uploadFileUrl = []
                    
                    file: for (let ii = 0, ll = this.formDesign[this.uploadKeyList[i]].length; ii < ll; ii++) {
                        if (this.formDesign[this.uploadKeyList[i]][ii].status === 'ready') {
                            this.uploadindKey = this.uploadKeyList[i]
                            let funcImageFile = this.formDesign[this.uploadKeyList[i]][ii].raw
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
                                for (let i = 0, l = this.formDesign[this.uploadindKey].length; i < l; i++) {
                                    if (this.formDesign[this.uploadindKey][i].status === 'ready') {
                                        this.formDesign[this.uploadindKey][i].uploadUrl = this.uploadFileUrl[i]
                                        this.formDesign[this.uploadindKey][i].status = 'success'
                                    }
                                }
                                this.uploadAllImage()
                            })
                            .catch(() => {
                                console.log('uploadAllImage catch')
                            })
                        return
                    }
                }
                this.saveForm()
            },

            /**
             *  表单 - 保存表单
             *  @function
             *  @param {string} funcType
             *  @returns
             */
            saveForm: function (funcType) {
                let funcFormSaveData = JSON.parse(JSON.stringify(this.formDesign))
                let funcFormKey = Object.keys(funcFormSaveData)

                // 重新设置图片路径从 loadUrl 赋值到 url
                for (let i = 0, l = funcFormKey.length; i < l; i++) {
                    if (Object.prototype.toString.call(funcFormSaveData[funcFormKey[i]]) === '[object Array]') {
                        switch (Object.prototype.toString.call(funcFormSaveData[funcFormKey[i]][0])) {
                            case '[object String]':
                                funcFormSaveData[funcFormKey[i]] = funcFormSaveData[funcFormKey[i]].join(',　')
                                break

                            case '[object Object]':
                                for (let ii = 0, ll = funcFormSaveData[funcFormKey[i]].length; ii < ll; ii++) {
                                    funcFormSaveData[funcFormKey[i]][ii].url = funcFormSaveData[funcFormKey[i]][ii].uploadUrl
                                }  
                                break
                        }
                    }
                }

                let funcFields = []
                for (let i = 0, l = this.widgetList.length; i < l; i++) {
                    let funcItem = {
                        'model': this.widgetList[i].model,
                        'name': this.widgetList[i].name,
                        'type': this.widgetList[i].type,
                    }
                    funcFields.push(funcItem)
                }

                // 替换 [] 为文本 '(空)'
                funcFormSaveData = JSON.parse(JSON.stringify(funcFormSaveData).replace(/:\[\]/g, ':"(空)"').replace(/:""/g, ':"(空)"'))
                
                let funcParam = {
                    'userId': this.$store.state.signInUser.id,
                    'name': this.formUser.company,
                    'estateId': this.formUser.code,
                    'userName': this.formUser.name,
                    'userPhone': this.formUser.contact,
                    'formId': this.$route.query.formId,
                    'questionnaireId': this.$route.query.id,
                    'data': funcFormSaveData,
                    'fields': funcFields,
                }
                
                let funcFormData = new FormData()
                funcFormData.append('requestParam', JSON.stringify(funcParam))
                iRequest.request(iHost.base + 'f/api/app/v2/questionnaire/commit', funcFormData, 'file', 'post')
                    .then((response) => {
                        this.$message({ message: '谢谢您的参与', type: 'success' })
                        this.$router.push('/apppage/')
                    })
            },

            /**
             *  上传组件 - 文件格式
             *  @function
             *  @param {object} funcFile
             *  @returns
             */
            checkFileFormat: function (funcFile, funcSize) {
                if (funcFile.raw.type !== 'image/png' && funcFile.raw.type !== 'image/jpeg' && funcFile.raw.type !== 'image/bmp') {
                    this.$message.error('请上传图片')
                    return false
                }
                if (funcFile.size >= funcSize * 1024) { 
                    this.$message.error('文件大小不超过' + funcSize + 'KB')
                    return false
                }
                return true
            },

            onUploadChange: function (funcFile, funcFileList, funcItem) {
                if (funcFile.status === 'ready') {
                    if (this.checkFileFormat(funcFile, funcItem.options.size)) {
                        // 重新定义上传文件名称
                        let funcFileFormat = funcFile.name.substring(funcFile.name.lastIndexOf('.'), funcFile.name.length)
                        let funcFileName = (new Date() - 0) + funcFileFormat
                        let funcCopyFile = new File([funcFile.raw], funcFileName, { type: funcFile.raw.type})
                        funcCopyFile.uid = funcFile.raw.uid
                        funcFile.raw = funcCopyFile
                        funcFile.name = funcFileName

                        this.formDesign[funcItem.model].push(funcFile)
                    } else {
                        let funcImageBuffer = JSON.stringify(this.formDesign[funcItem.model])
                        this.formDesign[funcItem.model] = []
                        this.formDesign[funcItem.model] = JSON.parse(funcImageBuffer)
                    }
                }
            },

            onUploadRemove: function (funcFile, funcFileList, funcItem) {
                this.formDesign[funcItem.model] = funcFileList
            },

            onUploadExceed: function () {
                switch (this.clientType) {
                    case 'phone':
                        this.$message.error('图片上传已上限，无法添加')
                        break

                    case 'pc':
                        this.$message.error('图片上传已上限，无法添加')
                        break
                }
            },
        }
    }
</script>
<style lang="less">
    .questionnaire-input {
        .phone {
            width: calc(100vw - 5rem);
            margin: 2.5rem;
            padding: 0 2.5rem;
            background: #FFFFFF;

            .form {
                width: 100%;
                height: 10rem;
                margin-top: 2.6rem;
                background: #FFFFFF;
            }

            .input-form {
                .el-form-item {
                    label {
                        font-size: 2.4rem;
                        color: #000000;
                    }
                }
            }

            .info {
                .info-title {
                    width: 100%;
                    height: 8.8rem;
                    background: linear-gradient(90deg,#74BC90,#0C6CB0);

                    font-size: 3.6rem;
                    font-weight: 500;
                    color: #FFFFFF;
                }

                .enterprise {
                    padding: 3rem;
                    background: #FFFFFF;
                }

                .el-form-item {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;

                    label {
                        position: relative;
                        width: 21rem;
                        padding-right: 2.4rem;

                        font-size: 2.8rem;
                        font-weight: 500;
                        text-align: right;
                        color: #000000;
                    }

                    label:before {
                        position: relative;
                        top: .6rem;
                        left: -.4rem;
                        content: '*';
                        color: #ff0000;
                        font-size: 2.4rem;
                    }

                    > div,
                    .el-input {
                        flex-grow: 1;
                        height: 8.8rem;

                        input {
                            flex-grow: 1;
                            height: 8.8rem;

                            font-size: 2.4rem;
                            font-weight: 400;
                            color: #9A9A9A;
                        }
                    }
                }
            }

            .fr-upload {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                
                > div {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    width: 10rem;
                    height: 10rem;
                }

                ul {
                    height: 10rem;
                    li {
                        display: inline-block;
                        width: 10rem;
                        height: 10rem;
                    }
                }
            }

            .questionnaire-submit {
                background: #FFFFFF;

                button {
                    width: 64rem;
                    height: 8.8rem;
                    margin-bottom: 5rem;
                    background: linear-gradient(90deg,#74BC90,#0C6CB0);
                    border-radius: 4.4rem;

                    font-size: 3rem;
                    font-weight: 500;
                    color: #FFFFFF;
                }
            }
        }
        
        // 电脑端样式
        .pc {
            width: 1200px;
            min-height: 1110px;
            margin-bottom: 80px;
            padding-bottom: 80px;
            background: #FFFFFF;
            box-shadow: 1px 5px 15px 0px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            opacity: 0.9;

            .questionnaire-title {
                height: 120px;
                font-size: 34px;
                font-weight: 800;
                color: #000000;
            }

            .input-form {
                padding: 0 62px 62px 62px;
            }

            .info {
                padding: 0 62px;

                .info-title {
                    width: 1076px;
                    height: 60px;
                    margin-bottom: 40px;
                    border-radius: 5px;
                    background: linear-gradient(90deg, #74BC90 , #0C6CB0);

                    font-size: 24px;
                    color: #ffffff;
                }

                .form-item {
                    > div {
                        width: 360px;

                        .el-input,
                        input {
                            width: 100%;
                        }
                    }
                }
            }

            .questionnaire-submit {
                button {
                    width: 220px;
                    height: 56px;
                    margin-top: 66px;
                    border-radius: 28px;
                    background: linear-gradient(90deg, #74BC90 , #0C6CB0);

                    font-size: 18px;
                    font-weight: 500;
                    color: #FFFFFF;
                }
            }
        }
    }
</style>