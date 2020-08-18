<template>
    <div class="questionnaire-input">
        <!-- 移动端页面 -->
        <div class="phone" v-if="clientType === 'phone'">
            <div class="form">
                <span>表单内容</span>
            </div>
            <div class="info">
                <div class="info-title row con-c align-c">
                    <span>确认您的信息</span>
                </div>
                <div class="enterprise">
                    <!-- <nut-textinput class="form-item" v-model="formUser.company" label="企业名称" placeholder="请输入您的企业名称" :clearBtn="true" :disabled="false"></nut-textinput>
                    <nut-textinput class="form-item" v-model="formUser.code" label="统一机构代码" placeholder="请输入统一机构代码" :clearBtn="true" :disabled="false"></nut-textinput>
                    <nut-textinput class="form-item" v-model="formUser.name" label="联系人姓名" placeholder="请输入联系人姓名" :clearBtn="true" :disabled="false"></nut-textinput>
                    <nut-textinput class="form-item" v-model="formUser.contact" label="联系方式" placeholder="请输入您的联系方式" :clearBtn="true" :disabled="false"></nut-textinput> -->
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
            <div></div>
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

            },

            onSubmit: function () {
                console.log('onSubmit')
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

                .nut-textinput {
                    height: 8.8rem;
                    margin-bottom: 3rem;

                    .nut-textinput-label {
                        position: relative;
                        width: 22rem;
                        padding-right: 2.4rem;

                        font-size: 2.8rem;
                        font-weight: 500;
                        text-align: right;
                        color: #000000;
                    }

                    .nut-textinput-label:before {
                        position: relative;
                        top: .6rem;
                        left: -.4rem;
                        content: '*';
                        color: #ff0000;
                        font-size: 2.8rem;
                    }

                    input {
                        height: 8.8rem;

                        font-size: 2.4rem;
                        font-weight: 400;
                        color: #9A9A9A;
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