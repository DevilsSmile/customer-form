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

        data: function () {
            return {

            }
        }
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