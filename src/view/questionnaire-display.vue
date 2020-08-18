<template>
    <div class="questionnaire-display">
        <div class="phone" v-if="clientType === 'phone'">
            <div>
                <span>表单内容</span>
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
        </div>


        <div class="pc" v-if="clientType === 'pc'">
            <div class="questionnaire-title row con-c align-c">
                <span>{{formDetail.title}}</span>
            </div>
            <div></div>
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
                clientType: this.$store.state.clientType,
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
            queryForm: function () {
                this.formUser = {
                    company: '公司名称',
                    code: '123465',
                    name: '阿狗',
                    contact: '18000000000',
                }
            },

            onSubmit: function () {
                console.log('onSubmit')
            },
        }
    }
</script>
<style lang="less">
    .questionnaire-display {
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
        
        .pc {
            width: 1200px;
            min-height: 1110px;
            background: #FFFFFF;
            box-shadow: 1px 5px 15px 0px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            opacity: 0.9;
        
            .questionnaire-title {
                height: 34px;
                margin: 44px 0;
                font-size: 34px;
                font-weight: 800;
                color: #000000;
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