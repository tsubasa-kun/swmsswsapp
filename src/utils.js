/**
 * Created by xiekun on 2017/4/21 0021.
 */
import {Toast} from 'mint-ui';
export default {
    components: {
        [Toast.name]: Toast
    },
    methods: {
        //弹出提示
        showTip: function (msg) {
            Toast({
                message: msg,
                position: 'bottom',
                duration: 2000
            });
        },
        //删除数组中元素
        removeByValue: function (arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    arr.splice(i, 1);
                    break;
                }
            }
        },
        //通过token获取文件
        getFileByToken: function (token) {
            return WEBPACK_CONIFG_HOST + 'sys/emapcomponent/file/getFileByToken/' + token + '.do';
        }
    }
}