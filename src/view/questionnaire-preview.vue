<template>
    <div class="questionnaire-preview">
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
                                    :limit="item.options.limit"
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
                                    :limit="item.options.limit"
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
        }
    }
</script>
<style lang="less">
    .questionnaire-preview {
        // 移动端样式
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