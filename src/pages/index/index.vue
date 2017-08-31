<template>
    <div>
        <v-student-index v-if="tab === 1"></v-student-index>
        <v-admin-index v-if="tab === 2"></v-admin-index>
        <!--<v-admin-index></v-admin-index>-->
    </div>
</template>

<style scoped>
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import {Indicator} from 'mint-ui';
    import studentIndex from '../studentIndex/studentIndex.vue';
    import adminIndex from '../adminIndex/adminIndex.vue';

    export default {
        data() {
            return {
                tab: 0
            }
        },
        components: {
            'v-student-index': studentIndex,
            'v-admin-index': adminIndex
        },
        created() {
            SDK.setTitleText('宿舍卫生');
            Indicator.open();
            this.$http.get(Api.setDefaultRole)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    Indicator.close();
                    if (res.status === '200') {
                        if (res.datas.IS_STU === '1') {
                            this.tab = 1;
                        } else {
                            this.tab = 2;
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
        }
    }
</script>