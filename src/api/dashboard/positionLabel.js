import request from '@/utils/request'

export function posts(query) {
  return request({
    url: '/organization/post/posts',
    method: 'get',
    params: query
  })
}
export function insertPost(query) {
  // debugger
  return request({
    url: '/organization/label/insertLabel',
    method: 'post',
    data: query
  })
}
export function updatePost(form) {
  return request({
    url: '/organization/label/updateLabel',
    method: 'post',
    params: form
  })
}
export function postsPage(form) {
  return request({
    url: '/organization/label/labelsPage',
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
export function deletePost(form) {
  return request({
    url: '/organization/label/deleteLabel',
    method: 'post',
    params: form
  })
}
export function getPosts(form) {
  return request({
    url: '/organization/post/getPosts',
    method: 'get',
    params: form
  })
}

