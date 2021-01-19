import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/organization/class/getOrgClass',
    method: 'post',
    params: query
  })
}
export function orgCourses(form) {
  return request({
    url: '/organization/course/orgCourses',
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
export function addClass(form) {
  return request({
    url: '/organization/class/addClass',
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
export function getCourseTypeList(form) {
  return request({
    url: '/organization/coursePrice/getCourseTypeList',
    method: 'post',
    params: form
  })
}
export function getMemberBind(form) {
  return request({
    url: '/organization/member/getMemberBind',
    method: 'get',
    params: form
  })
}
export function allocateClass(form) {
  return request({
    url: '/organization/class/allocateClass',
    method: 'post',
    params: form
  })
}
export function classDetail(form) {
  return request({
    url: '/organization/class/classDetail',
    method: 'post',
    params: form
  })
}
export function classTeacher(form) {
  return request({
    url: '/organization/class/classTeacher',
    method: 'post',
    params: form
  })
}
export function classStudent(form) {
  return request({
    url: '/organization/class/classStudent',
    method: 'post',
    params: form
  })
}
export function updateMemberStatus(form) {
  return request({
    url: '/organization/class/updateMemberStatus',
    method: 'post',
    params: form
  })
}

export function orderList(form) {
  return request({
    url: '/webApi/order/list',
    method: 'get',
    params: form
  })
}
export function guideList(form) {
  return request({
    url: '/webApi/user/list',
    method: 'get',
    params: form
  })
}
export function stateList(form) {
  return request({
    url: '/webApi/DictData/list',
    method: 'get',
    params: form
  })
}
export function detailsList(form) {
  return request({
    url: '/webApi/order/details',
    method: 'get',
    params: form
  })
}
export function update(form) {
  return request({
    url: '/webApi/order/update',
    method: 'get',
    params: form
  })
}
