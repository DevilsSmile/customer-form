<template>
    <div class="not-found">
        <span>404</span>
    </div>
</template>

<script>
    import iRule from '@/common/js/request/request.js'
    import iRequest from '@/common/js/request/request.js'

    export default {
        components: {},
        data: function () {
            return {

            }
        },
        created: function () {
            this.$router.push('/')
        },
        watch: {},
        methods: {},
    }
</script>

<style lang="less">

</style>
