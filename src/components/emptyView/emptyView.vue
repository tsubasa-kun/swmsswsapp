<template>
    <div class="content">
        <div class="img-div">
            <img src="../../assets/no_data.png">
        </div>
        <span class="main-label">没有检查记录</span>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        text-align: center;
        padding: 15PX;
    }

    .img-div {
        width: 100%;
        text-align: center;
        padding-top: 60PX;
    }

    .img-div img {
        width: 120PX;
        height: 120PX;
    }

    .main-label {
        display: block;
        font-size: 18PX;
        color: #999999;
        margin-top: 20PX;
        margin-bottom: 15PX;
    }
</style>

<script type="text/javascript">
    import {Button} from 'mint-ui';
    export default {
        components: {
            [Button.name]: Button
        },
        methods: {
        },
        created() {
        }
    }
</script>