<template>
    <div class="index">
        <div class="public-div">
            <div class="public-title">
                <span>公共区域打分</span>
            </div>
            <div class="public-content">
                <div class="item-div">
                    <span>宿舍</span>
                    <input type="text" placeholder="请选择" v-model="address" readOnly="true"/>
                </div>
                <div class="line"></div>
                <div class="item-div">
                    <span>检测类型</span>
                    <input type="text" placeholder="请选择" v-model="type" readOnly="true"/>
                </div>
                <div class="line"></div>
                <div class="item-div">
                    <span>分数</span>
                    <input type="number" placeholder="请填写" v-model="score"/>
                </div>
                <div class="line"></div>
                <div class="item-div">
                    <span class="at-top">备注</span>
                    <textarea class="model-inst-input" placeholder="请填写" v-model="describe" maxlength="80"></textarea>
                </div>
                <div class="line"></div>
                <div class="img-prv-div">
                    <div v-if="imgs.length === 0" class="img-add-btn" @click="choseUpload">
                        <i class="iconfont">&#xe854;</i>
                        <span>添加照片</span>
                    </div>
                    <div v-else class="img-div" v-for="imgUrl in imgs">
                        <img class="img-prv" :src="imgUrl" @click="choseUpload">
                    </div>
                </div>
            </div>
        </div>

        <div v-if="memberList && memberList.length > 0" class="member-div">
            <div class="member-title" @click="openMemberContent">
                <span>宿舍成员打分</span>
                <i class="iconfont arrow-ud-icon" v-if="memberContentOpen">&#xe79f;</i>
                <i class="iconfont arrow-ud-icon" v-else>&#xe781;</i>
            </div>
            <div class="member-content">
                <v-edit-check-member-item ref="members" v-for="member in memberList"
                                          :member="member"></v-edit-check-member-item>
            </div>
        </div>

        <mt-button class="submit-btn" @click="submit">提交</mt-button>

        <mt-actionsheet :actions="actions" v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>

