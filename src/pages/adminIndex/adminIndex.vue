<template>
    <div class="content">
        <div>
            <div class="search-div">
                <i class="iconfont icon-search search-icon"></i>
                <input class="keyword-input" v-model="keyword" type="text" placeholder="搜索宿舍楼或房间号">
            </div>
            <div v-if="tab === 1" v-for="item in resultCheckList" @click="toDetail(item)">
                <div class="check-item">
                    <span class="item-title">{{ item.SS }}</span>
                    <div class="item-content-div">
                        <span class="item-label">得分</span>
                        <span class="item-text">{{ item.JCFS }}</span>
                        <span class="item-label ml-10">检查类型</span>
                        <span class="item-text">{{ item.JCLXDM_DISPLAY }}</span>
                    </div>
                    <span class="item-date">{{ item.JCRQ }}</span>
                </div>
                <div class="line-div">
                    <div class="line"></div>
                </div>
            </div>
            <v-empty-view v-if="tab === 0"></v-empty-view>
        </div>

        <div class="add-btn-bg"></div>
        <i class="iconfont icon-tianjia add-btn" @click="toAddCheck"></i>
    </div>
</template>

<style scoped>
    .content {
    }

    .search-div {
        padding: 5PX 10PX 5PX 10PX;
        position: relative;
    }

    .search-icon {
        color: #BDBFC5;
        font-size: 12PX;
        position: absolute;
        top: 12PX;
        left: 16PX;
    }

    .keyword-input {
        width: 100%;
        border: solid 1PX #e8e8e8;
        border-radius: 4PX;
        font-size: 12PX;
        height: 30PX;
        outline: none;
        padding: 4PX 4PX 4PX 20PX;
    }

    .check-item {
        background-color: white;
        position: relative;
        padding: 10PX;
        vertical-align: middle;
    }

    .item-title {
        color: #1E2329;
        font-size: 16PX;
    }

    .item-content-div {
        margin-top: 5PX;
    }

    .item-label {
        color: #92969c;
        font-size: 13PX;
    }

    .item-text {
        color: #1E2329;
        font-size: 13PX;
    }

    .ml-10 {
        margin-left: 10PX;
    }

    .item-date {
        position: absolute;
        right: 10PX;
        top: 10PX;
        color: #1E2329;
        font-size: 13PX;
    }

    .add-btn-bg {
        display: block;
        position: fixed;
        bottom: 19PX;
        right: 23PX;
        width: 25PX;
        height: 25PX;
        background-color: white;
    }

    .add-btn {
        position: fixed;
        bottom: 20PX;
        right: 10PX;
        color: #06c1ae;
        font-size: 50PX;
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
                keyword: '',
                checkList: [],
                resultCheckList: []
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
                        if (res.datas.IS_STU === '0') {
                            SDK.setTitleText('宿舍卫生检查记录');
                            this.$http.get(Api.teacherQueryStudentDormHygieneInfo)
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
                                        }
                                        this.checkList = tempCheckList;
                                        this.resultCheckList = this.checkList;
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
                this.$router.push({path: '/adminCheckDetail', query: {"JCBM": item.JCBM}});
            },
            toAddCheck: function () {
                this.$router.push('/addCheck');
            }
        },
        watch: {
            resultCheckList: function () {
                if (this.resultCheckList.length > 0) {
                    this.tab = 1;
                } else {
                    this.tab = 0;
                }
            },
            keyword: function () {
                console.log(this.keyword);
                this.resultCheckList = [];
                if (this.keyword.length <= 0) {
                    this.resultCheckList = this.checkList;
                } else {
                    for (let i = 0; i < this.checkList.length; i++) {
                        if ((this.checkList[i].SS.indexOf(this.keyword) >= 0) || (this.checkList[i].FJH.indexOf(this.keyword) >= 0)){
                            this.resultCheckList.push(this.checkList[i]);
                        }
                    }
                }
            }
        }
    }
</script>