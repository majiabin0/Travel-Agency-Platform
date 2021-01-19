import request from '@/utils/request'

/**
 *分页会员数据
 *
 * @export
 * @param {*} query
 * @returns
 */
export function page(query) {
  return request({
    url: '/admin/membership/pageOfMemberShip',
    method: 'post',
    data: query
  })
}

/**
 *会员数据保存
 *
 * @export
 * @param {*} membership
 * @returns
 */
export function save(membership) {
  return request({
    url: '/admin/membership/saveMembership',
    method: 'post',
    data: membership
  })
}

/**
 *会员状态集合
 *
 * @export
 * @returns
 */
export function allStatus() {
  return request({
    url: '/admin/membership/allStatus',
    method: 'get'
  })
}