<style scoped>
    .index {
        position: relative;
        height: 100%;
        min-height: 100vh;
    }

    .public-title {
        padding: 10PX;
        color: #9B9B9B;
    }

    .public-content {
        border-bottom: solid 1PX #e8e8e8;
        background-color: white;
    }

    .item-div {
        position: relative;
        padding: 10PX;
    }

    .item-div b {
        font-size: 16PX;
        color: #ff571a;
    }

    .item-div span {
        display: inline-block;
        width: 24%;
        color: #1E2329;
        font-size: 16PX;
    }

    .item-div input {
        border: 0;
        width: 68%;
        outline: none;
        font-size: 14PX;
    }

    .at-top {
        vertical-align: top;
    }

    .model-inst-input {
        display: inline-block;
        width: 68%;
        height: 110PX;
        min-height: 110PX;
        resize: none;
        outline: none;
        border: 0;
        font-size: 14PX;
    }

    .line {
        width: calc(100% - 10PX);
        margin-left: 10PX;
        height: 1PX;
        background-color: #e8e8e8;
    }

    .submit-btn {
        width: calc(100% - 20PX);
        color: white;
        background-color: #06c1ae;
        position: absolute;
        bottom: 10PX;
        left: 10PX;
    }

    .img-prv-div {
        width: 100%;
        padding-top: 10PX;
        padding-bottom: 10PX;
    }

    .img-div {
        display: inline-block;
        margin-left: 10PX;
        margin-top: 10PX;
        position: relative;
        width: 60PX;
        height: 60PX;
    }

    .img-prv {
        width: 50PX;
        height: 50PX;
        position: absolute;
        top: 0;
        left: 0;
    }

    .img-add-btn {
        position: relative;
        display: inline-block;
        border: solid 1PX #e8e8e8;
        border-radius: 4PX;
        width: 60PX;
        height: 60PX;
        margin-left: 10PX;
        vertical-align: top;
        margin-top: 5PX;
    }

    .img-add-btn i {
        color: #9A9A9A;
        font-size: 30PX;
        position: absolute;
        top: 10PX;
        left: 14PX;
    }

    .img-add-btn span {
        color: #9A9A9A;
        font-size: 12PX;
        position: absolute;
        top: 35PX;
        left: 6PX;
    }

    .member-title {
        padding: 10PX;
        color: #999999;
        border-bottom: solid 1PX #e8e8e8;
        background-color: #F9F9F9;
        text-align: center;
    }

    .arrow-ud-icon {
        font-size: 14PX;
        color: #999999;
    }

    .member-div {
        margin-bottom: 60PX;
    }

    .member-content {
        display: block;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import $ from 'jquery';
    import {Indicator, Button, Actionsheet} from 'mint-ui';
    import editCheckMemberItem from '../../components/editCheckMemberItem/editCheckMemberItem.vue';

    export default {
        data() {
            return {
                item: this.$route.query,
                jcbm: this.$route.query.JCBM,
                address: this.$route.query.SS,
                sslKey: this.$route.query.SSLDM,
                fjh: this.$route.query.FJH,
                score: this.$route.query.JCFS,
                describe: this.$route.query.BZ,
                imgs: [],
                imgTokens: this.$route.query.FJTOKEN,
                actions: [{name: '拍照', method: this.takePhoto},
                    {name: '从相册中选择', method: this.selectPhoto}],
                sheetVisible: false,
                memberContentOpen: true,
                type: this.$route.query.JCLXDM_DISPLAY,
                typeKey: this.$route.query.JCLXDM,
                memberList: this.$route.query.STU_DATAS
            }
        },
        components: {
            [Button.name]: Button,
            [Actionsheet.name]: Actionsheet,
            'v-edit-check-member-item': editCheckMemberItem
        },
        methods: {
            submit: function () {
                if (this.score.length <= 0) {
                    Utils.methods.showTip('请填写宿舍检查分数');
                } else if (this.score > 100) {
                    Utils.methods.showTip('宿舍检查分数不能大于100');
                } else {
                    let members = this.$refs.members;
                    let stu_datas = [];
                    if (members) {
                        for (let i = 0; i < members.length; i++) {
                            let stu_data = members[i].getData();
                            if (stu_data.JCFS.length <= 0) {
                                Utils.methods.showTip('请填写个人检查分数');
                                return;
                            } else if (stu_data.JCFS > 100) {
                                Utils.methods.showTip('个人检查分数不能大于100');
                                return;
                            } else {
                                stu_datas.push(JSON.stringify(members[i].getData()));
                            }
                        }
                    }

                    let params = '?SSLDM=' + this.sslKey + '&FJH=' + this.fjh + '&FS=' + this.score
                        + '&JCLXDM=' + this.typeKey + '&SSBZ=' + this.describe + '&SSFJ=' + this.imgTokens
                        + '&JCBM=' + this.jcbm + '&STU_DATAS=[' + encodeURIComponent(stu_datas) + ']';
                    Indicator.open();
                    this.$http.get(Api.saveDormHygiene + params)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            Indicator.close();
                            if (res.status === '200') {
                                Utils.methods.showTip('提交成功');
                                this.$router.go(-1);
                            } else {
                                Utils.methods.showTip(res.msg || '提交失败');
                            }
                        })
                        .catch((msg) => {
                            Indicator.close();
                            Utils.methods.showTip('请求出错');
                        });
                }
            },
            openMemberContent: function () {
                this.memberContentOpen = !this.memberContentOpen;
                $('.member-content').toggle();
            },
            choseUpload: function () {
                this.sheetVisible = true;
            },
            selectPhoto: function () {
                SDK.takePhoto((ret) => {
                    let retData;
                    if (ret instanceof Array) {
                        retData = ret[0];
                    } else {
                        retData = ret;
                    }
                    this.upLoadPhoto(retData.url);
                }, 1/*(3 - this.imgs.length)*/);
            },
            takePhoto: function () {
                SDK.takeCamera(false, (ret) => {
                    let retData;
                    if (ret instanceof Array) {
                        retData = ret[0];
                    } else {
                        retData = ret;
                    }
                    this.upLoadPhoto(retData.url);
                }, 1/*(3 - this.imgs.length)*/);
            },
            upLoadPhoto: function (url) {
                Indicator.open();
                SDK.uploadImgsToEmap({host: WEBPACK_CONIFG_HOST, urls: [url]})
                    .then(resp => {
                        if (resp.status == 200 || resp.success == true) {
                            this.imgTokens = resp.token;
                            this.imgs = [];
                            this.imgs.push(Utils.methods.getFileByToken(resp.token));
                            Utils.methods.showTip('图片上传成功');
                        } else {
                            Utils.methods.showTip(resp.msg || '图片上传失败');
                        }
                        Indicator.close();
                    }, error => {
                        Utils.methods.showTip('图片上传失败');
                        Indicator.close();
                    });
            },
            toDelete: function (value) {
                Utils.methods.removeByValue(this.imgs, value);
            },
            toPreview: function (url) {
                SDK.preViewImages([{
                    url: url,
                    desc: ''
                }], 0);
            },
        },
        created() {
            SDK.setTitleText('编辑');

            if ( this.$route.query.FJ) {
                this.imgs =  this.$route.query.FJ;
                if (this.imgs.length <= 0) {
                    this.imgs = [];
                }
            }
        },
        watch: {
            score: function () {
                let tempScore = this.score;
                this.score = tempScore.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
                //宿舍分数赋值给学生
                let members = this.$refs.members;
                if (members) {
                    for (let i = 0; i < members.length; i++) {
                        members[i].setScore(this.score);
                    }
                }
            }
//            imgs: function () {
//                if (this.imgs.length === 1) {
//                    $('.img-add-btn').hide();
//                } else {
//                    $('.img-add-btn').show();
//                }
//            },
        }
    }
</script>