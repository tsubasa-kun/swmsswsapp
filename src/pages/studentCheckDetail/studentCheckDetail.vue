<template>
    <div>
        <div class="content">
            <div class="title-div">
                <span class="title-text">个人检测情况</span>
            </div>
            <div class="score-div">
                <span class="score-num refused" v-if="personalItem.JCFS < 60">{{ personalItem.JCFS }}</span>
                <span class="score-num pass" v-else>{{ personalItem.JCFS }}</span>
                <span class="score-text">得分</span>
            </div>
            <div class="content-div">
                <div class="item-div">
                    <span class="item-label">检查时间</span>
                    <span class="item-text">{{ personalItem.JCRQ }}</span>
                </div>
                <div class="item-div">
                    <span class="item-label">宿舍</span>
                    <span class="item-text">{{ personalItem.SS }}</span>
                </div>
            </div>

            <div class="line-div"><div class="line"></div></div>

            <div class="item-div">
                <span class="item-label">备注：</span>
                <span class="item-label">{{ personalItem.BZ }}</span>
            </div>

            <div v-if="personalItem.XSFJ && personalItem.XSFJ.length > 0" class="item-div">
                <img v-for="img,index in personalItem.XSFJ" class="image" :src="img" @click="toPreview(personalItem.XSFJ, index)">
            </div>
        </div>

        <v-check-detail-item v-if="personalItem.SSTAG === '1'" title="宿舍检测情况" :detail="publicItem"></v-check-detail-item>
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
    import checkDetailItem from '../../components/checkDetailItem/checkDetailItem.vue';

    export default {
        data() {
            return {
                personalItem: this.$route.query,
                publicItem: {}
            }
        },
        created() {
            SDK.setTitleText('详情');

            if (this.personalItem.SSTAG === '1') {
                this.publicItem = {
                    JCFS: this.personalItem.FS,
                    JCRQ: this.personalItem.JCRQ,
                    BZ: this.personalItem.SSBZ,
                    XSFJ: this.personalItem.SSFJ,
                    SS: this.personalItem.SS
                };
            }
        },
        components: {
            'v-check-detail-item': checkDetailItem
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