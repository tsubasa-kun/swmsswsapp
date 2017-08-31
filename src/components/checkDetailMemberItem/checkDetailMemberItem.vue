<template>
    <div class="content">
        <div class="score-div">
            <span class="name-text">{{ detail.XM }}</span>
            <span class="score-num refused" v-if="detail.XSJCFS < 60">{{ detail.XSJCFS }}</span>
            <span class="score-num pass" v-else>{{ detail.XSJCFS }}</span>
            <span class="score-text">分</span>
        </div>

        <div class="line-div"><div class="line"></div></div>

        <div class="item-div">
            <span class="item-label">备注：</span>
            <span class="item-label">{{ detail.XSBZ }}</span>
        </div>

        <div v-if="detail.XSFJ && detail.XSFJ.length > 0" class="item-div">
            <img v-for="img,index in detail.XSFJ" class="image" :src="img" @click="toPreview(detail.XSFJ, index)">
        </div>
    </div>
</template>

<style scoped>
    .content {
        background-color: white;
        margin-top: 10PX;
        padding: 10PX 0PX 10PX 0PX;
        border: solid 1PX #e8e8e8;
    }

    .score-div {
        display: inline-block;
        text-align: center;
        padding-left: 10PX;
        padding-right: 10PX;
        vertical-align: middle;
        margin-top: 10PX;
    }

    .name-text {
        display: inline-block;
        font-size: 14PX;
        color: #1E2329;
    }

    .score-num {
        display: inline-block;
        font-size: 14PX;
    }

    .pass {
        color: #52C7CA;
    }

    .refused {
        color: #F16666;
    }

    .score-text {
        display: inline-block;
        color: #1E2329;
        font-size: 14PX;
    }

    .item-label {
        color: #92969C;
        font-size: 14PX;
        white-space:normal;
        word-break:break-all;
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
        props: ["detail"],
        data() {
            return {
                FS: {},
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
        },
        created() {
            //分数显示 10.55--10.55,10.0--10
            let temp = this.detail.XSJCFS;
            if (Math.ceil(temp) <= temp) {
                this.detail.XSJCFS = temp.substr(0, temp.indexOf('.'));
            }

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
        }
    }
</script>