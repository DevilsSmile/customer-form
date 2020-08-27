<template>
    <div class="sign-in">
        <!-- 登录界面 -->
        <div v-if="clientType === 'phone'" class="phone column align-c">
            <div>
                <img class="logo" src="../assets/logo-phone.png" alt="" @click="onRouteHome()">
            </div>
            <div class="container-form row con-c">
                <el-form ref="elementFormSignIn" :model="formSignIn" :rules="rule">
                    <el-form-item class="form-item" prop="oldPassword">
                        <el-input v-model="formSignIn.phone" maxlength="11" placeholder="手机号">
                            <i slot="prefix" class="el-icon-mobile-phone"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="form-item" prop="newPassword">
                        <el-input v-model="formSignIn.password" minlength="8" maxlength="20" placeholder="登录密码" type="password">
                            <i slot="prefix" class="el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                        <el-button class="button-signin" @click.prevent="onSignIn()">登录</el-button>
                </el-form>
            </div>
        </div>

        <!-- 登录界面 -->
        <div v-if="clientType === 'pc'" class="pc row con-c align-c" @click.self="onRouteHome()">
            <div class="container-form">
                <div class="form-title column con-c align-c">
                    <span>登录</span>
                    <div class="form-title-decorate"></div>
                </div>
                <el-form ref="elementFormSignIn" :model="formSignIn" :rules="rule">
                    <el-form-item class="form-item" prop="phone">
                        <el-input v-model="formSignIn.phone" maxlength="11" placeholder="手机号" prefix-icon="el-icon-mobile-phone"></el-input>
                    </el-form-item>
                    <el-form-item class="form-item" prop="password">
                        <el-input v-model="formSignIn.password" minlength="8" maxlength="20" placeholder="登录密码" prefix-icon="el-icon-lock" type="password"></el-input>
                    </el-form-item>
                    <el-form-item class="form-item row con-c align-c">
                        <el-button class="button-submit" @click.prevent="onSignIn()">登录</el-button>
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
                host: iHost.base,
                clientType: this.$store.state.clientType,

                formSignIn: {
                    phone: '',
                    password: '',
                },
                rule: {
                    phone: [
                        { required: true, message: '手机号码不能为空', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                    ],
                },
            }
        },
        created: function () {

        },
        methods: {
            onRouteHome: function () {
                this.$router.push('/apppage/')
            },

            /**
             *  用户登录
             *  @function
             *  @param
             *  @returns
             */
            onSignIn: function () {
                this.$refs['elementFormSignIn'].validate((pass) => {
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
                                    name: funcResponse.contacts,
                                    contact: funcResponse.phone,
                                    other: funcResponse.others,
                                    file: [],
                                }

                                for (let i = 0, l = funcResponse.fileList.length; i < l; i++) {
                                    let funcImage = {
                                        uid: 1597000000000 + i,
                                        status: 'success',
                                        url: funcResponse.fileList[i].url,
                                        uploadUrl: funcResponse.fileList[i].url
                                    }

                                    this.formCompanyInfo.file.push(funcImage)
                                }
                                // 缓存登录信息
                                localStorage.setItem('signInUser', JSON.stringify(this.formCompanyInfo))
                                localStorage.setItem('signinRecord', new Date().getTime())

                                this.formCompanyInfoBuffer = JSON.parse(JSON.stringify(this.formCompanyInfo))
                                this.$store.commit('signInUser', JSON.parse(JSON.stringify(this.formCompanyInfo)))
                                this.$store.commit('isSignIn', true)
                                this.$router.push('/apppage/')
                            })
                            .catch((funcError) => {})
                    }
                })
            },
        }
    }
</script>
<style lang="less">
    .sign-in {
        .phone {
            width: 100vw;
            min-height: 130rem;

            .logo {
                width: 39rem;
                height: 17rem;
                margin-top: 7rem;
            }

            .container-form {
                width: 100%;
                padding: 9rem 5.5rem 0 5.5rem;

                .el-form {
                    .el-form-item {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        > div {
                            width: 58rem;
                            min-height: 8.8rem;
                            .el-input {
                                width: 58rem;
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
                    width: 58rem;
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
                height: 450px;
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
                        margin-left: 28px;
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