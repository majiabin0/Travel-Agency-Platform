import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/organization/coursePrice/getPriceListByCourse',
    method: 'post',
    params: query
  })
}
export function detail(form) {
  return request({
    url: '/organization/coursePrice/coursePriceInfo',
    method: 'post',
    params: form
  })
}
export function updateName(data) {
  return request({
    url: '/organization/student/updateStudent',
    method: 'post',
    data: data
  })
}
export function updateRole(form) {
  return request({
    url: '/organization/coursePrice/updateCoursePrice',
    method: 'post',
    params: form
  })
}
export function addCoursePrice(form) {
  return request({
    url: '/organization/coursePrice/addCoursePrice',
    method: 'post',
    params: form
  })
}
export function getCourseTypeList(form) {
  return request({
    url: '/organization/coursePrice/getCourseTypeList',
    method: 'post',
    params: form
  })
}
export function deleteCoursePrice(form) {
  return request({
    url: '/organization/coursePrice/deleteCoursePrice',
    method: 'post',
    params: form
  })
}
export function onSale(form) {
  return request({
    url: '/organization/course/onSale',
    method: 'post',
    params: form
  })
}
export function haltSale(form) {
  return request({
    url: '/organization/course/haltSale',
    method: 'post',
    params: form
  })
}
export function forbidSale(form) {
  return request({
    url: '/organization/course/forbidSale',
    method: 'post',
    params: form
  })
}
