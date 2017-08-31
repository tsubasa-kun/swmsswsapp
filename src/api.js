/**
 * Created by xiekun on 2017/4/12 0012.
 */

export default {
    setDefaultRole: WEBPACK_CONIFG_HOST + 'sys/sswsapp/MobileStudentDormHygieneInfo/setDefaultRole.do',//设置用户角色
    getStudentDormHygieneInfo: WEBPACK_CONIFG_HOST + 'sys/sswsapp/MobileStudentDormHygieneInfo/getStudentDormHygieneInfo.do',//查询学生宿舍卫生信息
    teacherQueryStudentDormHygieneInfo: WEBPACK_CONIFG_HOST + 'sys/sswsapp/MobileTeacherRegisterDormHygiene/teacherQueryStudentDormHygieneInfo.do',//查询权限管理下所有宿舍卫生检查信息
    queryDormBuildingInfo: WEBPACK_CONIFG_HOST + 'sys/sswsapp/MobileTeacherRegisterDormHygiene/queryDormBuildingInfo.do',//查询权限管理下宿舍楼信息
    queryDormCheckTypeInfo: WEBPACK_CONIFG_HOST + 'sys/sswsapp/MobileTeacherRegisterDormHygiene/queryDormCheckTypeInfo.do',//查询宿舍楼检查类型字典表
    saveDormHygiene: WEBPACK_CONIFG_HOST + 'sys/sswsapp/MobileTeacherRegisterDormHygiene/saveDormHygiene.do',//管理员登记学生宿舍卫生检查信息
    queryStuInfoDorm: WEBPACK_CONIFG_HOST + 'sys/sswsapp/MobileTeacherRegisterDormHygiene/queryStuInfoDorm.do',//根据宿舍楼和房间号查询宿舍下的学生信息
    deleteDormHygieneRecord: WEBPACK_CONIFG_HOST + 'sys/sswsapp/MobileTeacherRegisterDormHygiene/deleteDromHygieneRecord.do',//删除宿舍卫生检查记录
}
