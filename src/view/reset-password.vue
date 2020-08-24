<template>
    <!-- 密码重置 -->
    <div class="reset-password">
        <div v-if="clientType === 'phone'" class="phone column align-c" @click.self="onRouteHome()">
            <div class="container-form">
                <el-form ref="elementFormResetPassword" :model="formResetPassword" :rules="rule">
                    <el-form-item class="form-item" prop="oldPassword">
                        <el-input v-model="formResetPassword.oldPassword" minlength="8" maxlength="20" placeholder="旧密码" type="password">
                            <i slot="prefix" class="el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="form-item" prop="newPassword">
                        <el-input v-model="formResetPassword.newPassword" minlength="8" maxlength="20" placeholder="新密码" type="password">
                            <i slot="prefix" class="el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="form-item" prop="repeatPassword">
                        <el-input v-model="formResetPassword.repeatPassword" minlength="8" maxlength="20" placeholder="确认密码" type="password">
                            <i slot="prefix" class="el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-button class="button-submit" @click.prevent="onResetPassword()">确认修改</el-button>
                </el-form>
            </div>
        </div>

        <div v-if="clientType === 'pc'" class="pc row con-c align-c" @click.self="onRouteHome()">
            <div class="container-form">
                <div class="form-title column con-c align-c">
                    <span @click="onWinResetPassword()">修改密码</span>
                    <div class="form-title-decorate"></div>
                </div>
                <el-form ref="elementFormResetPassword" :model="formResetPassword" :rules="rule">
                    <el-form-item prop="oldPassword">
                        <el-input v-model="formResetPassword.oldPassword" minlength="8" maxlength="20" placeholder="旧密码" type="password">
                            <i slot="prefix" class="el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="newPassword">
                        <el-input v-model="formResetPassword.newPassword" minlength="8" maxlength="20" placeholder="新密码" type="password">
                            <i slot="prefix" class="el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="repeatPassword">
                        <el-input v-model="formResetPassword.repeatPassword" minlength="8" maxlength="20" placeholder="确认新密码" type="password">
                            <i slot="prefix" class="el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="row con-c align-c">
                        <el-button class="button-submit" @click.prevent="onResetPassword()">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import iCrypto from 'crypto-js'

    import iHost from '@/common/js/host.js'
    import iRule from '@/common/js/rule/rule.js'
    import iRequest from '@/common/js/request/request.js'

    export default {
        data: function () {
            return {
                clientType: this.$store.state.clientType,

                formResetPassword: {
                    oldPassword: '',
                    newPassword: '',
                    repeatPassword: '',
                },
                rule: {
                    oldPassword: [
                        { required: true, message: '旧密码不能为空', trigger: 'blur' },
                    ],
                    newPassword: [
                        { required: true, message: '新密码不能为空', trigger: 'blur' },
                        { min: 8, max: 20, message: '8-20个字符，数字、英文字母及标点符号至少2种（除空格）', trigger: 'blur' },
                        { validator: iRule.unSpace, message: '不能包含空格', trigger: 'blur'},
                        { validator: iRule.unEmoji, message: '不能包含 emoji 表情', trigger: 'blur'},
                        { validator: iRule.unChinese, message: '不能包含中文', trigger: 'blur'},
                        { validator: iRule.password, message: '密码由8-20位数字+字母组合', trigger: 'blur'}
                    ],
                    repeatPassword: [
                        { required: true, message: '请再次输入登录密码', trigger: 'blur' },
                        { validator: (funcRule, funcValue, funcCallback) => iRule.passwordRepeat(funcRule, funcValue, funcCallback, this.formResetPassword.newPassword), message: '两次输入密码不一致，请重新输入', trigger: 'blur'}
                    ],
                },
            }
        },
        created: function () {
            if (!this.$store.state.isSignIn) {
                this.onRouteHome()
                return
            }

            this.resetForm()
        },
        methods: {
            onRouteHome: function () {
                this.$router.push('/apppage/')
            },

            resetForm: function () {
                this.formResetPassword = {
                    oldPassword: '',
                    newPassword: '',
                    repeatPassword: '',
                }
            },

            /**
             *  重置密码
             *  @function
             *  @param
             *  @returns
             */
            onResetPassword: function () {
                this.$refs['elementFormResetPassword'].validate((pass) => {
                    if (pass) {
                        let funcParam = JSON.stringify({
                            'userId': this.$store.state.signInUser.id,
                            'oldPassword': iCrypto.MD5(this.formResetPassword.oldPassword).toString(),
                            'newPassword': iCrypto.MD5(this.formResetPassword.newPassword).toString()
                        })

                        let funcFormData = new FormData()
                        funcFormData.append('requestParam', funcParam)
                        iRequest.request(iHost.base + 'f/api/user/pwdModify', funcFormData, 'file', 'post')
                            .then((funcResponse) => {
                                this.$message({ message: '修改成功', type: 'success' })
                                this.onRouteHome()
                            })
                            .catch((funcError) => {})
                    }
                })
            },
        }
    }
</script>
<style lang="less">
    .reset-password {
        .phone {
            width: 100vw;
            min-height: 130rem;
            background: url('../assets/backdrop-phone.png');
            background-repeat: no-repeat;
            background-size: 100%;

            .logo {
                width: 39rem;
                height: 17rem;
                margin-top: 7rem;
            }

            .container-form {
                padding-top: 4rem;
                .el-form {
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

                .button-submit {
                    width: 64rem;
                    height: 8.8rem;
                    margin-top: 7rem;
                    border-radius: 4.4rem;
                    background: linear-gradient(90deg, #0C6CB0, #74BC90);

                    font-size: 3rem;
                    color: #FFFFFF;
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
                width: 500px;
                height: 550px;
                padding: 30px 40px 44px 40px;
                background:#FFFFFF;
                box-shadow: 1px 5px 15px 0px rgba(0, 0, 0, 0.1);
                border-radius: 16px;

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
                        margin-left: 22px;
                        margin-top: 24px;
                        font-size: 30px;
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
            }
        }
    }
</style>