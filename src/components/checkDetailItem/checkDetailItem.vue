<template>
    <div class="content">
        <div class="title-div">
            <span class="title-text">{{ title }}</span>
        </div>
        <div class="score-div">
            <span class="score-num refused" v-if="detail.JCFS < 60">{{ detail.JCFS }}</span>
            <span class="score-num pass" v-else>{{ detail.JCFS }}</span>
            <span class="score-text">得分</span>
        </div>
        <div class="content-div">
            <div class="item-div">
                <span class="item-label">检查时间</span>
                <span class="item-text">{{ detail.JCRQ }}</span>
            </div>
            <div class="item-div">
                <span class="item-label">宿舍</span>
                <span class="item-text">{{ detail.SS }}</span>
            </div>
        </div>

        <div class="line-div"><div class="line"></div></div>

        <div class="item-div">
            <span class="item-label">备注：</span>
            <span class="item-label">{{ detail.BZ }}</span>
        </div>

        <div v-if="detail.XSFJ && detail.XSFJ.length > 0" class="item-div">
            <img v-for="img,index in detail.XSFJ" class="image" :src="img" @click="toPreview(detail.XSFJ,index)">
        </div>

        <div v-if="detail.SSFJ && detail.SSFJ.length > 0" class="item-div">
            <img v-for="img,index in detail.SSFJ" class="image" :src="img" @click="toPreview(detail.SSFJ, index)">
        </div>

        <div v-if="detail.FJ && detail.FJ.length > 0" class="item-div">
            <img v-for="img,index in detail.FJ" class="image" :src="img" @click="toPreview(detail.FJ, index)">
        </div>
    </div>
</template>

<style scoped>
    .content {
        background-color: white;
        margin-bottom: 10PX;
        padding: 10PX 0PX 10PX 0PX;
    }

    .title-div {
        padding-left: 10PX;
        padding-right: 10PX;
    }

    .title-text {
        display: inline-block;
        font-size: 16PX;
        color: #1E2329;
    }

    .score-div {
        display: inline-block;
        text-align: center;
        border-right: solid 1PX #e8e8e8;
        padding-left: 10PX;
        padding-right: 10PX;
        vertical-align: middle;
        margin-top: 10PX;
    }

    .score-num {
        display: block;
        font-size: 28PX;
        font-weight: bold;
    }

    .pass {
        color: #52C7CA;
    }

    .refused {
        color: #F16666;
    }

    .score-text {
        display: block;
        color: #666666;
        font-size: 12PX;
        margin-top: 5PX;
    }

    .content-div {
        display: inline-block;
        vertical-align: middle;
    }

    .item-label {
        color: #92969C;
        font-size: 14PX;
        white-space:normal;
        word-break:break-all;
    }

    .item-text {
        color: #1E2329;
        font-size: 14PX;
        margin-left: 10PX;
    }

    .item-div {
        margin-top: 10PX;
        padding-left: 10PX;
        padding-right: 10PX;
    }

    .image {
        width: 60PX;
        height: 60PX;
    }

    .line-div {
        background-color: white;
        margin-top: 10PX;
    }

    .line {
        width: calc(100% - 10PX);
        margin-left: 10PX;
        height: 1PX;
        background-color: #e8e8e8;
    }
</style>

<script type="text/javascript">
    export default {
        props: ["title", "detail"],
        data() {
            return {
            }
        },
        created() {
            if (this.detail.XSFJ) {
                for (let i = 0; i < this.detail.XSFJ.length; i++) {
                    let imgUrl = this.detail.XSFJ[i];
                    if (imgUrl.indexOf('http') < 0) {
                        this.detail.XSFJ[i] = WEBPACK_CONIFG_HOST + imgUrl.replace('/xsfw/', '').replace('/axsfw/', '');
                    }
                }
            }
            if (this.detail.SSFJ) {
                for (let i = 0; i < this.detail.SSFJ.length; i++) {
                    let imgUrl = this.detail.SSFJ[i];
                    if (imgUrl.indexOf('http') < 0) {
                        this.detail.SSFJ[i] = WEBPACK_CONIFG_HOST + imgUrl.replace('/xsfw/', '').replace('/axsfw/', '');
                    }
                }
            }
            if (this.detail.FJ) {
                for (let i = 0; i < this.detail.FJ.length; i++) {
                    let imgUrl = this.detail.FJ[i];
                    if (imgUrl.indexOf('http') < 0) {
                        this.detail.FJ[i] = WEBPACK_CONIFG_HOST + imgUrl.replace('/xsfw/', '').replace('/axsfw/', '');
                    }
                }
            }
        },
        methods: {
            toPreview: function (fj, index) {
                let imgUrls = [];
                for (let i = 0; i < fj.length; i++) {
                    let img = {
                        url: fj[i],
                        desc: ''
                    };
                    imgUrls.push(img);
                }
                SDK.preViewImages(imgUrls, index);
            }
        }
    }
</script>