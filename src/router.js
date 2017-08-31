import index from './pages/index/index.vue';
import studentCheckDetail from './pages/studentCheckDetail/studentCheckDetail.vue';
import addCheck from './pages/addCheck/addCheck.vue';
import selectAddress from './pages/selectAddress/selectAddress.vue';
import adminCheckDetail from './pages/adminCheckDetail/adminCheckDetail.vue';
import editCheck from './pages/editCheck/editCheck.vue';

export default {
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/studentCheckDetail',
            component: studentCheckDetail
        },
        {
            path: '/addCheck',
            component: addCheck
        },
        {
            path: '/selectAddress',
            component: selectAddress
        },
        {
            path: '/adminCheckDetail',
            component: adminCheckDetail
        },
        {
            path: '/editCheck',
            component: editCheck
        }
    ]
};