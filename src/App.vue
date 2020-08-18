<template>
    <div id="app">
        <componentHeader></componentHeader>
        <router-view></router-view>
    </div>
</template>

<script>
    import iHeader from '@/components/header.vue'
    export default {
        components: {
            componentHeader: iHeader,
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
                // console.log('window', window.innerWidth)
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
        },

        data: function () {
            return {

            }
        },
        
        created: function () {
            console.log('app init')
            // this.$store.commit('clientType', 'phone')
        },
    }
</script>

<style lang="less">
    #app {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        background-image: url(@backgroundImageUrl);
        background-repeat: no-repeat;
        background-size: 100%;
        background-color: #f5f3f6;
    }
</style>