<template>
    <!-- 通用组件 - 头部 -->
    <div class="components-header">
        <!-- phond 端页面 -->
        <div v-if="clientType === 'phone'" class="phone">
            <div class="navigation row con-b">
                <img v-if="isSignIn" src="../assets/avatar.png" alt="" @click="onWinSignIn()">
                <span v-if="!isSignIn" @click="onWinSignIn()">登录</span>
                <span class="container-header-phone-title">问卷列表</span>
                <img v-if="isSignIn" src="../assets/password.png" alt="" @click="onWinResetPassword()">
                <img v-if="!isSignIn" src="../assets/avatar-blank.png" alt="">
            </div>
        </div>

        <!-- pc 端页面 -->
        <div v-if="clientType === 'pc'" class="pc">
            <div class="container-header row con-b align-e">
                <div class="logo" @click="onRouteHome()">
                    <img src="../assets/logo.png" alt="">
                </div>
                <div class="user row con-c align-c">
                    <span v-if="!isSignIn" class="user-sign-in" @click="onWinSignIn()">登录</span>
                    <img v-if="isSignIn" src="../assets/avatar.png" alt="" @click="onWinSignIn()">
                    <span v-if="isSignIn" @click="onWinResetPassword()">修改密码</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import iCrypto from 'crypto-js'

    import iHost from '@/common/js/host.js'
    import iRule from '@/common/js/rule/rule.js'
    import iRequest from '@/common/js/request/request.js'

    import iToken from '@/common/js/token.js'

    export default {
        data: function () {
            return {
                clientType: this.$store.state.clientType
            }
        },

        computed: {
            isSignIn: function () {
                return this.$store.state.isSignIn
            },
        },

        watch: {
            isSignIn: {
                handler: function (funcNewValue, funcOldValue) {
                    if (!funcNewValue) return
                },
                deep: true,
                immediate: true,
            },
        },

        methods: {
            onRouteHome: function () {
                this.$router.push('/apppage/')
            },

            onWinSignIn: function () {
                console.log('isSignIn', !this.isSignIn)
                if (!this.isSignIn) {
                    this.$router.push('/apppage/signin')
                } else {
                    this.$router.push('/apppage/editinformation')
                }
            },

            onWinResetPassword: function () {
                this.$router.push('/apppage/resetpassword')
            },
        }
    }
</script>

<style lang="less">   
    .components-header {
        width: 100%;
        .phone {
            width: 100%;
            height: 10rem;
            padding: 2.4rem 2.8rem 0 2.8rem;
            background: linear-gradient(90deg,#74BC90, #0C6CB0,);

            .navigation {
                img {
                    width: 5.5rem;
                    height: 5.5rem;
                }

                span {
                    font-size: 4rem;
                    color: #FFFFFF;
                }
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

                .user-sign-in {
                    font-size: 20px;
                }
            }
        }
    }
</style>
