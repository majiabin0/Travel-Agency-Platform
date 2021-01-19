import request from '@/utils/request'

/**
 * 机构列表分页数据
 * @param {} query 查询参数
 */
export function orgPages(query) {
  return request({
    url: '/admin/organization/orgPages',
    method: 'get',
    params: query
  })
}

/**
 * 课程列表分页数据
 * @param {} 查询参数
 */
export function coursePage(query) {
  return request({
    url: '/admin/organization/coursePage',
    method: 'get',
    params: query
  })
}
