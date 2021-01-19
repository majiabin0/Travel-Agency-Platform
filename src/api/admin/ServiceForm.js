import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/organization/order/getOrgServiceOrder',
    method: 'get',
    params: query
  })
}

export function refuseServiceOrder(data) {
  return request({
    url: '/organization/order/refuseServiceOrder',
    method: 'post',
    data: data
  })
}

export function consentServiceOrder(data) {
  return request({
    url: '/organization/order/consentServiceOrder',
    method: 'post',
    data: data
  })
}
export function updateRole(form) {
  return request({
    url: '/organization/order/updateOrderPrice',
    method: 'post',
    params: form
  })
}
export function orderId(form) {
  return request({
    url: '/organization/order/getOrderById',
    method: 'get',
    params: form
  })
}
export function getOrgServiceOrderById(form) {
  return request({
    url: '/organization/order/getOrgServiceOrderById',
    method: 'get',
    params: form
  })
}
export function orgLockOrder(form) {
  return request({
    url: '/organization/order/orgLockOrder',
    method: 'post',
    params: form
  })
}
export function orgPaySuccess(form) {
  return request({
    url: '/organization/order/orgPaySuccess',
    method: 'post',
    params: form
  })
}
