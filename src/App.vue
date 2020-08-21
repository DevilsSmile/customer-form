<template>
    <div id="app">
        <componentHeader></componentHeader>
        <router-view></router-view>
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

            }
        },

        created: function () {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|opera mini|opera mobile|appleWebkit.*mobile|mobile/i.test( navigator.userAgent )) {
                console.log('phone')
                this.$store.commit('clientType', 'phone')
            } else {
                console.log('pc')
                this.$store.commit('clientType', 'pc')
            }
        },

        mounted: function () {
            window.onresize = () => {
                let funcHtml = document.getElementsByTagName('html')[0]
                let funcWindowWidth = window.innerWidth
                funcHtml.style.fontSize = '5px'

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
                
                if (funcWindowWidth < 410) {
                    funcHtml.style.fontSize = '5px'
                }
            };

            this.isSignIn()
        },

        methods: {
            isSignIn: function () {
                let funcTokenState = iToken.isSignIn()
                switch (funcTokenState) {
                    case 'valid':

                        break

                    case 'refresh':

                        break

                    case 'invalid':
                        // this.$store.commit('isSignIn', false)
                        break
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
</style>