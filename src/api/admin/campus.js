import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/organization/campus/getOrgCampus',
    method: 'get',
    data: query
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
    url: '/organization/student/updateStudent',
    method: 'post',
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
