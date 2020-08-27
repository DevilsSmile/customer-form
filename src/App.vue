<template>
    <div id="app">
        <componentHeader v-if="winHeader"></componentHeader>
        <router-view></router-view>
        <div v-if="!winHeader" class="wechat-tip row con-c align-c">
            <div class="column">
                <span>1. 请点击右上角'复制链接'</span>
                <span>2. 打开浏览器粘贴链接进行查看</span>
            </div>
        </div>
    </div>
</template>

<script>
    import iHeader from '@/components/header.vue'
    import iToken from '@/common/js/token.js'
    export default {
        components: {
            componentHeader: iHeader,
        },

        data: function () {
            return {
                clientType: 'pc',
                winHeader: true,
            }
        },

        created: function () {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|opera mini|opera mobile|appleWebkit.*mobile|mobile/i.test( navigator.userAgent )) {
                this.$store.commit('clientType', 'phone')
                this.clientType = 'phone'
            } else {
                this.$store.commit('clientType', 'pc')
                this.clientType = 'pc'
            }
        },

        mounted: function () {
            // 判断是否微信内置浏览器
            var ua = navigator.userAgent.toLowerCase()
            // this.$message({ message: 'phone' + ua, type: 'success' })
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.winHeader = false
            }

            window.onresize = () => {
                this.phoneAdaptation()
            }

            this.isSignIn()
            this.phoneAdaptation()
        },

        methods: {
            isSignIn: function () {
                let funcSignInRecord = Number(localStorage.getItem('signinRecord'))
                let funcNow = new Date().getTime()

                if (!funcSignInRecord) {
                    this.signOut()
                    return
                }

                // 间隔时间小于 20 分钟
                if (funcNow - funcSignInRecord < 10800000) {
                    this.$store.commit('signInUser', JSON.parse(localStorage.getItem('signInUser')))
                    this.$store.commit('isSignIn', true)
                } else {
                    this.signOut()
                }
            },

            signOut: function () {
                this.$store.commit('signInUser', '')
                this.$store.commit('isSignIn', false)
                localStorage.clear()
            },
            phoneAdaptation: function () {
                let funcHtml = document.getElementsByTagName('html')[0]
                let funcWindowWidth = window.innerWidth

                if (750 <= funcWindowWidth) {
                    funcHtml.style.fontSize = '10px'
                }

                if (650 <= funcWindowWidth && funcWindowWidth < 750) {
                    funcHtml.style.fontSize = '8px'
                }

                if (500 <= funcWindowWidth && funcWindowWidth < 650) {
                    funcHtml.style.fontSize = '6px'
                }

                if (410 <= funcWindowWidth && funcWindowWidth < 500) {
                    funcHtml.style.fontSize = '5.4px'
                }
                
                if (350 <= funcWindowWidth && funcWindowWidth < 410) {
                    funcHtml.style.fontSize = '5px'
                }

                if (250 <= funcWindowWidth && funcWindowWidth < 350) {
                    funcHtml.style.fontSize = '4px'
                }
            },
        },
    }
</script>

<style lang="less">
    #app {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        background-image: url('./assets/backdrop.png');
        background-repeat: no-repeat;
        background-size: 100%;
        background-color: #f5f3f6;
    }

    .wechat-tip {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #FFFFFF;

        span {
            font-size: 4rem;
        }
    }
</style>