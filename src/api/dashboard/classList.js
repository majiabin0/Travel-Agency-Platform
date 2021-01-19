import request from '@/utils/request'

export function getClassPage(query) {
  return request({
    url: '/organization/class/getClassPage',
    method: 'get',
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
    method: 'get',
    params: form
  })
}
export function classTeacher(form) {
  return request({
    url: '/organization/class/classTeacher',
    method: 'get',
    params: form
  })
}
export function classStudent(form) {
  return request({
    url: '/organization/class/classStudent',
    method: 'get',
    params: form
  })
}
export function updateClass(form) {
  return request({
    url: '/organization/class/updateClass',
    method: 'post',
    params: form
  })
}
export function getDayOfSchedule(form) {
  return request({
    url: '/organization/classSchedule/getDayOfSchedule',
    method: 'get',
    params: form
  })
}
export function addManualSchedule(form) {
  return request({
    url: '/organization/classSchedule/addManualSchedule',
    method: 'post',
    params: form,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export function addCircleSchedule(form) {
  return request({
    url: '/organization/classSchedule/addCircleSchedule',
    method: 'post',
    params: form
  })
}
export function removeClassMember(form) {
  return request({
    url: '/organization/class/removeClassMember',
    method: 'post',
    params: form
  })
}
