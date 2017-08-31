<template>
    <div>
        <div class="title-div">
            <div class="build-list-title">宿舍楼</div>
            <div class="room-list-title">房间号</div>
        </div>
        <div class="content">
            <div class="build-div">
                <div class="build-item" v-for="build in buildList" @click="buildSelect(build)">
                    <span v-if="build.SSLMC === selectBuild" class="build-name current"> {{ build.SSLMC }}</span>
                    <span v-else class="build-name"> {{ build.SSLMC }}</span>
                </div>
            </div>
            <div class="room-div">
                <div class="room-item" v-for="room in roomList" @click="roomSelect(room)">
                    <span v-if="room.FJH === selectRoom" class="room-name current">{{ room.FJH }}</span>
                    <span v-else class="room-name">{{ room.FJH }}</span>
                </div>
            </div>
        </div>
        <mt-button class="submit-btn" @click="submit">确定</mt-button>
    </div>
</template>

<style scoped>
    .content {
        text-align: center;
        background-color: white;
    }

    .build-div {
        display: inline-block;
        width: 59%;
        height: calc(100vh - 30PX);
        vertical-align: top;
        overflow-y: auto;
        padding-bottom: 40PX;
    }

    .build-list-title {
        text-align: center;
        font-size: 14PX;
        line-height: 30PX;
        display: inline-block;
        width: 60%;
        background-color: white;
    }

    .build-item {
        text-align: center;
        background-color: white;
    }

    .build-name {
        font-size: 14PX;
        line-height: 30PX;
        width: 100%;
        display: block;
    }

    .room-div {
        display: inline-block;
        width: 40%;
        height: calc(100vh - 30PX);
        margin-left: -3PX;
        vertical-align: top;
        overflow-y: auto;
        padding-bottom: 40PX;
    }

    .room-list-title {
        text-align: center;
        font-size: 14PX;
        line-height: 30PX;
        display: inline-block;
        width: 40%;
        background-color: white;
        border-left: solid 1PX #e8e8e8;
        margin-left: -5PX;
    }

    .room-item {
        text-align: center;
        background-color: white;
        border-left: solid 1PX #e8e8e8;
    }

    .room-name {
        font-size: 14PX;
        color: black;
        line-height: 30PX;
        display: block;
        width: 100%;
    }

    .submit-btn {
        width: 100%;
        color: white;
        background-color: #06c1ae;
        position: fixed;
        bottom: 0;
    }

    .current {
        color: white;
        background-color: #06c1ae;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import {Indicator, Button} from 'mint-ui';

    export default {
        data() {
            return {
                selectBuild: '',
                selectBuildDM: '',
                selectRoom: '',
                buildList: [],
                roomList: [],
                firstIn: true
            }
        },
        created() {
            SDK.setTitleText('选择宿舍');

            Indicator.open();
            this.$http.get(Api.queryDormBuildingInfo)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    Indicator.close();
                    this.buildList = res.datas;

                    this.selectBuild = sessionStorage.getItem('SSLMC') || '';
                    this.selectRoom = sessionStorage.getItem('FJH') || '';
                    this.initSelect(this.selectBuild);
                })
                .catch((msg) => {
                    Indicator.close();
                    Utils.methods.showTip('请求出错');
                });
        },
        components: {
            [Button.name]: Button
        },
        methods: {
            submit: function () {
                if (this.selectBuild.length <= 0) {
                    Utils.methods.showTip('请选择宿舍楼');
                } else if (this.selectRoom.length <= 0) {
                    Utils.methods.showTip('请选择房间号');
                } else {
                    sessionStorage.setItem('SSLDM', this.selectBuildDM);
                    sessionStorage.setItem('SSLMC', this.selectBuild);
                    sessionStorage.setItem('FJH', this.selectRoom);
                    this.$router.go(-1);
                }
            },
            initSelect: function (build) {
                console.log(build);
                for (let i = 0; i < this.buildList.length; i++) {
                    if (this.buildList[i].SSLMC === build) {
                        this.buildSelect(this.buildList[i]);
                    }
                }
            },
            buildSelect: function (build) {
                this.selectBuild = build.SSLMC;
                this.selectBuildDM = build.SSLDM;
                if (this.firstIn) {
                    this.firstIn = false;
                } else {
                    this.selectRoom = '';
                }
                this.roomList = build.FJH_DATAS;
            },
            roomSelect: function (room) {
                this.selectRoom = room.FJH;
            },
        }
    }
</script>