import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/organization/campus/addCampus',
    method: 'post',
    data: query
  })
}

export function getOrgCampus(data) {
  return request({
    url: '/organization/campus/getOrgCampus',
    method: 'get',
    data: data
  })
}
export function getOrgMember(form) {
  return request({
    url: '/organization/member/getOrgMember',
    method: 'get',
    params: form
  })
}
export function addStudent(form) {
  return request({
    url: '/organization/student/addStudent',
    method: 'post',
    params: form
  })
}
