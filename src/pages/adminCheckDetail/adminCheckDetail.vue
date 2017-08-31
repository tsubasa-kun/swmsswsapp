<template>
    <div class="index">
        <div class="content">
            <v-check-detail-item title="宿舍检测情况" :detail="item"></v-check-detail-item>
            <div v-if="item.STU_DATAS && item.STU_DATAS.length > 0" class="member-div">
                <div class="title-div">
                    <span class="title-text">个人检测情况</span>
                    <v-check-detail-member-item v-for="personal in item.STU_DATAS"
                                                :detail="personal"></v-check-detail-member-item>
                </div>
            </div>
        </div>
        <div class="btn-div">
            <mt-button type="primary" class="edit-btn" @click="editCheck">编辑</mt-button>
            <mt-button type="default" class="delete-btn" @click="showConfirmBox">删除</mt-button>
        </div>

        <div class="cover">
            <div class="cover-content">
                <div class="confirm-box">
                    <div class="tip-text">是否确认删除？</div>
                    <mt-button type="default" class="confirm-box-btn" @click="cancelDelete">取消</mt-button>
                    <mt-button type="primary" class="edit-btn" @click="deleteCheck">删除</mt-button>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
    .index {
        position: relative;
        height: 100%;
        min-height: 100vh;
    }

    .member-div {
        margin-top: 10PX;
        background-color: white;
        padding: 10PX;
        margin-bottom: 60PX;
    }

    .title-div {
    }

    .title-text {
        display: inline-block;
        font-size: 16PX;
        color: #1E2329;
    }

    .btn-div {
        width: 100%;
        height: 60PX;
        background-color: white;
        border-top: solid 1PX #e8e8e8;
        position: absolute;
        bottom: 0;
        text-align: center;
        padding: 10PX;
    }

    .edit-btn {
        width: calc(50% - 20PX);
        color: white;
        background-color: #06c1ae;
    }

    .delete-btn {
        width: calc(50% - 20PX);
        margin-left: 10PX;
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

    .cover-content {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .confirm-box {
        width: 70vw;
        height: 20vh;
        vertical-align: middle;
        text-align: center;
        background-color: white;
        position: absolute;
        top: calc(50% - 10vw);
        left: calc(50% - 35vw);
        border-radius: 4PX;
    }

    .tip-text {
        font-size: 18PX;
        padding: 15PX;
    }

    .confirm-box-btn {
        width: calc(50% - 20PX);
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import $ from 'jquery';
    import {Indicator, Button} from 'mint-ui';
    import checkDetailItem from '../../components/checkDetailItem/checkDetailItem.vue';
    import checkDetailMemberItem from '../../components/checkDetailMemberItem/checkDetailMemberItem.vue';

    export default {
        data() {
            return {
                jcbm: this.$route.query.JCBM,
                item: {},
            }
        },
        created() {
            SDK.setTitleText('详情');

            Indicator.open();
            this.$http.get(Api.teacherQueryStudentDormHygieneInfo)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    Indicator.close();
                    if (res.status === '200') {
                        let tempCheckList = res.datas;
                        for (let i = 0; i < tempCheckList.length; i++) {
                            if (tempCheckList[i].JCBM === this.jcbm) {
                                let temp = tempCheckList[i].JCFS;
                                if (Math.ceil(temp) <= temp) {
                                    tempCheckList[i].JCFS = temp.substr(0, temp.indexOf('.'));
                                }

                                if (tempCheckList[i].FJ) {
                                    for (let j = 0; j < tempCheckList[i].FJ.length; j++) {
                                        let imgUrl = tempCheckList[i].FJ[j];
                                        if (imgUrl.indexOf('http') < 0) {
                                            tempCheckList[i].FJ[j] = WEBPACK_CONIFG_HOST + imgUrl.replace('/xsfw/', '').replace('/axsfw/', '');
                                        }
                                    }
                                }

                                this.item = tempCheckList[i];
                                break;
                            }
                        }
                    }
                })
                .catch((msg) => {
                    Indicator.close();
                    Utils.methods.showTip('请求出错');
                });
        },
        components: {
            [Button.name]: Button,
            'v-check-detail-item': checkDetailItem,
            'v-check-detail-member-item': checkDetailMemberItem
        },
        methods: {
            showConfirmBox: function () {
                $('.cover').show();
            },
            cancelDelete: function () {
                $('.cover').hide();
            },
            deleteCheck: function () {
                Indicator.open();
                let xsjcbm = '';
                for (let i = 0; i < this.item.STU_DATAS.length; i++) {
                    xsjcbm = xsjcbm + this.item.STU_DATAS[i].XSJCBM + ',';
                }
                if (xsjcbm.length > 0) {
                    xsjcbm = xsjcbm.substr(0, xsjcbm.length - 1);
                }

                let params = '?JCBM=' + this.item.JCBM + '&SSDM=' + this.item.SSDM + '&XSJCBM=' + xsjcbm;
                this.$http.get(Api.deleteDormHygieneRecord + params)
                    .then(res => {
                        return res.json();
                    })
                    .then(res => {
                        Indicator.close();
                        if (res.status === '200') {
                            Utils.methods.showTip('删除成功');
                            this.$router.go(-1);
                        } else {
                            Utils.methods.showTip('删除失败');
                        }
                    })
                    .catch(msg => {
                        Indicator.close();
                        Utils.methods.showTip('请求出错');
                    });
            },
            editCheck: function () {
                this.$router.push({path: '/editCheck', query: this.item});
            }
        }
    }
</script>