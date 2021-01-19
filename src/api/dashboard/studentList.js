import request from '@/utils/request'

export function orgStudents(query) {
  return request({
    url: '/organization/student/orgStudents',
    method: 'get',
    params: query
  })
}
export function getOrgStuInfo(query) {
  return request({
    url: '/organization/student/getOrgStuInfo',
    method: 'get',
    params: query
  })
}
export function addStudent(form) {
  return request({
    url: '/organization/student/addStudent',
    method: 'post',
    params: form
  })
}
export function addMember(form) {
  return request({
    url: '/organization/member/addMember',
    method: 'post',
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
export function selectTeacherById(form) {
  return request({
    url: '/organization/member/selectTeacherById',
    method: 'get',
    params: form
  })
}
export function updateStudent(form) {
  return request({
    url: '/organization/student/updateStudent',
    method: 'post',
    params: form
  })
}
export function getClassTimeList(form) {
  return request({
    url: '/organization/classTime/getClassTimeList',
    method: 'get',
    params: form
  })
}
export function getClassTimeRecordPage(form) {
  return request({
    url: '/organization/classTime/getClassTimeRecordPage',
    method: 'get',
    params: form
  })
}
export function updateClassTime(form) {
  return request({
    url: '/organization/classTime/updateClassTime',
    method: 'post',
    params: form
  })
}
export function classList(form) {
  return request({
    url: '/organization/class/classList',
    method: 'post',
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
export function getClassByStuId(form) {
  return request({
    url: '/organization/class/getClassByStuId',
    method: 'get',
    params: form
  })
}
export function stuClassInfo(form) {
  return request({
    url: '/organization/class/stuClassInfo',
    method: 'get',
    params: form
  })
}
export function changeClass(form) {
  return request({
    url: '/organization/class/changeClass',
    method: 'post',
    params: form
  })
}
