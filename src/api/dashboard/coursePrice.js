import request from '@/utils/request'

export function courseList(query) {
  return request({
    url: '/organization/course/courseList',
    method: 'get',
    params: query
  })
}
export function addCourse(query) {
  // debugger
  return request({
    url: '/organization/course/addCourse',
    method: 'post',
    data: query
  })
}
export function first(form) {
  return request({
    url: '/common/courseType/first',
    method: 'get',
    params: form
  })
}
export function getByParent(form) {
  return request({
    url: '/common/courseType/getByParent',
    method: 'get',
    params: form
  })
}
export function changeStatus(form) {
  return request({
    url: '/organization/course/changeStatus',
    method: 'get',
    params: form
  })
}
export function selectMemberById(form) {
  return request({
    url: '/organization/member/selectMemberById',
    method: 'get',
    params: form
  })
}
export function allotCourse(form) {
  return request({
    url: '/organization/course/allotCourse',
    method: 'get',
    params: form
  })
}
export function courseAllot(form) {
  return request({
    url: '/organization/course/courseAllot',
    method: 'get',
    params: form
  })
}
export function getMemberByPostCode(form) {
  return request({
    url: '/organization/post/getMemberByPostCode',
    method: 'get',
    params: form
  })
}
