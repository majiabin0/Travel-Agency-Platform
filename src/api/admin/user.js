import request from '@/utils/request'
import md5 from 'js-md5'
/**
 *分页查询系统用户列表
 *
 * @export
 * @param {*} query
 * @returns
 */
export function pageUser(query) {
  return request({
    url: '/admin/adminUser/userPage',
    method: 'post',
    params: query
  })
}

/**
 *添加系统用户
 *
 * @export
 * @param {*} user
 * @returns
 */
export function addUser(user) {
  user.password = md5(user.password)
  return request({
    url: '/admin/adminUser/addUser',
    method: 'post',
    params: user
  })
}

/**
 *用户信息修改
 *
 * @export
 * @param {*} user
 * @returns
 */
export function modifyUser(user) {
  return request({
    url: '/admin/adminUser/modifyUser',
    method: 'post',
    params: user
  })
}

/**
 *删除用户
 *
 * @export
 * @param {*} userId
 * @returns
 */
export function removeUser(userId) {
  return request({
    url: '/admin/adminUser/removeUser',
    method: 'get',
    params: { userId: userId }
  })
}

/**
 *用户密码修改
 *
 * @export
 * @param {*} userId
 * @param {*} oldPassword
 * @param {*} newPassword
 * @returns
 */
export function changenPassword(userId, oldPassword, newPassword) {
  oldPassword = md5(oldPassword)
  newPassword = md5(newPassword)
  return request({
    url: '/admin/adminUser/changenPassword',
    method: 'post',
    params: {
      userId: userId,
      oldPassword: oldPassword,
      newPassword: newPassword }
  })
}

/**
 *用户登录
 *
 * @export
 * @param {*} data
 * @returns
 */
export function login(data) {
  console.log(data, 'data')
  // data.password = md5(data.password)
  return request({
    url: 'wxLogin/loginByPassword',
    method: 'post',
    params: {
      username: data.username,
      password: data.password

    }
    // headers: {
    //   'Authentication': 'web-token'
    // }
  })
}

/**
 *用户注册
 *
 * @export
 * @param {*} data
 * @returns
 */
export function register(data) {
  console.log(data, '1111')
  data.password = md5(data.password)
  return request({
    url: '/wxLogin/login/register',
    method: 'post',
    params: {
      country: data.country,
      areaCode: data.areaCode,
      code: data.code,
      phone: data.phone,
      password: data.password

    }
  })
}
export function MsgCode(data) {
  console.log(data, '1111')
  // data.password = md5(data.password)
  return request({
    url: '/wxLogin/getCode',
    method: 'post',
    params: {
      phone: data.mobilePhone,
      areaCode: data.areaCode
    }
  })
}
export function getCode(data) {
  return request({
    url: '/wxLogin/getCode',
    method: 'post',
    params: {
      phone: data.phone,
      areaCode: data.areaCode

    }
  })
}
export function quickApply(data) {
  console.log(data, '1111')
  // data.password = md5(data.password)
  return request({
    url: '/organization/orgApply/quickApply',
    method: 'post',
    params: data

  })
}
export function addAgencyDocuments(data) {
  console.log(data, '1111')
  // data.password = md5(data.password)
  return request({
    url: '/organization/orgApply/addAgencyDocuments',
    method: 'post',
    params: data

  })
}
export function currentApply(data) {
  return request({
    url: '/organization/orgApply/currentApply',
    method: 'get',
    params: data
  })
}
export function chooseOrgIdentity(data) {
  console.log(data, '33')
  return request({
    url: '/organization/login/chooseOrgIdentity',
    method: 'post',
    params: data
  })
}
export function getStudents(data) {
  return request({
    url: '/organization/student/getStudents',
    method: 'post',
    params: data
  })
}
/**
 *登录用户信息
 *
 * @export
 * @param {*} token
 * @returns
 */
// export function getInfo(token) {
//   return request({
//     url: '/organization/orgUser/getUserInfo',
//     method: 'post'
//   })
// }
export function getInfo(token) {
  return request({
    url: '/organization/orgUser/userInfo',
    method: 'get',
    params: { token }
  })
}
export function updateApply(data) {
  return request({
    url: '/organization/orgApply/updateApply',
    method: 'post',
    params: data
  })
}
export function wxAuth(data) {
  return request({
    url: 'wxLogin/wxAuth',
    method: 'post',
    params: data
  })
}
export function callBack(data) {
  return request({
    url: '/wxLogin/callBack',
    method: 'post',
    params: data
  })
}

/**
 *用户退出登录
 *
 * @export
 * @returns
 */
export function logout() {
  return request({
    url: '/admin/adminUser/loginOut',
    method: 'get'
  })
}

/**
 *获取国家字典代码
 *
 * @export
 * @returns
 */
export function getContryCode(dictType) {
  return request({
    url: '/wxApi/DictData/list',
    method: 'get',
    params: { dictType: dictType }
  })
}

/**
 *获取档期
 *
 * @export
 * @returns
 */
export function getDateList(userId) {
  return request({
    url: '/wxApi/UserSchedule/list',
    method: 'get',
    params: { userId: userId }
  })
}
/**
 *获取档期备注
 *
 * @export
 * @returns
 */
export function getRemark(userId, scheduleDate) {
  return request({
    url: '/wxApi/UserSchedule/details',
    method: 'get',
    params: { userId: userId, scheduleDate: scheduleDate }
  })
}
/**
 *获取导游信息
 *
 * @export
 * @returns
 */
export function details(userId) {
  return request({
    url: '/wxApi/UserBasic/details',
    method: 'get',
    params: { userId: userId }
  })
}
/**
 *信息完善
 *
 * @export
 * @returns
 */
export function saveInformation(data) {
  return request({
    url: '/wxApi/UserBasic/saveInformation',
    method: 'post',
    data: data
  })
}
// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/wxApi/UserBasic/updateAvatar',
    method: 'post',
    data: data
  })
}
// 获取是否认证
export function getAuthenticate(id) {
  return request({
    url: '/wxApi/UserBasic/getAuthenticate',
    method: 'get',
    params: { id: id }
  })
}

