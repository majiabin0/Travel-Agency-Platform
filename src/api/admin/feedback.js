import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/organization/orgUser/feedback',
    method: 'post',
    params: query
  })
}
