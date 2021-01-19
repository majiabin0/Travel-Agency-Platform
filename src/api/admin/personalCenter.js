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
export function getBalance(data) {
  return request({
    url: '/wxApi/UserBasic/getBalance',
    method: 'post',
    params: data
  })
}
export function getDetails(data) {
  return request({
    url: '/wxApi/WithdrawMoney/list',
    method: 'post',
    params: data
  })
}
export function updatePassword(data) {
  return request({
    url: '/wxApi/user/updatePassword',
    method: 'post',
    params: data
  })
}
export function setServicePrice(data) {
  return request({
    url: '/wxApi/UserBasic/setServicePrice',
    method: 'post',
    params: data
  })
}
export function orderservice(data) {
  return request({
    url: '/wxApi/waterbill/list',
    method: 'post',
    params: data
  })
}
// export function orderservice(data) {
//   return request({
//     url: '/wxApi/waterbill/list',
//     method: 'post',
//     params: data
//   })
// }
export function detailsOrder(data) {
  return request({
    url: '/wxApi/order/details',
    method: 'post',
    params: data
  })
}
export function detailsOrderservice(data) {
  return request({
    url: '/wxApi/orderservice/details',
    method: 'post',
    params: data
  })
}
