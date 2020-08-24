<template>
    <div class="questionnaire-display">
        <div class="phone" v-if="clientType === 'phone'">
            <div class="form-display">
                <div v-for="(item, index) in formReturn" :key="index" class="form-item">
                    <div v-if="item.type === 'input'">
                        <div class="form-item-title">
                            <div></div>
                            <div :class="item.options.required ? 'form-item-required' : ''">{{item.name}}</div>
                        </div>
                        <div class="form-item-content">
                            <p>{{formReturnValue[item.model]}}</p>
                        </div>
                    </div>

                    <div v-if="item.type === 'radio'">
                        <div class="form-item-title">
                            <div></div>
                            <div :class="item.options.required ? 'form-item-required' : ''">{{item.name}}</div>
                        </div>
                        <div class="form-item-content">
                            <p>{{formReturnValue[item.model]}}</p>
                        </div>
                    </div>

                    <div v-if="item.type === 'number'">
                        <div class="form-item-title">
                            <div></div>
                            <div :class="item.options.required ? 'form-item-required' : ''">{{item.name}}</div>
                        </div>
                        <div class="form-item-content">
                            <p>{{formReturnValue[item.model]}}</p>
                        </div>
                    </div>

                    <div v-if="item.type === 'select'">
                        <div class="form-item-title">
                            <div></div>
                            <div :class="item.options.required ? 'form-item-required' : ''">{{item.name}}</div>
                        </div>
                        <div class="form-item-content">
                            <p>{{formReturnValue[item.model]}}</p>
                        </div>
                    </div>

                    <div v-if="item.type === 'checkbox'">
                        <div class="form-item-title">
                            <div></div>
                            <div :class="item.options.required ? 'form-item-required' : ''">{{item.name}}</div>
                        </div>
                        <div class="form-item-content">
                            <p>{{formReturnValue[item.model]}}</p>
                        </div>
                    </div>

                    <div v-if="item.type === 'textarea'">
                        <div class="form-item-title">
                            <div></div>
                            <div :class="item.options.required ? 'form-item-required' : ''">{{item.name}}</div>
                        </div>
                        <div class="form-item-content">
                            <p>{{formReturnValue[item.model]}}</p>
                        </div>
                    </div>

                    <div v-if="item.type === 'imgupload'">
                        <div class="form-item-title">
                            <div></div>
                            <div :class="item.options.required ? 'form-item-required' : ''">{{item.name}}</div>
                        </div>
                        <div class="form-item-content">
                            <div class="form-item-content-image" v-for="(valueItem, indexItem) in formReturnValue[item.model]" :key="indexItem">
                                <img :src="host + valueItem.url" @click="onImageDetail(host + valueItem.url)" />
                            </div>
                            <span v-if="formReturnValue[item.model].length === 0">（空）</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info">
                <div class="info-title row con-c align-c">
                    <span>企业资料</span>
                </div>
                <div class="enterprise column">
                    <div class="info-item row align-c">
                        <span class="info-item-title">企业名称</span>
                        <span class="info-item-value">{{formUser.company}}</span>
                    </div>
                    <div class="info-item row align-c">
                        <span class="info-item-title">统一机构代码</span>
                        <span class="info-item-value">{{formUser.code}}</span>
                    </div>
                    <div class="info-item row align-c">
                        <span class="info-item-title">联系人姓名</span>
                        <span class="info-item-value">{{formUser.name}}</span>
                    </div>
                    <div class="info-item row align-c">
                        <span class="info-item-title">联系方式</span>
                        <span class="info-item-value">{{formUser.contact}}</span>
                    </div>
                </div>
            </div>
            <div class="row con-c align-c">
                <el-button class="button-submit" @click.prevent="onRouteHome()">返回</el-button>
            </div>
        </div>


        <div class="pc" v-if="clientType === 'pc'">
            <div class="questionnaire-title row con-c align-c">
                <span>{{formDetail.title}}</span>
            </div>
            <div class="form-display">
                <div v-for="(item, index) in formReturn" :key="index" class="form-item">
                    <div v-if="item.type === 'input'">
                        <div class="form-item-title">
                            <div></div>
                            <div>{{item.name}}</div>
                        </div>
                        <div class="form-item-content">
                            <p>{{formReturnValue[item.model]}}</p>
                        </div>
                    </div>

                    <div v-if="item.type === 'radio'">
                        <div class="form-item-title">
                            <div></div>
                            <div>{{item.name}}</div>
                        </div>
                        <div class="form-item-content">
                            <p>{{formReturnValue[item.model]}}</p>
                        </div>
                    </div>

                    <div v-if="item.type === 'number'">
                        <div class="form-item-title">
                            <div></div>
                            <div>{{item.name}}</div>
                        </div>
                        <div class="form-item-content">
                            <p>{{formReturnValue[item.model]}}</p>
                        </div>
                    </div>

                    <div v-if="item.type === 'select'">
                        <div class="form-item-title">
                            <div></div>
                            <div>{{item.name}}</div>
                        </div>
                        <div class="form-item-content">
                            <p>{{formReturnValue[item.model]}}</p>
                        </div>
                    </div>

                    <div v-if="item.type === 'checkbox'">
                        <div class="form-item-title">
                            <div></div>
                            <div>{{item.name}}</div>
                        </div>
                        <div class="form-item-content">
                            <p>{{formReturnValue[item.model]}}</p>
                        </div>
                    </div>

                    <div v-if="item.type === 'textarea'">
                        <div class="form-item-title">
                            <div></div>
                            <div>{{item.name}}</div>
                        </div>
                        <div class="form-item-content">
                            <p>{{formReturnValue[item.model]}}</p>
                        </div>
                    </div>

                    <div v-if="item.type === 'imgupload'">
                        <div class="form-item-title">
                            <div></div>
                            <div>{{item.name}}</div>
                        </div>
                        <div class="form-item-content">
                            <div class="form-item-content-image" v-for="(valueItem, indexItem) in formReturnValue[item.model]" :key="indexItem">
                                <img :src="host + valueItem.url" @click="onImageDetail(host + valueItem.url)" />
                            </div>
                            <span v-if="formReturnValue[item.model].length === 0">（空）</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info">
                <div class="info-title row con-c align-c">
                    <span>企业资料</span>
                </div>
                <div class="column">
                    <div class="row con-b align-c">
                        <div class="info-item row align-c">
                            <span class="info-item-title">企业名称</span>
                            <span class="info-item-value">{{formUser.company}}</span>
                        </div>
                        <div class="info-item row align-c">
                            <span class="info-item-title">统一机构代码</span>
                            <span class="info-item-value">{{formUser.code}}</span>
                        </div>
                    </div>
                    <div class="row con-b align-c">
                        <div class="info-item row align-c">
                            <span class="info-item-title">联系人姓名</span>
                            <span class="info-item-value">{{formUser.name}}</span>
                        </div>
                        <div class="info-item row align-c">
                            <span class="info-item-title">联系方式</span>
                            <span class="info-item-value">{{formUser.contact}}</span>
                        </div>
                    </div>
                </div>
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

                // 表单数据
                formReturn: [],                 // 表单结构信息
                formReturnInfo: {},             // 表单配置信息
                formReturnValue: {},            // 表单数据

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
            onRouteHome: function () {
                this.$router.push('/apppage/')
            },
            queryForm: function () {
                let funcParam = JSON.stringify({
                    'formId': this.$route.query.formId,
                    'dataId': this.$route.query.dataId
                })
                let funcFormData = new FormData()
                funcFormData.append('requestParam', funcParam)
                iRequest.request(iHost.base + 'f/api/app/v2/questionnaire/myQuestionnaire', funcFormData, 'file', 'post')
                    .then((response) => {
                        console.log(response)

                        this.formReturn = JSON.parse(response.source).list
                        for(let i = 0, l = this.formReturn.length; i < l; i++) {
                            let funcFormReturnInfo = {}
                            switch (this.formReturn[i].type) {
                                case 'input':
                                    funcFormReturnInfo = {
                                        'type': this.formReturn[i].type
                                    }
                                    this.formReturnInfo[this.formReturn[i].model] = funcFormReturnInfo
                                    this.$set(this.formReturnValue, this.formReturn[i].model, '')
                                    break

                                case 'textarea':
                                    funcFormReturnInfo = {
                                        'type': this.formReturn[i].type
                                    }
                                    this.formReturnInfo[this.formReturn[i].model] = funcFormReturnInfo
                                    this.$set(this.formReturnValue, this.formReturn[i].model, '')
                                    break

                                case 'number':
                                    funcFormReturnInfo = {
                                        'type': this.formReturn[i].type
                                    }
                                    this.formReturnInfo[this.formReturn[i].model] = funcFormReturnInfo
                                    this.$set(this.formReturnValue, this.formReturn[i].model, 0)
                                    break

                                case 'radio':
                                    funcFormReturnInfo = {
                                        'type': this.formReturn[i].type,
                                        'option': this.formReturn[i].options.options
                                    }
                                    this.formReturnInfo[this.formReturn[i].model] = funcFormReturnInfo
                                    this.$set(this.formReturnValue, this.formReturn[i].model, '')
                                    break

                                case 'checkbox':
                                    funcFormReturnInfo = {
                                        'type': this.formReturn[i].type,
                                        'option': this.formReturn[i].options.options
                                    }
                                    this.formReturnInfo[this.formReturn[i].model] = funcFormReturnInfo
                                    this.$set(this.formReturnValue, this.formReturn[i].model, '')
                                    break

                                case 'select':
                                    funcFormReturnInfo = {
                                        'type': this.formReturn[i].type,
                                        'option': this.formReturn[i].options.options
                                    }
                                    this.formReturnInfo[this.formReturn[i].model] = funcFormReturnInfo
                                    this.$set(this.formReturnValue, this.formReturn[i].model, '')
                                    break

                                case 'imgupload':
                                    funcFormReturnInfo = {
                                        'type': this.formReturn[i].type
                                    }
                                    this.formReturnInfo[this.formReturn[i].model] = funcFormReturnInfo
                                    this.$set(this.formReturnValue, this.formReturn[i].model, [])
                                    break
                            }
                        }

                        console.log('formReturnValue', JSON.stringify(this.formReturnValue))

                        this.formUser = {
                            company: response.obj.owner_city,
                            code: response.obj.owner_community,
                            name: response.obj.owner_name,
                            contact: response.obj.owner_phone,
                        }

                        let funcFormReturn = response.obj
                        delete funcFormReturn.owner_city
                        delete funcFormReturn.owner_name
                        delete funcFormReturn.owner_phone
                        delete funcFormReturn.owner_community

                        let funcFormReturnKey = Object.keys(this.formReturnValue)

                        // 还原数据应有类型
                        for (let i = 0, l = funcFormReturnKey.length; i < l; i++) {
                            switch(Object.prototype.toString.call(this.formReturnValue[funcFormReturnKey[i]])) {
                                case '[object Number]': 
                                    this.$set(this.formReturnValue, funcFormReturnKey[i], Number(funcFormReturn[funcFormReturnKey[i]]))
                                    break

                                case '[object Boolean]': 
                                    this.$set(this.formReturnValue, funcFormReturnKey[i], Boolean(funcFormReturn[funcFormReturnKey[i]]))
                                    break

                                case '[object Array]': 
                                    let funcArray
                                    try {
                                        funcArray = JSON.parse(funcFormReturn[funcFormReturnKey[i]])
                                    }
                                    catch(err) {
                                        funcArray = []
                                    }
                                    if (funcArray.length && funcArray[0].status) {
                                        for (let i = 0, l = funcArray.length; i < l; i++) {
                                            if (funcArray[i].url.indexOf(iHost.base) >= 0) {
                                                funcArray[i].url = funcArray[i].url.replace(iHost.base, '')
                                            }
                                        }
                                    }
                                    this.$set(this.formReturnValue, funcFormReturnKey[i], funcArray)
                                    break

                                default:
                                    this.$set(this.formReturnValue, funcFormReturnKey[i], funcFormReturn[funcFormReturnKey[i]])
                            }
                        }
                        console.log(this.formReturnValue)
                    })
            },
        }
    }
