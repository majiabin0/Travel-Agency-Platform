import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/organization/course/orgCourses',
    method: 'get',
    params: query
  })
}
export function detail(form) {
  return request({
    url: '/organization/course/detail',
    method: 'get',
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
    url: '/organization/course/updateCourse',
    method: 'post',
    params: form
  })
}
export function addCourse(form) {
  return request({
    url: '/organization/course/addCourse',
    method: 'post',
    params: form
  })
}
export function removeCourse(form) {
  return request({
    url: '/organization/course/removeCourse',
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
