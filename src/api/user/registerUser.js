import request from '@/utils/request'

/**
 * 分页查询注册用户
 *
 * @export
 * @param {*} query
 * @returns
 */
export function page(query) {
  return request({
    url: '/admin/registerUser/selectByPage',
    method: 'get',
    params: query
  })
}