</script>
<style lang="less">
    .questionnaire-display {
        // 移动端样式
        .phone {
            width: 100vw;
            padding: 2.5rem;

            .form {
                width: 100%;
                height: 10rem;
                margin-top: 2.6rem;
                background: #FFFFFF;
            }

            .form-display {
                padding: 4rem 0;
                background: #FFFFFF;
                .form-item {
                    margin: 4rem 3.2rem;
                    .form-item-required::before {
                        display: inline-block;
                        content: '*';
                        color: #FF0000;
                    }

                    .form-item-title {
                        margin-bottom: 2.6rem;
                        font-size: 2.8rem;
                        font-weight: 800;
                        color: #000000;
                    }

                    .form-item-content {
                        font-size: 2.4rem;
                        color: #595959;
                    }

                    .form-item-content-image img {
                        width: 14rem;
                        height: 14rem;
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
                    padding: 0 3rem 5rem 3rem;
                    background: #FFFFFF;

                    .info-item {
                        height: 12rem;
                        border-bottom: .1rem #EEEEEE solid
                    }

                    .info-item-title {
                        width: 22rem;
                        padding-right: 3rem;
                        text-align: right;
                        font-size: 2.8rem;
                        font-weight: 500;
                        color: #000000;
                    }

                    .info-item-title:before {
                        position: relative;
                        top: .6rem;
                        left: -.4rem;
                        content: '*';
                        color: #ff0000;
                        font-size: 2.8rem;
                    }

                    .info-item-value {
                        font-size: 2.8rem;
                        font-weight: 500;
                        color: #5A5A5A;
                    }
                }
            }

            .button-submit {
                width: 64rem;
                height: 8.8rem;
                margin-top: 2rem;
                background: linear-gradient(90deg, #F2F2F2 , #CCCCCC);
                border: none;
                border-radius: 4.4rem;

                font-size: 3rem;
                color: #666666;
            }
        }
        
        .pc {
            width: 1200px;
            min-height: 1110px;
            margin-bottom: 80px;
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

            .form-item {
                margin: 40px 62px;
                .form-item-title {
                    margin-bottom: 26px;
                    font-size: 15px;
                    font-weight: 800;
                    color: #000000;
                }

                .form-item-content {
                    color: #595959;
                }

                .form-item-content-image img {
                    width: 140px;
                    height: 140px;
                }
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
                    font-weight: 500;
                    color: #FFFFFF;
                }

                .info-item {
                    width: 50%;
                    margin-bottom: 40px;

                    .info-item-title {
                        width: 110px;
                        margin-right: 32px;
                        text-align: right;
                        font-size: 16px;
                        font-weight: 800;
                        color: #000000;
                    }

                    .info-item-title:before {
                        content: '*';
                        height: 16px;
                        margin-right: 6px;
                        padding-top: 6px;
                        color: #ff0000;
                        font-size: 10px;
                    }

                    .info-item-value {
                        font-size: 16px;
                        font-weight: 400;
                        color: #5A5A5A;
                    }
                }
            }
        }
    }
</style>