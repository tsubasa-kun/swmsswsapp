<template>
    <div class="member-item">
        <div class="member-name-div">
            <span>{{ member.XM }}</span>
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

        <mt-actionsheet :actions="actions" v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>

<style scoped>

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

    .member-item {
        background-color: white;
        margin-bottom: 10PX;
    }

    .member-name-div {
        display: inline-block;
        color: #1E2329;
        font-size: 16PX;
        padding: 10PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import $ from 'jquery';
    import {Indicator, Actionsheet} from 'mint-ui';

    export default {
        props: ['member'],
        data() {
            return {
                score: this.member.XSJCFS,
                describe: this.member.XSBZ,
                imgs: [],
                actions: [{name: '拍照', method: this.takePhoto},
                    {name: '从相册中选择', method: this.selectPhoto}],
                sheetVisible: false,
                imgTokens: this.member.XSFJTOKEN
            }
        },
        created() {
            if (this.member.XSFJ) {
                this.imgs = this.member.XSFJ;
                if (this.imgs.length <= 0) {
                    this.imgs = [];
                }
            }
        },
        methods: {
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
                        Indicator.close();
                        if (resp.status == 200 || resp.success == true) {
                            this.imgTokens = resp.token;
                            this.imgs = [];
                            this.imgs.push(Utils.methods.getFileByToken(resp.token));
                            Utils.methods.showTip('图片上传成功');
                        } else {
                            Utils.methods.showTip(resp.msg || '图片上传失败');
                        }
                    }, error => {
                        Indicator.close();
                        Utils.methods.showTip('图片上传失败');
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
            getData: function () {
                let data = {
                    "XSJCBM": this.member.XSJCBM || '',
                    "XSBH": this.member.XH || '',
                    "JCFS": this.score || '',
                    "XSFJ": this.imgTokens || '',
                    "XSBZ": this.describe || ''
                };
                return data;
            },
            setScore: function (s) {
                this.score = s;
            }
        },
        components: {
            [Actionsheet.name]: Actionsheet
        },
        watch: {
            score: function () {
                this.score = this.score.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
            }
//            imgs: function () {
//                if (this.imgs.length === 1) {
//                    $('.img-add-btn').hide();
//                } else {
//                    $('.img-add-btn').show();
//                }
//            }
        }
    }
</script>