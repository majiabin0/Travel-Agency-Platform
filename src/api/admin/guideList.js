import request from '@/utils/request'
import md5 from 'js-md5'
import QS from "qs";
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
    url: '/wxLogin/loginByPassword',
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
export function reviewList(data) {
  console.log(data, '1111')
  // data.password = md5(data.password)
  return request({
    url: '/webApi/evaluate/list',
    method: 'get',
    params: data

  })
}
export function guideList(data) {
  console.log(data, '1111')
  // data.password = md5(data.password)
  return request({
    url: '/webApi/user/list',
    method: 'get',
    params: data

  })
}
export function delete2(data) {
  console.log(data, '1111')
  // data.password = md5(data.password)
  return request({
    url: '/webApi/evaluate/delete',
    method: 'get',
    params: data

  })
}
export function list2(data) {
  console.log(data, '1111')
  // data.password = md5(data.password)
  return request({
    url: '/webApi/DictData/list',
    method: 'get',
    params: data

  })
}
export function details2(data) {
  console.log(data, '1111')
  // data.password = md5(data.password)
  return request({
    url: '/webApi/user/details',
    method: 'get',
    params: data

  })
}
export function orderSave(data) {
  console.log(typeof (data), 'data')
  // data.password = md5(data.password)
  return request({
    url: '/webApi/order/save',
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
