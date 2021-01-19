import request from '@/utils/request'

export function getOrgMember(query) {
  return request({
    url: '/organization/member/getOrgMember',
    method: 'get',
    params: query
  })
}
export function getOrgCampus(data) {
  return request({
    url: '/organization/campus/getOrgCampus',
    method: 'get',
    data: data
  })
}
export function posts(form) {
  return request({
    url: '/organization/post/posts',
    method: 'get',
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
export function updateTeacher(form) {
  return request({
    url: '/organization/member/updateTeacher',
    method: 'post',
    params: form
  })
}

