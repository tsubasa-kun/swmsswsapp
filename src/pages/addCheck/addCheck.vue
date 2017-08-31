<template>
    <div class="index">
        <div class="public-div">
            <div class="public-title">
                <span>宿舍打分</span>
            </div>
            <div class="public-content">
                <div class="item-div">
                    <span>宿舍</span>
                    <input type="text" class="text-align-right" placeholder="请选择" v-model="address" readOnly="true"
                           @click="toSelectAddress"/>
                    <i class="iconfont arrow-lr-icon">&#xe79e;</i>
                </div>
                <div class="line"></div>
                <div class="item-div">
                    <span>检测类型</span>
                    <input type="text" class="text-align-right" placeholder="请选择" v-model="type" readOnly="true"
                           @click="showTypePicker"/>
                    <i class="iconfont arrow-lr-icon">&#xe79e;</i>
                </div>
                <div class="line"></div>
                <div class="item-div">
                    <span>分数</span>
                    <input type="number" placeholder="请填写" min="0" max="100" v-model="score"/>
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
                <div v-for="member in memberList">
                    <v-add-check-member-item-2 v-if="member.JCBM" ref="members" :member="member"></v-add-check-member-item-2>
                    <v-add-check-member-item v-else ref="members" :member="member" :ssscore="score"></v-add-check-member-item>
                </div>
            </div>
        </div>

        <mt-button class="submit-btn" @click="submit">提交</mt-button>

        <div class="cover"></div>
        <div id="type_picker" class="m-picker">
            <div class="picker-title-div">
                <span class="picker-btn ok" @click="pickerOK">确定</span>
                <span class="picker-btn cancel" @click="pickerCancel"></span>
            </div>
            <mt-picker :slots="types" @change="onTValuesChange"></mt-picker>
        </div>

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

    .cover {
        display: none;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
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

    .text-align-right {
        text-align: right;
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

    .arrow-lr-icon {
        display: inline-block;
        font-size: 16PX;
        color: #92969c;
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
        margin-left: 10PX;
        position: absolute;
        bottom: 10PX;
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
        width: 60PX;
        height: 60PX;
        position: absolute;
        top: 0;
        left: 0;
    }

    .delete {
        font-size: 20PX;
        position: absolute;
        top: -5PX;
        right: 0;
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

    .m-picker {
        display: none;
        width: 100%;
        position: fixed;
        bottom: 0;
        background-color: white;
    }

    .picker-title-div {
        padding-top: 10PX;
        padding-bottom: 10PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .picker-btn {
        color: #06c1ae;
        font-size: 15PX;
    }

    .picker-btn.ok {
        position: absolute;
        right: 10PX;
    }

    .picker-btn.cancel {
        margin-left: 10PX;
    }

    .member-div {
        margin-bottom: 60PX;
    }

    .member-content {
        display: none;
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
    import {Indicator, Picker, Button, Actionsheet} from 'mint-ui';
    import addCheckMemberItem from '../../components/addCheckMemberItem/addCheckMemberItem.vue';
    import addCheckMemberItem2 from '../../components/addCheckMemberItem2/addCheckMemberItem2.vue';

    export default {
        data() {
            return {
                address: '',
                ssl: '',
                sslKey: '',
                fjh: '',
                score: '',
                describe: '',
                imgs: [],
                imgTokens: '',
                actions: [{name: '拍照', method: this.takePhoto},
                    {name: '从相册中选择', method: this.selectPhoto}],
                sheetVisible: false,
                memberContentOpen: false,
                type: '',
                typesValue: [],
                typesMap: [],
                types: [
                    {
                        flex: 1,
                        values: [],
                        className: 'types',
                        textAlign: 'center',
                        defaultIndex: 0
                    }
                ],
                typeKey: '',
                memberList: [],
                cancelAdd: true
            }
        },
        components: {
            [Picker.name]: Picker,
            [Button.name]: Button,
            [Actionsheet.name]: Actionsheet,
            'v-add-check-member-item': addCheckMemberItem,
            'v-add-check-member-item-2': addCheckMemberItem2
        },
        methods: {
            submit: function () {
                if (this.ssl.length <= 0 || this.fjh.length <= 0) {
                    Utils.methods.showTip('请选择宿舍');
                } else if (this.type.length <= 0) {
                    Utils.methods.showTip('请选择宿舍检查类型');
                } else if (this.score.length <= 0) {
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
                        + '&JCLXDM=' + this.typeKey + '&SSBZ=' + this.describe + '&SSFJ=' + this.imgTokens + '&JCBM='
                        + '&STU_DATAS=[' + encodeURIComponent(stu_datas) + ']' + '&TAG=ADD';
                    Indicator.open();
                    this.$http.get(Api.saveDormHygiene + params)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            Indicator.close();
                            if (res.status === '200') {
                                Utils.methods.showTip('提交成功');
                                sessionStorage.setItem('SSLDM', '');
                                sessionStorage.setItem('SSLMC', '');
                                sessionStorage.setItem('FJH', '');
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
            toSelectAddress: function () {
                this.address = '403C';
                this.cancelAdd = false;
                this.$router.push('/selectAddress');
            },
            openMemberContent: function () {
                this.memberContentOpen = !this.memberContentOpen;
                $('.member-content').toggle();
            },
            onTValuesChange(picker, values) {
                this.type = picker.getValues();
                this.getTypeKey(this.type);
            },
            showTypePicker: function () {
                $('.cover').show();
                $('#type_picker').slideDown('fast');
            },
            getTypeKey: function (value) {
                for (let i = 0; i < this.typesMap.length; i++) {
                    if (this.typesMap[i].DISPLAYVALUE == value) {
                        this.typeKey = this.typesMap[i].VALUE;
                    }
                }
            },
            pickerOK: function () {
                $('.cover').hide();
                $('.m-picker').slideUp('fast');
            },
            pickerCancel: function () {
                $('.cover').hide();
                $('.m-picker').slideUp('fast');
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
        },
        created() {
            SDK.setTitleText('新增记录');

            this.cancelAdd = true;

            this.ssl = sessionStorage.getItem('SSLMC') || '';
            this.sslKey = sessionStorage.getItem('SSLDM') || '';
            this.fjh = sessionStorage.getItem('FJH') || '';

            this.address = this.ssl + this.fjh;

            Indicator.open();
            this.$http.get(Api.queryDormCheckTypeInfo)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    Indicator.close();
                    this.typesMap = res.datas;
                    for (let i = 0; i < this.typesMap.length; i++) {
                        this.typesValue.push(this.typesMap[i].DISPLAYVALUE);
                    }
                    this.types[0].values = this.typesValue;

                    this.typeKey = res.datas[0].VALUE;
                })
                .catch((msg) => {
                    Indicator.close();
                    Utils.methods.showTip('请求出错');
                });
        },
        watch: {
            imgs: function () {
//                if (this.imgs.length === 1) {
//                    $('.img-add-btn').hide();
//                } else {
//                    $('.img-add-btn').show();
//                }
            },
            typeKey: function () {
                Indicator.open();
                let params = '?SSLDM=' + this.sslKey + '&FJH=' + this.fjh + '&JCLXDM=' + this.typeKey;
                this.$http.get(Api.queryStuInfoDorm + params)
                    .then(res => {
                        return res.json();
                    }).then(res => {
                        Indicator.close();
                        if (res.status === '200') {
                            this.memberList = res.datas;
                        } else {
    //                        Utils.methods.showTip('获取宿舍成员失败');
                        }
                    })
                    .catch((msg) => {
                        Indicator.close();
                        Utils.methods.showTip('请求出错');
                    });
            },
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
        },
        destroyed() {
            if (this.cancelAdd) {
                sessionStorage.setItem('SSLDM', '');
                sessionStorage.setItem('SSLMC', '');
                sessionStorage.setItem('FJH', '');
            }
        }
    }
</script>