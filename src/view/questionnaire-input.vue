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
                                <div @click="onAndroidUpload(item)">
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
                                </div>
                            </template>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="info">
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
                                <div @click="onAndroidUpload(item)">
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
                                </div>
                            </template>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="info">
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
                formDesign: {},
                widgetList: [{"type":"input","name":"意见","group":0,"key":1597048729690,"model":"input_1597048729690","options":{"width":"100%","value":"","defaultValue":"哈哈哈哈哈哈","placeholder":"","maxlength":20,"required":true}},{"type":"textarea","name":"建议","group":0,"key":1597048730225,"model":"textarea_1597048730225","options":{"width":"100%","value":"","defaultValue":"","placeholder":"","maxlength":"50","required":false}},{"type":"number","name":"每天步行公里数","group":0,"key":1597048730748,"model":"number_1597048730748","options":{"width":"100%","value":0,"min":0,"max":7,"required":false}},{"type":"radio","name":"测试一下单选","group":1,"key":1597048731257,"model":"radio_1597048731257","radioActive":0,"options":{"width":"100%","selectValue":"","options":[{"label":"1","value":1597048711766},{"label":"12","value":1597048711767},{"label":"33","value":1597048711768}],"required":true}},{"type":"checkbox","name":"测试二多选","group":1,"key":1597048731673,"model":"checkbox_1597048731673","options":{"width":"100%","selectValue":[],"options":[{"label":"A、哈哈","value":1597048711766},{"label":"B、呵呵","value":1597048711767},{"label":"C、呵呵和","value":1597048711768},{"label":"D、哈哈哈哈哈","value":1597048865091}],"required":true}},{"type":"select","name":"出行","group":1,"key":1597048732097,"model":"select_1597048732097","options":{"width":"100%","value":"","selectValue":"","options":[{"label":"1111","value":1597048711766},{"label":"吃的才舒服","value":1597048711767},{"label":"切尔奇若","value":1597048711768}],"required":false}},{"type":"imgupload","name":"美图","group":2,"key":1597048732775,"model":"imgupload_1597048732775","options":{"width":"100%","placeholder":"","limit":3,"size":"5000","required":true}},{"type":"input","name":"单行文本","group":0,"key":1597048736330,"model":"input_1597048736330","options":{"width":"100%","value":"","defaultValue":"","placeholder":"","maxlength":"25","required":false}},{"type":"textarea","name":"多行文本122222","group":0,"key":1597048737529,"model":"textarea_1597048737529","options":{"width":"100%","value":"","defaultValue":"","placeholder":"","maxlength":"50","required":false}},{"type":"radio","name":"单选框组","group":1,"key":1597048739784,"model":"radio_1597048739784","radioActive":0,"options":{"width":"100%","selectValue":"","options":[{"label":"1111","value":1597048711766},{"label":"222222","value":1597048711767},{"label":"33333","value":1597048711768}],"required":false}},{"type":"radio","name":"单选框组","group":1,"key":1597048740718,"model":"radio_1597048740718","radioActive":0,"options":{"width":"100%","selectValue":"","options":[{"label":"A","value":1597048711766},{"label":"B","value":1597048711767},{"label":"C","value":1597048711768},{"label":"D","value":1597048949196},{"label":"E","value":1597048952163},{"label":"F","value":1597048954723},{"label":"G","value":1597049079962}],"required":true}},{"type":"checkbox","name":"喜欢食物","group":1,"key":1597048743053,"model":"checkbox_1597048743053","options":{"width":"100%","selectValue":[],"options":[{"label":"牛奶","value":1597048711766},{"label":"西瓜","value":1597048711767},{"label":"橘子","value":1597048711768},{"label":"苹果","value":1597048962531},{"label":"西红柿","value":1597048985757},{"label":"牛排","value":1597048990541},{"label":"烤鸡","value":1597048991502}],"required":true}}],
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
        created: function () {
            this.queryForm()
        },
        methods: {
            /**
             *  动态表单 - 获取数据
             *  @function
             *  @param {string} funcQueryId
             *  @returns
             */
            queryForm: function (funcQueryId) {
                // let funcParam = {
                //     'id': funcQueryId
                // }
                // axiosPostApp(host().server + '/f/api/app/v2/questionnaire/queryById', funcParam)
                //     .then((response) => {
                        // this.widgetList = JSON.parse(response.data.source).list
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
                    // })
            },

            onSubmit: function () {
                console.log('onSubmit')
            },

            onUploadChange: function () {

            },

            onUploadExceed: function () {
                switch (this.clientType) {
                    case 'phone':
                        
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
        // 移动端样式
        .phone {
            width: 100vw;
            padding: 0 2.5rem;

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