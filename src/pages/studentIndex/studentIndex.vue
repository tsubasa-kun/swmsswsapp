<template>
    <div class="index">
        <div v-if="tab === 1" v-for="item in checkList">
            <div class="check-item">
                <div class="score-div" @click="toDetail(item)">
                    <span class="score-num refused" v-if="item.JCFS < 60">{{ item.JCFS }}</span>
                    <span class="score-num pass" v-else>{{ item.JCFS }}</span>
                    <span class="score-text">个人得分</span>
                </div>
                <div class="content-div" @click="toDetail(item)">
                    <span class="content-date">{{ item.JCRQ }}</span>
                    <span class="content-desc">备注：{{ item.BZ }}</span>
                </div>
                <div v-if="item.XSFJ.length > 0" class="image-div" @click="toPreview(item.XSFJ)">
                    <div class="image-content">
                        <span class="cover-text">图片x{{ item.XSFJ.length }}</span>
                        <img class="image" :src="item.XSFJ[0]">
                    </div>
                </div>
            </div>
            <div class="line-div"><div class="line"></div></div>
        </div>
        <v-empty-view v-if="tab === 0"></v-empty-view>
    </div>
</template>

<style scoped>
    .index {

    }

    .check-item {
        background-color: white;
        position: relative;
        padding: 15PX 15PX 15PX 10PX;
        vertical-align: middle;
    }

    .score-div {
        display: inline-block;
        text-align: center;
        border-right: solid 1PX #e8e8e8;
        padding-right: 10PX;
        vertical-align: middle;
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
        margin-left: 10PX;
        vertical-align: middle;
    }

    .content-date {
        display: block;
        color: #1E2329;
        font-size: 14PX;
    }

    .content-desc {
        display: block;
        width: 140PX;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: keep-all;
        color: #92969C;
    }

    .image-div {
        display: inline-block;
        position: absolute;
        right: 15PX;
        bottom: 10PX;
        text-align: center;
        vertical-align: middle;
    }

    .image-content {
        position: relative;
    }

    .image {
        width: 55PX;
        height: 55PX;
    }

    .cover-text {
        display: block;
        position: absolute;
        width: 100%;
        bottom: 0;
        color: white;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .line-div {
        background-color: white;
    }

    .line {
        width: calc(100% - 10PX);
        margin-left: 10PX;
        height: 1PX;
        background-color: #e8e8e8;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import {Indicator} from 'mint-ui';
    import emptyView from '../../components/emptyView/emptyView.vue';

    export default {
        data() {
            return {
                tab: 1,
                checkList: []
            }
        },
        components: {
            'v-empty-view': emptyView
        },
        created() {
            Indicator.open();
            this.$http.get(Api.setDefaultRole)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    Indicator.close();
                    if (res.status === '200') {
                        if (res.datas.IS_STU === '1') {
                            SDK.setTitleText('我的宿舍卫生情况');
                            this.$http.get(Api.getStudentDormHygieneInfo)
                                .then(res => {
                                    return res.json();
                                })
                                .then(res => {
                                    Indicator.close();
                                    if (res.status === '200') {
                                        let tempCheckList = res.datas;
                                        for (let i = 0; i < tempCheckList.length; i++) {
                                            let temp = tempCheckList[i].JCFS;
                                            if (Math.ceil(temp) <= temp) {
                                                tempCheckList[i].JCFS = temp.substr(0, temp.indexOf('.'));
                                            }
                                            if (tempCheckList[i].XSFJ) {
                                                for (let j = 0; j < tempCheckList[i].XSFJ.length; j++) {
                                                    let imgUrl = tempCheckList[i].XSFJ[j];
                                                    if (imgUrl.indexOf('http') < 0) {
                                                        tempCheckList[i].XSFJ[j] = WEBPACK_CONIFG_HOST + imgUrl.replace('/xsfw/', '').replace('/axsfw/', '');
                                                    }
                                                }
                                            }
                                            if (tempCheckList[i].SSTAG === '1') {
                                                let tempFS = tempCheckList[i].FS;
                                                if (Math.ceil(tempFS) <= tempFS) {
                                                    tempCheckList[i].FS = tempFS.substr(0, tempFS.indexOf('.'));
                                                }
                                            }
                                        }

                                        this.checkList = tempCheckList;
                                        if (this.checkList.length > 0) {
                                            this.tab = 1;
                                        } else {
                                            this.tab = 0;
                                        }
                                    }
                                })
                                .catch(msg => {
                                    Indicator.close();
                                    Utils.methods.showTip('请求出错');
                                });
                        }
                    } else {
                        Utils.methods.showTip('设置用户角色失败');
                    }
                })
                .catch(msg => {
                    Indicator.close();
                    Utils.methods.showTip('请求出错');
                });
        },
        methods: {
            toDetail: function (item) {
                this.$router.push({path: '/studentCheckDetail', query: item});
            },
            toPreview: function (fj) {
                let imgUrls = [];
                for (let i = 0; i < fj.length; i++) {
                    let img = {
                        url: fj[i],
                        desc: ''
                    };
                    imgUrls.push(img);
                }
                SDK.preViewImages(imgUrls, 0);
            }
        }
    }
</script>