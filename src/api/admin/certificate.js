import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/organization/orgApply/getApplyById',
    method: 'get',
    params: query
  })
}

